import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TutorialOverlay, { TutorialStep } from '../components/TutorialOverlay';

type Tab = 'active' | 'applications' | 'completed';

const COLLAB_TUTORIAL_STEPS: TutorialStep[] = [
  {
    targetId: 'collab-tabs',
    title: 'Workroom Stages',
    content: 'Navigate between your active jobs, pending applications, and completed contracts history.',
    position: 'bottom'
  },
  {
    targetId: 'collab-content',
    title: 'Manage Work',
    content: 'Track progress bars, deadlines, and payment status for each collaboration here.',
    position: 'top'
  }
];

const Collaborations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('active');
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const isNewUserSession = sessionStorage.getItem('creonity_tour_session') === 'true';
    const isCompleted = localStorage.getItem('creonity_collab_tutorial_completed');
    if (isNewUserSession && !isCompleted) {
       const timer = setTimeout(() => setShowTutorial(true), 800);
       return () => clearTimeout(timer);
    }
  }, []);

  const handleTutorialComplete = () => {
      localStorage.setItem('creonity_collab_tutorial_completed', 'true');
      setShowTutorial(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto h-full p-6 flex flex-col gap-6 relative">
      <TutorialOverlay 
        isOpen={showTutorial} 
        steps={COLLAB_TUTORIAL_STEPS}
        onComplete={handleTutorialComplete}
        onSkip={handleTutorialComplete}
      />
      
      {/* Tabs */}
      <div id="collab-tabs" className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
            <button 
                onClick={() => setActiveTab('active')}
                className={`${activeTab === 'active' ? 'border-primary text-primary' : 'border-transparent text-text-secondary dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'} whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors`}
            >
                Active Jobs
                <span className="ml-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 py-0.5 px-2 rounded-full text-xs">3</span>
            </button>
            <button 
                onClick={() => setActiveTab('applications')}
                className={`${activeTab === 'applications' ? 'border-primary text-primary' : 'border-transparent text-text-secondary dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'} whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors`}
            >
                Applications
                <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-text-secondary dark:text-gray-400 py-0.5 px-2 rounded-full text-xs">5</span>
            </button>
            <button 
                onClick={() => setActiveTab('completed')}
                className={`${activeTab === 'completed' ? 'border-primary text-primary' : 'border-transparent text-text-secondary dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'} whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors`}
            >
                Completed
            </button>
        </nav>
      </div>

      <div id="collab-content">
      {/* Active Work View */}
      {activeTab === 'active' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <Link to="/collaborations/vr-headset-unboxing" className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-border-color dark:border-gray-700 shadow-card hover:shadow-lg transition-all group cursor-pointer block">
                <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden">
                    <img alt="Brand Logo" className="w-6 h-6 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaaFbQihFfy-F6e5rien4N3nqD2ZVjagkT3ggFv5wZ2ytBjVxB3e5Lkw-2gUBg_mOc4f5FYiQ0Oyh0IQd8HYm49V1abSGN9so7_FUIO7nIMJVa4dg2k954krxoVARfLWHqET9tWAIrvxZViGNb290HSv5nG2vATLeKmVbexOJ6UPbuv0eQg3kUXQYHoRCJAbwj8L8L7ye9IqMX-sHBm0ehaYkW-GV4TYQsbW4xkfa1C1bLafHNqlfawtpnEGQsoYzRnMwznSWulJ-r"/>
                    </div>
                    <div>
                    <h3 className="text-sm font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors">TechFlow AI</h3>
                    <p className="text-xs text-text-secondary dark:text-gray-400">SaaS</p>
                    </div>
                </div>
                <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] uppercase font-bold tracking-wider rounded-md border border-blue-100 dark:border-blue-800">Creation</span>
                </div>
                <h4 className="text-base font-bold text-text-primary dark:text-white mb-2">VR Headset Unboxing</h4>
                <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                    <span className="text-text-secondary dark:text-gray-400">Progress</span>
                    <span className="text-primary">65%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-1.5 rounded-full transition-all duration-500" style={{width: '65%'}}></div>
                </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-accent-teal-dark dark:text-accent-teal font-medium">
                        <span className="material-symbols-outlined text-[16px]">calendar_clock</span>
                        <span>Due in 2 days</span>
                    </div>
                     <span className="font-bold text-text-primary dark:text-white">$1,200</span>
                </div>
            </Link>

            <Link to="/collaborations/healthy-snacking" className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-border-color dark:border-gray-700 shadow-card hover:shadow-lg transition-all group cursor-pointer block">
                <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold text-sm">
                        NB
                    </div>
                    <div>
                    <h3 className="text-sm font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors">NatureBox</h3>
                    <p className="text-xs text-text-secondary dark:text-gray-400">Food &amp; Drink</p>
                    </div>
                </div>
                <span className="px-2 py-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-[10px] uppercase font-bold tracking-wider rounded-md border border-yellow-100 dark:border-yellow-800">Reviewing</span>
                </div>
                <h4 className="text-base font-bold text-text-primary dark:text-white mb-2">Healthy Snacking</h4>
                <div className="space-y-2 mt-4">
                <div className="flex justify-between text-xs font-medium">
                    <span className="text-text-secondary dark:text-gray-400">Progress</span>
                    <span className="text-green-600 dark:text-green-400">Waiting for approval</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-yellow-400 h-1.5 rounded-full w-full"></div>
                </div>
                </div>
            </Link>
        </div>
      )}

      {/* Applications View */}
      {activeTab === 'applications' && (
          <div className="flex flex-col gap-4">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-semibold text-text-secondary dark:text-gray-400 uppercase tracking-wider bg-gray-50/50 dark:bg-gray-800/50 rounded-lg">
                  <div className="col-span-5">Opportunity</div>
                  <div className="col-span-2">Quote</div>
                  <div className="col-span-2">Applied</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1 text-right">Action</div>
              </div>

              {[
                  { title: "SaaS Productivity Tool", brand: "TaskFlow", quote: "$1,500", date: "2 days ago", status: "Interviewing", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/30 border-blue-100" },
                  { title: "Morning Routine", brand: "Bean & Brew", quote: "$350", date: "5 hours ago", status: "Applied", color: "text-gray-600 bg-gray-100 dark:bg-gray-800 border-gray-200" },
                  { title: "Fitness App Promo", brand: "FitLife", quote: "$800", date: "1 week ago", status: "Rejected", color: "text-red-600 bg-red-50 dark:bg-red-900/30 border-red-100" },
              ].map((app, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center shadow-sm">
                      <div className="md:col-span-5 flex items-center gap-4">
                           <div className="size-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-text-secondary">{app.brand[0]}</div>
                           <div>
                               <h4 className="font-bold text-text-primary dark:text-white text-sm">{app.title}</h4>
                               <p className="text-xs text-text-secondary dark:text-gray-400">{app.brand}</p>
                           </div>
                      </div>
                      <div className="md:col-span-2 text-sm font-semibold text-text-primary dark:text-white">
                          <span className="md:hidden text-text-secondary mr-2 font-normal">Quote:</span>
                          {app.quote}
                      </div>
                      <div className="md:col-span-2 text-sm text-text-secondary dark:text-gray-400">
                          <span className="md:hidden text-text-secondary mr-2 font-normal">Applied:</span>
                          {app.date}
                      </div>
                      <div className="md:col-span-2">
                           <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${app.color}`}>
                               {app.status}
                           </span>
                      </div>
                      <div className="md:col-span-1 flex justify-end">
                           <button className="text-text-secondary hover:text-text-primary dark:text-gray-400 dark:hover:text-white">
                               <span className="material-symbols-outlined">more_vert</span>
                           </button>
                      </div>
                  </div>
              ))}
          </div>
      )}

       {/* Completed View */}
       {activeTab === 'completed' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-border-color dark:border-gray-700 shadow-card opacity-80 hover:opacity-100 transition-all group cursor-pointer grayscale hover:grayscale-0">
                    <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden">
                        <img alt="Brand Logo" className="w-6 h-6 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaaFbQihFfy-F6e5rien4N3nqD2ZVjagkT3ggFv5wZ2ytBjVxB3e5Lkw-2gUBg_mOc4f5FYiQ0Oyh0IQd8HYm49V1abSGN9so7_FUIO7nIMJVa4dg2k954krxoVARfLWHqET9tWAIrvxZViGNb290HSv5nG2vATLeKmVbexOJ6UPbuv0eQg3kUXQYHoRCJAbwj8L8L7ye9IqMX-sHBm0ehaYkW-GV4TYQsbW4xkfa1C1bLafHNqlfawtpnEGQsoYzRnMwznSWulJ-r"/>
                        </div>
                        <div>
                        <h3 className="text-sm font-bold text-text-primary dark:text-white">TechFlow AI</h3>
                        <p className="text-xs text-text-secondary dark:text-gray-400">SaaS</p>
                        </div>
                    </div>
                    <span className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] uppercase font-bold tracking-wider rounded-md border border-green-100 dark:border-green-800">Live</span>
                    </div>
                    <h4 className="text-base font-bold text-text-primary dark:text-white mb-2">Q3 Feature Highlights</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                            <span className="text-text-secondary dark:text-gray-400">Status</span>
                            <span className="text-green-600 dark:text-green-400">Campaign Finished</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-green-500 h-1.5 rounded-full w-full"></div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-text-secondary dark:text-gray-400 font-medium">
                            <span className="material-symbols-outlined text-[16px]">payments</span>
                            <span>$1,200 Paid</span>
                        </div>
                        <Link to="/analytics" className="text-primary hover:underline">View Analytics</Link>
                    </div>
                </div>
            </div>
       )}
       </div>

    </div>
  );
};

export default Collaborations;