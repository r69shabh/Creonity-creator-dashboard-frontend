import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  leftIcon?: string;
}

const Input: React.FC<InputProps> = ({ label, helperText, leftIcon, className = '', ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[18px]">
            {leftIcon}
          </span>
        )}
        <input
          className={`
            w-full rounded-lg bg-gray-50 dark:bg-gray-800 border border-border-color dark:border-gray-700 
            text-text-primary dark:text-white placeholder-gray-400 
            focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-gray-900
            transition-all duration-200 outline-none
            ${leftIcon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 text-sm
            ${className}
          `}
          {...props}
        />
      </div>
      {helperText && (
        <p className="text-[11px] text-text-secondary dark:text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;