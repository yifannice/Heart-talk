import axios from 'axios';
import { DiagnosisData } from '../components/conversation/DiagnosisForm';

const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const API_URL = import.meta.env.VITE_DEEPSEEK_API_URL || 'https://api.deepseek.com/v1/chat/completions';

// 检查API_KEY是否设置
if (!API_KEY) {
  throw new Error('VITE_DEEPSEEK_API_KEY 环境变量未设置。请在 .env 文件中设置您的 Deepseek API 密钥。');
}

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  timeout: 30000,
});

// 安全限制
const RESTRICTED_TOPICS = [
  '自杀', '自残', '暴力', '毒品', '色情',
  '政治敏感', '宗教敏感', '种族歧视'
];

// 情感分析结果
interface EmotionAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  intensity: number;
  suggestions: string[];
}

// 对话建议
interface DialogueSuggestion {
  riskLevel: 'high' | 'medium' | 'low';
  strategyTags: string[];
  suggestions: string[];
}

// 模板生成
interface TemplateGeneration {
  template: string;
  context: string;
  safetyCheck: boolean;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// 重试机制
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

// 调用 AI API
async function callAIAPI(messages: ChatMessage[]) {
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
    } catch (error) {
      console.error('Error calling AI API:', error);
      throw new Error('AI 服务暂时不可用，请稍后重试');
    }
  });
}

// 安全检查
const checkSafety = (text: string): boolean => {
  const lowerText = text.toLowerCase();
  return !RESTRICTED_TOPICS.some(topic => lowerText.includes(topic.toLowerCase()));
};

// 情感分析
export const analyzeEmotion = async (text: string): Promise<EmotionAnalysis> => {
  if (!checkSafety(text)) {
    return {
      sentiment: 'neutral',
      intensity: 0,
      suggestions: ['请避免使用敏感或不当的表达']
    };
  }

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: '你是一个情感分析专家，请分析以下文本的情感倾向和强度，并提供改进建议。'
    },
    {
      role: 'user',
      content: text
    }
  ];

  try {
    const response = await callAIAPI(messages);
    // 解析 AI 响应
    const analysis = JSON.parse(response);
    return {
      sentiment: analysis.sentiment,
      intensity: analysis.intensity,
      suggestions: analysis.suggestions
    };
  } catch (error) {
    console.error('情感分析失败:', error);
    return {
      sentiment: 'neutral',
      intensity: 0.5,
      suggestions: ['建议使用更客观的表达方式']
    };
  }
};

// 生成对话建议
export const generateDialogueSuggestions = async (
  diagnosisData: DiagnosisData
): Promise<DialogueSuggestion> => {
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: `你是一个沟通专家，请根据用户的诊断数据提供风险评级和推荐策略。
请按照以下格式返回：
1. 风险评级：根据争议程度、情绪强度和利益冲突综合评估，分为高风险、中风险、低风险
2. 推荐策略标签：根据对话情境和目标，提供2-3个最合适的策略标签
3. 具体建议：提供3-5条具体的对话建议

风险评级标准：
- 高风险：争议程度≥4且情绪强度≥4，或涉及利益冲突
- 中风险：争议程度≥3或情绪强度≥3
- 低风险：争议程度≤2且情绪强度≤2

策略标签示例：
- 情绪安抚优先
- 事实导向沟通
- 关系修复为主
- 利益协商为主
- 温和拒绝
- 共识导向
- 边界设定
- 共情倾听

请直接返回JSON格式：
{
  "riskLevel": "high/medium/low",
  "strategyTags": ["标签1", "标签2"],
  "suggestions": ["建议1", "建议2", "建议3"]
}`
    },
    {
      role: 'user',
      content: JSON.stringify(diagnosisData)
    }
  ];

  try {
    const response: string = await callAIAPI(messages);
    console.log('AI返回的建议:', response);

    // 解析AI返回的JSON
    const result = JSON.parse(response);
    
    return {
      riskLevel: result.riskLevel,
      strategyTags: result.strategyTags,
      suggestions: result.suggestions
    };
  } catch (error) {
    console.error('生成建议失败:', error);
    return {
      riskLevel: 'medium',
      strategyTags: ['情绪安抚优先', '事实导向沟通'],
      suggestions: [
        '建议使用更温和的表达方式',
        '注意倾听对方的观点',
        '保持开放和尊重的态度'
      ]
    };
  }
};

// 生成个性化模板
export const generatePersonalizedTemplate = async (
  diagnosisData: DiagnosisData,
  context: string
): Promise<TemplateGeneration> => {
  if (!checkSafety(context)) {
    return {
      template: '',
      context: '内容包含敏感话题，无法生成模板',
      safetyCheck: false
    };
  }

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: '你是一个沟通专家，请根据用户的诊断数据和上下文生成个性化的STATE模板。'
    },
    {
      role: 'user',
      content: JSON.stringify({ diagnosisData, context })
    }
  ];

  try {
    const response = await callAIAPI(messages);
    return {
      template: response,
      context,
      safetyCheck: true
    };
  } catch (error) {
    console.error('生成模板失败:', error);
    return {
      template: `【分享事实经过】
${context}

【说出你的想法】
基于当前情况，我认为...

【征询对方观点】
我很想听听你的想法...

【试探性表述】
或许我们可以...

【鼓励对方表达不同观点】
让我们一起找到更好的解决方案...`,
      context,
      safetyCheck: true
    };
  }
};

// 错误处理
export const handleAIError = (error: Error): string => {
  console.error('AI服务错误:', error);
  return '抱歉，AI服务暂时无法使用，请稍后再试';
}; 