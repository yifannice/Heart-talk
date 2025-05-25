import React from 'react';
import ConversationFlow from '../components/conversation/ConversationFlow';
import ProcessFlow from '../components/conversation/ProcessFlow';

const ConversationPage: React.FC = () => {
  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          {/* 左侧流程图 */}
          <div className="hidden lg:block">
            <ProcessFlow />
          </div>
          
          {/* 右侧对话内容 */}
          <div className="flex-1">
            <ConversationFlow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;