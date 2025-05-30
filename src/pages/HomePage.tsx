import React, { lazy, Suspense, memo } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Heart, Zap, Brain, Shield, Target } from 'lucide-react';

// 懒加载非关键组件
const PainPointCard = lazy(() => import('../components/PainPointCard').then(module => ({ default: module.default })));
const FeatureCard = lazy(() => import('../components/FeatureCard').then(module => ({ default: module.default })));
const BenefitCard = lazy(() => import('../components/BenefitCard').then(module => ({ default: module.default })));

// 优化Hero部分的渲染
const HeroSection = memo(() => (
  <section className="hero-section hero-optimized bg-gradient-to-r from-purple-600 to-purple-400 text-white py-20">
    <div className="container hero-content mx-auto px-4 text-center">
      <h1 className="hero-title text-3xl md:text-4xl font-bold mb-6">
        让每一次关键对话，都成为关系升级的跳板
      </h1>
      <p className="hero-text lcp-text text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
        基于《关键对话》理论，3分钟诊断对话风险，AI智能生成高情商话术，让高难度沟通不再翻车
      </p>
      <Link
        to="/conversation"
        className="cta-button inline-block bg-white text-purple-600 font-semibold px-12 py-6 rounded-2xl shadow-xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 text-xl"
      >
        开始沟通
      </Link>
    </div>
  </section>
));

HeroSection.displayName = 'HeroSection';

const HomePage: React.FC = () => {

  return (
    <div className="pt-16">
      <HeroSection />

      {/* 非关键内容使用懒加载 */}
      <Suspense fallback={
        <div className="h-96 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      }>
        {/* Pain Points Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">你是否经历过这些"窒息时刻"？</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PainPointCard
                title="职场困境"
                description="想和老板谈升职，一开口就被怼：'年轻人别急功近利'"
              />
              <PainPointCard
                title="亲子冲突"
                description="孩子沉迷游戏，刚说两句TA就摔门回屋"
              />
              <PainPointCard
                title="友情危机"
                description="朋友借钱不还，催债的话到嘴边又咽下，怕伤感情"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">你的沟通急救箱已到货</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10 text-purple-500" />}
                title="3分钟对话诊断"
                description="输入你的场景，AI秒判风险等级，提供针对性建议"
              />
              <FeatureCard
                icon={<Heart className="h-10 w-10 text-purple-500" />}
                title="话术生成器"
                description="自动产出高情商表达，复制就能用，让沟通更有效"
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-purple-500" />}
                title="虚拟演练室"
                description="和AI模拟老板/伴侣/叛逆期孩子对话，提前演练"
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-purple-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">为什么聪明人都用这套方法？</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BenefitCard
                icon={<Brain className="h-10 w-10 text-purple-500" />}
                title="反本能训练"
                description="把'硬刚/逃避'模式切换为'双赢思维'，让沟通更理性"
              />
              <BenefitCard
                icon={<Shield className="h-10 w-10 text-purple-500" />}
                title="安全感保障"
                description="营造安全的对话氛围，让对方敢于表达真实想法"
              />
              <BenefitCard
                icon={<Target className="h-10 w-10 text-purple-500" />}
                title="目标导向"
                description="明确共同目标，把冲突变成合作机会"
              />
            </div>
          </div>
        </section>
      </Suspense>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-400 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">与其在冲突中消耗关系，不如用科学方法把危机变转机</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            90%的人际关系破裂，都源于3次未妥善处理的关键对话。现在，让AI成为你的沟通助手。
          </p>
          <Link
            to="/conversation"
            className="inline-block bg-white text-purple-600 font-semibold px-12 py-6 rounded-2xl shadow-xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 text-xl"
          >
            开始沟通
          </Link>
        </div>
      </section>
    </div>
  );
};

export default memo(HomePage);