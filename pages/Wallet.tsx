import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TutorialOverlay, { TutorialStep } from '../components/TutorialOverlay';

const WALLET_TUTORIAL_STEPS: TutorialStep[] = [
  {
    targetId: 'wallet-cards',
    title: 'Financial Overview',
    content: 'View total lifetime earnings, funds currently held in escrow, and your available withdrawable balance.',
    position: 'bottom'
  },
  {
    targetId: 'wallet-withdraw-btn',
    title: 'Withdraw Funds',
    content: 'Ready to cash out? Transfer your available balance to your connected bank account or PayPal instantly.',
    position: 'left'
  },
  {
    targetId: 'wallet-history',
    title: 'Transaction History',
    content: 'A complete ledger of every payment, escrow release, and withdrawal for your records.',
    position: 'top'
  }
];

const Wallet: React.FC = () => {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const isCompleted = localStorage.getItem('creonity_wallet_tutorial_completed');
    if (!isCompleted) {
       const timer = setTimeout(() => setShowTutorial(true), 800);
       return () => clearTimeout(timer);
    }
  }, []);

  const handleTutorialComplete = () => {
      localStorage.setItem('creonity_wallet_tutorial_completed', 'true');
      setShowTutorial(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto h-full flex flex-col gap-8 p-6 relative">
      <TutorialOverlay 
        isOpen={showTutorial} 
        steps={WALLET_TUTORIAL_STEPS}
        onComplete={handleTutorialComplete}
        onSkip={handleTutorialComplete}
      />

      <section id="wallet-cards" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-border-color dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                <span className="material-symbols-outlined">savings</span>
              </div>
              <span className="text-sm font-medium text-text-secondary dark:text-gray-400">Total Earnings</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +12.5%
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold text-text-primary dark:text-white tracking-tight">$42,850.00</h2>
            <p className="text-xs text-text-secondary dark:text-gray-400">Lifetime earnings across all campaigns</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-border-color dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-4">
             <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                   <span className="material-symbols-outlined">lock_clock</span>
                </div>
                <span className="text-sm font-medium text-text-secondary dark:text-gray-400">Pending (Escrow)</span>
             </div>
             <span className="inline-flex items-center gap-1 text-xs font-semibold text-text-secondary dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">4 Active</span>
          </div>
          <div className="flex flex-col gap-1">
             <h2 className="text-3xl font-bold text-text-primary dark:text-white tracking-tight">$3,200.00</h2>
             <p className="text-xs text-text-secondary dark:text-gray-400">Held securely until campaign completion</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-border-color dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-4">
             <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                   <span className="material-symbols-outlined">account_balance</span>
                </div>
                <span className="text-sm font-medium text-text-secondary dark:text-gray-400">Available Balance</span>
             </div>
             <button id="wallet-withdraw-btn" onClick={() => setIsWithdrawOpen(true)} className="text-primary text-xs font-semibold hover:underline">Withdraw</button>
          </div>
          <div className="flex flex-col gap-1">
             <h2 className="text-3xl font-bold text-text-primary dark:text-white tracking-tight">$8,450.00</h2>
             <p className="text-xs text-text-secondary dark:text-gray-400">Ready for immediate withdrawal</p>
          </div>
        </div>
      </section>

      <section id="wallet-history" className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
           <h3 className="text-lg font-bold text-text-primary dark:text-white">Payment History &amp; Escrow Status</h3>
           <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-border-color dark:border-gray-700 rounded-lg p-1">
              <button className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-text-primary dark:text-white rounded-md shadow-sm">All</button>
              <button className="px-3 py-1 text-xs font-medium text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md">Pending</button>
              <button className="px-3 py-1 text-xs font-medium text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md">Released</button>
           </div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-border-color dark:border-gray-700 rounded-xl shadow-card overflow-hidden overflow-x-auto">
           <div className="min-w-[800px] grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_0.5fr] gap-4 px-6 py-4 bg-gray-50/50 dark:bg-gray-900/50 border-b border-border-color dark:border-gray-700 text-xs font-semibold text-text-secondary dark:text-gray-400 uppercase tracking-wider">
              <div>Campaign &amp; Brand</div>
              <div>Escrow Status</div>
              <div>Release Date</div>
              <div>Method</div>
              <div className="text-right">Amount</div>
              <div className="text-right">Action</div>
           </div>
           <div className="divide-y divide-border-color dark:divide-gray-700 min-w-[800px]">
              {[
                { title: "VR Headset Unboxing", brand: "TechFlow AI", status: "In Escrow", date: "Est. Nov 05, 2023", method: "Wire Transfer", amount: "$1,200.00", icon: "lock", statusClass: "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-100 dark:border-orange-900/30", logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaaFbQihFfy-F6e5rien4N3nqD2ZVjagkT3ggFv5wZ2ytBjVxB3e5Lkw-2gUBg_mOc4f5FYiQ0Oyh0IQd8HYm49V1abSGN9so7_FUIO7nIMJVa4dg2k954krxoVARfLWHqET9tWAIrvxZViGNb290HSv5nG2vATLeKmVbexOJ6UPbuv0eQg3kUXQYHoRCJAbwj8L8L7ye9IqMX-sHBm0ehaYkW-GV4TYQsbW4xkfa1C1bLafHNqlfawtpnEGQsoYzRnMwznSWulJ-r" },
                { title: "Summer Flavor Drop", brand: "Fizz", status: "Released", date: "Oct 20, 2023", method: "PayPal", amount: "$3,500.00", icon: "check_circle", statusClass: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-100 dark:border-green-900/30", logoText: "FZ", logoBg: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" },
                { title: "Retro Console Launch", brand: "GameStation", status: "Pending Approval", date: "Est. Nov 12, 2023", method: "Wire Transfer", amount: "$2,100.00", icon: "pending_actions", statusClass: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-100 dark:border-yellow-900/30", logoText: "GS", logoBg: "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400" },
              ].map((tx, i) => (
                <div key={i} className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_0.5fr] gap-4 px-6 py-5 items-center hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group">
                   <div className="flex items-center gap-4">
                      {tx.logo ? (
                         <div className="size-10 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-gray-800 overflow-hidden shrink-0">
                           <img src={tx.logo} alt="Brand" className="w-6 h-6 object-contain" />
                         </div>
                      ) : (
                         <div className={`size-10 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center font-bold text-sm shrink-0 ${tx.logoBg}`}>
                           {tx.logoText}
                         </div>
                      )}
                      <div className="flex flex-col">
                         <span className="text-sm font-bold text-text-primary dark:text-white">{tx.title}</span>
                         <span className="text-xs text-text-secondary dark:text-gray-400">{tx.brand}</span>
                      </div>
                   </div>
                   <div className="flex items-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${tx.statusClass}`}>
                         <span className="material-symbols-outlined text-[14px]">{tx.icon}</span>
                         {tx.status}
                      </span>
                   </div>
                   <div className="text-sm text-text-secondary dark:text-gray-400 font-medium">{tx.date}</div>
                   <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-400">
                      {tx.method === 'PayPal' ? (
                          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSU5EtBb518PnaXzU6waLSMniZ1wCZCmpoLn5A4TFMUBtPsqpNDwrnV2ow8HuX0zTNdJI84eHN7GmCyE8-MXaUoLyZqquP8sXYvKkg4j95Whb_jMsZV1woGwkf6RvpdTERLTnhOSOWxl3LH7LUJ4Ezkcsav6FMjuBUCXOYahRPjc0bECwdjOVNlzrzqGZ1yQsO1wMbjmZwxiULoX_uLs7livduIOYlMR4bCiVIfiLmwDADO8Y93RsoVi4WQ0d677uLv1sx85ehDoZF" className="h-4 opacity-60 grayscale group-hover:grayscale-0 transition-all" alt="PayPal" />
                      ) : (
                          <span className="material-symbols-outlined text-[18px]">account_balance</span>
                      )}
                      {tx.method}
                   </div>
                   <div className="text-right font-bold text-text-primary dark:text-white">{tx.amount}</div>
                   <div className="text-right">
                       <button className="p-2 text-text-secondary hover:text-primary transition-colors">
                           <span className="material-symbols-outlined text-[20px]">download</span>
                       </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Withdraw Modal */}
      {isWithdrawOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsWithdrawOpen(false)}></div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-float w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-border-color dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center">
                      <h3 className="font-bold text-text-primary dark:text-white">Withdraw Funds</h3>
                      <button onClick={() => setIsWithdrawOpen(false)} className="text-text-secondary hover:text-text-primary dark:text-gray-400 dark:hover:text-white"><span className="material-symbols-outlined">close</span></button>
                  </div>
                  <div className="p-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mb-6">
                          <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">Available to Withdraw</p>
                          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">$8,450.00</p>
                      </div>
                      
                      <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">Amount</label>
                      <div className="relative mb-4">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary dark:text-gray-500 font-bold">$</span>
                          <input type="number" className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-primary focus:border-primary font-bold" placeholder="0.00" />
                          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded hover:bg-primary/20">MAX</button>
                      </div>

                      <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">Destination</label>
                      <select className="w-full px-3 py-2.5 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-primary focus:border-primary text-sm mb-6">
                          <option>PayPal (alex***@gmail.com)</option>
                          <option>Bank Account (**** 4242)</option>
                      </select>

                      <button onClick={() => setIsWithdrawOpen(false)} className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-[20px]">payments</span>
                          Process Withdrawal
                      </button>
                      <p className="text-center text-[10px] text-text-secondary dark:text-gray-500 mt-3">
                          Transfers typically take 1-3 business days.
                      </p>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Wallet;