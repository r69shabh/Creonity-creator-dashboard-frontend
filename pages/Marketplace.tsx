import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilterDropdown, setActiveFilterDropdown] = useState<string | null>(null);
  
  // Filter States
  const [filters, setFilters] = useState({
    tech: true,
    lifestyle: true,
    gaming: false,
    fashion: false,
    instagram: true,
    youtube: true,
    tiktok: false,
    budget: 0,
  });

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleDropdown = (name: string) => {
    setActiveFilterDropdown(activeFilterDropdown === name ? null : name);
  };

  const opportunities = [
    { 
        id: "vr-headset-review",
        title: "VR Headset Review", 
        brand: "Nexus Tech",
        category: "Tech", 
        desc: "Looking for tech influencers to review our latest AI-driven VR headset. Focus on unboxing and first impressions.", 
        budget: "$500 - $800", 
        platform: ["YouTube", "Instagram"],
        posted: "2 days ago",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4kSGWBFj6v9Xj6ElwBij_raSTToO9620CPuAYgCzSLz3kBL3fXthNqS99zABaEStwsQbT2IeoBqGACSJMqOxLAdlxPLfXrNvZfCo0iHYr-0LDrxMPeBgwubmV1jBCkOz_QOKp5PawNBiBkwGfDnnOmpkNtqYov7PkOhtGp-7LgaEupRvgegqbDIsYPQzxK_gYIXexjX-M6xrtBcCOD0umHYA4qviiGJhBhD_6bzIbH1y3kvhP9SmpggpfJoUVzLRq8-FDr8Eny8Pb",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaaFbQihFfy-F6e5rien4N3nqD2ZVjagkT3ggFv5wZ2ytBjVxB3e5Lkw-2gUBg_mOc4f5FYiQ0Oyh0IQd8HYm49V1abSGN9so7_FUIO7nIMJVa4dg2k954krxoVARfLWHqET9tWAIrvxZViGNb290HSv5nG2vATLeKmVbexOJ6UPbuv0eQg3kUXQYHoRCJAbwj8L8L7ye9IqMX-sHBm0ehaYkW-GV4TYQsbW4xkfa1C1bLafHNqlfawtpnEGQsoYzRnMwznSWulJ-r"
    },
    { 
        id: "morning-routine",
        title: "Morning Routine", 
        brand: "Bean & Brew",
        category: "Lifestyle", 
        desc: "Integrate our organic coffee brand into your morning routine vlog. Authentic placement required.", 
        budget: "$350 Fixed", 
        platform: ["Instagram", "TikTok"],
        posted: "5 hours ago",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAZfBlH85Vqe3XYlnDlMGlizg4j1w8Da45_4xlV3Jo2SqeRlC96zGv8tLEddwdVSPeuEVLwE9h3vk_8-3vCd4uu5-ebYFTHqTVKqMx2NarKTCjqMr-xSjd4Io9bGEJ55G7HxVLLFB9Z3UiqNqtdzG1dh3WCFImpCtIgpD3mIM5_lW0RvtpGHR-5XYJU6y0F9gYlq3kuw5Q1bnHsmVkRshaLCjJvgkgcFH6EVNcJVb1_I2dG3rr09272Wi3gK7rFUb4GV4RwO4NmgOJ",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0KEVIufmRbG5G7uMWmmBaRdcU0MaBYz558XRi5f85Uze8-jAvdH4yqi_QyqMQBU8oqDMooc4g4EarPeiBAPdDhwymdA4sP7cNVnYTdtGAgy81PxhQhB_f2lTIdp-iAksJBIUV7AdBPvQXb6C_m438sEO6Dj_AB3SeDBKzvVwBf95Ju9sPQdlxTzCN3akyDJgD3MXDkXMEF4qnt4YqT4c7JiLSnzjcG0-6bz3XdVvV81r9TDZ8Me0h2O_ojTbRRs3-CPw8tCqF400g"
    },
    { 
        id: "productivity-tool",
        title: "Productivity Tool", 
        brand: "TaskFlow",
        category: "SaaS", 
        desc: "Showcase how our project management tool helps you stay organized as a creator.", 
        budget: "$1.5k - $2.5k", 
        platform: ["YouTube"],
        posted: "1 day ago",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvUga-j_HCRlfNP-TDjQbFZF3fY1TPvqygsFa9b7DM-4Msgpq9JmagIFmSKO3Yos535zFeRRCzdssUE2p4HSyjvm70oNwuNtMdBJKAy7ASFa6mRbQc7zu3bHi7fo2Lqvtc0KbgdA8-P4-1i7bvzZNvtaMUUteXfklI7NGw_OvviTk8B3edt2CCy770U9NKS4T0q159AVv2DnTe-_tlZfn2c-zce88laxRwQzDXhv5kSX_Bpa9yTh0QTkGcV7rGzCPYDtg-fVaOgfoO",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbzJmYMka3XY2SY90mz06-ZK9S09_1YMjnP0yrDw_hnXXbRkkwSuBCxiTZx2AvC1ITGpexeJnbOBVSW6bdmpAS4GXhLeiATCF8Q9DTKSZyG8AlV_kMW7sQVcDIZnQ15BahLINB9mgZKy4Kcf6wnn7joxLrqleXm-2Ci1RXsvnApVSpoizr90xGUtYvLNH0F7TqASA2qRamuW9SG1t1D3GDIEy9QdV7rfIWdeTHzkFo8Fdy9cNP3LJpbhny66GnieYtDHJyjcpCcD88"
    },
    { 
        id: "summer-fashion",
        title: "Summer Collection", 
        brand: "UrbanStyle",
        category: "Fashion", 
        desc: "Try-on haul for our new summer collection. Looking for high-energy creators with an eye for style.", 
        budget: "$800 - $1.2k", 
        platform: ["Instagram", "TikTok"],
        posted: "Just now",
        img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        logo: "https://ui-avatars.com/api/?name=Urban+Style&background=random"
    }
  ];

  const FilterButton: React.FC<{ label: string; name: string; isActive?: boolean; children?: React.ReactNode }> = ({ label, name, isActive, children }) => (
    <div className="relative">
      <button 
        onClick={() => toggleDropdown(name)}
        className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 transition-all active:scale-95 ${activeFilterDropdown === name || isActive ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-text-secondary dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
      >
        {label}
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
    <div className="flex flex-col h-full max-w-[1800px] mx-auto p-6 lg:p-8 overflow-hidden relative">
      
      {/* Header */}
      <div className="mb-8 shrink-0">
         <h1 className="text-3xl font-display font-bold text-text-primary dark:text-white mb-2">Marketplace</h1>
         <p className="text-text-secondary dark:text-gray-400">Discover exclusive brand opportunities.</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col xl:flex-row gap-4 mb-8 shrink-0 z-20">
         <div className="relative flex-1">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                 <span className="material-symbols-outlined">search</span>
             </span>
             <input 
                type="text" 
                placeholder="Search for brands, categories, or keywords..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all outline-none text-sm font-medium placeholder-gray-400"
             />
         </div>

         <div className="flex flex-wrap items-center gap-2">
            <FilterButton label="Category" name="category" isActive={Object.values(filters).slice(0, 4).some(Boolean)}>
                <div className="space-y-1">
                    {['Tech', 'Lifestyle', 'Gaming', 'Fashion'].map(cat => (
                        <label key={cat} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
                            <input 
                                type="checkbox" 
                                checked={filters[cat.toLowerCase() as keyof typeof filters] as boolean}
                                onChange={() => toggleFilter(cat.toLowerCase() as keyof typeof filters)}
                                className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-4 h-4" 
                            />
                            <span className="text-sm font-medium text-text-primary dark:text-gray-200">{cat}</span>
                        </label>
                    ))}
                </div>
            </FilterButton>

            <FilterButton label="Platform" name="platform" isActive={Object.values(filters).slice(4, 7).some(Boolean)}>
                <div className="space-y-1">
                    {['Instagram', 'YouTube', 'TikTok'].map(plat => (
                        <label key={plat} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
                            <input 
                                type="checkbox" 
                                checked={filters[plat.toLowerCase() as keyof typeof filters] as boolean}
                                onChange={() => toggleFilter(plat.toLowerCase() as keyof typeof filters)}
                                className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-4 h-4" 
                            />
                            <span className="text-sm font-medium text-text-primary dark:text-gray-200">{plat}</span>
                        </label>
                    ))}
                </div>
            </FilterButton>

            <FilterButton label="Budget" name="budget" isActive={filters.budget > 0}>
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
                        className="w-full accent-primary h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" 
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-bold">
                        <span>$0</span>
                        <span>$5k+</span>
                    </div>
                </div>
            </FilterButton>

            <button 
                onClick={() => setFilters({ tech: false, lifestyle: false, gaming: false, fashion: false, instagram: false, youtube: false, tiktok: false, budget: 0 })}
                className="h-10 px-4 text-sm text-gray-500 font-bold hover:text-text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
                Reset
            </button>
         </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 overflow-y-auto pr-2 pb-10">
         <div className="flex items-center justify-between mb-4">
             <h2 className="text-xl font-bold text-text-primary dark:text-white">Recent Opportunities</h2>
             <span className="text-sm text-text-secondary dark:text-gray-400">{opportunities.length} results found</span>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {opportunities.map((item) => (
                <Link to={`/marketplace/${item.id}`} key={item.id} className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-card hover:shadow-lg transition-all group flex flex-col overflow-hidden h-full">
                    <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: `url("${item.img}")` }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-text-primary dark:text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wide">
                            {item.category}
                        </div>
                        <div className="absolute bottom-3 left-3 flex gap-2">
                            {item.platform.map(p => (
                                <span key={p} className="bg-black/50 backdrop-blur-md text-white px-2 py-0.5 rounded text-xs flex items-center gap-1">
                                    {p}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <img src={item.logo} alt="brand" className="size-6 rounded-full object-contain bg-gray-50 dark:bg-gray-700 p-0.5 border border-border-color" />
                                <span className="text-xs font-bold text-text-secondary dark:text-gray-400">{item.brand}</span>
                            </div>
                            <span className="text-[10px] text-text-secondary dark:text-gray-500">{item.posted}</span>
                        </div>
                        <h3 className="text-lg font-bold text-text-primary dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-xs text-text-secondary dark:text-gray-400 line-clamp-2 mb-4">{item.desc}</p>
                        
                        <div className="mt-auto pt-4 border-t border-border-color dark:border-gray-700 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-text-secondary dark:text-gray-500 uppercase font-bold">Budget</p>
                                <p className="text-sm font-bold text-text-primary dark:text-white">{item.budget}</p>
                            </div>
                            <button className="px-4 py-2 bg-gray-50 dark:bg-gray-700 text-text-primary dark:text-white text-xs font-bold rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                Apply
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Marketplace;