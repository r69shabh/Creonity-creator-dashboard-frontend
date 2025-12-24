import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { NAV_ITEMS, DRIVE_FOLDERS, USER_AVATAR } from '../types';

interface SidebarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileMenuOpen, setMobileMenuOpen, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [folders, setFolders] = useState(DRIVE_FOLDERS);
  
  const user = {
    firstName: 'Alex',
    lastName: 'Morgan',
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/profile');
    setMobileMenuOpen(false);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToast('Logged out successfully', 'success');
    if (onLogout) {
      onLogout();
    } else {
      // Fallback if not provided (shouldn't happen in updated app)
      navigate('/login');
    }
  };

  const handleAddFolder = () => {
    const name = window.prompt("Enter folder name:");
    if (name) {
      setFolders([...folders, { label: name, count: 0, color: 'text-gray-500' }]);
    }
  };

  return (
    <aside 
      className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-[280px] flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/90 backdrop-blur-xl h-full
        transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-gradient-to-tr from-primary to-orange-500 rounded-xl flex items-center justify-center text-white shadow-glow shrink-0">
            <span className="material-symbols-outlined text-[24px]">hub</span>
          </div>
          <div>
            <span className="block text-lg font-display font-bold text-text-primary dark:text-white tracking-tight leading-none">Creonity</span>
            <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-widest">Pro Dashboard</span>
          </div>
        </div>
      </div>

      <div className="px-4 mb-2">
        <div className="relative group">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </span>
          <input 
            className="w-full h-10 pl-10 pr-10 rounded-xl bg-gray-50 dark:bg-gray-900 border-none ring-1 ring-gray-200 dark:ring-gray-700 text-sm text-text-primary dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-primary/50 transition-all shadow-sm outline-none" 
            placeholder="Quick search..." 
            type="text" 
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5 bg-white dark:bg-gray-800">⌘K</span>
        </div>
      </div>

      <nav className="flex-1 px-3 flex flex-col gap-1 overflow-y-auto no-scrollbar py-4">
        <div className="text-[11px] font-bold text-gray-400 px-4 py-2 uppercase tracking-widest">Menu</div>
        
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) => `
              flex items-center justify-between px-4 py-2.5 rounded-xl font-medium transition-all group relative overflow-hidden
              ${isActive 
                ? 'bg-primary/10 text-primary dark:text-white dark:bg-primary/20' 
                : 'text-text-secondary dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-text-primary dark:hover:text-white'
              }
            `}
          >
            {({ isActive }) => (
                <>
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-r-full" />}
                    <div className="flex items-center gap-3 relative z-10">
                    <span className={`material-symbols-outlined text-[22px] ${isActive ? 'text-primary' : 'group-hover:text-primary transition-colors'}`}>
                        {item.icon}
                    </span>
                    <span className="font-display">{item.label}</span>
                    </div>
                    {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm ${item.badgeColor || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'}`}>
                        {item.badge}
                    </span>
                    )}
                </>
            )}
          </NavLink>
        ))}

        <NavLink
            to="/messages"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) => `
              flex items-center justify-between px-4 py-2.5 rounded-xl font-medium transition-all group relative overflow-hidden
              ${isActive 
                ? 'bg-primary/10 text-primary dark:text-white dark:bg-primary/20' 
                : 'text-text-secondary dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-text-primary dark:hover:text-white'
              }
            `}
          >
            {({ isActive }) => (
                <>
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-r-full" />}
                    <div className="flex items-center gap-3 relative z-10">
                    <span className={`material-symbols-outlined text-[22px] ${isActive ? 'text-primary' : 'group-hover:text-primary transition-colors'}`}>
                        chat
                    </span>
                    <span className="font-display">Messages</span>
                    </div>
                    <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-glow">3</span>
                </>
            )}
        </NavLink>

        <div className="mt-6 flex items-center justify-between px-4 py-2">
           <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Workspace</div>
           <button onClick={handleAddFolder} className="p-1 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-all">
             <span className="material-symbols-outlined text-[16px] block">add</span>
           </button>
        </div>
        
        {folders.map((item, idx) => (
          <NavLink 
            key={idx} 
            to={`/drive/${item.label}`}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) => `
              flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left group
              ${isActive 
                ? 'bg-gray-100 dark:bg-gray-800/50 text-text-primary dark:text-white' 
                : 'text-text-secondary dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-text-primary dark:hover:text-white'
              }
            `}
          >
            <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-[18px] ${item.color} opacity-80 group-hover:opacity-100`}>folder</span>
                {item.label}
            </div>
            <span className="text-[10px] font-bold text-gray-300 dark:text-gray-600 group-hover:text-gray-500">{item.count}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-gray-100 dark:border-gray-800">
        <div 
          onClick={handleProfileClick}
          className="bg-white dark:bg-gray-800 p-2 pr-2 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3 shadow-sm hover:shadow-md cursor-pointer transition-all group relative overflow-hidden ring-1 ring-gray-100 dark:ring-gray-700"
        >
          <div 
            className="size-10 rounded-lg bg-cover bg-center bg-no-repeat shrink-0 border border-gray-100 dark:border-gray-600" 
            style={{ backgroundImage: `url("${USER_AVATAR}")` }}
          ></div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-bold text-text-primary dark:text-white truncate leading-tight group-hover:text-primary transition-colors">{user.firstName} {user.lastName}</span>
            <span className="text-xs text-text-secondary dark:text-gray-400 truncate">Pro Plan</span>
          </div>
          
          <button 
            onClick={handleLogout}
            className="size-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            title="Log Out"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;