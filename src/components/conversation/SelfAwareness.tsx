import React, { useState } from 'react';
import { useConversation } from '../../hooks/useConversation';
import { Heart, Shield, MessageCircle } from 'lucide-react';

const SelfAwareness: React.FC = () => {
  const { setSelfAwareness } = useConversation();
  const [formData, setFormData] = useState({
    emotions: '',
    needs: '',
    selfComfort: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      await setSelfAwareness(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.emotions.trim().length > 0 &&
      formData.needs.trim().length > 0 &&
      formData.selfComfort.trim().length > 0
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">关爱自己的时刻</h2>
      <p className="text-gray-600 mb-6">
        在开始对话之前，让我们先关注自己的内心。理解并接纳自己的感受，是有效沟通的第一步。
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center mb-4">
            <Heart className="h-6 w-6 text-red-500 mr-2" />
            <h3 className="text-lg font-medium">当下的感受</h3>
          </div>
          <textarea
            value={formData.emotions}
            onChange={(e) => setFormData(prev => ({ ...prev, emotions: e.target.value }))}
            placeholder="此刻你感受到什么情绪？比如：焦虑、委屈、愤怒、失望..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            required
          />
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-medium">内心的需要</h3>
          </div>
          <textarea
            value={formData.needs}
            onChange={(e) => setFormData(prev => ({ ...prev, needs: e.target.value }))}
            placeholder="你内心真正需要什么？比如：被理解、被尊重、得到支持..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            required
          />
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center mb-4">
            <MessageCircle className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="text-lg font-medium">自我安慰</h3>
          </div>
          <textarea
            value={formData.selfComfort}
            onChange={(e) => setFormData(prev => ({ ...prev, selfComfort: e.target.value }))}
            placeholder="如果此刻能对自己说些什么暖心的话，你想说什么？"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            required
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid() || isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            !isFormValid() || isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          继续
        </button>
      </form>
    </div>
  );
};

export default SelfAwareness;