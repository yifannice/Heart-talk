import React from 'react';

interface ChatBubbleProps {
  role: 'ai' | 'user';
  content: string;
  typing?: boolean; // 是否显示打字机动画
  onTypingEnd?: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ role, content, typing, onTypingEnd }) => {
  // 简单打字机效果（可用第三方库替换）
  const [displayed, setDisplayed] = React.useState(typing ? '' : content);

  React.useEffect(() => {
    if (!typing) {
      setDisplayed(content);
      return;
    }
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + content[i]);
      i++;
      if (i >= content.length) {
        clearInterval(interval);
        if (onTypingEnd) onTypingEnd();
      }
    }, 24);
    return () => clearInterval(interval);
  }, [content, typing, onTypingEnd]);

  return (
    <div className={`flex ${role === 'ai' ? 'justify-start' : 'justify-end'} mb-6`}>
      <div
        className={`max-w-[90%] px-6 py-4 rounded-3xl shadow-lg text-lg whitespace-pre-line break-words
          ${role === 'ai' ? 'bg-blue-50 text-blue-900 rounded-bl-2xl' : 'bg-green-100 text-green-900 rounded-br-2xl'}`}
        style={{
          minWidth: '220px',
          fontSize: '1.4rem',
          lineHeight: 1.8,
          boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
        }}
      >
        {displayed}
        {typing && displayed.length < content.length && <span className="animate-blink">|</span>}
      </div>
    </div>
  );
};

export default ChatBubble;