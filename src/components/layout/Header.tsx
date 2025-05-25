import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Book, Home } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl text-gray-800">Heart-talk</span>
        </Link>

        <nav className="hidden md:flex space-x-8">
          <NavLink to="/" label="首页" icon={<Home size={18} />} isActive={location.pathname === '/'} />
          <NavLink 
            to="/conversation" 
            label="开始对话" 
            icon={<MessageSquare size={18} />} 
            isActive={location.pathname === '/conversation'} 
          />
          <NavLink 
            to="/resources" 
            label="资源" 
            icon={<Book size={18} />} 
            isActive={location.pathname === '/resources'} 
          />
        </nav>

        <div className="md:hidden flex items-center">
          <MobileMenu location={location} />
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, icon, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
        isActive
          ? 'text-blue-600 bg-blue-50'
          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const MobileMenu: React.FC<{ location: { pathname: string } }> = ({ location }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:text-blue-600 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 w-56 mt-2 bg-white rounded-md shadow-lg py-2 z-20">
          <Link
            to="/"
            className={`flex items-center px-4 py-2 text-sm ${
              location.pathname === '/' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Home size={18} className="mr-2" />
            首页
          </Link>
          <Link
            to="/conversation"
            className={`flex items-center px-4 py-2 text-sm ${
              location.pathname === '/conversation' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <MessageSquare size={18} className="mr-2" />
            开始对话
          </Link>
          <Link
            to="/resources"
            className={`flex items-center px-4 py-2 text-sm ${
              location.pathname === '/resources' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Book size={18} className="mr-2" />
            资源
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;