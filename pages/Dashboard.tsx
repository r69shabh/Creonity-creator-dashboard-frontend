import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import TutorialOverlay, { TutorialStep } from '../components/TutorialOverlay';

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

const TUTORIAL_STEPS: TutorialStep[] = [
    {
        targetId: 'dash-intro',
        title: 'Welcome to Creonity',
        content: 'This is your command center. Get a quick overview of your career performance, active jobs, and pending tasks.',
        position: 'bottom'
    },
    {
        targetId: 'dash-stat-earnings',
        title: 'Track Your Finances',
        content: 'Monitor your monthly earnings, escrow status, and withdrawn funds. Payments are released automatically upon milestone completion.',
        position: 'bottom'
    },
    {
        targetId: 'dash-stat-active',
        title: 'Active Collaborations',
        content: 'See your in-progress jobs at a glance. Click here to jump into your Workroom and upload deliverables.',
        position: 'bottom'
    },
    {
        targetId: 'dash-reco',
        title: 'Smart Recommendations',
        content: 'Our AI matches you with brands that fit your niche. Review these gigs daily to keep your pipeline full.',
        position: 'left'
    },
    {
        targetId: 'center-screen', // Special case handled in component
        title: "You're Ready!",
        content: "That's the basics. You can now explore the marketplace, update your portfolio, or start bidding on campaigns.",
        position: 'bottom'
    }
];

const Dashboard: React.FC = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Only show tutorial if:
    // 1. It is a new user session (came from onboarding)
    // 2. AND it hasn't been explicitly marked as completed in localStorage (safety check)
    const isNewUserSession = sessionStorage.getItem('creonity_tour_session') === 'true';
    const isCompleted = localStorage.getItem('creonity_dashboard_tutorial_completed') === 'true';

    if (isNewUserSession && !isCompleted) {
       // Small delay to ensure layout is stable
       const timer = setTimeout(() => setShowTutorial(true), 1000);
       return () => clearTimeout(timer);
    }
  }, []);

  const handleTutorialComplete = () => {
      localStorage.setItem('creonity_dashboard_tutorial_completed', 'true');
      setShowTutorial(false);
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto flex flex-col gap-8 relative">
      
      <TutorialOverlay 
        isOpen={showTutorial} 
        steps={TUTORIAL_STEPS}
        onComplete={handleTutorialComplete}
        onSkip={handleTutorialComplete}
      />

      {/* Welcome Section */}
      <div id="dash-intro" className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-text-primary dark:text-white">
                Dashboard
            </h1>
            <p className="text-text-secondary dark:text-gray-400 mt-1">Overview of your creator performance.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-text-secondary dark:text-gray-400 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse"></span>
                Updated just now
            </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Link to="/collaborations" id="dash-stat-active">
            <Card hoverable className="h-full flex flex-col justify-between group">
              <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl text-brand-blue bg-blue-50 dark:bg-brand-blue/20 transition-colors">
                      <span className="material-symbols-outlined text-[24px]">handshake</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    In Progress
                  </span>
              </div>
              <div>
                  <p className="text-3xl font-display font-bold text-text-primary dark:text-white tracking-tight group-hover:text-brand-blue transition-colors">3</p>
                  <p className="text-sm text-text-secondary dark:text-gray-400 font-medium mt-1">Active Jobs</p>
                  <p className="text-xs text-gray-400 mt-2">View Workroom</p>
              </div>
            </Card>
          </Link>

          <Link to="/wallet" id="dash-stat-earnings">
            <Card hoverable className="h-full flex flex-col justify-between group">
              <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl text-green-600 bg-green-50 dark:bg-green-900/20 transition-colors">
                      <span className="material-symbols-outlined text-[24px]">payments</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                    +12.5%
                  </span>
              </div>
              <div>
                  <p className="text-3xl font-display font-bold text-text-primary dark:text-white tracking-tight group-hover:text-brand-blue transition-colors">$4,250</p>
                  <p className="text-sm text-text-secondary dark:text-gray-400 font-medium mt-1">Earnings (Mo)</p>
                  <p className="text-xs text-gray-400 mt-2">vs last month</p>
              </div>
            </Card>
          </Link>

          <Link to="/collaborations">
            <Card hoverable className="h-full flex flex-col justify-between group">
              <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl text-purple-600 bg-purple-50 dark:bg-purple-900/20 transition-colors">
                      <span className="material-symbols-outlined text-[24px]">description</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                    2 New
                  </span>
              </div>
              <div>
                  <p className="text-3xl font-display font-bold text-text-primary dark:text-white tracking-tight group-hover:text-brand-blue transition-colors">12</p>
                  <p className="text-sm text-text-secondary dark:text-gray-400 font-medium mt-1">Applications</p>
                  <p className="text-xs text-gray-400 mt-2">Pending Review</p>
              </div>
            </Card>
          </Link>

          <Link to="/analytics">
            <Card hoverable className="h-full flex flex-col justify-between group">
              <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl text-accent-teal-dark bg-[#1BD1C9]/20 dark:bg-[#036964]/30 transition-colors">
                      <span className="material-symbols-outlined text-[24px]">visibility</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                    +15%
                  </span>
              </div>
              <div>
                  <p className="text-3xl font-display font-bold text-text-primary dark:text-white tracking-tight group-hover:text-brand-blue transition-colors">1.2k</p>
                  <p className="text-sm text-text-secondary dark:text-gray-400 font-medium mt-1">Profile Views</p>
                  <p className="text-xs text-gray-400 mt-2">last 7 days</p>
              </div>
            </Card>
          </Link>
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
                        <select className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 text-text-primary dark:text-white">
                            <option>This Year</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="w-full h-80 pointer-events-none">
                        <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1BD1C9" stopOpacity={0.15}/>
                                <stop offset="95%" stopColor="#1BD1C9" stopOpacity={0}/>
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
                                cursor={{ stroke: '#1BD1C9', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#1BD1C9" 
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
        <Card id="dash-reco" className="flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-text-primary dark:text-white">Recommended</h3>
                <Link to="/gigs" className="text-xs font-bold text-brand-blue hover:underline">View All</Link>
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
                            <h4 className="font-bold text-sm text-text-primary dark:text-white group-hover:text-brand-blue transition-colors truncate">{item.title}</h4>
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