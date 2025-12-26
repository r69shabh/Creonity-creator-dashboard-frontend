import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import TutorialOverlay, { TutorialStep } from '../components/TutorialOverlay';
import Card from '../components/ui/Card';

// Data
const earningsData = [
   { name: 'Jan', value: 1250 }, { name: 'Feb', value: 1800 }, { name: 'Mar', value: 2450 },
   { name: 'Apr', value: 2100 }, { name: 'May', value: 2800 }, { name: 'Jun', value: 3200 },
   { name: 'Jul', value: 2950 }, { name: 'Aug', value: 3800 }, { name: 'Sep', value: 4200 },
   { name: 'Oct', value: 3900 }, { name: 'Nov', value: 4500 }, { name: 'Dec', value: 4850 }
];

const bidFunnelData = [
   { name: 'Viewed', value: 145, fill: '#E5E7EB' },
   { name: 'Applied', value: 42, fill: '#93C5FD' },
   { name: 'Shortlisted', value: 18, fill: '#60A5FA' },
   { name: 'Won', value: 12, fill: '#075CD1' },
];

const contentTypeData = [
   { name: 'Video', value: 45, fill: '#EF4444' },
   { name: 'Reels', value: 28, fill: '#EC4899' },
   { name: 'Stories', value: 15, fill: '#8B5CF6' },
   { name: 'UGC', value: 12, fill: '#06B6D4' },
];

const campaignData = [
   { month: 'Jul', completed: 2, inProgress: 1 },
   { month: 'Aug', completed: 3, inProgress: 2 },
   { month: 'Sep', completed: 4, inProgress: 1 },
   { month: 'Oct', completed: 3, inProgress: 3 },
   { month: 'Nov', completed: 5, inProgress: 2 },
   { month: 'Dec', completed: 4, inProgress: 4 },
];

// Social platform analytics
const socialPlatformData = {
   YouTube: { followers: '124.5K', engagement: '4.2%', earnings: '$12,450', color: '#EF4444', icon: 'smart_display', avgViews: '45.2K', topContent: 'Tech Reviews' },
   Instagram: { followers: '89.2K', engagement: '6.8%', earnings: '$8,200', color: '#E4405F', icon: 'photo_camera', avgViews: '12.5K', topContent: 'Lifestyle' },
   TikTok: { followers: '256.1K', engagement: '12.4%', earnings: '$5,800', color: '#000000', icon: 'music_note', avgViews: '89.3K', topContent: 'Trends' },
   Twitter: { followers: '45.3K', engagement: '2.1%', earnings: '$2,000', color: '#1DA1F2', icon: 'tag', avgViews: '8.2K', topContent: 'Tech News' },
};

// KPI detail data
const kpiDetails = {
   earnings: {
      title: 'Total Earnings',
      value: '$28,450',
      change: '+14.2%',
      description: 'Total revenue from all completed campaigns',
      methodology: 'Sum of all payments received from brands after escrow release. Excludes pending payments.',
      breakdown: [
         { label: 'Video Campaigns', value: '$15,200', percent: 53 },
         { label: 'Social Posts', value: '$8,450', percent: 30 },
         { label: 'UGC Content', value: '$4,800', percent: 17 },
      ]
   },
   bidSuccess: {
      title: 'Bid Success Rate',
      value: '28.5%',
      change: '+3.2%',
      description: 'Percentage of bids that result in winning a campaign',
      methodology: 'Calculated as (Won Bids / Total Bids Placed) × 100. Only counts bids on opportunities that have closed.',
      breakdown: [
         { label: 'Tech Category', value: '42%', percent: 42 },
         { label: 'Lifestyle', value: '31%', percent: 31 },
         { label: 'Gaming', value: '18%', percent: 18 },
      ]
   },
   engagement: {
      title: 'Avg. Engagement',
      value: '8.4%',
      change: '+0.5%',
      description: 'Average engagement rate across all platforms',
      methodology: 'Weighted average of (Likes + Comments + Shares) / Impressions across all connected platforms.',
      breakdown: [
         { label: 'TikTok', value: '12.4%', percent: 100 },
         { label: 'Instagram', value: '6.8%', percent: 55 },
         { label: 'YouTube', value: '4.2%', percent: 34 },
      ]
   },
   campaigns: {
      title: 'Active Campaigns',
      value: '4',
      change: '+2',
      description: 'Currently active campaign collaborations',
      methodology: 'Count of campaigns in "In Progress" status. Excludes completed and pending review.',
      breakdown: [
         { label: 'Content Creation', value: '2', percent: 50 },
         { label: 'Brand Review', value: '1', percent: 25 },
         { label: 'Final Edits', value: '1', percent: 25 },
      ]
   },
};

