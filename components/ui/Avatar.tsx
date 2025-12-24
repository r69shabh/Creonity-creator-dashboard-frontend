import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = "Avatar", fallback = "CS", size = 'md', className = '' }) => {
  const sizes = {
    sm: "size-8 text-xs",
    md: "size-10 text-sm",
    lg: "size-14 text-base",
    xl: "size-20 text-xl",
  };

  return (
    <div className={`
      ${sizes[size]} rounded-lg border border-gray-100 dark:border-gray-700 
      bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0 
      ${className}
    `}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="font-bold text-text-secondary dark:text-gray-400">{fallback}</span>
      )}
    </div>
  );
};

export default Avatar;