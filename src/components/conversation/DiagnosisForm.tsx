import React, { useState } from 'react';

export interface DiagnosisData {
  relationshipType: string;
  conflictLevel: number;
  emotionalIntensity: number;
  coreGoal: string;
  interestConflict: boolean;
}

interface DiagnosisFormProps {
  onSubmit: (data: DiagnosisData) => void;
}

const DiagnosisForm: React.FC<DiagnosisFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<DiagnosisData>({
    relationshipType: '',
    conflictLevel: 3,
    emotionalIntensity: 3,
    coreGoal: '',
    interestConflict: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          关系类型
        </label>
        <select
          value={formData.relationshipType}
          onChange={(e) => setFormData({ ...formData, relationshipType: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
          required
        >
          <option value="">请选择关系类型</option>
          <option value="family">家人关系</option>
          <option value="workplace">职场关系</option>
          <option value="friends">朋友关系</option>
        </select>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          争议程度
        </label>
        <div className="relative">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <span key={num} className="text-sm text-purple-700">{num}</span>
            ))}
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={formData.conflictLevel}
            onChange={(e) => setFormData({ ...formData, conflictLevel: parseInt(e.target.value) })}
            className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-purple-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
          />
          <div className="flex justify-between mt-1">
            <span className="text-gray-600">轻微分歧</span>
            <span className="text-gray-600">严重冲突</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          情绪强度
        </label>
        <div className="relative">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <span key={num} className="text-sm text-purple-700">{num}</span>
            ))}
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={formData.emotionalIntensity}
            onChange={(e) => setFormData({ ...formData, emotionalIntensity: parseInt(e.target.value) })}
            className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-purple-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
          />
          <div className="flex justify-between mt-1">
            <span className="text-gray-600">平静</span>
            <span className="text-gray-600">激烈</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          核心目标
        </label>
        <select
          value={formData.coreGoal}
          onChange={(e) => setFormData({ ...formData, coreGoal: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
          required
        >
          <option value="">请选择核心目标</option>
          <option value="repair">修复关系</option>
          <option value="consensus">达成共识</option>
          <option value="refuse">拒绝请求</option>
        </select>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          是否存在利益冲突
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              checked={formData.interestConflict === true}
              onChange={() => setFormData({ ...formData, interestConflict: true })}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-lg">是</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={formData.interestConflict === false}
              onChange={() => setFormData({ ...formData, interestConflict: false })}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-lg">否</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-lg font-medium"
        >
          完成诊断
        </button>
      </div>
    </form>
  );
};

export default DiagnosisForm; 