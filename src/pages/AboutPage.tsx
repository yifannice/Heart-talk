import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 mt-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">关于我们</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">我们的使命</h2>
          <p className="text-gray-600 leading-relaxed">
            关键对话助手致力于帮助人们提升沟通能力，让每一次关键对话都能成为关系升级的跳板。我们相信，通过科学的沟通方法和AI技术的结合，可以帮助更多人建立更健康、更和谐的人际关系。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">我们的方法</h2>
          <p className="text-gray-600 leading-relaxed">
            基于《关键对话》和《非暴力沟通》等经典理论，我们开发了一套简单易用的对话诊断和指导系统。通过AI技术，我们能够实时分析对话情境，提供个性化的沟通建议，帮助用户更好地表达自己，理解他人。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">我们的愿景</h2>
          <p className="text-gray-600 leading-relaxed">
            我们希望成为每个人沟通路上的得力助手，让沟通不再成为人际关系的障碍，而是成为建立信任、增进理解的桥梁。通过我们的努力，让更多人能够自信地面对每一次关键对话。
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 