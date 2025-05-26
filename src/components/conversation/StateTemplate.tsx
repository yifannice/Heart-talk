import React, { useState } from 'react';

interface StateTemplateProps {
  onComplete: (template: string) => void;
}

interface TemplateData {
  facts: string;
  thoughts: string;
  askForOpinion: string;
  tentativeTalk: string;
  encourageTesting: string;
}

const StateTemplate: React.FC<StateTemplateProps> = ({ onComplete }) => {
  const [data, setData] = useState<TemplateData>({
    facts: '',
    thoughts: '',
    askForOpinion: '',
    tentativeTalk: '',
    encourageTesting: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const template = generateTemplate(data);
    onComplete(template);
  };

  const generateTemplate = (data: TemplateData): string => {
    return `【分享事实经过】
${data.facts}

【说出你的想法】
${data.thoughts}

【征询对方观点】
${data.askForOpinion}

【试探性表述】
${data.tentativeTalk}

【鼓励对方表达不同观点】
${data.encourageTesting}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">STATE模板生成器</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            分享事实经过
          </label>
          <textarea
            value={data.facts}
            onChange={(e) => setData({ ...data, facts: e.target.value })}
            placeholder="请描述具体的时间、地点、行为或数据，避免使用主观判断词..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            rows={3}
          />
          <p className="mt-1 text-base text-gray-500">
            提示：使用客观事实，如"过去一周内，你三次未按时提交报告"
          </p>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            说出你的想法
          </label>
          <textarea
            value={data.thoughts}
            onChange={(e) => setData({ ...data, thoughts: e.target.value })}
            placeholder='请使用"我觉得"、"我认为"等软化语气表达观点...'
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            rows={3}
          />
          <p className="mt-1 text-base text-gray-500">
            提示：使用"我觉得"、"我认为"等表达方式，避免指责性语言
          </p>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            征询对方观点
          </label>
          <textarea
            value={data.askForOpinion}
            onChange={(e) => setData({ ...data, askForOpinion: e.target.value })}
            placeholder="请提出开放式问题，邀请对方表达看法..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            rows={3}
          />
          <p className="mt-1 text-base text-gray-500">
            提示：使用"你如何看待这个问题？"等开放式问题
          </p>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            试探性表述
          </label>
          <textarea
            value={data.tentativeTalk}
            onChange={(e) => setData({ ...data, tentativeTalk: e.target.value })}
            placeholder='请使用"可能"、"或许"等试探性措辞...'
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            rows={3}
          />
          <p className="mt-1 text-base text-gray-500">
            提示：使用"可能"、"或许"等词汇，避免断言式结论
          </p>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            鼓励对方表达不同观点
          </label>
          <textarea
            value={data.encourageTesting}
            onChange={(e) => setData({ ...data, encourageTesting: e.target.value })}
            placeholder="请表达对不同意见的接纳，强调共同目标..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            rows={3}
          />
          <p className="mt-1 text-base text-gray-500">
            提示：表达对不同意见的接纳，强调共同目标
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-medium"
          >
            生成模板
          </button>
        </div>
      </form>
    </div>
  );
};

export default StateTemplate; 