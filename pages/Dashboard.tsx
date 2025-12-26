import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis } from 'recharts';
import { Link } from 'react-router-dom';
import { INITIAL_NOTIFICATIONS } from '../data/mockData';

const chartData = [
    { name: 'Jan', value: 200 },
    { name: 'Feb', value: 350 },
    { name: 'Mar', value: 400 },
    { name: 'Apr', value: 550 },
    { name: 'May', value: 620 },
    { name: 'Jun', value: 650 },
    { name: 'Jul', value: 720 },
    { name: 'Aug', value: 800 },
];

// Mock deadline data
const upcomingDeadlines = [
    { id: 1, campaign: 'VR Headset Unboxing', brand: 'TechFlow AI', dueDate: '2024-01-02', status: 'soon', daysLeft: 3 },
    { id: 2, campaign: 'Summer Flavor Drop', brand: 'Fizz', dueDate: '2024-01-05', status: 'upcoming', daysLeft: 6 },
    { id: 3, campaign: 'Retro Console Launch', brand: 'GameStation', dueDate: '2024-01-01', status: 'overdue', daysLeft: -1 },
    { id: 4, campaign: 'Fitness App Review', brand: 'FitLife', dueDate: '2024-01-10', status: 'upcoming', daysLeft: 11 },
];

