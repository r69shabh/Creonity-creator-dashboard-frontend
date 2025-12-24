import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { INITIAL_NOTIFICATIONS } from '../data/mockData';
import Avatar from './ui/Avatar';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({...n, unread: false})));
  };

  const getIcon = (type: string) => {
    switch(type) {
      // Changed orange to teal
      case 'bid': return { icon: 'gavel', color: 'text-brand-blue bg-blue-50 dark:bg-blue-900/30' };
      case 'alert': return { icon: 'timer', color: 'text-accent-teal-dark bg-[#1BD1C9]/10 dark:text-[#1BD1C9] dark:bg-[#036964]/30' };
      case 'payment': return { icon: 'payments', color: 'text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400' };
      case 'message': return { icon: 'chat', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400' };
      default: return { icon: 'notifications', color: 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400' };
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 py-4 border-b border-border-color dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-20 transition-colors">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 text-text-secondary hover:text-text-primary dark:text-gray-400 dark:hover:text-white">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary dark:text-white">{title}</h1>
      </div>
      
      <div className="flex items-center gap-3 ml-auto relative">
        <div ref={notificationRef} className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-lg transition-colors ${showNotifications ? 'bg-gray-100 dark:bg-gray-800 text-text-primary dark:text-white' : 'text-text-secondary dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-text-primary dark:hover:text-white'}`}
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && <span className="absolute top-2 right-2 size-2 bg-accent-teal rounded-full ring-2 ring-white dark:ring-gray-900"></span>}
          </button>

          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-xl shadow-float border border-border-color dark:border-gray-700 overflow-hidden z-50 origin-top-right animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-3 border-b border-border-color dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
                <h3 className="font-bold text-text-primary dark:text-white text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-[10px] font-bold text-brand-blue hover:text-brand-blue/80 uppercase tracking-wider">Mark all read</button>
                )}
              </div>
              <div className="max-h-[360px] overflow-y-auto">
                {notifications.map((item) => {
                  const style = getIcon(item.type);
                  return (
                    <div key={item.id} className={`p-4 border-b border-border-color dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex gap-3 group relative cursor-pointer ${item.unread ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/30 dark:bg-gray-800/30'}`}>
                      {item.unread && <div className="absolute left-0 top-4 bottom-4 w-1 bg-brand-blue rounded-r-full"></div>}
                      <div className={`size-10 rounded-full ${style.color} flex items-center justify-center shrink-0 border border-white dark:border-gray-700 shadow-sm`}>
                        <span className="material-symbols-outlined text-[20px]">{style.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-0.5">
                          <h4 className={`text-sm ${item.unread ? 'font-bold text-text-primary dark:text-white' : 'font-medium text-text-primary dark:text-gray-300'}`}>{item.title}</h4>
                          <span className="text-[10px] text-text-secondary dark:text-gray-500 whitespace-nowrap ml-2">{item.time}</span>
                        </div>
                        <p className="text-xs text-text-secondary dark:text-gray-400 line-clamp-2 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-2 border-t border-border-color dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-center">
                <Link to="/messages" onClick={() => setShowNotifications(false)} className="text-xs font-semibold text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white py-1 px-3 rounded hover:bg-gray-200/50 dark:hover:bg-gray-700 transition-colors w-full block">
                  View All Notifications
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;