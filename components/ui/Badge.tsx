import React from 'react';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'blue' | 'purple' | 'teal';
  children: React.ReactNode;
  icon?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'neutral', children, icon, className = '' }) => {
  const variants = {
    success: "bg-green-50 text-green-700 border-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    // Changed warning from orange to a amber/yellow that fits better or use teal for alerts
    warning: "bg-yellow-50 text-yellow-700 border-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
    error: "bg-red-50 text-red-700 border-red-100 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
    info: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    blue: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    purple: "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
    teal: "bg-[#1BD1C9]/10 text-[#036964] border-[#1BD1C9]/20 dark:text-[#1BD1C9] dark:border-[#036964]",
    neutral: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${variants[variant]} ${className}`}>
      {icon && <span className="material-symbols-outlined text-[12px] mr-1">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;