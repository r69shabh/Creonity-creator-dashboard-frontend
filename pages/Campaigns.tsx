import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Unified type definitions
type Tab = 'active' | 'won' | 'lost';

const Campaigns: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('active');
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  // Note: We use e.preventDefault() on the button to stop navigation to the detail page when just clicking "Edit Bid"
  const openBidModal = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    setSelectedCampaign(title);
    setIsBidModalOpen(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-6 p-6">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav aria-label="Tabs" className="-mb-px flex space-x-8">
          <button 
            onClick={() => setActiveTab('active')}
            className={`${activeTab === 'active' ? 'border-primary text-primary' : 'border-transparent text-text-secondary dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-text-primary dark:hover:text-gray-200'} whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer bg-transparent focus:outline-none transition-colors`}
          >
            Active Bids
            <span className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${activeTab === 'active' ? 'bg-blue-100 dark:bg-blue-900/30 text-primary' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-400'}`}>3</span>
          </button>
          <button 
            onClick={() => setActiveTab('won')}
            className={`${activeTab === 'won' ? 'border-primary text-primary' : 'border-transparent text-text-secondary dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-text-primary dark:hover:text-gray-200'} whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer bg-transparent focus:outline-none transition-colors`}
          >
            Won (Commissioned)
            <span className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${activeTab === 'won' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-400'}`}>12</span>
          </button>
          <button 
            onClick={() => setActiveTab('lost')}
            className={`${activeTab === 'lost' ? 'border-primary text-primary' : 'border-transparent text-text-secondary dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-text-primary dark:hover:text-gray-200'} whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer bg-transparent focus:outline-none transition-colors`}
          >
            Lost / Archived
            <span className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${activeTab === 'lost' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-400'}`}>5</span>
          </button>
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        {/* Header Row */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-semibold text-text-secondary dark:text-gray-400 uppercase tracking-wider">
          <div className="col-span-4">Campaign & Brand</div>
          <div className="col-span-2">Bid / Budget</div>
          <div className="col-span-2">Time Left</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* List Items based on Tab */}
        {activeTab === 'active' && (
          <>
            {/* Item 1 */}
            <Link to="/campaigns/vr-headset-review" className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-card hover:shadow-lg transition-all duration-200 group block">
              <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-4 flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center shrink-0">
                    <img alt="Brand Logo" className="w-8 h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaaFbQihFfy-F6e5rien4N3nqD2ZVjagkT3ggFv5wZ2ytBjVxB3e5Lkw-2gUBg_mOc4f5FYiQ0Oyh0IQd8HYm49V1abSGN9so7_FUIO7nIMJVa4dg2k954krxoVARfLWHqET9tWAIrvxZViGNb290HSv5nG2vATLeKmVbexOJ6UPbuv0eQg3kUXQYHoRCJAbwj8L8L7ye9IqMX-sHBm0ehaYkW-GV4TYQsbW4xkfa1C1bLafHNqlfawtpnEGQsoYzRnMwznSWulJ-r"/>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors">VR Headset Review</h3>
                    <p className="text-xs text-text-secondary dark:text-gray-400">Nexus Tech • Tech Category</p>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-xs text-text-secondary dark:text-gray-400 lg:hidden mb-1">My Bid</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-text-primary dark:text-white">$500</span>
                    <span className="text-xs text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded font-medium">Highest</span>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-xs text-text-secondary dark:text-gray-400 lg:hidden mb-1">Time Left</p>
                  <div className="flex items-center gap-1.5 text-accent-teal-dark dark:text-accent-teal font-medium text-sm">
                    <span className="material-symbols-outlined text-[16px]">timer</span>
                    02h:15m
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-xs text-text-secondary dark:text-gray-400 lg:hidden mb-1">Status</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                    <span className="size-1.5 rounded-full bg-green-600 animate-pulse"></span>
                    Leading
                  </span>
                </div>
                <div className="lg:col-span-2 flex justify-start lg:justify-end gap-2 mt-2 lg:mt-0">
                  <button onClick={(e) => openBidModal(e, 'VR Headset Review')} className="px-4 py-2 text-xs font-semibold text-text-primary dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors z-10 relative">Edit Bid</button>
                  <button className="p-2 text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </div>
              </div>
            </Link>

            {/* Item 2 */}
            <Link to="/campaigns/morning-routine" className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-card hover:shadow-lg transition-all duration-200 group relative overflow-hidden block">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-l-xl"></div>
              <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-4 flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center shrink-0">
                    <img alt="Brand Logo" className="w-8 h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0KEVIufmRbG5G7uMWmmBaRdcU0MaBYz558XRi5f85Uze8-jAvdH4yqi_QyqMQBU8oqDMooc4g4EarPeiBAPdDhwymdA4sP7cNVnYTdtGAgy81PxhQhB_f2lTIdp-iAksJBIUV7AdBPvQXb6C_m438sEO6Dj_AB3SeDBKzvVwBf95Ju9sPQdlxTzCN3akyDJgD3MXDkXMEF4qnt4YqT4c7JiLSnzjcG0-6bz3XdVvV81r9TDZ8Me0h2O_ojTbRRs3-CPw8tCqF400g"/>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors">Morning Routine Integration</h3>
                    <p className="text-xs text-text-secondary dark:text-gray-400">Bean &amp; Brew • Lifestyle</p>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-xs text-text-secondary dark:text-gray-400 lg:hidden mb-1">My Bid</p>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-text-primary dark:text-white">$350</span>
                    <span className="text-xs text-red-500 font-medium">Top bid: $380</span>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-xs text-text-secondary dark:text-gray-400 lg:hidden mb-1">Time Left</p>
                  <div className="flex items-center gap-1.5 text-text-secondary dark:text-gray-400 font-medium text-sm">
                    <span className="material-symbols-outlined text-[16px]">timer</span>
                    45m:10s
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-xs text-text-secondary dark:text-gray-400 lg:hidden mb-1">Status</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
                    <span className="material-symbols-outlined text-[14px]">warning</span>
                    Outbid
                  </span>
                </div>
                <div className="lg:col-span-2 flex justify-start lg:justify-end gap-2 mt-2 lg:mt-0">
                  <button onClick={(e) => openBidModal(e, 'Morning Routine Integration')} className="px-4 py-2 text-xs font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover shadow-md shadow-brand-blue/20 dark:shadow-none transition-colors flex items-center gap-1 z-10 relative">
                    <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                    Increase
                  </button>
                  <button className="p-2 text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </div>
              </div>
            </Link>

            {/* Item 3 */}
            <Link to="/campaigns/productivity-tool" className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-card hover:shadow-lg transition-all duration-200 group block">
              <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-4 flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center shrink-0">
                    <img alt="Brand Logo" className="w-8 h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbzJmYMka3XY2SY90mz06-ZK9S09_1YMjnP0yrDw_hnXXbRkkwSuBCxiTZx2AvC1ITGpexeJnbOBVSW6bdmpAS4GXhLeiATCF8Q9DTKSZyG8AlV_kMW7sQVcDIZnQ15BahLINB9mgZKy4Kcf6wnn7joxLrqleXm-2Ci1RXsvnApVSpoizr90xGUtYvLNH0F7TqASA2qRamuW9SG1t1D3GDIEy9QdV7rfIWdeTHzkFo8Fdy9cNP3LJpbhny66GnieYtDHJyjcpCcD88"/>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors">SaaS Productivity Tool</h3>
                    <p className="text-xs text-text-secondary dark:text-gray-400">TaskFlow • Business</p>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-xs text-text-secondary dark:text-gray-400 lg:hidden mb-1">My Bid</p>
                  <span className="text-lg font-bold text-text-primary dark:text-white">$850</span>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-xs text-text-secondary dark:text-gray-400 lg:hidden mb-1">Time Left</p>
                  <div className="flex items-center gap-1.5 text-text-secondary dark:text-gray-400 font-medium text-sm">
                    <span className="material-symbols-outlined text-[16px]">timer</span>
                    05h:30m
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-xs text-text-secondary dark:text-gray-400 lg:hidden mb-1">Status</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                    <span className="size-1.5 rounded-full bg-blue-600"></span>
                    In Review
                  </span>
                </div>
                <div className="lg:col-span-2 flex justify-start lg:justify-end gap-2 mt-2 lg:mt-0">
                  <button onClick={(e) => {e.preventDefault();}} className="px-4 py-2 text-xs font-semibold text-text-primary dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors z-10 relative">Details</button>
                  <button className="p-2 text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </div>
              </div>
            </Link>
          </>
        )}

        {/* Won / Commissioned View */}
        {activeTab === 'won' && (
           <>
              <Link to="/collaborations/summer-flavor" className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-card hover:shadow-lg transition-all duration-200 group block">
                 <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    <div className="lg:col-span-4 flex items-center gap-4">
                       <div className="size-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 shrink-0">FZ</div>
                       <div>
                          <h3 className="text-sm font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors">Summer Flavor Drop</h3>
                          <p className="text-xs text-text-secondary dark:text-gray-400">Fizz • Food & Drink</p>
                       </div>
                    </div>
                    <div className="lg:col-span-2">
                       <p className="text-xs text-text-secondary dark:text-gray-400 lg:hidden mb-1">Contract Value</p>
                       <span className="text-sm font-bold text-text-primary dark:text-white">$3,500</span>
                    </div>
                    <div className="lg:col-span-2">
                       <p className="text-xs text-text-secondary dark:text-gray-400 lg:hidden mb-1">Timeline</p>
                       <div className="text-sm text-text-secondary dark:text-gray-400 font-medium">Oct 20 - Nov 01</div>
                    </div>
                    <div className="lg:col-span-2">
                       <p className="text-xs text-text-secondary dark:text-gray-400 lg:hidden mb-1">Status</p>
                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          Won
                       </span>
                    </div>
                    <div className="lg:col-span-2 flex justify-start lg:justify-end gap-2 mt-2 lg:mt-0">
                       <button className="px-4 py-2 text-xs font-semibold text-text-primary dark:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors z-10 relative">View Workroom</button>
                    </div>
                 </div>
              </Link>
           </>
        )}

        {activeTab === 'lost' && (
             <div className="py-12 flex flex-col items-center justify-center text-center text-text-secondary dark:text-gray-500">
                <span className="material-symbols-outlined text-[48px] mb-2 opacity-50">history</span>
                <p>No archived campaigns to display.</p>
                <button onClick={() => setActiveTab('active')} className="mt-4 text-primary font-semibold hover:underline">View Active Bids</button>
             </div>
        )}
      </div>

      {/* Bid / Proposal Modal */}
      {isBidModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsBidModalOpen(false)}></div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-float w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
             <div className="px-6 py-4 border-b border-border-color dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center">
                <h3 className="font-bold text-text-primary dark:text-white">Update Bid</h3>
                <button onClick={() => setIsBidModalOpen(false)} className="text-text-secondary hover:text-text-primary dark:text-gray-400 dark:hover:text-white"><span className="material-symbols-outlined">close</span></button>
             </div>
             <div className="p-6">
                 <p className="text-sm text-text-secondary dark:text-gray-400 mb-4">Placing a bid for <strong>{selectedCampaign}</strong>. Your previous bid was outmatched.</p>
                 <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">New Bid Amount ($)</label>
                 <div className="relative mb-6">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary dark:text-gray-500 font-bold">$</span>
                    <input type="number" className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-primary focus:border-primary font-bold" placeholder="0.00" />
                 </div>
                 <button onClick={() => setIsBidModalOpen(false)} className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
                     Place Bid
                 </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;