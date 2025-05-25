import React, { createContext, useState, ReactNode } from 'react';
import { ConversationStep, ConversationState } from '../types/conversation';
import { generateRecommendations, improveNonviolentCommunication } from '../services/ai';

export type Message = {
  role: 'ai' | 'user';
  content: string;
  step: number; // 所属主步骤
  subStep: number; // 所属子问题
};

interface ConversationContextType {
  currentStep: ConversationStep;
  setCurrentStep: (step: ConversationStep) => void;
  conflictSituation: string;
  setConflictSituation: (situation: string) => void;
  goals: {
    self: string;
    other: string;
    relationship: string;
  };
  setGoal: (type: 'self' | 'other' | 'relationship', goal: string) => void;
  setSelfAwareness: (data: { emotions: string; needs: string; selfComfort: string }) => void;
  setSafetyCheck: (data: { partnerEmotions: string; atmosphereSafe: boolean; concerns: string }) => void;
  addSafetyStrategy: (strategy: string) => void;
  nonviolentMessages: string[];
  addNonviolentMessage: (message: string) => Promise<void>;
  getRecommendation: () => Promise<string>;
  resetConversation: () => void;
  messages: Message[];
  addMessage: (msg: Message) => void;
  step: number;
  setStep: (step: number) => void;
  subStep: number;
  setSubStep: (sub: number) => void;
}

const initialState: ConversationState & {
  messages: Message[];
  step: number;
  subStep: number;
} = {
  selfAwareness: {
    emotions: '',
    needs: '',
    selfComfort: '',
  },
  safetyCheck: {
    partnerEmotions: '',
    atmosphereSafe: false,
    concerns: '',
  },
  safetyStrategies: [],
  currentStep: ConversationStep.SELF_AWARENESS,
  nonviolentMessages: [],
  analysis: '',
  recommendation: '',
  conflictSituation: '',
  goals: {
    self: '',
    other: '',
    relationship: ''
  },
  respectfulCommunication: {
    messages: [],
    feedback: ''
  },
  stateFramework: {
    completed: false,
    notes: ''
  },
  conflictHandling: {
    situation: '',
    strategy: '',
    outcome: ''
  },
  messages: [],
  step: 0,
  subStep: 0,
};

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setCurrentStep = (step: ConversationStep) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const setConflictSituation = (situation: string) => {
    setState(prev => ({ ...prev, conflictSituation: situation }));
  };

  const setSelfAwareness = (data: { emotions: string; needs: string; selfComfort: string }) => {
    setState((prev) => ({
      ...prev,
      selfAwareness: data,
      currentStep: ConversationStep.SAFETY_CHECK,
    }));
  };

  const setSafetyCheck = (data: { partnerEmotions: string; atmosphereSafe: boolean; concerns: string }) => {
    setState((prev) => ({
      ...prev,
      safetyCheck: data,
      currentStep: data.atmosphereSafe ? ConversationStep.RESPECTFUL_COMMUNICATION : ConversationStep.SAFETY_BUILDING,
    }));
  };

  const addSafetyStrategy = (strategy: string) => {
    setState((prev) => ({
      ...prev,
      safetyStrategies: [...prev.safetyStrategies, strategy],
    }));
  };

  const addNonviolentMessage = async (message: string) => {
    try {
      const improvedMessage = await improveNonviolentCommunication(message);
      setState((prev) => ({
        ...prev,
        nonviolentMessages: [...prev.nonviolentMessages, improvedMessage],
      }));
    } catch (error) {
      console.error('Error improving message:', error);
      setState((prev) => ({
        ...prev,
        nonviolentMessages: [...prev.nonviolentMessages, message],
      }));
    }
  };

  const getRecommendation = async () => {
    if (!state.recommendation) {
      try {
        const recommendation = await generateRecommendations(state);
        setState((prev) => ({
          ...prev,
          recommendation,
        }));
        return recommendation;
      } catch (error) {
        console.error('Error generating recommendations:', error);
        throw error;
      }
    }
    return state.recommendation;
  };

  const resetConversation = () => {
    setState(initialState);
  };

  const setGoal = (type: 'self' | 'other' | 'relationship', goal: string) => {
    setState((prev) => ({
      ...prev,
      goals: {
        ...prev.goals,
        [type]: goal,
      },
    }));
  };

  const addMessage = (msg: Message) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, msg],
    }));
  };

  const setStep = (step: number) => setState((prev) => ({ ...prev, step }));
  const setSubStep = (sub: number) => setState((prev) => ({ ...prev, subStep: sub }));

  return (
    <ConversationContext.Provider value={{
      currentStep: state.currentStep,
      setCurrentStep,
      conflictSituation: state.conflictSituation,
      setConflictSituation,
      goals: state.goals,
      setGoal,
      setSelfAwareness,
      setSafetyCheck,
      addSafetyStrategy,
      addNonviolentMessage,
      getRecommendation,
      resetConversation,
      nonviolentMessages: state.nonviolentMessages,
      messages: state.messages,
      addMessage,
      step: state.step,
      setStep,
      subStep: state.subStep,
      setSubStep,
    }}>
      {children}
    </ConversationContext.Provider>
  );
};

export { ConversationContext };