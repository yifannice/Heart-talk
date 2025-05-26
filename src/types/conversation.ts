export enum ConversationStep {
  SELF_AWARENESS = 'self_awareness',
  GOAL_SETTING = 'goal_setting',
  SAFETY_CHECK = 'safety_check',
  SAFETY_BUILDING = 'safety_building',
  RESPECTFUL_COMMUNICATION = 'respectful_communication',
  STATE_FRAMEWORK = 'state_framework',
  CONFLICT_HANDLING = 'conflict_handling',
  SUMMARY_RECOMMENDATIONS = 'summary_recommendations',
}

export type GoalType = 'self' | 'other' | 'relationship';

export interface DialogueSuggestion {
  suggestions: string[];
  safetyLevel: 'safe' | 'caution' | 'unsafe';
  nextSteps: string[];
}

export interface DiagnosisData {
  currentEmotion: string;
  desiredOutcome: string;
  expectedResponse: string;
  additionalNotes?: string;
}

export interface ConversationState {
  selfAwareness: {
    emotions: string;
    needs: string;
    selfComfort: string;
  };
  goals: {
    self: string;
    other: string;
    relationship: string;
  };
  safetyCheck: {
    partnerEmotions: string;
    atmosphereSafe: boolean;
    concerns: string;
  };
  safetyStrategies: string[];
  respectfulCommunication: {
    messages: string[];
    feedback: string;
  };
  stateFramework: {
    completed: boolean;
    notes: string;
  };
  conflictHandling: {
    situation: string;
    strategy: string;
    outcome: string;
  };
  currentStep: string;
  nonviolentMessages: string[];
  analysis: string;
  recommendation: string;
  conflictSituation: string;
  diagnosisData: DiagnosisData;
  aiSuggestions: DialogueSuggestion | null;
  isLoading: boolean;
}

export interface ConflictFeatures {
  opinionDifferences: boolean;
  highRisk: boolean;
  intenseEmotions: boolean;
}

export interface NonviolentCommunication {
  observation: string;
  feeling: string;
  need: string;
  request: string;
}

export const safetyStrategies = [
  {
    id: 1,
    title: "共同目标",
    description: "找到并强调你们共同的目标，这有助于建立互信和理解。",
    example: "我们都希望让这段关系变得更好，对吗？"
  },
  {
    id: 2,
    title: "尊重表达",
    description: "用尊重的语气表达关心，避免指责和评判。",
    example: "我很在意你的感受，也希望能分享我的想法。"
  },
  {
    id: 3,
    title: "对话意图",
    description: "明确表达你想要对话的积极意图。",
    example: "我想和你谈谈，是因为我珍惜我们的关系。"
  }
];

export const frameworkSteps: FrameworkStep[] = [
  {
    id: 1,
    title: "观察事实",
    description: "客观描述发生的事情，不带评判。",
    example: "当我看到..."
  },
  {
    id: 2,
    title: "表达感受",
    description: "分享你的情绪和感受。",
    example: "我感到..."
  },
  {
    id: 3,
    title: "说明需要",
    description: "解释这些感受背后的需求。",
    example: "因为我需要..."
  },
  {
    id: 4,
    title: "提出请求",
    description: "明确、具体地提出可行的请求。",
    example: "你愿意..."
  }
];