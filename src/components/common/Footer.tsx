import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-600">
            © {new Date().getFullYear()} 关键对话助手. 保留所有权利
          </div>
          <div className="flex space-x-8">
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              关于我们
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              联系我们
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 