import React, { useState, useEffect, useRef } from 'react';
import { useConversation } from '../../hooks/useConversation';
import ChatBubble from './ChatBubble';
import { generateConversationResponse } from '../../services/ai';
import { conversationContent } from '../../config/conversationContent';
import { guidanceContent } from '../../config/guidanceContent';
import { formatGuidance } from '../../utils/contentFormatter';

// 6步流程配置，每步包含提问、反馈、鼓励、建议生成逻辑
const steps = [
  {
    title: conversationContent.steps.selfAwareness.title,
    aiPrompt: () => conversationContent.steps.selfAwareness.prompts.initial,
  },
  {
    title: conversationContent.steps.clearGoals.title,
    aiPrompt: () => conversationContent.steps.clearGoals.prompts.initial,
    getNextPrompt: (subStep: number) => {
      // 第一个问题：你真正想要的是什么？
      if (subStep <= 3) {
        return conversationContent.steps.clearGoals.prompts.followUps.desire[subStep];
      }
      // 第二个问题：你希望通过这次对话达成什么目标？
      else if (subStep <= 7) {
        return conversationContent.steps.clearGoals.prompts.followUps.goal[subStep - 4];
      }
      // 第三个问题：你希望对方在对话后有什么感受和行动？
      else if (subStep <= 11) {
        return conversationContent.steps.clearGoals.prompts.followUps.expectation[subStep - 8];
      }
      // 最后总结和确认
      else {
        return conversationContent.steps.clearGoals.prompts.followUps.summary;
      }
    }
  },
  {
    title: conversationContent.steps.safetyAtmosphere.title,
    aiPrompt: () => conversationContent.steps.safetyAtmosphere.prompts.initial,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getNextPrompt: (_subStep: number) => formatGuidance(guidanceContent.safetyAtmosphere)
  },
  {
    title: conversationContent.steps.respect.title,
    aiPrompt: () => conversationContent.steps.respect.prompts.initial,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getNextPrompt: (_subStep: number) => formatGuidance(guidanceContent.respect)
  },
  {
    title: conversationContent.steps.fiveStepMethod.title,
    aiPrompt: () => conversationContent.steps.fiveStepMethod.prompts.initial,
  },
  {
    title: conversationContent.steps.conflictHandling.title,
    aiPrompt: () => conversationContent.steps.conflictHandling.prompts.initial,
  },
];

const shouldProceed = (input: string, subStep: number, step: number) => {
  const endWords = ['没有了', '暂时这样', '就这些', '没了', '没什么了'];
  // 第二步有12个子步骤（3个主要问题，每个问题4个追问）
  if (step === 1) {
    return endWords.some(word => input.includes(word)) || subStep >= 11;
  }
  return endWords.some(word => input.includes(word)) || subStep >= 2;
};

const ConversationFlow: React.FC = () => {
  const { messages, addMessage, step, setStep, subStep, setSubStep } = useConversation();
  const [input, setInput] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const initialized = useRef(false);

  // 初始AI提问，只执行一次
  useEffect(() => {
    if (!initialized.current && messages.length === 0) {
      const firstPrompt = steps[0].aiPrompt();
      addMessage({ role: 'ai', content: firstPrompt, step: 0, subStep: 0 });
      setAiTyping(true);
      initialized.current = true;
    }
    // eslint-disable-next-line
  }, []);

  // 用户提交答案
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // 添加用户消息
    addMessage({ role: 'user', content: input, step, subStep });
    setInput('');
    
    // 显示loading状态
    setIsLoading(true);
    
    // 准备历史消息
    const previousMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
    
    try {
      // 调用AI生成回复
      const aiResponse = await generateConversationResponse(
        input,
        step,
        subStep,
        previousMessages
      );
      
      // 添加AI回复
      addMessage({ 
        role: 'ai', 
        content: aiResponse, 
        step, 
        subStep: subStep + 1 
      });
      setAiTyping(true);
    } catch (error) {
      console.error('AI响应生成失败:', error);
      // 添加错误提示
      addMessage({ 
        role: 'ai', 
        content: '抱歉，我遇到了一些问题。请稍后再试。', 
        step, 
        subStep: subStep + 1 
      });
      setAiTyping(true);
    } finally {
      setIsLoading(false);
    }
  };

  // AI气泡打字机动画结束后
  const handleTypingEnd = () => {
    setAiTyping(false);
    // 如果刚反馈完且不是最后一步，自动进入下一步AI提问
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.role === 'ai' && lastMsg.subStep === subStep + 1) {
      if (step === 0) {
        if (shouldProceed(input, subStep, step)) {
          setTimeout(() => {
            setStep(1);
            setSubStep(0);
            const nextPrompt = steps[1].aiPrompt();
            addMessage({ role: 'ai', content: nextPrompt, step: 1, subStep: 0 });
            setAiTyping(true);
          }, 800);
        } else {
          setSubStep(subStep + 1);
        }
      } else if (step === 1) {
        // 第二步的特殊处理
        if (shouldProceed(input, subStep, step)) {
          setTimeout(() => {
            setStep(2);
            setSubStep(0);
            const nextPrompt = steps[2].aiPrompt();
            addMessage({ role: 'ai', content: nextPrompt, step: 2, subStep: 0 });
            setAiTyping(true);
          }, 800);
        } else {
          setSubStep(subStep + 1);
          const nextPrompt = steps[1].getNextPrompt?.(subStep + 1) || '你觉得还有什么需要补充的吗？';
          setTimeout(() => {
            addMessage({ role: 'ai', content: nextPrompt, step: 1, subStep: subStep + 1 });
            setAiTyping(true);
          }, 800);
        }
      } else if (step === 2) {
        // 第三步的特殊处理：直接显示指导知识
        setTimeout(() => {
          const guideContent = steps[2].getNextPrompt?.(0) || '';
          addMessage({ role: 'ai', content: guideContent, step: 2, subStep: 1 });
          setAiTyping(true);
          // 显示完指导知识后，自动进入下一步
          setTimeout(() => {
            setStep(3);
            setSubStep(0);
            const nextPrompt = steps[3].aiPrompt();
            addMessage({ role: 'ai', content: nextPrompt, step: 3, subStep: 0 });
            setAiTyping(true);
          }, 800);
        }, 800);
      } else if (step < steps.length - 1) {
        setTimeout(() => {
          setStep(step + 1);
          setSubStep(0);
          const nextPrompt = steps[step + 1].aiPrompt();
          addMessage({ role: 'ai', content: nextPrompt, step: step + 1, subStep: 0 });
          setAiTyping(true);
        }, 800);
      }
    }
  };

  // 自动聚焦输入框
  useEffect(() => {
    if (!aiTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [aiTyping, step]);

  // 只显示当前及之前的对话
  const visibleMessages = messages.filter(m => m.step <= step);

  // 找到最后一条AI消息的索引
  const lastAiIdx = [...visibleMessages].reverse().findIndex(m => m.role === 'ai');
  const lastAiAbsIdx = lastAiIdx === -1 ? -1 : visibleMessages.length - 1 - lastAiIdx;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">AI 沟通引导</h2>
      <div className="bg-white rounded-xl p-6 min-h-[340px] mb-4 shadow-lg">
        {visibleMessages.map((msg, idx) => (
          <ChatBubble
            key={idx}
            role={msg.role}
            content={msg.content}
            typing={msg.role === 'ai' && idx === lastAiAbsIdx && aiTyping}
            onTypingEnd={msg.role === 'ai' && idx === lastAiAbsIdx && aiTyping ? handleTypingEnd : undefined}
          />
        ))}
        {isLoading && (
          <div className="flex items-center justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">AI正在思考...</span>
          </div>
        )}
      </div>
      {step < steps.length && !aiTyping && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            ref={inputRef}
            className="w-full min-h-[80px] max-h-[200px] px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-lg resize-vertical shadow"
            placeholder="请输入你的回答..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={aiTyping || isLoading}
            autoFocus
            rows={4}
          />
          <button
            type="submit"
            className="self-end px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-colors shadow disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!input.trim() || aiTyping || isLoading}
          >
            {isLoading ? '等待AI响应...' : '发送'}
          </button>
        </form>
      )}
      {step === steps.length - 1 && !aiTyping && (
        <div className="mt-6 text-center text-green-700 font-semibold">
          恭喜你完成了全部沟通引导！可以回顾对话内容，或重新开始。
        </div>
      )}
    </div>
  );
};

export default ConversationFlow;