const ANALYTICS_TUTORIAL_STEPS: TutorialStep[] = [
   { targetId: 'analytics-kpi', title: 'Key Metrics', content: 'Click any card to see detailed breakdown and calculation methodology.', position: 'bottom' },
   { targetId: 'analytics-main-chart', title: 'Revenue Trends', content: 'Track your income over time. Hover for details.', position: 'top' },
   { targetId: 'analytics-social', title: 'Platform Analytics', content: 'See performance breakdown by social platform.', position: 'left' }
];

const CustomTooltip = ({ active, payload, label }: any) => {
   if (active && payload && payload.length) {
      return (
         <div className="bg-white dark:bg-gray-900 p-3 border border-border-color dark:border-gray-700 rounded-lg shadow-lg">
            <p className="text-sm font-bold text-text-primary dark:text-white">{label}</p>
            {payload.map((entry: any, index: number) => (
               <p key={index} className="text-sm" style={{ color: entry.color || '#075CD1' }}>
                  {entry.name || entry.dataKey}: {typeof entry.value === 'number' && entry.dataKey !== 'engagement' ? `$${entry.value.toLocaleString()}` : entry.value}
               </p>
            ))}
         </div>
      );
   }
   return null;
};

// KPI Detail Modal
const KPIDetailModal: React.FC<{ data: typeof kpiDetails.earnings; onClose: () => void }> = ({ data, onClose }) => (
   <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-float w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
         <div className="px-6 py-4 border-b border-border-color dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center">
            <h3 className="font-bold text-text-primary dark:text-white">{data.title}</h3>
            <button onClick={onClose} className="text-text-secondary hover:text-text-primary dark:text-gray-400 dark:hover:text-white">
               <span className="material-symbols-outlined">close</span>
            </button>
         </div>
         <div className="p-6">
            <div className="flex items-baseline gap-3 mb-4">
               <span className="text-4xl font-bold text-text-primary dark:text-white">{data.value}</span>
               <span className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  {data.change}
               </span>
            </div>
            <p className="text-sm text-text-secondary dark:text-gray-400 mb-6">{data.description}</p>

            <h4 className="text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wider mb-3">Breakdown</h4>
            <div className="space-y-3 mb-6">
               {data.breakdown.map((item, i) => (
                  <div key={i}>
                     <div className="flex justify-between text-sm mb-1">
                        <span className="text-text-primary dark:text-white">{item.label}</span>
                        <span className="font-bold text-text-primary dark:text-white">{item.value}</span>
                     </div>
                     <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${item.percent}%` }} />
                     </div>
                  </div>
               ))}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
               <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[18px] mt-0.5">info</span>
                  <div>
                     <h5 className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase mb-1">How it's calculated</h5>
                     <p className="text-xs text-blue-600 dark:text-blue-300">{data.methodology}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
);

const Analytics: React.FC = () => {
   const [showTutorial, setShowTutorial] = useState(false);
   const [selectedKPI, setSelectedKPI] = useState<keyof typeof kpiDetails | null>(null);

   useEffect(() => {
      const isNewUserSession = sessionStorage.getItem('creonity_tour_session') === 'true';
      const isCompleted = localStorage.getItem('creonity_analytics_tutorial_completed');
      if (isNewUserSession && !isCompleted) {
         const timer = setTimeout(() => setShowTutorial(true), 800);
         return () => clearTimeout(timer);
      }
   }, []);

   const handleTutorialComplete = () => {
      localStorage.setItem('creonity_analytics_tutorial_completed', 'true');
      setShowTutorial(false);
   };

   const kpiCards = [
      { key: 'earnings', label: "Total Earnings", value: "$28,450", icon: "payments", color: "green", change: "+14.2%" },
      { key: 'bidSuccess', label: "Bid Success Rate", value: "28.5%", icon: "trending_up", color: "blue", change: "+3.2%" },
      { key: 'engagement', label: "Avg. Engagement", value: "8.4%", icon: "favorite", color: "red", change: "+0.5%" },
      { key: 'campaigns', label: "Active Campaigns", value: "4", icon: "work", color: "purple", change: "+2" },
   ];

   return (
      <div className="max-w-[1600px] mx-auto flex flex-col gap-6 p-6 lg:p-8 relative">
         <TutorialOverlay isOpen={showTutorial} steps={ANALYTICS_TUTORIAL_STEPS} onComplete={handleTutorialComplete} onSkip={handleTutorialComplete} />

         {/* KPI Cards */}
         <div id="analytics-kpi" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map((item, i) => (
               <Card key={i} padding="p-4" className="flex flex-col justify-between h-28 cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all group" onClick={() => setSelectedKPI(item.key as keyof typeof kpiDetails)}>
                  <div className="flex justify-between items-start">
                     <div>
                        <p className="text-text-secondary dark:text-gray-400 text-[10px] font-medium uppercase tracking-wider mb-0.5">{item.label}</p>
                        <p className="text-2xl font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors">{item.value}</p>
                     </div>
                     <div className={`p-1.5 rounded-lg ${item.color === 'green' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : item.color === 'red' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : item.color === 'blue' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'}`}>
                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                     </div>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center gap-0.5">
                           <span className="material-symbols-outlined text-[12px]">trending_up</span>
                           {item.change}
                        </span>
                        <span className="text-[10px] text-text-secondary dark:text-gray-500">vs last month</span>
                     </div>
                     <span className="material-symbols-outlined text-[14px] text-gray-400 group-hover:text-primary transition-colors">arrow_forward</span>
                  </div>
               </Card>
            ))}
         </div>

         {/* Charts Row */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card id="analytics-main-chart" className="lg:col-span-2">
               <div className="flex justify-between items-center mb-4">
                  <div>
                     <h3 className="text-lg font-bold text-text-primary dark:text-white">Earnings Over Time</h3>
                     <p className="text-xs text-text-secondary dark:text-gray-400">Net revenue from completed campaigns</p>
                  </div>
               </div>
               <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={earningsData}>
                        <defs>
                           <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#075CD1" stopOpacity={0.15} />
                              <stop offset="95%" stopColor="#075CD1" stopOpacity={0} />
                           </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} dy={10} />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }} />
                        <Area type="monotone" dataKey="value" stroke="#075CD1" strokeWidth={2} fillOpacity={1} fill="url(#chartGradient)" name="Earnings" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </Card>

            <Card id="analytics-funnel">
               <h3 className="text-lg font-bold text-text-primary dark:text-white mb-4">Bid Conversion Funnel</h3>
               <div className="space-y-3">
                  {bidFunnelData.map((item, i) => (
                     <div key={i}>
                        <div className="flex justify-between items-center mb-1">
                           <span className="text-sm font-medium text-text-primary dark:text-white">{item.name}</span>
                           <span className="text-sm font-bold text-text-primary dark:text-white">{item.value}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                           <div className="h-full rounded-full" style={{ width: `${(item.value / 145) * 100}%`, backgroundColor: item.fill }} />
                        </div>
                     </div>
                  ))}
               </div>
               <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <span className="text-sm text-text-secondary dark:text-gray-400">Overall Win Rate</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">28.5%</span>
               </div>
            </Card>
         </div>

         {/* Social Platform Analytics */}
         <div id="analytics-social">
            <h3 className="text-lg font-bold text-text-primary dark:text-white mb-4">Platform Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
               {Object.entries(socialPlatformData).map(([platform, data]) => (
                  <Card key={platform} className="cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="size-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${data.color}15` }}>
                           <span className="material-symbols-outlined text-[20px]" style={{ color: data.color }}>{data.icon}</span>
                        </div>
                        <div>
                           <h4 className="font-bold text-text-primary dark:text-white">{platform}</h4>
                           <p className="text-xs text-text-secondary dark:text-gray-400">{data.followers} followers</p>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                        <div>
                           <p className="text-[10px] text-text-secondary dark:text-gray-400 uppercase">Engagement</p>
                           <p className="text-lg font-bold text-text-primary dark:text-white">{data.engagement}</p>
                        </div>
                        <div>
                           <p className="text-[10px] text-text-secondary dark:text-gray-400 uppercase">Earnings</p>
                           <p className="text-lg font-bold text-green-600 dark:text-green-400">{data.earnings}</p>
                        </div>
                        <div>
                           <p className="text-[10px] text-text-secondary dark:text-gray-400 uppercase">Avg. Views</p>
                           <p className="text-sm font-medium text-text-primary dark:text-white">{data.avgViews}</p>
                        </div>
                        <div>
                           <p className="text-[10px] text-text-secondary dark:text-gray-400 uppercase">Top Niche</p>
                           <p className="text-sm font-medium text-text-primary dark:text-white">{data.topContent}</p>
                        </div>
                     </div>
                  </Card>
               ))}
            </div>
         </div>

         {/* Campaign Activity & Content Type */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
               <div className="flex justify-between items-center mb-4">
                  <div>
                     <h3 className="text-lg font-bold text-text-primary dark:text-white">Campaign Activity</h3>
                     <p className="text-xs text-text-secondary dark:text-gray-400">Completed vs In Progress</p>
                  </div>
               </div>
               <div className="w-full h-56">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={campaignData} barGap={4}>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} dy={10} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                        <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} name="Completed" />
                        <Bar dataKey="inProgress" fill="#60A5FA" radius={[4, 4, 0, 0]} name="In Progress" />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex items-center justify-center gap-6 mt-2">
                  <div className="flex items-center gap-2"><div className="size-3 rounded bg-green-500" /><span className="text-xs text-text-secondary dark:text-gray-400">Completed</span></div>
                  <div className="flex items-center gap-2"><div className="size-3 rounded bg-blue-400" /><span className="text-xs text-text-secondary dark:text-gray-400">In Progress</span></div>
               </div>
            </Card>

            <Card>
               <h3 className="text-lg font-bold text-text-primary dark:text-white mb-4">Content Type Revenue</h3>
               <div className="w-full h-48">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie data={contentTypeData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={3} dataKey="value">
                           {contentTypeData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.fill} />))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="grid grid-cols-2 gap-2 mt-2">
                  {contentTypeData.map((item, i) => (
                     <div key={i} className="flex items-center gap-2">
                        <div className="size-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                        <span className="text-xs text-text-secondary dark:text-gray-400">{item.name}</span>
                        <span className="text-xs font-bold text-text-primary dark:text-white ml-auto">{item.value}%</span>
                     </div>
                  ))}
               </div>
            </Card>
         </div>

         {/* Creator Performance Signals */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Brand Rating */}
            <Card className="flex flex-col">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-text-primary dark:text-white">Brand Rating</h3>
                  <div className="relative group">
                     <span className="material-symbols-outlined text-[18px] text-text-secondary dark:text-gray-400 cursor-help">info</span>
                     <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        How brands rate working with you based on completed campaigns
                     </div>
                  </div>
               </div>
               <div className="flex-1 flex flex-col items-center justify-center py-4">
                  <div className="flex items-center gap-1 mb-2">
                     {[1, 2, 3, 4, 5].map((star) => (
                        <span
                           key={star}
                           className={`material-symbols-outlined text-[28px] ${star <= 4 ? 'text-yellow-400' : star <= 4.9 ? 'text-yellow-400/50' : 'text-gray-300 dark:text-gray-600'}`}
                        >
                           {star <= 4.9 ? 'star' : 'star'}
                        </span>
                     ))}
                  </div>
                  <p className="text-3xl font-bold text-text-primary dark:text-white">4.9</p>
                  <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">Based on 24 brand reviews</p>
               </div>
               <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border-color dark:border-gray-700">
                  <div className="text-center">
                     <p className="text-sm font-bold text-text-primary dark:text-white">98%</p>
                     <p className="text-[10px] text-text-secondary dark:text-gray-400">On-Time</p>
                  </div>
                  <div className="text-center">
                     <p className="text-sm font-bold text-text-primary dark:text-white">100%</p>
                     <p className="text-[10px] text-text-secondary dark:text-gray-400">Quality</p>
                  </div>
                  <div className="text-center">
                     <p className="text-sm font-bold text-text-primary dark:text-white">35%</p>
                     <p className="text-[10px] text-text-secondary dark:text-gray-400">Repeat Hire</p>
                  </div>
               </div>
            </Card>

            {/* Followers Growth Chart */}
            <Card className="lg:col-span-2">
               <div className="flex items-center justify-between mb-4">
                  <div>
                     <h3 className="text-lg font-bold text-text-primary dark:text-white">Followers Growth</h3>
                     <p className="text-xs text-text-secondary dark:text-gray-400">Monthly growth across platforms</p>
                  </div>
               </div>
               <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart
                        data={[
                           { month: 'Jul', youtube: 118, instagram: 82, tiktok: 230, twitter: 42 },
                           { month: 'Aug', youtube: 120, instagram: 84, tiktok: 238, twitter: 43 },
                           { month: 'Sep', youtube: 121, instagram: 85, tiktok: 245, twitter: 44 },
                           { month: 'Oct', youtube: 122, instagram: 87, tiktok: 250, twitter: 44 },
                           { month: 'Nov', youtube: 124, instagram: 88, tiktok: 254, twitter: 45 },
                           { month: 'Dec', youtube: 124.5, instagram: 89.2, tiktok: 256.1, twitter: 45.3 },
                        ]}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                     >
                        <defs>
                           <linearGradient id="youtubeGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                           </linearGradient>
                           <linearGradient id="tiktokGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                              <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                           </linearGradient>
                        </defs>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="tiktok" stroke="#000000" strokeWidth={2} fillOpacity={1} fill="url(#tiktokGrad)" name="TikTok" />
                        <Area type="monotone" dataKey="youtube" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#youtubeGrad)" name="YouTube" />
                        <Area type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={1.5} fillOpacity={0} name="Instagram" />
                        <Area type="monotone" dataKey="twitter" stroke="#1DA1F2" strokeWidth={1.5} fillOpacity={0} name="Twitter" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex items-center justify-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5">
                     <div className="size-2.5 rounded-full bg-black dark:bg-white"></div>
                     <span className="text-[10px] text-text-secondary dark:text-gray-400">TikTok</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                     <div className="size-2.5 rounded-full bg-red-500"></div>
                     <span className="text-[10px] text-text-secondary dark:text-gray-400">YouTube</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                     <div className="size-2.5 rounded-full bg-pink-500"></div>
                     <span className="text-[10px] text-text-secondary dark:text-gray-400">Instagram</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                     <div className="size-2.5 rounded-full bg-blue-400"></div>
                     <span className="text-[10px] text-text-secondary dark:text-gray-400">Twitter</span>
                  </div>
               </div>
            </Card>
         </div>

         {/* KPI Detail Modal */}
         {selectedKPI && <KPIDetailModal data={kpiDetails[selectedKPI]} onClose={() => setSelectedKPI(null)} />}
      </div>
   );
};

export default Analytics;