import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-display font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    // Updated gradient: Brand Blue (#075CD1) -> Accent Teal (#1BD1C9)
    primary: "bg-gradient-to-r from-[#075CD1] to-[#1BD1C9] text-white hover:shadow-glow-teal hover:shadow-brand-teal/30 shadow-md border border-transparent",
    secondary: "bg-white text-text-primary border border-gray-200 hover:bg-gray-50 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700",
    outline: "border-2 border-gray-200 dark:border-gray-700 text-text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800",
    ghost: "text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white hover:bg-primary/5 dark:hover:bg-gray-800",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
         <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
      ) : icon ? (
        <span className={`material-symbols-outlined ${size === 'sm' ? 'text-[16px]' : 'text-[20px]'}`}>{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;