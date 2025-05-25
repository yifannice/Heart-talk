import React from 'react';
import { useConversation } from '../../hooks/useConversation';
import { Brain, Target, Shield, MessageSquare, AlertTriangle } from 'lucide-react';

const ProcessFlow: React.FC = () => {
  const { step } = useConversation();

  const steps = [
    {
      id: 0,
      title: '自我觉察',
      icon: Brain,
      description: '理解自己的情绪和需求'
    },
    {
      id: 1,
      title: '明确目标',
      icon: Target,
      description: '设定清晰的沟通目标'
    },
    {
      id: 2,
      title: '构建安全',
      icon: Shield,
      description: '创造安全的对话环境'
    },
    {
      id: 3,
      title: 'STATE沟通五步法',
      icon: MessageSquare,
      description: '使用结构化沟通方法'
    },
    {
      id: 4,
      title: '冲突处理',
      icon: AlertTriangle,
      description: '有效处理冲突情况'
    }
  ];

  return (
    <div className="w-64 bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">沟通流程</h3>
      <div className="space-y-6">
        {steps.map((item, index) => {
          const Icon = item.icon;
          const isActive = step === item.id;
          const isCompleted = step > item.id;

          return (
            <div key={item.id} className="relative">
              {/* 连接线 */}
              {index < steps.length - 1 && (
                <div 
                  className={`absolute left-6 top-12 w-0.5 h-16 ${
                    isCompleted ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              )}
              
              {/* 步骤内容 */}
              <div 
                className={`flex items-start space-x-4 p-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-50 border border-blue-200' 
                    : isCompleted 
                    ? 'bg-gray-50' 
                    : 'hover:bg-gray-50'
                }`}
              >
                {/* 图标 */}
                <div 
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-500 text-white' 
                      : isCompleted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Icon size={24} />
                </div>
                
                {/* 文字内容 */}
                <div className="flex-1">
                  <h4 
                    className={`font-medium transition-colors duration-300 ${
                      isActive 
                        ? 'text-blue-700' 
                        : isCompleted 
                        ? 'text-gray-700' 
                        : 'text-gray-500'
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p 
                    className={`text-sm transition-colors duration-300 ${
                      isActive 
                        ? 'text-blue-600' 
                        : isCompleted 
                        ? 'text-gray-600' 
                        : 'text-gray-400'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessFlow; 