import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-purple-600">
            沟通急救箱
          </Link>
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-lg xs:text-base"
            >
              首页
            </Link>
            <Link
              to="/key-conversation"
              className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-lg xs:text-base"
            >
              关键对话介绍
            </Link>
            <Link
              to="/conversation"
              className="bg-purple-500 text-white px-6 py-2.5 rounded-lg hover:bg-purple-400 transition-colors duration-200 text-lg xs:text-base font-medium"
            >
              开始
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;