import React from 'react';

interface EntityProfileContentProps {
  type: 'company' | 'manager';
}

const EntityProfileContent: React.FC<EntityProfileContentProps> = ({ type }) => {
  if (type === 'company') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="size-20 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-center p-2 mb-4 shadow-sm">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaaFbQihFfy-F6e5rien4N3nqD2ZVjagkT3ggFv5wZ2ytBjVxB3e5Lkw-2gUBg_mOc4f5FYiQ0Oyh0IQd8HYm49V1abSGN9so7_FUIO7nIMJVa4dg2k954krxoVARfLWHqET9tWAIrvxZViGNb290HSv5nG2vATLeKmVbexOJ6UPbuv0eQg3kUXQYHoRCJAbwj8L8L7ye9IqMX-sHBm0ehaYkW-GV4TYQsbW4xkfa1C1bLafHNqlfawtpnEGQsoYzRnMwznSWulJ-r" alt="Brand" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-xl font-bold text-text-primary dark:text-white">TechFlow AI</h2>
            <p className="text-sm text-text-secondary dark:text-gray-400 mb-4">San Francisco, CA • Software</p>
            <p className="text-xs leading-relaxed text-text-secondary dark:text-gray-400">
                TechFlow AI is pioneering the future of immersive technology. We build AI-driven VR headsets and software for enterprise and gaming.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-border-color dark:border-gray-700 text-center">
                  <span className="block text-lg font-bold text-text-primary dark:text-white">24</span>
                  <span className="text-[10px] font-bold text-text-secondary dark:text-gray-500 uppercase">Jobs Posted</span>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-border-color dark:border-gray-700 text-center">
                  <span className="block text-lg font-bold text-text-primary dark:text-white">$150k</span>
                  <span className="text-[10px] font-bold text-text-secondary dark:text-gray-500 uppercase">Total Spent</span>
              </div>
          </div>

          <div>
              <h4 className="text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-3 border-b border-border-color dark:border-gray-700 pb-2">Open Gigs</h4>
              <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-bold text-text-primary dark:text-white">AI Software Beta Test</span>
                        <span className="text-xs font-bold text-green-600 dark:text-green-400">$800</span>
                      </div>
                      <div className="flex gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[10px] text-text-secondary dark:text-gray-300">Tech</span>
                          <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[10px] text-text-secondary dark:text-gray-300">Video</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex items-center gap-4">
            <div className="size-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-xl text-text-secondary dark:text-gray-300">SM</div>
            <div>
                <h2 className="text-lg font-bold text-text-primary dark:text-white">Sarah Miller</h2>
                <p className="text-sm text-text-secondary dark:text-gray-400">Senior Marketing Mgr.</p>
                <div className="flex gap-1 mt-1">
                    <span className="material-symbols-outlined text-[16px] text-green-500">check_circle</span>
                    <span className="text-xs text-text-secondary dark:text-gray-500">Verified Employee</span>
                </div>
            </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 text-sm text-text-secondary dark:text-gray-300 leading-relaxed">
            Sarah has been managing influencer campaigns at TechFlow for 3 years. She specializes in tech, gaming, and software reviews.
        </div>

        <div>
            <h4 className="text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-3">Contact</h4>
            <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border-color dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                    <span className="material-symbols-outlined text-text-secondary dark:text-gray-400">mail</span>
                    <span className="text-sm font-medium text-text-primary dark:text-white">sarah.m@techflow.ai</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border-color dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                    <span className="material-symbols-outlined text-text-secondary dark:text-gray-400">call</span>
                    <span className="text-sm font-medium text-text-primary dark:text-white">Schedule Call</span>
                </button>
            </div>
        </div>

        <div>
            <h4 className="text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-3 border-b border-border-color dark:border-gray-700 pb-2">Active Campaigns</h4>
            <div className="space-y-3">
                <div className="p-3 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-bold text-text-primary dark:text-white">VR Headset Launch</span>
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Active</span>
                    </div>
                    <p className="text-xs text-text-secondary dark:text-gray-400">Ends in 5 days</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default EntityProfileContent;