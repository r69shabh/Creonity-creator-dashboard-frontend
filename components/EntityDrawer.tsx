import React from 'react';
import { useEntityProfile } from '../context/EntityProfileContext';
import EntityProfileContent from './EntityProfileContent';

const EntityDrawer: React.FC = () => {
  const { activeEntity, closeProfile } = useEntityProfile();

  if (!activeEntity) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={closeProfile}
      ></div>
      
      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-gray-900 border-l border-border-color dark:border-gray-700 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="p-4 border-b border-border-color dark:border-gray-700 flex items-center gap-2 shrink-0">
            <button onClick={closeProfile} className="p-2 -ml-2 rounded-lg text-text-secondary dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <span className="material-symbols-outlined">close</span>
            </button>
            <span className="font-bold text-text-primary dark:text-white capitalize">
                {activeEntity} Profile
            </span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-900">
             <EntityProfileContent type={activeEntity} />
        </div>
      </div>
    </div>
  );
};

export default EntityDrawer;