import React from 'react';
import { useToast } from '../context/ToastContext';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            min-w-[300px] p-4 rounded-xl shadow-float border animate-in slide-in-from-right fade-in duration-300
            flex items-center gap-3
            ${toast.type === 'success' ? 'bg-white dark:bg-gray-800 border-green-200 dark:border-green-900' : ''}
            ${toast.type === 'error' ? 'bg-white dark:bg-gray-800 border-red-200 dark:border-red-900' : ''}
            ${toast.type === 'info' ? 'bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-900' : ''}
          `}
        >
          <div className={`
             size-8 rounded-full flex items-center justify-center shrink-0
             ${toast.type === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/50' : ''}
             ${toast.type === 'error' ? 'bg-red-100 text-red-600 dark:bg-red-900/50' : ''}
             ${toast.type === 'info' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50' : ''}
          `}>
             <span className="material-symbols-outlined text-[18px]">
               {toast.type === 'success' ? 'check' : toast.type === 'error' ? 'error' : 'info'}
             </span>
          </div>
          <div className="flex-1">
             <p className="text-sm font-semibold text-text-primary dark:text-white">{toast.message}</p>
          </div>
          <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-600">
             <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;