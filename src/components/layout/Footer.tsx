import React from 'react';
import { Heart, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">hearttalk</h3>
            <p className="text-gray-300 mb-4">
              帮助您运用《关键对话》和《非暴力沟通》理论解决亲密关系中的冲突。
            </p>
            <div className="flex items-center">
              <Heart size={18} className="text-red-400 mr-2" />
              <span className="text-gray-300">用爱与理解创造更好的沟通</span>
            </div>
          </div>

          <div className="md:justify-self-end">
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <p className="text-gray-300 mb-4">
              如有任何问题或建议，请随时联系我们。
            </p>
            <a
              href="mailto:green413024@gmail.com"
              className="text-gray-300 hover:text-blue-400 flex items-center"
            >
              <Mail size={18} className="mr-2" />
              <span>green413024@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} hearttalk. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;