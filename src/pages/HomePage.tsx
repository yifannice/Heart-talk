import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Heart, Zap, Lightbulb } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI亲密关系|困难冲突|沟通解决助手
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            基于《关键对话》和《非暴力沟通》理论，帮助您解决亲密关系中的冲突
          </p>
          <Link
            to="/conversation"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-50 transition-colors duration-300 transform hover:scale-105"
          >
            开始对话
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">如何帮助您</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-blue-500" />}
              title="分析沟通风格"
              description="识别您的对话中的高风险点、情绪变化和观点差异，帮助您找到突破口。"
            />
            <FeatureCard
              icon={<Heart className="h-10 w-10 text-red-500" />}
              title="明确沟通目标"
              description="引导您思考对自己、对方和关系的目标，确保对话朝着积极方向发展。"
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-yellow-500" />}
              title="提供表达框架"
              description="五步综合陈述法帮助您组织思路，有效表达自己的观点和感受。"
            />
            <FeatureCard
              icon={<Lightbulb className="h-10 w-10 text-green-500" />}
              title="非暴力表达转换"
              description="将评价性语言转换为客观描述，增强沟通效果，减少误解。"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">如何使用</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-10">
              <StepItem
                number={1}
                title="描述您的冲突情况"
                description="输入您遇到的具体冲突情况，越详细越好，包括背景、事件经过和您的感受。"
              />
              <StepItem
                number={2}
                title="回答引导性问题"
                description="AI助手会提出一系列问题，帮助您明确沟通目标，思考对自己、对方和关系的期望。"
              />
              <StepItem
                number={3}
                title="获取表达建议"
                description="根据您的输入，AI助手会为您提供非暴力沟通的表达方式和综合陈述的框架。"
              />
              <StepItem
                number={4}
                title="实践并提供反馈"
                description="将建议应用到实际沟通中，并回来分享效果和提供反馈，帮助系统不断改进。"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">准备好改善您的沟通了吗？</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            立即开始使用AI沟通助手，解决亲密关系中的沟通难题。
          </p>
          <Link
            to="/conversation"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-50 transition-colors duration-300"
          >
            开始对话
          </Link>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface StepItemProps {
  number: number;
  title: string;
  description: string;
}

const StepItem: React.FC<StepItemProps> = ({ number, title, description }) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default HomePage;