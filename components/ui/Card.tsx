import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', padding = 'p-6', hoverable = false, ...props }) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 
        rounded-2xl 
        border border-gray-200 dark:border-gray-700
        shadow-card 
        transition-all duration-300 ease-out
        relative overflow-hidden
        ${hoverable ? 'hover:shadow-card-hover hover:-translate-y-1 cursor-pointer' : ''}
        ${padding}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;