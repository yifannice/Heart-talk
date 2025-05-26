import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Shield, Target, MessageSquare, Heart, Zap } from 'lucide-react';

const KeyConversationPage: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            《关键对话》：吵架变合作，3个心法让高难度沟通不再翻车
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            90%的人际关系破裂，都源于3次未妥善处理的关键对话。现在，让AI成为你的沟通助手。
          </p>
        </div>
      </section>

      {/* Why We Fail Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">为什么我们总把天聊死？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-purple-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 text-purple-700">大脑的"原始人模式"</h3>
              <p className="text-gray-600">
                一旦对话充满火药味，大脑会瞬间切换到"战斗或逃跑"模式——要么疯狂输出观点，要么沉默装死。这时候，理性思考直接掉线，说出口的话往往伤人伤己。
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 text-purple-700">隐形杀手：安全感崩塌</h3>
              <p className="text-gray-600">
                当对方觉得被攻击（比如你说"你总是这样"），TA会立刻竖起防御盾牌。这时候，解决问题就变成了捍卫尊严的战争。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Methods Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">3个心法，让高风险对话稳如老狗</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MethodCard
              icon={<Brain className="h-10 w-10 text-purple-500" />}
              title="先管心情，再谈事情"
              steps={[
                "我到底想要什么？",
                "对方需要什么？",
                "我们有没有共同目标？"
              ]}
            />
            <MethodCard
              icon={<Shield className="h-10 w-10 text-purple-500" />}
              title="用事实当'灭火器'"
              steps={[
                "把'你根本不关心家！'换成：",
                "'这周我做了7次晚饭，你主动帮忙0次。'",
                "不带情绪的事实，最能让人冷静反思。"
              ]}
            />
            <MethodCard
              icon={<Target className="h-10 w-10 text-purple-500" />}
              title="把辩论变成拼图游戏"
              steps={[
                "与其说'我的方案更好'，不如问：",
                "'我的信息可能有盲区，你的建议是什么？'",
                "给足安全感，对方才敢说真话。"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Template Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">万能话术模板：5步搞定高难度对话</h2>
          <div className="max-w-3xl mx-auto bg-purple-50 p-8 rounded-2xl">
            <h3 className="text-xl font-semibold mb-6 text-purple-700">场景：孩子沉迷游戏</h3>
            <div className="space-y-6">
              <TemplateStep
                number="1"
                title="摆事实（Share）"
                content="过去一周，你有5天游戏打到凌晨1点，第二天上课打瞌睡3次。"
                warning="不说'你天天就知道打游戏！'"
              />
              <TemplateStep
                number="2"
                title="说担忧（Tell）"
                content="我担心长期熬夜影响健康，也怕你错过重要知识点。"
                warning="不贴标签'你就是自制力差！'"
              />
              <TemplateStep
                number="3"
                title="抛问题（Ask）"
                content="你觉得每天玩多久合适？我们怎么安排时间能兼顾学习和放松？"
                warning="不自问自答'必须每天只能玩1小时！'"
              />
              <TemplateStep
                number="4"
                title="留余地（Talk）"
                content="或许我们可以试试先写完作业再玩，超时用家务时间抵扣？"
                warning="不用命令式'必须按我说的做！'"
              />
              <TemplateStep
                number="5"
                title="促行动（Encourage）"
                content="今晚一起制定时间表，试行一周怎么样？"
                warning="不空谈'你以后要注意！'"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-400 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">你的沟通急救箱已到货</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            我们把这些精华做成了即用型工具，让每一次关键对话，都成为关系升级的跳板。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-white" />}
              title="3分钟对话诊断"
              description="输入你的场景，AI秒判风险等级"
            />
            <FeatureCard
              icon={<Heart className="h-10 w-10 text-white" />}
              title="话术生成器"
              description="自动产出高情商表达，复制就能用"
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-white" />}
              title="虚拟演练室"
              description="和AI模拟对话，提前演练"
            />
          </div>
          <Link
            to="/conversation"
            className="inline-block bg-white text-purple-600 font-semibold px-12 py-6 rounded-2xl shadow-xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 text-xl"
          >
            开始问诊
          </Link>
        </div>
      </section>
    </div>
  );
};

interface MethodCardProps {
  icon: React.ReactNode;
  title: string;
  steps: string[];
}

const MethodCard: React.FC<MethodCardProps> = ({ icon, title, steps }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {steps.map((step, index) => (
          <li key={index} className="text-gray-600 flex items-start">
            <span className="text-purple-500 mr-2">•</span>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface TemplateStepProps {
  number: string;
  title: string;
  content: string;
  warning: string;
}

const TemplateStep: React.FC<TemplateStepProps> = ({ number, title, content, warning }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center mb-4">
        <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3">
          {number}
        </span>
        <h4 className="text-lg font-semibold text-purple-700">{title}</h4>
      </div>
      <p className="text-gray-700 mb-2">{content}</p>
      <p className="text-sm text-red-500">⚠️ {warning}</p>
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
    <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/90">{description}</p>
    </div>
  );
};

export default KeyConversationPage; 