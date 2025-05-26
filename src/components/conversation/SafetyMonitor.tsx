import React, { useState, useEffect } from 'react';

interface SafetyMonitorProps {
  text: string;
  onSuggestion: (suggestion: string) => void;
}

interface SafetyRule {
  pattern: RegExp;
  suggestion: string;
  level: 'warning' | 'danger';
}

const safetyRules: SafetyRule[] = [
  {
    pattern: /你总是|你从不|你永远/,
    suggestion: '建议改为具体的时间和行为描述，例如："我注意到最近三次..."',
    level: 'warning'
  },
  {
    pattern: /你必须|你应该|你最好/,
    suggestion: '建议改为表达期望或建议，例如："我希望..."或"我建议..."',
    level: 'warning'
  },
  {
    pattern: /你错了|你不对|你搞错了/,
    suggestion: '建议改为分享你的观点，例如："我的理解是..."或"我认为..."',
    level: 'warning'
  },
  {
    pattern: /你太|你真是|你简直/,
    suggestion: '建议改为描述具体行为，避免使用评价性语言',
    level: 'warning'
  },
  {
    pattern: /你懂什么|你明白什么|你知道什么/,
    suggestion: '建议改为询问对方观点，例如："我想听听你的想法..."',
    level: 'danger'
  },
  {
    pattern: /你滚|你走开|你闭嘴/,
    suggestion: '建议先冷静下来，使用更尊重的表达方式',
    level: 'danger'
  }
];

const SafetyMonitor: React.FC<SafetyMonitorProps> = ({ text, onSuggestion }) => {
  const [warnings, setWarnings] = useState<SafetyRule[]>([]);

  useEffect(() => {
    const newWarnings = safetyRules.filter(rule => rule.pattern.test(text));
    setWarnings(newWarnings);

    if (newWarnings.length > 0) {
      const highestLevelWarning = newWarnings.reduce((prev, current) => {
        return current.level === 'danger' ? current : prev;
      }, newWarnings[0]);
      onSuggestion(highestLevelWarning.suggestion);
    } else {
      onSuggestion('');
    }
  }, [text, onSuggestion]);

  if (warnings.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4 rounded-lg border border-yellow-200 bg-yellow-50">
      <h3 className="text-sm font-medium text-yellow-800 mb-2">
        检测到可能影响对话安全感的表达
      </h3>
      <ul className="space-y-2">
        {warnings.map((warning, index) => (
          <li
            key={index}
            className={`text-sm ${
              warning.level === 'danger' ? 'text-red-600' : 'text-yellow-600'
            }`}
          >
            {warning.suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SafetyMonitor; 