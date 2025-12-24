import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { OPPORTUNITIES } from '../data/mockData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';

const Gigs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilterDropdown, setActiveFilterDropdown] = useState<string | null>(null);
  
  // Filter States
  const [filters, setFilters] = useState({
    category: [] as string[],
    platform: [] as string[],
    contentType: [] as string[],
    budget: 0, 
  });

  const toggleFilter = (type: keyof typeof filters, value: string) => {
    setFilters(prev => {
        const current = prev[type] as string[];
        const updated = current.includes(value) 
            ? current.filter(item => item !== value)
            : [...current, value];
        return { ...prev, [type]: updated };
    });
  };

  const opportunities = useMemo(() => {
    return OPPORTUNITIES.filter(gig => {
        const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              gig.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              gig.desc.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = filters.category.length === 0 || filters.category.some(c => gig.category.includes(c));
        const matchesPlatform = filters.platform.length === 0 || filters.platform.some(p => gig.platform.includes(p));
        // Simple budget check
        const matchesBudget = filters.budget === 0 || gig.budgetMax >= filters.budget;

        return matchesSearch && matchesCategory && matchesPlatform && matchesBudget;
    });
  }, [searchTerm, filters]);

  const toggleDropdown = (name: string) => {
    setActiveFilterDropdown(activeFilterDropdown === name ? null : name);
  };

  const FilterButton: React.FC<{ label: string; name: string; count?: number; children?: React.ReactNode }> = ({ label, name, count, children }) => (
    <div className="relative">
      <button 
        onClick={() => toggleDropdown(name)}
        className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 transition-all active:scale-95 ${activeFilterDropdown === name || (count && count > 0) ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-text-secondary dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
      >
        {label}
        {count && count > 0 && <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full">{count}</span>}
        <span className={`material-symbols-outlined text-[18px] transition-transform ${activeFilterDropdown === name ? 'rotate-180' : ''}`}>expand_more</span>
      </button>
      
      {activeFilterDropdown === name && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setActiveFilterDropdown(null)}></div>
          <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-float border border-gray-200 dark:border-gray-700 p-4 z-20 animate-in fade-in zoom-in-95 duration-100 ring-1 ring-black/5">
             {children}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full max-w-[1800px] mx-auto p-6 lg:p-8 overflow-hidden">
         {/* Header */}
         <div className="mb-8 shrink-0">
             <h1 className="text-3xl font-display font-bold text-text-primary dark:text-white mb-2">Find Opportunities</h1>
             <p className="text-text-secondary dark:text-gray-400">Discover campaigns that match your unique style and audience.</p>
         </div>

         {/* Search & Filters */}
         <div className="flex flex-col xl:flex-row gap-4 mb-8 shrink-0 z-20">
             <div className="relative flex-1">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                     <span className="material-symbols-outlined">search</span>
                 </span>
                 <input 
                    type="text" 
                    placeholder="Search by brand, keyword, or vibe..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all outline-none text-sm font-medium placeholder-gray-400"
                 />
             </div>
             
             <div className="flex flex-wrap items-center gap-2">
                <FilterButton label="Category" name="category" count={filters.category.length}>
                    <div className="space-y-1">
                        {['Tech', 'Lifestyle', 'Gaming', 'Fashion', 'Health & Fitness', 'Travel'].map(opt => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
                                <input 
                                    type="checkbox" 
                                    checked={filters.category.includes(opt)}
                                    onChange={() => toggleFilter('category', opt)}
                                    className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-4 h-4" 
                                />
                                <span className="text-sm font-medium text-text-primary dark:text-gray-200">{opt}</span>
                            </label>
                        ))}
                    </div>
                </FilterButton>

                <FilterButton label="Platform" name="platform" count={filters.platform.length}>
                    <div className="space-y-1">
                        {['Instagram', 'YouTube', 'TikTok', 'Twitch', 'UGC Only'].map(opt => (
                             <label key={opt} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
                                <input 
                                    type="checkbox" 
                                    checked={filters.platform.includes(opt)}
                                    onChange={() => toggleFilter('platform', opt)}
                                    className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-4 h-4" 
                                />
                                <span className="text-sm font-medium text-text-primary dark:text-gray-200">{opt}</span>
                            </label>
                        ))}
                    </div>
                </FilterButton>
                
                <FilterButton label="Budget" name="budget">
                    <div className="px-2 py-2">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold text-text-secondary uppercase">Min Budget</span>
                            <span className="text-sm font-bold text-primary">${filters.budget}</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" max="5000" step="100" 
                            value={filters.budget}
                            onChange={(e) => setFilters({...filters, budget: parseInt(e.target.value)})}
                            className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                        />
                        <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-bold">
                            <span>$0</span>
                            <span>$5k+</span>
                        </div>
                    </div>
                </FilterButton>

                {(filters.category.length > 0 || filters.platform.length > 0 || filters.budget > 0) && (
                    <button 
                        onClick={() => setFilters({ category: [], platform: [], contentType: [], budget: 0 })}
                        className="h-10 px-4 text-sm text-gray-500 font-bold hover:text-text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        Reset
                    </button>
                )}
             </div>
         </div>

         {/* Grid */}
         <div className="flex-1 overflow-y-auto pr-2 pb-10">
             {opportunities.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {opportunities.map((item) => (
                        <Link to={`/gigs/${item.id}`} key={item.id} className="group h-full">
                            <Card padding="p-0" className="h-full flex flex-col hover:border-gray-300 dark:hover:border-gray-600 shadow-sm hover:shadow-card-hover transition-all duration-300">
                                <div className="h-56 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url("${item.img}")` }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                    
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                                            {item.category}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="flex justify-between items-end mb-2">
                                            <Badge variant="neutral" className="bg-white/20 text-white border-transparent backdrop-blur-md">{item.type}</Badge>
                                            <span className="text-white text-sm font-bold bg-primary px-2.5 py-1 rounded-lg shadow-lg">
                                                {item.budget}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-white mb-1 leading-snug line-clamp-1">{item.title}</h3>
                                        <p className="text-xs text-gray-300 line-clamp-1">{item.brand} • {item.posted}</p>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col bg-white dark:bg-gray-800">
                                    <p className="text-sm text-text-secondary dark:text-gray-400 line-clamp-2 mb-5 leading-relaxed">{item.desc}</p>
                                    
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center -space-x-2">
                                            {item.platform.map((p, i) => (
                                                <div key={p} className="size-7 rounded-full bg-gray-50 dark:bg-gray-800 border-2 border-white dark:border-gray-700 flex items-center justify-center text-[10px] text-text-secondary z-10" title={p}>
                                                    {p[0]}
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                 </div>
             ) : (
                 <div className="flex flex-col items-center justify-center h-96 text-center">
                     <div className="size-20 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-6 ring-8 ring-gray-50/50 dark:ring-gray-800/50">
                         <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600">search_off</span>
                     </div>
                     <h3 className="text-xl font-bold text-text-primary dark:text-white mb-2">No Gigs Found</h3>
                     <p className="text-text-secondary dark:text-gray-400 max-w-xs mx-auto mb-6">We couldn't find any opportunities matching your filters. Try adjusting your search.</p>
                     <Button variant="outline" onClick={() => {setFilters({ category: [], platform: [], contentType: [], budget: 0 }); setSearchTerm('');}}>
                         Clear All Filters
                     </Button>
                 </div>
             )}
         </div>
    </div>
  );
};

export default Gigs;