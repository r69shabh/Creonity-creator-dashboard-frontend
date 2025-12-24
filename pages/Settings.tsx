import React from 'react';

interface SettingsProps {
  darkMode?: boolean;
  toggleTheme?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ darkMode, toggleTheme }) => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-12 p-6">
      
      {/* 1. Dashboard Preferences */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border-color dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <h2 className="text-base font-bold text-text-primary dark:text-white uppercase tracking-wide">Dashboard & Experience</h2>
        </div>
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-text-primary dark:text-white">Default Landing Page</h3>
                    <p className="text-xs text-text-secondary dark:text-gray-400">Choose the first page you see when you log in.</p>
                </div>
                <select className="bg-white dark:bg-gray-900 border border-border-color dark:border-gray-700 text-sm rounded-lg p-2.5 focus:ring-primary focus:border-primary">
                    <option>Dashboard</option>
                    <option>Auctions</option>
                    <option>Campaigns</option>
                    <option>Messages</option>
                </select>
            </div>
            
            <hr className="border-border-color dark:border-gray-700" />
            
            <div className="space-y-4">
                <h3 className="font-semibold text-text-primary dark:text-white text-sm">Visible Widgets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {[
                       'Earnings Summary', 'Active Bids', 'Campaign Performance', 'Platform Analytics', 'Recent Messages'
                   ].map((widget, i) => (
                       <label key={i} className="flex items-center justify-between p-3 border border-border-color dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                           <span className="text-sm font-medium text-text-primary dark:text-gray-200">{widget}</span>
                           <input type="checkbox" className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" defaultChecked />
                       </label>
                   ))}
                </div>
            </div>
        </div>
      </section>

      {/* 2. Notifications */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border-color dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <h2 className="text-base font-bold text-text-primary dark:text-white uppercase tracking-wide">Notifications</h2>
        </div>
        <div className="divide-y divide-border-color dark:divide-gray-700">
            {[
                { title: "Auction Updates", desc: "Get notified when you are outbid or an auction ends.", email: true, push: true },
                { title: "New Opportunities", desc: "Receive alerts for new campaigns matching your niche.", email: true, push: false },
                { title: "Payment Status", desc: "Updates on escrow releases and withdrawals.", email: true, push: true },
                { title: "Direct Messages", desc: "When a brand sends you a message.", email: false, push: true },
            ].map((item, i) => (
                <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="font-semibold text-text-primary dark:text-white">{item.title}</h3>
                        <p className="text-xs text-text-secondary dark:text-gray-400">{item.desc}</p>
                    </div>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600" defaultChecked={item.email} />
                            <span className="text-sm text-text-secondary dark:text-gray-400">Email</span>
                        </label>
                         <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600" defaultChecked={item.push} />
                            <span className="text-sm text-text-secondary dark:text-gray-400">Push</span>
                        </label>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* 3. Appearance (Dark Mode) */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-sm overflow-hidden">
         <div className="px-6 py-4 border-b border-border-color dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <h2 className="text-base font-bold text-text-primary dark:text-white uppercase tracking-wide">Appearance</h2>
        </div>
        <div className="p-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="size-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-text-secondary dark:text-white transition-colors">
                     <span className="material-symbols-outlined text-[24px]">{darkMode ? 'dark_mode' : 'light_mode'}</span>
                 </div>
                 <div>
                     <p className="font-bold text-text-primary dark:text-white">Dark Mode</p>
                     <p className="text-xs text-text-secondary dark:text-gray-400">Switch between light and dark themes.</p>
                 </div>
              </div>
              <button 
                onClick={toggleTheme}
                className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out ${darkMode ? 'bg-primary' : 'bg-gray-200'}`}
              >
                 <div className={`size-6 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
           </div>
        </div>
      </section>

       {/* 4. Payment & Security */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-sm overflow-hidden h-full">
                <div className="px-6 py-4 border-b border-border-color dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                    <h2 className="text-base font-bold text-text-primary dark:text-white uppercase tracking-wide">Payout Settings</h2>
                </div>
                <div className="p-6 space-y-4">
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-text-secondary dark:text-gray-400 uppercase">Payout Method</label>
                        <select className="w-full h-10 rounded-lg bg-white dark:bg-gray-900 border border-border-color dark:border-gray-700 text-sm focus:ring-primary focus:border-primary">
                            <option>Stripe (Connected)</option>
                            <option>PayPal (alex***@gmail.com)</option>
                            <option>Wire Transfer</option>
                        </select>
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-text-secondary dark:text-gray-400 uppercase">Currency</label>
                        <select className="w-full h-10 rounded-lg bg-white dark:bg-gray-900 border border-border-color dark:border-gray-700 text-sm focus:ring-primary focus:border-primary">
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>GBP (£)</option>
                        </select>
                     </div>
                     <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-medium text-text-primary dark:text-white">Auto-Withdraw</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                     </div>
                </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-sm overflow-hidden h-full">
                <div className="px-6 py-4 border-b border-border-color dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                    <h2 className="text-base font-bold text-text-primary dark:text-white uppercase tracking-wide">Security</h2>
                </div>
                <div className="p-6 space-y-4">
                    <button className="flex items-center justify-between w-full p-3 rounded-lg border border-border-color dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-left transition-colors">
                        <div>
                            <p className="font-semibold text-text-primary dark:text-white text-sm">Change Password</p>
                            <p className="text-xs text-text-secondary dark:text-gray-400">Last changed 90 days ago</p>
                        </div>
                        <span className="material-symbols-outlined text-text-secondary">chevron_right</span>
                    </button>
                    <button className="flex items-center justify-between w-full p-3 rounded-lg border border-border-color dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-left transition-colors">
                        <div>
                            <p className="font-semibold text-text-primary dark:text-white text-sm">Two-Factor Auth</p>
                            <p className="text-xs text-green-600 font-bold">Enabled</p>
                        </div>
                        <span className="material-symbols-outlined text-text-secondary">chevron_right</span>
                    </button>
                    <div className="pt-2">
                        <button className="text-red-600 text-sm font-bold hover:underline">Deactivate Account</button>
                    </div>
                </div>
            </section>
       </div>

    </div>
  );
};

export default Settings;