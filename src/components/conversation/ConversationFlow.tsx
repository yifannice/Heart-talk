import React, { useState } from 'react';
import DiagnosisForm, { DiagnosisData } from './DiagnosisForm';
import StateTemplate from './StateTemplate';
import SafetyMonitor from './SafetyMonitor';
import { analyzeEmotion, generateDialogueSuggestions, generatePersonalizedTemplate } from '../../services/aiService';

interface DialogueSuggestion {
  riskLevel: 'high' | 'medium' | 'low';
  strategyTags: string[];
  suggestions: string[];
}

const ConversationFlow: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'diagnosis' | 'template' | 'monitor'>('diagnosis');
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData | null>(null);
  const [template, setTemplate] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string>('');
  const [aiSuggestions, setAiSuggestions] = useState<DialogueSuggestion | null>(null);
  const [emotionAnalysis, setEmotionAnalysis] = useState<{sentiment: string; intensity: number} | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleDiagnosisComplete = async (data: DiagnosisData) => {
    setDiagnosisData(data);
    try {
      setIsLoading(true);
      setShowSuggestions(false);
      const suggestions = await generateDialogueSuggestions(data);
      console.log('设置AI建议:', suggestions);
      setAiSuggestions(suggestions);
      setTimeout(() => setShowSuggestions(true), 100);
    } catch (error) {
      console.error('获取AI建议失败:', error);
      setAiSuggestions({
        riskLevel: 'medium',
        strategyTags: ['情绪安抚优先', '事实导向沟通'],
        suggestions: [
          '建议使用更温和的表达方式',
          '注意倾听对方的观点',
          '保持开放和尊重的态度'
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateComplete = async (generatedTemplate: string) => {
    if (diagnosisData) {
      try {
        setIsLoading(true);
        setShowSuggestions(false);
        const personalizedTemplate = await generatePersonalizedTemplate(diagnosisData, generatedTemplate);
        setTemplate(personalizedTemplate.template);
        setTimeout(() => setShowSuggestions(true), 100);
      } catch (error) {
        setTemplate(generatedTemplate);
        console.error('生成个性化模板失败:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setTemplate(generatedTemplate);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    
    if (text.trim().length > 0) {
      try {
        setIsLoading(true);
        setShowSuggestions(false);
        const analysis = await analyzeEmotion(text);
        setEmotionAnalysis({
          sentiment: analysis.sentiment,
          intensity: analysis.intensity
        });
        if (analysis.suggestions.length > 0) {
          setSuggestion(analysis.suggestions[0]);
        }
        setTimeout(() => setShowSuggestions(true), 100);
      } catch (error) {
        console.error('情感分析失败:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderLoadingSpinner = () => (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      <span className="ml-3 text-purple-600">AI正在思考中...</span>
    </div>
  );

  const renderSuggestions = (suggestions: DialogueSuggestion) => (
    <div className={`bg-purple-50 p-6 rounded-2xl shadow-lg transition-all duration-500 transform ${
      showSuggestions ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
    }`}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-purple-800">风险评级</h3>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
            suggestions.riskLevel === 'high' 
              ? 'bg-red-100 text-red-700'
              : suggestions.riskLevel === 'medium'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-green-100 text-green-700'
          }`}>
            {suggestions.riskLevel === 'high' ? '高风险' : suggestions.riskLevel === 'medium' ? '中风险' : '低风险'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.strategyTags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <h3 className="text-lg font-medium text-purple-800 mb-4">具体建议</h3>
      <ul className="space-y-3">
        {suggestions.suggestions.map((suggestion, index) => (
          <li key={index} className="text-purple-700 bg-white p-3 rounded-lg shadow-sm">
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderModule = () => {
    switch (activeModule) {
      case 'diagnosis':
        return (
          <div className="space-y-6">
            <DiagnosisForm onSubmit={handleDiagnosisComplete} />
            {isLoading ? renderLoadingSpinner() : aiSuggestions && renderSuggestions(aiSuggestions)}
          </div>
        );
      case 'template':
        return (
          <div className="space-y-6">
            <StateTemplate onComplete={handleTemplateComplete} />
            {isLoading ? renderLoadingSpinner() : template && (
              <div className={`bg-purple-50 p-6 rounded-2xl shadow-lg transition-all duration-500 transform ${
                showSuggestions ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}>
                <h3 className="text-lg font-medium text-purple-800 mb-4">生成的STATE模板</h3>
                <pre className="whitespace-pre-wrap bg-white p-4 rounded-lg shadow-sm text-purple-700">
                  {template}
                </pre>
              </div>
            )}
          </div>
        );
      case 'monitor':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">实时安全感监测</h2>
              <textarea
                value={inputText}
                onChange={handleInputChange}
                placeholder="请输入你要表达的内容..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={6}
              />
              <SafetyMonitor text={inputText} onSuggestion={setSuggestion} />
              {isLoading ? renderLoadingSpinner() : emotionAnalysis && (
                <div className={`mt-4 p-4 bg-purple-50 rounded-lg transition-all duration-500 transform ${
                  showSuggestions ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}>
                  <h3 className="text-sm font-medium text-purple-700 mb-2">情感分析</h3>
                  <p className="text-sm text-purple-600">
                    情感倾向: {emotionAnalysis.sentiment === 'positive' ? '积极' : 
                             emotionAnalysis.sentiment === 'negative' ? '消极' : '中性'}
                  </p>
                  <p className="text-sm text-purple-600">
                    强度: {emotionAnalysis.intensity * 100}%
                  </p>
                </div>
              )}
            </div>

            {suggestion && (
              <div className={`bg-purple-50 p-6 rounded-2xl shadow-lg transition-all duration-500 transform ${
                showSuggestions ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}>
                <h3 className="text-lg font-medium text-purple-800 mb-4">改进建议</h3>
                <p className="text-purple-700 bg-white p-3 rounded-lg shadow-sm">{suggestion}</p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => setActiveModule('diagnosis')}
          className={`p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
            activeModule === 'diagnosis'
              ? 'bg-purple-500 text-white'
              : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
          }`}
        >
          <h3 className="text-xl font-bold mb-2">对话诊断</h3>
          <p className="text-sm opacity-90">通过5步极简问诊，快速识别对话情境和风险级别</p>
        </button>

        <button
          onClick={() => setActiveModule('template')}
          className={`p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
            activeModule === 'template'
              ? 'bg-purple-500 text-white'
              : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
          }`}
        >
          <h3 className="text-xl font-bold mb-2">STATE五步法</h3>
          <p className="text-sm opacity-90">基于STATE方法，生成结构化的表达模板</p>
        </button>

        <button
          onClick={() => setActiveModule('monitor')}
          className={`p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
            activeModule === 'monitor'
              ? 'bg-purple-500 text-white'
              : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
          }`}
        >
          <h3 className="text-xl font-bold mb-2">安全诊断</h3>
          <p className="text-sm opacity-90">实时监测表达方式，提供改进建议</p>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300">
        {renderModule()}
      </div>
    </div>
  );
};

export default ConversationFlow;
