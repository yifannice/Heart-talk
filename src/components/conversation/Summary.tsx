import React, { useEffect, useState } from 'react';
import { useConversation } from '../../hooks/useConversation';
import { Link } from 'react-router-dom';
import { Check, Download, RefreshCw, Loader2, Trash2 } from 'lucide-react';

const Summary: React.FC = () => {
  const { conflictSituation, goals, nonviolentMessages, getRecommendation, resetConversation } = useConversation();
  const [recommendation, setRecommendation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const result = await getRecommendation();
        setRecommendation(result);
      } catch (error) {
        console.error('Failed to fetch recommendation:', error);
        setRecommendation('无法获取建议，请稍后重试。');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendation();
  }, [getRecommendation]);

  const handleExport = () => {
    const data = {
      conflictSituation,
      goals,
      nonviolentMessages,
      recommendation,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `沟通记录_${new Date().toLocaleDateString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    if (window.confirm('确定要删除所有记录吗？此操作不可恢复。')) {
      resetConversation();
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="bg-green-100 p-2 rounded-full mr-3">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold">总结与建议</h2>
      </div>

      <p className="text-gray-600 mb-6">
        基于您提供的信息，我们已经为您生成了一个非暴力沟通表达和个性化建议。
      </p>

      <div className="space-y-6">
        <SummarySection 
          title="您的冲突情况" 
          content={conflictSituation}
        />

        <SummarySection 
          title="您的沟通目标" 
          content={
            <div className="space-y-2">
              <Goal label="自己的目标" value={goals.self} />
              <Goal label="对方的目标" value={goals.other} />
              <Goal label="关系目标" value={goals.relationship} />
            </div>
          }
        />

        <SummarySection 
          title="非暴力沟通表达" 
          content={
            nonviolentMessages.length > 0 
              ? nonviolentMessages[nonviolentMessages.length - 1]
              : "未生成非暴力沟通表达。"
          }
          highlighted
        />

        <SummarySection 
          title="个性化建议" 
          content={
            isLoading ? (
              <div className="flex items-center space-x-2 text-gray-600">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>正在生成建议...</span>
              </div>
            ) : recommendation
          }
        />
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <button 
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download size={18} className="mr-2" />
          保存结果
        </button>
        <button 
          onClick={handleDelete}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Trash2 size={18} className="mr-2" />
          删除记录
        </button>
        <button 
          onClick={resetConversation}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <RefreshCw size={18} className="mr-2" />
          重新开始
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-3">接下来怎么办？</h3>
        <p className="text-gray-600 mb-4">
          将这些建议应用到您的实际沟通中，然后回来分享效果和反馈，帮助我们改进。
        </p>
        <div className="flex space-x-4">
          <Link 
            to="/resources" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            查看更多沟通资源
          </Link>
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
};

interface SummarySectionProps {
  title: string;
  content: React.ReactNode | string;
  highlighted?: boolean;
}

const SummarySection: React.FC<SummarySectionProps> = ({ title, content, highlighted = false }) => {
  return (
    <div className={`p-4 rounded-lg ${highlighted ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'}`}>
      <h3 className={`font-medium mb-2 ${highlighted ? 'text-blue-800' : 'text-gray-800'}`}>{title}</h3>
      <div className={highlighted ? 'text-blue-700' : 'text-gray-700'}>
        {content}
      </div>
    </div>
  );
};

interface GoalProps {
  label: string;
  value: string;
}

const Goal: React.FC<GoalProps> = ({ label, value }) => {
  return (
    <div>
      <span className="text-gray-600 text-sm">{label}：</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
};

export default Summary;