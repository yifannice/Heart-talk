import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  emotion?: 'neutral' | 'happy' | 'concerned' | 'encouraging';
}

export const TypewriterText = ({ 
  text, 
  speed = 50, 
  onComplete,
  emotion = 'neutral'
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // 根据情感类型添加不同的前缀
  const getEmotionPrefix = () => {
    switch (emotion) {
      case 'happy':
        return '😊 ';
      case 'concerned':
        return '🤔 ';
      case 'encouraging':
        return '💪 ';
      default:
        return '';
    }
  };

  // 在标点符号处暂停
  const shouldPause = (char: string) => {
    return ['.', '。', '!', '！', '?', '？', '，', ','].includes(char);
  };

  useEffect(() => {
    if (currentIndex < text.length) {
      const currentChar = text[currentIndex];
      const pauseTime = shouldPause(currentChar) ? speed * 3 : speed;
      
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + currentChar);
        setCurrentIndex(prev => prev + 1);
      }, pauseTime);

      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <div className="typewriter-text">
      <span className="emotion-prefix">{getEmotionPrefix()}</span>
      {displayText}
      <span className="cursor">|</span>
    </div>
  );
}; 