import { TypewriterText } from './TypewriterText';

interface EmotionalFeedbackProps {
  step: number;
}

export const EmotionalFeedback = ({ step }: EmotionalFeedbackProps) => {
  const getFeedback = () => {
    const feedbacks = {
      1: {
        text: "你的观察很细致，让我们继续深入了解...",
        emoji: "👀",
        animation: "fade-in"
      },
      2: {
        text: "感谢你分享这些感受，这让我更好地理解你...",
        emoji: "❤️",
        animation: "heart-beat"
      },
      3: {
        text: "你的想法很有价值，让我们继续探讨...",
        emoji: "💭",
        animation: "bounce"
      },
      4: {
        text: "这个建议很有创意，我们可以一起完善它...",
        emoji: "✨",
        animation: "sparkle"
      },
      5: {
        text: "你的分享让我收获很多，请继续说下去...",
        emoji: "🌟",
        animation: "glow"
      }
    };

    return feedbacks[step as keyof typeof feedbacks] || {
      text: "感谢你的分享，让我们继续...",
      emoji: "🙏",
      animation: "fade-in"
    };
  };

  const feedback = getFeedback();

  return (
    <div className={`emotional-feedback ${feedback.animation}`}>
      <span className="emoji">{feedback.emoji}</span>
      <TypewriterText text={feedback.text} />
    </div>
  );
}; 