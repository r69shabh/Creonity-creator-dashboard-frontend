import React from 'react';

type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'active';

interface StatusBadgeProps {
    variant?: StatusVariant;
    children: React.ReactNode;
    icon?: string;
    className?: string;
}

const variantStyles: Record<StatusVariant, string> = {
    success: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-100 dark:border-green-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-100 dark:border-yellow-800',
    error: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-800',
    neutral: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600',
    active: 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary border-primary/20 dark:border-primary/30',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
    variant = 'neutral',
    children,
    icon,
    className = ''
}) => {
    return (
        <span
            className={`
        inline-flex items-center gap-1.5 
        px-2.5 py-1 
        rounded-full 
        text-xs font-medium 
        border
        ${variantStyles[variant]}
        ${className}
      `}
        >
            {icon && (
                <span className="material-symbols-outlined text-[14px]">{icon}</span>
            )}
            {children}
        </span>
    );
};

export default StatusBadge;
