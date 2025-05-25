import React, { useState } from 'react';
import { useConversation } from '../../hooks/useConversation';
import { GoalType } from '../../types/conversation';
import { Target, Users, Heart } from 'lucide-react';
import { ConversationStep } from '../../types/conversation';

const GoalSetting: React.FC = () => {
  const { goals, setGoal, setCurrentStep } = useConversation();
  const [localGoals, setLocalGoals] = useState({
    self: goals.self,
    other: goals.other,
    relationship: goals.relationship,
  });

  const handleSubmit = (type: GoalType) => (e: React.FormEvent) => {
    e.preventDefault();
    if (localGoals[type].trim().length < 5) return;
    setGoal(type, localGoals[type]);
  };

  const GoalIcon = ({ type }: { type: GoalType }) => {
    switch (type) {
      case 'self':
        return <Target className="h-6 w-6 text-blue-500" />;
      case 'other':
        return <Users className="h-6 w-6 text-green-500" />;
      case 'relationship':
        return <Heart className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  const goalSettings = [
    {
      type: 'self' as GoalType,
      title: '对自己的目标',
      description: '在这次对话中，您希望为自己实现什么目标？',
      placeholder: '例如：我希望能够表达我的感受而不被打断',
      completed: !!goals.self,
    },
    {
      type: 'other' as GoalType,
      title: '对对方的目标',
      description: '您希望为对方实现什么目标？',
      placeholder: '例如：我希望对方能理解我的压力和需求',
      completed: !!goals.other,
    },
    {
      type: 'relationship' as GoalType,
      title: '对关系的目标',
      description: '您希望为你们的关系实现什么目标？',
      placeholder: '例如：建立更公平的家务分配方式，减少这方面的冲突',
      completed: !!goals.relationship,
    },
  ];

  const allGoalsCompleted = goalSettings.every(goal => goal.completed);

  const handleContinue = () => {
    setCurrentStep(ConversationStep.SAFETY_BUILDING);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">明确您的沟通目标</h2>
      <p className="text-gray-600 mb-6">
        明确沟通目标是有效对话的关键。请思考您在以下三个方面希望达成的目标：
      </p>

      <div className="space-y-8">
        {goalSettings.map((goal) => (
          <div 
            key={goal.type} 
            className={`p-6 rounded-lg border ${
              goal.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center mb-4">
              <GoalIcon type={goal.type} />
              <h3 className="text-xl font-medium ml-2">{goal.title}</h3>
              {goal.completed && (
                <span className="ml-auto bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  已完成
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-4">{goal.description}</p>
            
            {goal.completed ? (
              <div className="bg-white p-4 rounded border border-gray-200">
                <p className="text-gray-800">{goals[goal.type]}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(goal.type)}>
                <div className="mb-4">
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={goal.placeholder}
                    value={localGoals[goal.type]}
                    onChange={(e) => setLocalGoals({ ...localGoals, [goal.type]: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={localGoals[goal.type].trim().length < 5}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    localGoals[goal.type].trim().length < 5
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  保存
                </button>
              </form>
            )}
          </div>
        ))}
      </div>

      {allGoalsCompleted && (
        <div className="mt-8">
          <button
            onClick={handleContinue}
            className="w-full py-3 px-4 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            继续下一步
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalSetting;