export interface CommunicationStep {
  id: number;
  title: string;
  description: string;
  questions: string[];
  templates: string[];
  validationRules: string[];
}

export const communicationSteps: CommunicationStep[] = [
  {
    id: 1,
    title: "讲事实",
    description: "客观描述观察到的情况",
    questions: [
      "你注意到了什么？",
      "发生了什么？",
      "你观察到了什么？"
    ],
    templates: [
      "我注意到...",
      "我发现...",
      "我观察到..."
    ],
    validationRules: ["包含具体事实", "避免主观判断"]
  },
  {
    id: 2,
    title: "讲感受",
    description: "表达自己的感受和情绪",
    questions: [
      "这件事让你有什么感受？",
      "你的心情如何？",
      "这对你造成了什么影响？"
    ],
    templates: [
      "我觉得...",
      "我感到...",
      "我有些担心，因为..."
    ],
    validationRules: ["表达真实感受", "避免指责他人"]
  },
  {
    id: 3,
    title: "询问对方观点",
    description: "了解对方的想法和感受",
    questions: [
      "你觉得呢？",
      "你是怎么想的？",
      "你的看法是什么？"
    ],
    templates: [
      "我想听听你的想法...",
      "你觉得这个情况怎么样？",
      "你对此有什么看法？"
    ],
    validationRules: ["使用开放性问题", "避免引导性提问"]
  },
  {
    id: 4,
    title: "试探表达",
    description: "谨慎地表达自己的想法",
    questions: [
      "如果...你觉得怎么样？",
      "我们可以试试...吗？",
      "你觉得...这个建议如何？"
    ],
    templates: [
      "我在想，如果...",
      "也许我们可以...",
      "你觉得...这个方案可行吗？"
    ],
    validationRules: ["使用试探性语气", "保持开放态度"]
  },
  {
    id: 5,
    title: "鼓励性测试",
    description: "鼓励对方继续表达",
    questions: [
      "能多说一些吗？",
      "还有其他的想法吗？",
      "你觉得还有什么需要考虑的？"
    ],
    templates: [
      "请继续说...",
      "我很想听听更多...",
      "这个想法很有趣，能详细说说吗？"
    ],
    validationRules: ["使用鼓励性语言", "保持倾听态度"]
  }
]; 