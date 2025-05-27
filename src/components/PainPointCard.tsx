import React from 'react';

interface PainPointCardProps {
  title: string;
  description: string;
}

const PainPointCard: React.FC<PainPointCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <h3 className="text-xl font-semibold mb-3 text-purple-700">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default PainPointCard; 