const Dashboard: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };
        checkDarkMode();
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    // Theme-aware chart colors
    const chartColor = isDarkMode ? '#1BD1C9' : '#E87B5A';
    const chartOpacity = isDarkMode ? 0.2 : 0.15;
    const tickColor = isDarkMode ? '#94A3B8' : '#9B9B9B';

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'overdue':
                return 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30';
            case 'soon':
                return 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30';
            default:
                return 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-700';
        }
    };

    const getStatusLabel = (status: string, daysLeft: number) => {
        if (status === 'overdue') return 'Overdue';
        if (status === 'soon') return `${daysLeft} days left`;
        return `${daysLeft} days`;
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'bid': return { icon: 'gavel', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400' };
            case 'alert': return { icon: 'timer', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400' };
            case 'payment': return { icon: 'payments', color: 'text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400' };
            case 'message': return { icon: 'chat', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-400' };
            default: return { icon: 'notifications', color: 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400' };
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-text-primary dark:text-white">Dashboard</h1>
                    <p className="text-sm text-text-secondary dark:text-gray-400">Your creator overview</p>
                </div>
                <Link to="/gigs" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">
                    Find Opportunities
                </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Active Jobs', value: '3', icon: 'handshake', color: 'text-blue-500', bg: 'bg-blue-500/10', link: '/collaborations' },
                    { label: 'Pending Bids', value: '5', icon: 'gavel', color: 'text-purple-500', bg: 'bg-purple-500/10', link: '/campaigns' },
                    { label: 'This Month', value: '$4,250', icon: 'payments', color: 'text-green-500', bg: 'bg-green-500/10', link: '/wallet' },
                    { label: 'Win Rate', value: '28%', icon: 'trending_up', color: 'text-teal-500', bg: 'bg-teal-500/10', link: '/analytics' },
                ].map((stat, i) => (
                    <Link key={i} to={stat.link} className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors group">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color} mb-3`}>
                            <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
                        </div>
                        <p className="text-2xl font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors">{stat.value}</p>
                        <p className="text-xs text-text-secondary dark:text-gray-400 mt-0.5">{stat.label}</p>
                    </Link>
                ))}
            </div>

            {/* Chart + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Earnings Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-text-primary dark:text-white">Earnings Trend</h3>
                        <span className="text-xs text-text-secondary dark:text-gray-400">Last 8 months</span>
                    </div>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={chartColor} stopOpacity={chartOpacity} />
                                        <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: tickColor }} />
                                <Area type="monotone" dataKey="value" stroke={chartColor} strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700 p-6">
                    <h3 className="font-medium text-text-primary dark:text-white mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                        {[
                            { label: 'Browse Opportunities', icon: 'search', link: '/gigs' },
                            { label: 'View My Bids', icon: 'gavel', link: '/campaigns' },
                            { label: 'Check Messages', icon: 'chat', link: '/messages', badge: '3' },
                            { label: 'Edit Profile', icon: 'person', link: '/profile' },
                        ].map((action, i) => (
                            <Link key={i} to={action.link} className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[18px] text-text-secondary dark:text-gray-400 group-hover:text-primary">{action.icon}</span>
                                    <span className="text-sm text-text-primary dark:text-white">{action.label}</span>
                                </div>
                                {action.badge ? (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-white">{action.badge}</span>
                                ) : (
                                    <span className="material-symbols-outlined text-[16px] text-gray-400">chevron_right</span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recommended Gigs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-text-primary dark:text-white">Recommended for You</h3>
                    <Link to="/gigs" className="text-xs font-medium text-primary hover:underline">View All</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { title: 'Tech Gadget Review', brand: 'Sony', budget: '$800', match: '98%', img: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=100&h=100&fit=crop' },
                        { title: 'Lifestyle Vlog', brand: 'Lululemon', budget: '$1.2k', match: '95%', img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=100&h=100&fit=crop' },
                        { title: 'App Promo', brand: 'Notion', budget: '$600', match: '92%', img: 'https://images.unsplash.com/photo-1555421689-3f034debb7a6?w=100&h=100&fit=crop' },
                    ].map((item, i) => (
                        <Link key={i} to="/gigs/1" className="flex gap-3 p-3 rounded-lg border border-gray-200/50 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors group">
                            <img src={item.img} alt={item.brand} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-text-primary dark:text-white truncate group-hover:text-primary">{item.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-text-secondary dark:text-gray-400">{item.brand}</span>
                                    <span className="text-xs font-bold text-text-primary dark:text-white">{item.budget}</span>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded self-start">{item.match}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Contextual Priorities: Deadlines + Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Deadlines */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-amber-500">schedule</span>
                            <h3 className="font-medium text-text-primary dark:text-white">Upcoming Deadlines</h3>
                        </div>
                        <Link to="/collaborations" className="text-xs font-medium text-primary hover:underline">View All</Link>
                    </div>
                    <div className="space-y-3">
                        {upcomingDeadlines.slice(0, 4).map((item) => (
                            <div
                                key={item.id}
                                className={`flex items-center justify-between p-3 rounded-lg border ${item.status === 'overdue'
                                    ? 'border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10'
                                    : item.status === 'soon'
                                        ? 'border-amber-200/60 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-900/10'
                                        : 'border-gray-200/50 dark:border-gray-700'
                                    }`}
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-text-primary dark:text-white truncate">{item.campaign}</p>
                                    <p className="text-xs text-text-secondary dark:text-gray-400">{item.brand}</p>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getStatusStyle(item.status)}`}>
                                    {getStatusLabel(item.status, item.daysLeft)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Notifications */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px] text-blue-500">notifications</span>
                            <h3 className="font-medium text-text-primary dark:text-white">Recent Notifications</h3>
                        </div>
                        <Link to="/messages" className="text-xs font-medium text-primary hover:underline">View All</Link>
                    </div>
                    <div className="space-y-3">
                        {INITIAL_NOTIFICATIONS.slice(0, 4).map((item) => {
                            const style = getNotificationIcon(item.type);
                            return (
                                <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer">
                                    <div className={`size-8 rounded-full ${style.color} flex items-center justify-center shrink-0`}>
                                        <span className="material-symbols-outlined text-[16px]">{style.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <p className={`text-sm truncate ${item.unread ? 'font-medium text-text-primary dark:text-white' : 'text-text-secondary dark:text-gray-400'}`}>
                                                {item.title}
                                            </p>
                                            <span className="text-[10px] text-text-secondary dark:text-gray-500 whitespace-nowrap">{item.time}</span>
                                        </div>
                                        <p className="text-xs text-text-secondary dark:text-gray-400 truncate">{item.desc}</p>
                                    </div>
                                    {item.unread && <div className="size-2 bg-primary rounded-full mt-1.5 shrink-0"></div>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;