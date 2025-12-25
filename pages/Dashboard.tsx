import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis } from 'recharts';
import { Link } from 'react-router-dom';

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

const Dashboard: React.FC = () => {
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
                    <Link key={i} to={stat.link} className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 hover:border-primary/50 transition-colors group">
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
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-text-primary dark:text-white">Earnings Trend</h3>
                        <span className="text-xs text-text-secondary dark:text-gray-400">Last 8 months</span>
                    </div>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1BD1C9" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#1BD1C9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                                <Area type="monotone" dataKey="value" stroke="#1BD1C9" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
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
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
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
                        <Link key={i} to="/gigs/1" className="flex gap-3 p-3 rounded-lg border border-border-color dark:border-gray-700 hover:border-primary/50 transition-colors group">
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
        </div>
    );
};

export default Dashboard;