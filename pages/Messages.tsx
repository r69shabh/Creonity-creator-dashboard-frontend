import React, { useState } from 'react';
import EntityProfileContent from '../components/EntityProfileContent';

type ProfileView = 'none' | 'company' | 'manager';

const Messages: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const [showInfo, setShowInfo] = useState(true);
  const [activeProfile, setActiveProfile] = useState<ProfileView>('none');

  return (
    <div className="flex h-full bg-white dark:bg-gray-900 overflow-hidden">
      {/* Sidebar List */}
      <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-border-color dark:border-gray-700 bg-sidebar-bg dark:bg-gray-950 h-full md:flex shrink-0">
        <div className="p-4 border-b border-border-color dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center gap-2">
           <button onClick={onMenuClick} className="md:hidden p-2 text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white">
              <span className="material-symbols-outlined">menu</span>
           </button>
           <div className="relative flex-1">
             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary dark:text-gray-500">
               <span className="material-symbols-outlined text-[18px]">search</span>
             </span>
             <input className="w-full h-10 pl-9 pr-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-border-color dark:border-gray-700 text-sm text-text-primary dark:text-white placeholder-text-secondary dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="Search conversations" type="text"/>
           </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar bg-white dark:bg-gray-900">
           {/* Active Chat Item */}
           <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 border-l-4 border-primary cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="relative shrink-0">
                 <div className="size-10 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden">
                   <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaaFbQihFfy-F6e5rien4N3nqD2ZVjagkT3ggFv5wZ2ytBjVxB3e5Lkw-2gUBg_mOc4f5FYiQ0Oyh0IQd8HYm49V1abSGN9so7_FUIO7nIMJVa4dg2k954krxoVARfLWHqET9tWAIrvxZViGNb290HSv5nG2vATLeKmVbexOJ6UPbuv0eQg3kUXQYHoRCJAbwj8L8L7ye9IqMX-sHBm0ehaYkW-GV4TYQsbW4xkfa1C1bLafHNqlfawtpnEGQsoYzRnMwznSWulJ-r" className="w-6 h-6 object-contain" alt="Brand"/>
                 </div>
                 <span className="absolute -bottom-1 -right-1 size-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
              </div>
              <div className="flex-1 min-w-0">
                 <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-bold text-text-primary dark:text-white truncate">TechFlow AI</span>
                    <span className="text-xs font-medium text-text-primary dark:text-gray-300">10:23 AM</span>
                 </div>
                 <div className="text-xs text-text-secondary dark:text-gray-400 font-medium mb-1 truncate">Campaign: VR Headset Unboxing</div>
                 <p className="text-sm text-text-secondary dark:text-gray-400 truncate">Could you update the draft with the new...</p>
              </div>
           </div>
           {/* Other Chat Items */}
           {[
             { name: 'Fizz', time: 'Yesterday', campaign: 'Summer Flavor Drop', msg: 'Payment has been released to escrow.', initial: 'FZ', bg: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' },
             { name: 'GameStation', time: 'Oct 28', campaign: 'Retro Console Launch', msg: 'Contract signed! Let\'s get started.', initial: 'GS', bg: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400', unread: true },
           ].map((chat, i) => (
             <div key={i} className="flex items-start gap-3 p-4 border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors border-b border-border-color/50 dark:border-gray-800">
                <div className="relative shrink-0">
                   <div className={`size-10 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center ${chat.bg} font-bold text-sm`}>
                      {chat.initial}
                   </div>
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-bold text-text-primary dark:text-white truncate">{chat.name}</span>
                      <span className="text-xs text-text-secondary dark:text-gray-500">{chat.time}</span>
                   </div>
                   <div className="text-xs text-text-secondary dark:text-gray-400 font-medium mb-1 truncate">Campaign: {chat.campaign}</div>
                   <p className={`text-sm text-text-secondary dark:text-gray-400 truncate ${chat.unread ? 'font-semibold text-text-primary dark:text-gray-200' : ''}`}>{chat.msg}</p>
                </div>
                {chat.unread && <div className="size-2 bg-primary rounded-full mt-2 shrink-0"></div>}
             </div>
           ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="hidden md:flex flex-1 flex-col h-full bg-white dark:bg-gray-900 relative min-w-0">
         <div className="h-16 px-6 border-b border-border-color dark:border-gray-700 flex items-center justify-between shrink-0 bg-white dark:bg-gray-900 z-10 transition-colors">
           <div className="flex flex-col">
              <h2 className="text-base font-bold text-text-primary dark:text-white flex items-center gap-2">
                 TechFlow AI
                 <span className="material-symbols-outlined text-green-500 text-[16px]" title="Verified Brand">verified</span>
              </h2>
              <div className="flex items-center gap-2 text-xs text-text-secondary dark:text-gray-400">
                 <span>VR Headset Unboxing</span>
                 <span className="text-gray-300 dark:text-gray-600">•</span>
                 <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide">Active</span>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowInfo(!showInfo)} 
                className={`p-2 rounded-lg transition-colors ${showInfo ? 'bg-primary/10 text-primary' : 'text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                title="Toggle details"
              >
                  <span className="material-symbols-outlined text-[20px]">dock_to_right</span>
              </button>
              <button className="p-2 text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30 dark:bg-black/20 flex flex-col gap-6">
           <div className="flex justify-center">
              <span className="text-[10px] font-semibold text-text-secondary dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full uppercase tracking-wider">Today, Nov 05</span>
           </div>
           {/* Messages content truncated for brevity, identical to previous logic */}
           <div className="flex gap-4 max-w-[85%]">
              <div className="size-8 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shrink-0 flex items-center justify-center bg-white dark:bg-gray-900">
                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaaFbQihFfy-F6e5rien4N3nqD2ZVjagkT3ggFv5wZ2ytBjVxB3e5Lkw-2gUBg_mOc4f5FYiQ0Oyh0IQd8HYm49V1abSGN9so7_FUIO7nIMJVa4dg2k954krxoVARfLWHqET9tWAIrvxZViGNb290HSv5nG2vATLeKmVbexOJ6UPbuv0eQg3kUXQYHoRCJAbwj8L8L7ye9IqMX-sHBm0ehaYkW-GV4TYQsbW4xkfa1C1bLafHNqlfawtpnEGQsoYzRnMwznSWulJ-r" className="w-5 h-5 object-contain" alt="Brand"/>
              </div>
              <div className="flex flex-col gap-1">
                 <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold text-text-primary dark:text-white">Sarah from TechFlow</span>
                    <span className="text-[10px] text-text-secondary dark:text-gray-500">09:15 AM</span>
                 </div>
                 <div className="bg-white dark:bg-gray-800 border border-border-color dark:border-gray-700 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-text-primary dark:text-gray-200 leading-relaxed">
                    Hi Alex! Just checking in on the draft submission for the unboxing video. We're excited to see what you've created!
                 </div>
              </div>
           </div>
           
           {/* Message Out */}
           <div className="flex flex-row-reverse gap-4 max-w-[85%] self-end">
              <div className="size-8 rounded-lg bg-cover bg-center shrink-0 border border-gray-200 dark:border-gray-700" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYtolB4MoPCaLd8-GruiXPnxicFrdsUjXkxG5954nO-HE27pn1vBACtX_oZhVcySrMi-M2D9ZjAFd6Kurn75azi_VFk4W_jS4qQsW0BSzfpV7Hd5RP3A3Mp3KmHZxDqAdAnYoEsSzG4E3zi1mmmbcxiKzL05R2sW7gnNLD0K_N_okZ6H6MJfXags6dMuy-XgHTY3TIv8FZiEdZr4HK2z9ZkSdOfwPID9Y7RtSwdmA0n_C2n9fDxCSB3-8mmCk8XeIkZwmFg3bGnmyt")'}}></div>
              <div className="flex flex-col gap-1 items-end">
                 <div className="flex items-baseline gap-2 flex-row-reverse">
                    <span className="text-xs font-bold text-text-primary dark:text-white">You</span>
                    <span className="text-[10px] text-text-secondary dark:text-gray-500">09:42 AM</span>
                 </div>
                 <div className="bg-message-outgoing dark:bg-primary/20 border border-blue-100 dark:border-primary/20 p-3 rounded-2xl rounded-tr-none shadow-sm text-sm text-text-primary dark:text-white leading-relaxed">
                    Hey Sarah! Yes, just wrapping up the final edits. Uploading it right now for your approval.
                 </div>
              </div>
           </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-gray-900 border-t border-border-color dark:border-gray-700 shrink-0">
           <div className="flex flex-col gap-2 relative">
              <div className="flex items-end gap-2 bg-gray-50 dark:bg-gray-800 border border-border-color dark:border-gray-700 rounded-xl p-2 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary focus-within:bg-white dark:focus-within:bg-gray-900 transition-all shadow-sm">
                 <button className="p-2 text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white rounded-lg transition-colors shrink-0"><span className="material-symbols-outlined text-[20px]">attach_file</span></button>
                 <textarea className="w-full bg-transparent border-none p-2 text-sm text-text-primary dark:text-white placeholder-text-secondary dark:placeholder-gray-500 focus:ring-0 resize-none max-h-32" placeholder="Type your message..." rows={1}></textarea>
                 <div className="flex items-center gap-1 shrink-0 pb-1">
                    <button className="p-2 bg-primary text-white hover:bg-primary-hover rounded-lg transition-all shadow-sm flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">send</span></button>
                 </div>
              </div>
              <div className="flex items-center justify-between px-1">
                 <span className="text-[10px] text-text-secondary dark:text-gray-500"><strong>Enter</strong> to send</span>
                 <div className="flex gap-3">
                    <button className="text-[11px] font-medium text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-primary flex items-center gap-1 transition-colors"><span className="material-symbols-outlined text-[14px]">request_quote</span> Request Payment</button>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Info Sidebar (Right) */}
      {showInfo && (
        <div className="hidden xl:flex w-80 flex-col border-l border-border-color dark:border-gray-700 bg-white dark:bg-gray-900 h-full overflow-y-auto shrink-0 transition-all relative">
            
            {/* Default View */}
            {activeProfile === 'none' && (
                <div className="p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    {/* Company Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-sm p-5 transition-all hover:shadow-md">
                        <div className="flex flex-col items-center text-center mb-4 cursor-pointer" onClick={() => setActiveProfile('company')}>
                            <div className="size-16 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-center p-2 mb-3">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaaFbQihFfy-F6e5rien4N3nqD2ZVjagkT3ggFv5wZ2ytBjVxB3e5Lkw-2gUBg_mOc4f5FYiQ0Oyh0IQd8HYm49V1abSGN9so7_FUIO7nIMJVa4dg2k954krxoVARfLWHqET9tWAIrvxZViGNb290HSv5nG2vATLeKmVbexOJ6UPbuv0eQg3kUXQYHoRCJAbwj8L8L7ye9IqMX-sHBm0ehaYkW-GV4TYQsbW4xkfa1C1bLafHNqlfawtpnEGQsoYzRnMwznSWulJ-r" alt="Brand" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="font-bold text-lg text-text-primary dark:text-white hover:text-primary dark:hover:text-primary transition-colors">TechFlow AI</h3>
                            <p className="text-xs text-text-secondary dark:text-gray-400">Software & SaaS</p>
                            <div className="flex items-center gap-1 mt-2">
                                <span className="material-symbols-outlined text-[16px] text-yellow-500">star</span>
                                <span className="text-sm font-bold text-text-primary dark:text-white">4.8</span>
                                <span className="text-xs text-text-secondary dark:text-gray-500">(24 Reviews)</span>
                            </div>
                        </div>
                        {/* Stats ... */}
                    </div>

                    {/* Campaign Manager Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-sm p-5 transition-all hover:shadow-md">
                        <h4 className="text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-3">Campaign Manager</h4>
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveProfile('manager')}>
                            <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-text-secondary dark:text-gray-300">SM</div>
                            <div>
                                <p className="text-sm font-bold text-text-primary dark:text-white hover:text-primary dark:hover:text-primary transition-colors">Sarah Miller</p>
                                <p className="text-xs text-text-secondary dark:text-gray-400">Senior Marketing Mgr.</p>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button className="flex-1 py-1.5 text-xs font-bold bg-gray-50 dark:bg-gray-700 text-text-primary dark:text-white rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600">Profile</button>
                            <button className="flex-1 py-1.5 text-xs font-bold bg-gray-50 dark:bg-gray-700 text-text-primary dark:text-white rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600">Email</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Detailed Company View using Shared Component */}
            {activeProfile !== 'none' && (
                <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300 bg-white dark:bg-gray-900 absolute inset-0 z-10">
                    <div className="p-4 border-b border-border-color dark:border-gray-700 flex items-center gap-2">
                        <button onClick={() => setActiveProfile('none')} className="p-2 -ml-2 rounded-lg text-text-secondary dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <span className="font-bold text-text-primary dark:text-white capitalize">{activeProfile} Profile</span>
                    </div>
                    <div className="overflow-y-auto p-6 space-y-6">
                         <EntityProfileContent type={activeProfile} />
                    </div>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default Messages;