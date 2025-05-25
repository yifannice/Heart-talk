import React from 'react';
import { Link } from 'react-router-dom';
import { Book, FileText, Video, Users, ArrowRight } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">沟通资源</h1>
          <p className="text-gray-600 mb-10">
            探索这些资源以深入了解《关键对话》和《非暴力沟通》理论，提升您的沟通技巧。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <ResourceCard
              icon={<Book className="h-8 w-8 text-blue-500" />}
              title="推荐书籍"
              items={[
                { 
                  title: "《关键对话》", 
                  description: "克里·派特森等著，学习如何在高风险、情绪激烈、观点分歧的情况下有效沟通。"
                },
                { 
                  title: "《非暴力沟通》", 
                  description: "马歇尔·卢森堡著，探索如何以同理心和诚实表达自己，有效倾听他人。"
                },
                { 
                  title: "《爱的五种语言》", 
                  description: "盖瑞·查普曼著，了解不同人表达和接收爱的方式，改善亲密关系。"
                },
              ]}
            />
            
            <ResourceCard
              icon={<FileText className="h-8 w-8 text-green-500" />}
              title="实用文章"
              items={[
                { 
                  title: "非暴力沟通四要素详解", 
                  description: "深入解析观察、感受、需要和请求四个要素的应用。"
                },
                { 
                  title: "如何处理亲密关系中的冲突", 
                  description: "专家提供的七个实用技巧，帮助您有效处理亲密关系中的分歧。"
                },
                { 
                  title: "从批评到请求的转变", 
                  description: "学习如何将负面批评转变为积极的请求，促进良好沟通。"
                },
              ]}
              isComingSoon
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <ResourceCard
              icon={<Video className="h-8 w-8 text-red-500" />}
              title="视频课程"
              items={[
                { 
                  title: "关键对话基础课程", 
                  description: "10集视频系列，带您全面了解关键对话的核心原则。"
                },
                { 
                  title: "非暴力沟通实践", 
                  description: "通过真实案例演示非暴力沟通在日常生活中的应用。"
                },
                { 
                  title: "情绪管理与沟通", 
                  description: "学习如何在强烈情绪中保持冷静，进行有效沟通。"
                },
              ]}
              isComingSoon
            />
            
            <ResourceCard
              icon={<Users className="h-8 w-8 text-purple-500" />}
              title="社区与工作坊"
              items={[
                { 
                  title: "非暴力沟通练习小组", 
                  description: "加入线上或线下小组，与他人一起练习非暴力沟通技巧。"
                },
                { 
                  title: "关键对话工作坊", 
                  description: "参加专业培训，在安全环境中学习和实践关键对话技巧。"
                },
                { 
                  title: "伴侣沟通强化营", 
                  description: "专为伴侣设计的密集课程，共同提升沟通能力，增进理解。"
                },
              ]}
              isComingSoon
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-10">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">案例分享</h2>
            <p className="text-blue-700 mb-6">
              查看真实用户如何应用《关键对话》和《非暴力沟通》原则解决他们的关系问题。
            </p>
            <div className="text-center py-8">
              <p className="text-gray-500 italic">案例分享功能正在开发中...</p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">准备好实践了吗？</h2>
            <p className="text-gray-600 mb-6">
              使用我们的AI沟通助手，将这些理论应用到您的特定情况中。
            </p>
            <Link
              to="/conversation"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              开始对话
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  items: {
    title: string;
    description: string;
  }[];
  isComingSoon?: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ icon, title, items, isComingSoon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-xl font-semibold ml-3">{title}</h2>
      </div>
      {isComingSoon ? (
        <div className="text-center py-8">
          <p className="text-gray-500 italic">功能开发中...</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="p-3 rounded-lg">
              <div>
                <h3 className="font-medium text-blue-600">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResourcesPage;