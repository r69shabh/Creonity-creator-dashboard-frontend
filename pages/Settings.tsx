import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';

interface SettingsProps {
  darkMode?: boolean;
  toggleTheme?: () => void;
}

interface AppSettings {
  landingPage: string;
  visibleWidgets: Record<string, boolean>;
  notifications: Record<string, { email: boolean; push: boolean }>;
  payout: {
    method: string;
    currency: string;
    autoWithdraw: boolean;
  };
}

const DEFAULT_SETTINGS: AppSettings = {
  landingPage: 'Dashboard',
  visibleWidgets: {
    'Earnings Summary': true,
    'Active Bids': true,
    'Campaign Performance': true,
    'Platform Analytics': false,
    'Recent Messages': true,
  },
  notifications: {
    'Auction Updates': { email: true, push: true },
    'New Opportunities': { email: true, push: false },
    'Payment Status': { email: true, push: true },
    'Direct Messages': { email: false, push: true },
  },
  payout: {
    method: 'Stripe (Connected)',
    currency: 'USD ($)',
    autoWithdraw: false,
  }
};

const Settings: React.FC<SettingsProps> = ({ darkMode, toggleTheme }) => {
  const { addToast } = useToast();
  
  // Initialize state from local storage
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('creonity_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Save to local storage whenever settings change
  useEffect(() => {
    localStorage.setItem('creonity_settings', JSON.stringify(settings));
  }, [settings]);

  const handleLandingPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({ ...prev, landingPage: e.target.value }));
    addToast('Default landing page updated', 'success');
  };

  const toggleWidget = (widget: string) => {
    setSettings(prev => ({
      ...prev,
      visibleWidgets: {
        ...prev.visibleWidgets,
        [widget]: !prev.visibleWidgets[widget]
      }
    }));
  };

  const toggleNotification = (type: string, channel: 'email' | 'push') => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: {
          ...prev.notifications[type],
          [channel]: !prev.notifications[type][channel]
        }
      }
    }));
  };

  const updatePayout = (field: keyof AppSettings['payout'], value: any) => {
    setSettings(prev => ({
      ...prev,
      payout: {
        ...prev.payout,
        [field]: value
      }
    }));
  };

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
                <select 
                  value={settings.landingPage}
                  onChange={handleLandingPageChange}
                  className="bg-white dark:bg-gray-900 border border-border-color dark:border-gray-700 text-sm rounded-lg p-2.5 focus:ring-primary focus:border-primary text-text-primary dark:text-white"
                >
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
                   {Object.keys(settings.visibleWidgets).map((widget) => (
                       <label key={widget} className="flex items-center justify-between p-3 border border-border-color dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                           <span className="text-sm font-medium text-text-primary dark:text-gray-200">{widget}</span>
                           <input 
                              type="checkbox" 
                              checked={settings.visibleWidgets[widget]}
                              onChange={() => toggleWidget(widget)}
                              className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600" 
                            />
                       </label>
                   ))}
                </div>
            </div>
        </div>
      </section>

      {/* 2. Appearance (Theme & Color) */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-sm overflow-hidden">
         <div className="px-6 py-4 border-b border-border-color dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <h2 className="text-base font-bold text-text-primary dark:text-white uppercase tracking-wide">Appearance</h2>
        </div>
        <div className="p-6 space-y-8">
           {/* Dark Mode Toggle */}
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

      {/* 3. Notifications */}
      <section className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border-color dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <h2 className="text-base font-bold text-text-primary dark:text-white uppercase tracking-wide">Notifications</h2>
        </div>
        <div className="divide-y divide-border-color dark:divide-gray-700">
            {[
                { title: "Auction Updates", desc: "Get notified when you are outbid or an auction ends." },
                { title: "New Opportunities", desc: "Receive alerts for new campaigns matching your niche." },
                { title: "Payment Status", desc: "Updates on escrow releases and withdrawals." },
                { title: "Direct Messages", desc: "When a brand sends you a message." },
            ].map((item, i) => (
                <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="font-semibold text-text-primary dark:text-white">{item.title}</h3>
                        <p className="text-xs text-text-secondary dark:text-gray-400">{item.desc}</p>
                    </div>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={settings.notifications[item.title]?.email}
                              onChange={() => toggleNotification(item.title, 'email')}
                              className="rounded text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600" 
                            />
                            <span className="text-sm text-text-secondary dark:text-gray-400">Email</span>
                        </label>
                         <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={settings.notifications[item.title]?.push}
                              onChange={() => toggleNotification(item.title, 'push')}
                              className="rounded text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600" 
                            />
                            <span className="text-sm text-text-secondary dark:text-gray-400">Push</span>
                        </label>
                    </div>
                </div>
            ))}
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
                        <select 
                          value={settings.payout.method}
                          onChange={(e) => updatePayout('method', e.target.value)}
                          className="w-full h-10 rounded-lg bg-white dark:bg-gray-900 border border-border-color dark:border-gray-700 text-sm focus:ring-primary focus:border-primary text-text-primary dark:text-white"
                        >
                            <option>Stripe (Connected)</option>
                            <option>PayPal (alex***@gmail.com)</option>
                            <option>Wire Transfer</option>
                        </select>
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-text-secondary dark:text-gray-400 uppercase">Currency</label>
                        <select 
                          value={settings.payout.currency}
                          onChange={(e) => updatePayout('currency', e.target.value)}
                          className="w-full h-10 rounded-lg bg-white dark:bg-gray-900 border border-border-color dark:border-gray-700 text-sm focus:ring-primary focus:border-primary text-text-primary dark:text-white"
                        >
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                            <option>GBP (£)</option>
                        </select>
                     </div>
                     <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-medium text-text-primary dark:text-white">Auto-Withdraw</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={settings.payout.autoWithdraw}
                              onChange={(e) => updatePayout('autoWithdraw', e.target.checked)}
                              className="sr-only peer" 
                            />
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
                        <button onClick={() => addToast('Account deactivation requested', 'error')} className="text-red-600 text-sm font-bold hover:underline">Deactivate Account</button>
                    </div>
                </div>
            </section>
       </div>

    </div>
  );
};

export default Settings;