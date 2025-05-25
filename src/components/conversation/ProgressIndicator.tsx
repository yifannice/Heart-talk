import React from 'react';
import { ConversationStep } from '../../types/conversation';

interface ProgressIndicatorProps {
  currentStep: ConversationStep;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: ConversationStep.SELF_AWARENESS, label: '关爱自己' },
    { id: ConversationStep.SAFETY_CHECK, label: '安全检查' },
    { id: ConversationStep.SAFETY_BUILDING, label: '建立安全' },
    { id: ConversationStep.RESPECTFUL_COMMUNICATION, label: '非暴力沟通' },
    { id: ConversationStep.SUMMARY_RECOMMENDATIONS, label: '总结建议' },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep);
  };

  return (
    <div className="mb-8">
      <div className="hidden md:flex justify-between">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = getCurrentStepIndex() > index;
          
          return (
            <div key={step.id} className="flex flex-col items-center w-1/5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`text-sm text-center ${
                  isActive ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>

              {/* Line connector */}
              {index < steps.length - 1 && (
                <div className="absolute left-0 right-0" style={{ top: '1.25rem' }}>
                  <div
                    className={`h-0.5 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    } transition-colors`}
                    style={{
                      width: '100%',
                      marginLeft: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile version */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">步骤 {getCurrentStepIndex() + 1} / {steps.length}</span>
          <span className="text-sm font-medium text-blue-600">
            {steps[getCurrentStepIndex()]?.label}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((getCurrentStepIndex() + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;