import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_AVATAR } from '../types';
import { MOCK_CREATOR_STATS } from '../data/gamificationData';

interface ProfileMenuProps {
    onLogout: () => void;
    darkMode?: boolean;
    toggleTheme?: () => void;
}

type TabType = 'profile' | 'settings';

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onLogout, darkMode, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('profile');
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        setIsOpen(false);
        onLogout();
    };

    const creatorData = {
        name: 'Alex Morgan',
        handle: '@alexmorgan',
        platform: 'YouTube',
        verified: true,
        followers: '124.5K',
        rating: MOCK_CREATOR_STATS.avgRating,
        avatar: USER_AVATAR,
    };

    return (
        <div ref={menuRef} className="relative">
            {/* Avatar Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors ${isOpen
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                aria-label="Profile menu"
            >
                <img
                    src={creatorData.avatar}
                    alt="Profile"
                    className="size-8 rounded-full object-cover ring-2 ring-white dark:ring-gray-800 shadow-sm"
                />
                <span className="material-symbols-outlined text-[18px] text-gray-400">
                    {isOpen ? 'expand_less' : 'expand_more'}
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-float border border-border-color dark:border-gray-700 overflow-hidden z-[100] origin-top-right animate-in fade-in zoom-in-95 duration-200">

                    {/* Creator Summary Card */}
                    <div className="p-4 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 border-b border-border-color dark:border-gray-700">
                        <div className="flex items-start gap-3">
                            <img
                                src={creatorData.avatar}
                                alt="Profile"
                                className="size-14 rounded-xl object-cover ring-2 ring-white dark:ring-gray-700 shadow-md"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <h3 className="font-bold text-text-primary dark:text-white truncate">{creatorData.name}</h3>
                                    {creatorData.verified && (
                                        <span className="material-symbols-outlined text-[16px] text-blue-500" title="Verified Creator">verified</span>
                                    )}
                                </div>
                                <p className="text-xs text-text-secondary dark:text-gray-400">{creatorData.handle}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px] text-red-500">smart_display</span>
                                        <span className="text-[10px] font-medium text-text-secondary dark:text-gray-400">{creatorData.platform}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px] text-gray-400">group</span>
                                        <span className="text-[10px] font-bold text-text-primary dark:text-white">{creatorData.followers}</span>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <span className="material-symbols-outlined text-[14px] text-yellow-500">star</span>
                                        <span className="text-[10px] font-bold text-text-primary dark:text-white">{creatorData.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex border-b border-border-color dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors relative ${activeTab === 'profile'
                                ? 'text-primary dark:text-white'
                                : 'text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white'
                                }`}
                        >
                            Profile
                            {activeTab === 'profile' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors relative ${activeTab === 'settings'
                                ? 'text-primary dark:text-white'
                                : 'text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white'
                                }`}
                        >
                            Settings
                            {activeTab === 'settings' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                            )}
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-4 max-h-[300px] overflow-y-auto">
                        {activeTab === 'profile' && (
                            <div className="space-y-3 animate-in fade-in duration-200">
                                {/* Quick Stats */}
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 text-center">
                                        <p className="text-lg font-bold text-text-primary dark:text-white">{MOCK_CREATOR_STATS.totalCampaigns}</p>
                                        <p className="text-[10px] text-text-secondary dark:text-gray-400">Campaigns</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 text-center">
                                        <p className="text-lg font-bold text-green-600 dark:text-green-400">${(MOCK_CREATOR_STATS.lifetimeEarnings / 1000).toFixed(1)}K</p>
                                        <p className="text-[10px] text-text-secondary dark:text-gray-400">Earned</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 text-center">
                                        <p className="text-lg font-bold text-text-primary dark:text-white">{MOCK_CREATOR_STATS.winRate}%</p>
                                        <p className="text-[10px] text-text-secondary dark:text-gray-400">Win Rate</p>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="space-y-1">
                                    <button
                                        onClick={() => { setIsOpen(false); navigate('/profile'); }}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px] text-gray-400">person</span>
                                        Edit Profile
                                        <span className="material-symbols-outlined text-[14px] text-gray-400 ml-auto">chevron_right</span>
                                    </button>
                                    <button
                                        onClick={() => { setIsOpen(false); navigate('/profile'); }}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px] text-gray-400">link</span>
                                        Social Links
                                        <span className="material-symbols-outlined text-[14px] text-gray-400 ml-auto">chevron_right</span>
                                    </button>
                                    <button
                                        onClick={() => { setIsOpen(false); navigate('/profile'); }}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px] text-gray-400">sell</span>
                                        Pricing & Rates
                                        <span className="material-symbols-outlined text-[14px] text-gray-400 ml-auto">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="space-y-3 animate-in fade-in duration-200">
                                {/* Theme Toggle */}
                                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-[18px] text-gray-400">
                                            {darkMode ? 'dark_mode' : 'light_mode'}
                                        </span>
                                        <span className="text-sm text-text-primary dark:text-white">Dark Mode</span>
                                    </div>
                                    <button
                                        onClick={toggleTheme}
                                        className={`w-10 h-5 rounded-full transition-colors relative ${darkMode ? 'bg-primary' : 'bg-gray-300'
                                            }`}
                                    >
                                        <div className={`absolute top-0.5 size-4 bg-white rounded-full shadow transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0.5'
                                            }`} />
                                    </button>
                                </div>

                                {/* Settings Links */}
                                <div className="space-y-1">
                                    <button
                                        onClick={() => { setIsOpen(false); navigate('/settings'); }}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px] text-gray-400">notifications</span>
                                        Notification Preferences
                                        <span className="material-symbols-outlined text-[14px] text-gray-400 ml-auto">chevron_right</span>
                                    </button>
                                    <button
                                        onClick={() => { setIsOpen(false); navigate('/settings'); }}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px] text-gray-400">payments</span>
                                        Payout Settings
                                        <span className="material-symbols-outlined text-[14px] text-gray-400 ml-auto">chevron_right</span>
                                    </button>
                                    <button
                                        onClick={() => { setIsOpen(false); navigate('/settings'); }}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px] text-gray-400">security</span>
                                        Security & Privacy
                                        <span className="material-symbols-outlined text-[14px] text-gray-400 ml-auto">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Logout Button */}
                    <div className="p-3 border-t border-border-color dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[18px]">logout</span>
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
