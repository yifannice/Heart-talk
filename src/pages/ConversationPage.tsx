import React from 'react';
import ConversationFlow from '../components/conversation/ConversationFlow';

const ConversationPage: React.FC = () => {
  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <ConversationFlow />
      </div>
    </div>
  );
};

export default ConversationPage;