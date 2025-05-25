import React, { useState } from 'react';
import { useConversation } from '../../hooks/useConversation';
import { frameworkSteps } from '../../types/conversation';
import { CheckCircle2, ChevronRight, ChevronDown } from 'lucide-react';
import { ConversationStep } from '../../types/conversation';

const FrameworkGuidance: React.FC = () => {
  const { setCurrentStep } = useConversation();
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const markAsCompleted = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const handleContinue = () => {
    setCurrentStep('nonviolent_communication' as ConversationStep);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">五步表达框架</h2>
      <p className="text-gray-600 mb-6">
        以下是一个有效的五步沟通框架，可以帮助您在冲突情况下更清晰地表达自己。请展开每一步了解详情，并思考如何将其应用到您的情境中。
      </p>

      <div className="space-y-4 mb-8">
        {frameworkSteps.map((step) => (
          <div 
            key={step.id} 
            className={`border rounded-lg transition-all duration-200 ${
              completedSteps.includes(step.id) 
                ? 'border-green-200 bg-green-50' 
                : expandedStep === step.id
                ? 'border-blue-200 bg-blue-50'
                : 'border-gray-200'
            }`}
          >
            <button
              onClick={() => toggleStep(step.id)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 text-white ${
                  completedSteps.includes(step.id) ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  {completedSteps.includes(step.id) ? <CheckCircle2 size={16} /> : step.id}
                </span>
                <span className="font-medium">{step.title}</span>
              </div>
              {expandedStep === step.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            
            {expandedStep === step.id && (
              <div className="p-4 pt-0 border-t border-gray-200">
                <p className="text-gray-600 mb-4">{step.description}</p>
                <div className="bg-white p-3 rounded border border-gray-200 mb-4">
                  <p className="text-gray-800 text-sm italic">"{step.example}"</p>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => markAsCompleted(step.id)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      completedSteps.includes(step.id)
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {completedSteps.includes(step.id) ? '已完成' : '标记为已理解'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={handleContinue}
          disabled={completedSteps.length < frameworkSteps.length}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            completedSteps.length < frameworkSteps.length
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          继续下一步
        </button>
        {completedSteps.length < frameworkSteps.length && (
          <p className="text-sm text-gray-500 mt-2 text-center">
            请先理解并标记所有步骤
          </p>
        )}
      </div>
    </div>
  );
};

export default FrameworkGuidance;