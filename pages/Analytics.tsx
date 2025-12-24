import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import TutorialOverlay, { TutorialStep } from '../components/TutorialOverlay';

const earningsData = [
  { name: 'Jan', value: 25 }, { name: 'Feb', value: 30 }, { name: 'Mar', value: 45 },
  { name: 'Apr', value: 50 }, { name: 'May', value: 48 }, { name: 'Jun', value: 60 },
  { name: 'Jul', value: 55 }, { name: 'Aug', value: 75 }, { name: 'Sep', value: 82 },
  { name: 'Oct', value: 78 }, { name: 'Nov', value: 85 }, { name: 'Dec', value: 90 }
];

const engagementData = [
  { name: 'W1', revenue: 1200, engagement: 40 },
  { name: 'W2', revenue: 1850, engagement: 55 },
  { name: 'W3', revenue: 2900, engagement: 80 },
  { name: 'W4', revenue: 2100, engagement: 60 },
  { name: 'W5', revenue: 2450, engagement: 68 },
  { name: 'W6', revenue: 3200, engagement: 85 }
];

const ANALYTICS_TUTORIAL_STEPS: TutorialStep[] = [
  {
    targetId: 'analytics-kpi',
    title: 'Key Performance Indicators',
    content: 'Instant view of your total earnings, average engagement rates, and audience growth.',
    position: 'bottom'
  },
  {
    targetId: 'analytics-main-chart',
    title: 'Revenue Trends',
    content: 'Visualize your income over time. Switch between Year and Month views to identify peak seasons.',
    position: 'top'
  },
   {
    targetId: 'analytics-platform',
    title: 'Platform Mix',
    content: 'See which platforms (YouTube, Instagram, etc.) are driving the most value for your business.',
    position: 'left'
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-900 p-3 border border-border-color dark:border-gray-700 rounded-lg shadow-lg">
        <p className="text-sm font-bold text-text-primary dark:text-white">{label}</p>
        <p className="text-sm text-brand-blue">
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const Analytics: React.FC = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const isCompleted = localStorage.getItem('creonity_analytics_tutorial_completed');
    if (!isCompleted) {
       const timer = setTimeout(() => setShowTutorial(true), 800);
       return () => clearTimeout(timer);
    }
  }, []);

  const handleTutorialComplete = () => {
      localStorage.setItem('creonity_analytics_tutorial_completed', 'true');
      setShowTutorial(false);
  };

  return (
    <div className="max-w-[1600px] mx-auto flex flex-col gap-6 p-6 relative">
       <TutorialOverlay 
         isOpen={showTutorial} 
         steps={ANALYTICS_TUTORIAL_STEPS}
         onComplete={handleTutorialComplete}
         onSkip={handleTutorialComplete}
       />

       <div id="analytics-kpi" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: "Total Earnings", value: "$28,450", icon: "payments", color: "green", change: "+14.2%" },
           { label: "Avg. Engagement", value: "8.4%", icon: "favorite", color: "red", change: "+0.5%" },
           { label: "Campaign ROI", value: "315%", icon: "percent", color: "blue", change: "Stable", neutral: true },
           { label: "Audience Growth", value: "+2.4k", icon: "groups", color: "purple", change: "+2.1%" },
         ].map((item, i) => (
           <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-border-color dark:border-gray-700 shadow-card flex flex-col justify-between h-32 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                   <p className="text-text-secondary dark:text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">{item.label}</p>
                   <p className="text-3xl font-semibold text-text-primary dark:text-white">{item.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${item.color === 'green' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : item.color === 'red' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : item.color === 'blue' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'}`}>
                   <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-auto">
                 <span className={`text-xs font-medium ${item.neutral ? 'text-accent-teal-dark' : 'text-green-600 dark:text-green-400'} flex items-center gap-1`}>
                    <span className="material-symbols-outlined text-[14px]">{item.neutral ? 'remove' : 'trending_up'}</span> 
                    {item.change}
                 </span>
                 <span className="text-xs text-text-secondary dark:text-gray-400">vs last month</span>
              </div>
           </div>
         ))}
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div id="analytics-main-chart" className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl border border-border-color dark:border-gray-700 shadow-card">
             <div className="flex justify-between items-center mb-6">
                <div>
                   <h3 className="text-lg font-semibold text-text-primary dark:text-white">Earnings Over Time</h3>
                   <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">Net revenue generated from all campaigns</p>
                </div>
                <div className="flex items-center gap-2 border border-border-color dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 p-1">
                   <button className="px-2 py-1 text-xs font-medium bg-white dark:bg-gray-700 text-text-primary dark:text-white rounded shadow-sm">Year</button>
                   <button className="px-2 py-1 text-xs font-medium text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white">Month</button>
                </div>
             </div>
             <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={earningsData}>
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#075CD1" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#075CD1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} dy={10} />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }} />
                      <Area type="monotone" dataKey="value" stroke="#075CD1" strokeWidth={3} fillOpacity={1} fill="url(#chartGradient)" />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div id="analytics-platform" className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-border-color dark:border-gray-700 shadow-card flex flex-col">
              <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-6">Platform Performance</h3>
              <div className="flex-1 flex flex-col justify-center gap-8">
                 {[
                   { label: "Video Reviews", val: 45, color: "bg-red-500", icon: "smart_display", iconColor: "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400" },
                   { label: "Social Feed", val: 32, color: "bg-pink-500", icon: "photo_camera", iconColor: "text-pink-600 bg-pink-50 dark:bg-pink-900/20 dark:text-pink-400" },
                   { label: "Blog Posts", val: 15, color: "bg-blue-500", icon: "feed", iconColor: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400" },
                   { label: "Podcasts", val: 8, color: "bg-gray-500", icon: "podcasts", iconColor: "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400" },
                 ].map((p, i) => (
                    <div key={i} className="group">
                       <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                             <div className={`p-1.5 rounded-md ${p.iconColor}`}>
                                <span className="material-symbols-outlined text-[18px]">{p.icon}</span>
                             </div>
                             <span className="text-sm font-medium text-text-primary dark:text-white">{p.label}</span>
                          </div>
                          <span className="text-sm font-bold text-text-primary dark:text-white">{p.val}%</span>
                       </div>
                       <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className={`h-full ${p.color} rounded-full`} style={{width: `${p.val}%`}}></div>
                       </div>
                    </div>
                 ))}
              </div>
          </div>
       </div>

       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-border-color dark:border-gray-700 shadow-card">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
             <div>
                <h3 className="text-lg font-semibold text-text-primary dark:text-white">Engagement vs Revenue</h3>
                <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">Correlation between audience engagement and campaign revenue</p>
             </div>
          </div>
          <div className="w-full h-64">
             <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={engagementData} barGap={0}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} dy={10} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                    <Bar dataKey="revenue" fill="#F3F4F6" radius={[4, 4, 0, 0]} barSize={32} className="dark:fill-gray-700" />
                    <Bar dataKey="engagement" fill="#1BD1C9" radius={[4, 4, 0, 0]} barSize={8} />
                 </BarChart>
             </ResponsiveContainer>
          </div>
       </div>
    </div>
  );
};

export default Analytics;