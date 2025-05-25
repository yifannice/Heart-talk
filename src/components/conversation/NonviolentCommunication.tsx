import React, { useState } from 'react';
import { useConversation } from '../../hooks/useConversation';
import { Eye, Heart, PieChart, MessageSquare, HelpCircle, ArrowRight } from 'lucide-react';
import { ConversationStep } from '../../types/conversation';

type FormField = 'observation' | 'feeling' | 'need' | 'request';
type FormData = Record<FormField, string>;
type Examples = Record<FormField, boolean>;

const NonviolentCommunication: React.FC = () => {
  const { addNonviolentMessage, setCurrentStep } = useConversation();
  const [formData, setFormData] = useState<FormData>({
    observation: '',
    feeling: '',
    need: '',
    request: '',
  });
  const [examples, setExamples] = useState<Examples>({
    observation: false,
    feeling: false,
    need: false,
    request: false,
  });

  const handleChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleExample = (field: FormField) => {
    setExamples((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nvcMessage = `当${formData.observation}（观察），我感到${formData.feeling}（感受），因为我需要${formData.need}（需要）。你是否愿意${formData.request}（请求）？`;
    
    addNonviolentMessage(nvcMessage);
    setCurrentStep(ConversationStep.SUMMARY_RECOMMENDATIONS);
  };

  const isFormValid = () => {
    return (
      formData.observation.trim().length > 0 &&
      formData.feeling.trim().length > 0 &&
      formData.need.trim().length > 0 &&
      formData.request.trim().length > 0
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">非暴力沟通表达</h2>
      <p className="text-gray-600 mb-6">
        非暴力沟通由四个要素组成：观察、感受、需要和请求。请根据您的情况填写以下内容，构建一个非暴力沟通的表达。
      </p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <NvcField
            icon={<Eye className="text-blue-500" />}
            label="观察"
            description="描述具体的事实，避免评价和判断"
            field="observation"
            value={formData.observation}
            onChange={handleChange}
            showExample={examples.observation}
            toggleExample={() => toggleExample('observation')}
            exampleText="我看到盘子在水槽里放了两天"
            placeholder="例如：当我看到..."
          />

          <NvcField
            icon={<Heart className="text-red-500" />}
            label="感受"
            description="表达您的情绪，而非想法"
            field="feeling"
            value={formData.feeling}
            onChange={handleChange}
            showExample={examples.feeling}
            toggleExample={() => toggleExample('feeling')}
            exampleText="我感到失望和沮丧"
            placeholder="例如：我感到..."
          />

          <NvcField
            icon={<PieChart className="text-green-500" />}
            label="需要"
            description="说明这种感受源于什么需要"
            field="need"
            value={formData.need}
            onChange={handleChange}
            showExample={examples.need}
            toggleExample={() => toggleExample('need')}
            exampleText="我需要一个整洁的生活环境和对家务分工的认可"
            placeholder="例如：因为我需要..."
          />

          <NvcField
            icon={<MessageSquare className="text-purple-500" />}
            label="请求"
            description="提出明确、具体、可行的请求"
            field="request"
            value={formData.request}
            onChange={handleChange}
            showExample={examples.request}
            toggleExample={() => toggleExample('request')}
            exampleText="你能在用完餐具后立即清洗它们吗？"
            placeholder="例如：你是否愿意..."
          />
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              !isFormValid()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            生成非暴力沟通表达
          </button>
        </div>
      </form>

      {/* Preview of the constructed message */}
      {isFormValid() && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2">预览您的非暴力沟通表达：</h3>
          <p className="text-gray-800">
            当{formData.observation}（观察），我感到{formData.feeling}（感受），因为我需要{formData.need}（需要）。你是否愿意{formData.request}（请求）？
          </p>
        </div>
      )}
    </div>
  );
};

interface NvcFieldProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  field: FormField;
  value: string;
  onChange: (field: FormField, value: string) => void;
  showExample: boolean;
  toggleExample: () => void;
  exampleText: string;
  placeholder: string;
}

const NvcField: React.FC<NvcFieldProps> = ({
  icon,
  label,
  description,
  field,
  value,
  onChange,
  showExample,
  toggleExample,
  exampleText,
  placeholder,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center mb-3">
        <div className="mr-2">{icon}</div>
        <h3 className="font-medium text-lg">{label}</h3>
      </div>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <label htmlFor={field} className="text-sm font-medium text-gray-700">
            您的{label}
          </label>
          <button
            type="button"
            onClick={toggleExample}
            className="flex items-center text-xs text-blue-600 hover:text-blue-800"
          >
            <HelpCircle size={14} className="mr-1" />
            {showExample ? '隐藏示例' : '查看示例'}
          </button>
        </div>
        
        {showExample && (
          <div className="bg-blue-50 p-3 rounded-lg mb-3 flex items-start">
            <div className="bg-blue-100 p-1 rounded mr-2 mt-0.5">
              <ArrowRight size={14} className="text-blue-700" />
            </div>
            <p className="text-sm text-blue-700">{exampleText}</p>
          </div>
        )}
        
        <input
          type="text"
          id={field}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default NonviolentCommunication;