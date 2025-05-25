import axios from 'axios';
import { ConversationState } from '../types/conversation';

const API_KEY = 'sk-4f76ba4a05d54cd7b460a7ebab174a3e';
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  timeout: 30000,
});

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = 3,
  baseDelay = 1000,
  maxDelay = 10000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;

    const delay = Math.min(baseDelay * Math.pow(2, 3 - retries), maxDelay);
    await wait(delay);

    return retryWithBackoff(fn, retries - 1, baseDelay, maxDelay);
  }
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

function hasCode(error: unknown): error is { code: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as { code?: unknown }).code === 'string'
  );
}

function hasResponseStatus(error: unknown): error is { response: { status: number } } {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error
  ) {
    const resp = (error as { response?: unknown }).response;
    if (
      typeof resp === 'object' &&
      resp !== null &&
      'status' in resp &&
      typeof (resp as { status?: unknown }).status === 'number'
    ) {
      return true;
    }
  }
  return false;
}

async function callDeepseekAPI(messages: ChatMessage[]) {
  return retryWithBackoff(async () => {
    try {
      const response = await axiosInstance.post('', {
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      });
      
      if (!response.data?.choices?.[0]?.message?.content) {
        throw new Error('Invalid API response format');
      }
      
      return response.data.choices[0].message.content;
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (hasCode(error) && error.code === 'ECONNABORTED') {
          throw new Error('请求超时，请稍后重试');
        }
        if (hasResponseStatus(error) && error.response.status === 429) {
          throw new Error('请求过于频繁，请稍后重试');
        }
      }
      console.error('Error calling Deepseek API:', error);
      throw new Error('AI 服务暂时不可用，请稍后重试');
    }
  });
}

export async function analyzeConflict(situation: string) {
  const messages: ChatMessage[] = [
    {
      role: "system" as const,
      content: `你是一个专业的沟通助手，擅长使用《关键对话》和《非暴力沟通》的原则来帮助用户解决关系冲突。

你的主要职责是：
1. 帮助用户觉察自己的情绪和需求
2. 引导用户明确沟通目标
3. 协助用户建立安全的对话氛围
4. 指导用户使用尊重的表达方式
5. 教授用户使用State沟通五步法
6. 帮助用户处理冲突情况

在对话中，你应该：
- 使用温暖、关怀的语气
- 适时给予情感支持
- 使用打字机效果，让对话更自然
- 在用户回答后，使用重复技巧鼓励多说
- 根据用户的具体情况给出个性化建议`
    },
    {
      role: "user" as const,
      content: `请分析这个冲突情况，并帮助用户觉察自己的情绪和需求：${situation}`
    }
  ];

  return await callDeepseekAPI(messages);
}

export async function generateRecommendations(state: ConversationState) {
  const messages: ChatMessage[] = [
    {
      role: "system" as const,
      content: `你是一个专业的沟通助手，擅长使用《关键对话》和《非暴力沟通》的原则来帮助用户解决关系冲突。

基于用户提供的信息，你需要：
1. 总结用户的情绪和需求
2. 分析沟通目标是否合理
3. 评估对话氛围的安全性
4. 提供具体的表达建议
5. 给出冲突处理策略

在给出建议时，你应该：
- 使用温暖、关怀的语气
- 肯定用户的努力和进步
- 提供具体、可操作的建议
- 强调共同目标和关系价值`
    },
    {
      role: "user" as const,
      content: `
        冲突情况：${state.conflictSituation}
        个人目标：${state.goals.self}
        对方目标：${state.goals.other}
        关系目标：${state.goals.relationship}
        最新沟通内容：${state.nonviolentMessages[state.nonviolentMessages.length - 1]}
        安全检查结果：${state.safetyCheck.atmosphereSafe ? '安全' : '不安全'}
        安全策略：${state.safetyStrategies.join(', ')}
      `
    }
  ];

  return await callDeepseekAPI(messages);
}

export async function improveNonviolentCommunication(message: string) {
  const messages: ChatMessage[] = [
    {
      role: "system" as const,
      content: "You are an expert in Nonviolent Communication. Help improve this message by ensuring it follows the observation, feeling, need, request format."
    },
    {
      role: "user" as const,
      content: `Improve this message using NVC principles: ${message}`
    }
  ];

  return await callDeepseekAPI(messages);
}

export async function generateConversationResponse(
  userInput: string,
  step: number,
  subStep: number,
  previousMessages: { role: 'user' | 'ai'; content: string }[]
) {
  const stepDescriptions = [
    '自我觉察阶段：帮助用户觉察和表达自己的情绪。',
    '明确目标阶段：帮助用户明确沟通目标。',
    '安全氛围阶段：评估和建立安全的沟通环境。',
    '保持尊重阶段：引导用户使用尊重的表达方式。',
    '五步沟通法阶段：指导用户使用观察、感受、需要、请求、倾听的表达方式。',
    '冲突处理阶段：帮助用户处理沟通中的冲突。'
  ];

  const messages: ChatMessage[] = [
    {
      role: "system" as const,
      content: `你是一个专业的沟通助手，擅长使用《关键对话》和《非暴力沟通》的原则来帮助用户解决关系冲突。

当前阶段：${stepDescriptions[step]}

你的主要职责是：
1. 帮助用户觉察自己的情绪和需求
2. 引导用户明确沟通目标
3. 协助用户建立安全的对话氛围
4. 指导用户使用尊重的表达方式
5. 教授用户使用State沟通五步法
6. 帮助用户处理冲突情况

在对话中，你应该：
- 使用温暖、关怀的语气
- 适时给予情感支持
- 在用户回答后，使用重复技巧鼓励多说
- 根据用户的具体情况给出个性化建议
- 当用户说"没了"或类似的话时，表示理解并进入下一步
- 保持对话的自然流畅`
    },
    ...previousMessages.map(msg => ({
      role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
      content: msg.content
    })),
    {
      role: "user" as const,
      content: userInput
    }
  ];

  return await callDeepseekAPI(messages);
}