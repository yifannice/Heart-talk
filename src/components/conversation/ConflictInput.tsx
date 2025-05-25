import React, { useState } from 'react';
import { useConversation } from '../../hooks/useConversation';
import { MessageSquare, Loader2 } from 'lucide-react';

const ConflictInput: React.FC = () => {
  const { setConflictSituation } = useConversation();
  const [conflict, setConflict] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (conflict.trim().length < 10) return;
    
    setIsSubmitting(true);
    try {
      await setConflictSituation(conflict);
    } catch (error) {
      console.error('Error submitting conflict:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">描述您的冲突情况</h2>
      <p className="text-gray-600 mb-6">
        请详细描述您在亲密关系中遇到的冲突或困难沟通情况。越详细越好，这将帮助我们提供更有针对性的建议。
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="conflict" className="block text-sm font-medium text-gray-700 mb-2">
            冲突描述
          </label>
          <textarea
            id="conflict"
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="例如：我和伴侣在决定如何分配家务时总是起冲突。每当我提出他应该多做一些家务时，他就会说我太挑剔，而我感到自己的贡献没有得到认可..."
            value={conflict}
            onChange={(e) => setConflict(e.target.value)}
            disabled={isSubmitting}
            required
          ></textarea>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <MessageSquare className="text-blue-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">提示</h3>
              <p className="text-sm text-blue-600 mt-1">
                在描述中尝试包含以下信息：事件经过、您的感受、对方的反应、您希望达成的结果。避免过度使用评价性语言。
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={conflict.trim().length < 10 || isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            conflict.trim().length < 10 || isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
              处理中...
            </span>
          ) : (
            '继续'
          )}
        </button>
      </form>
    </div>
  );
};

export default ConflictInput;