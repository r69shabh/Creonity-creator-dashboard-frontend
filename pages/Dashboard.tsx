import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

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
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto flex flex-col gap-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-text-primary dark:text-white">
                Dashboard
            </h1>
            <p className="text-text-secondary dark:text-gray-400 mt-1">Overview of your creator performance.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-text-secondary dark:text-gray-400 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Updated just now
            </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Jobs', value: '3', trend: 'In Progress', up: true, subtitle: 'View Workroom', link: '/collaborations', icon: 'handshake', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Earnings (Mo)', value: '$4,250', trend: '+12.5%', up: true, subtitle: 'vs last month', link: '/wallet', icon: 'payments', color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
          { label: 'Applications', value: '12', trend: '2 New', up: true, subtitle: 'Pending Review', link: '/collaborations', icon: 'description', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
          { label: 'Profile Views', value: '1.2k', trend: '+15%', up: true, subtitle: 'last 7 days', link: '/analytics', icon: 'visibility', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' },
        ].map((stat, i) => (
          <Link to={stat.link} key={i}>
            <Card hoverable className="h-full flex flex-col justify-between group">
              <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${stat.color} transition-colors`}>
                      <span className="material-symbols-outlined text-[24px]">{stat.icon}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${stat.up ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-700'}`}>
                    {stat.up && <span className="material-symbols-outlined text-[14px]">trending_up</span>}
                    {stat.trend}
                  </span>
              </div>
              <div>
                  <p className="text-3xl font-display font-bold text-text-primary dark:text-white tracking-tight group-hover:text-primary transition-colors">{stat.value}</p>
                  <p className="text-sm text-text-secondary dark:text-gray-400 font-medium mt-1">{stat.label}</p>
                  <p className="text-xs text-gray-400 mt-2">{stat.subtitle}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2">
            <Link to="/analytics">
                <Card hoverable className="h-full">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-text-primary dark:text-white">Earnings Trend</h3>
                            <p className="text-sm text-text-secondary dark:text-gray-400">Net revenue over time</p>
                        </div>
                        <select className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary dark:text-white">
                            <option>This Year</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="w-full h-80 pointer-events-none">
                        <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#E45D3B" stopOpacity={0.15}/>
                                <stop offset="95%" stopColor="#E45D3B" stopOpacity={0}/>
                            </linearGradient>
                            </defs>
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fontSize: 12, fill: '#94A3B8', fontWeight: 500}} 
                                dy={10} 
                            />
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '12px' }}
                                cursor={{ stroke: '#E45D3B', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#E45D3B" 
                                strokeWidth={3} 
                                fillOpacity={1} 
                                fill="url(#colorValue)" 
                            />
                        </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </Link>
        </div>

        {/* Recommended for you */}
        <Card className="flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-text-primary dark:text-white">Recommended</h3>
                <Link to="/gigs" className="text-xs font-bold text-primary hover:underline">View All</Link>
            </div>
            <div className="flex-1 flex flex-col gap-3">
                {[
                    { title: "Tech Gadget Review", brand: "Sony", budget: "$800", match: "98%", img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=100&h=100&fit=crop" },
                    { title: "Lifestyle Vlog", brand: "Lululemon", budget: "$1.2k", match: "95%", img: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=100&h=100&fit=crop" },
                    { title: "App Promo", brand: "Notion", budget: "$600", match: "92%", img: "https://images.unsplash.com/photo-1555421689-3f034debb7a6?w=100&h=100&fit=crop" },
                ].map((item, i) => (
                    <Link to="/gigs/vr-headset-review" key={i} className="flex gap-4 p-3 rounded-xl border border-transparent hover:border-gray-100 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all group">
                        <div className="size-12 rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0 overflow-hidden relative">
                            <img src={item.img} alt={item.brand} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-text-primary dark:text-white group-hover:text-primary transition-colors truncate">{item.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-text-secondary dark:text-gray-400">{item.brand}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="text-xs font-bold text-text-primary dark:text-white">{item.budget}</span>
                            </div>
                        </div>
                        <div className="flex items-center self-center">
                            <div className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                                {item.match}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <button className="mt-6 w-full py-3 flex items-center justify-center text-sm font-bold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5">
                Optimize Profile
            </button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;