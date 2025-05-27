/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'base': '16px', // 设置基础字体大小
      },
      // 添加性能优化的字体族
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
  // 启用JIT模式以减少CSS体积
  mode: 'jit',
  // 优化purge配置
  purge: {
    enabled: true,
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    // 保留关键样式
    safelist: [
      'text-xl',
      'md:text-2xl',
      'mb-12',
      'max-w-3xl',
      'mx-auto',
      'hero-text',
      'hero-title',
      'hero-section',
      'container'
    ],
  },
};
