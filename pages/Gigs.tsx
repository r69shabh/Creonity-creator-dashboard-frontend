import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { OPPORTUNITIES } from '../data/mockData';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import TutorialOverlay, { TutorialStep } from '../components/TutorialOverlay';

const GIGS_TUTORIAL_STEPS: TutorialStep[] = [
    {
        targetId: 'gigs-header',
        title: 'Marketplace',
        content: 'Explore available campaigns from top brands matching your niche. Use keywords to search.',
        position: 'bottom'
    },
    {
        targetId: 'gigs-filters',
        title: 'Smart Filters',
        content: 'Narrow down opportunities by platform, category, or budget to find your perfect fit.',
        position: 'bottom'
    },
    {
        targetId: 'gigs-grid',
        title: 'Opportunity Cards',
        content: 'Each card shows budget, deadlines, and requirements. Click to view full details and apply.',
        position: 'top'
    }
];

// Platform icons using Material Symbols for consistency
const PLATFORM_ICONS: Record<string, { icon: string; color: string; bg: string }> = {
    Instagram: { icon: 'photo_camera', color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/20' },
    YouTube: { icon: 'smart_display', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
    TikTok: { icon: 'music_note', color: 'text-gray-900 dark:text-white', bg: 'bg-gray-100 dark:bg-gray-700' },
    Twitch: { icon: 'live_tv', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    'UGC Only': { icon: 'videocam', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' }
};

// Budget range options
const BUDGET_OPTIONS = [
    { label: 'Any Budget', min: 0, max: Infinity },
    { label: 'Under $500', min: 0, max: 500 },
    { label: '$500 - $1,000', min: 500, max: 1000 },
    { label: '$1,000 - $2,500', min: 1000, max: 2500 },
    { label: '$2,500 - $5,000', min: 2500, max: 5000 },
    { label: '$5,000+', min: 5000, max: Infinity },
];

// Content type options  
const CONTENT_TYPE_OPTIONS = ['Video', 'Story/Reel', 'Integration', 'Ambassador', 'UGC'];

const Gigs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilterDropdown, setActiveFilterDropdown] = useState<string | null>(null);
    const [showTutorial, setShowTutorial] = useState(false);

    // Filter States
    const [filters, setFilters] = useState({
        category: [] as string[],
        platform: [] as string[],
        contentType: [] as string[],
        budgetRange: { min: 0, max: Infinity },
    });

    useEffect(() => {
        const isNewUserSession = sessionStorage.getItem('creonity_tour_session') === 'true';
        const isCompleted = localStorage.getItem('creonity_gigs_tutorial_completed');
        if (isNewUserSession && !isCompleted) {
            const timer = setTimeout(() => setShowTutorial(true), 800);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleTutorialComplete = () => {
        localStorage.setItem('creonity_gigs_tutorial_completed', 'true');
        setShowTutorial(false);
    };

    const toggleFilter = (type: 'category' | 'platform' | 'contentType', value: string) => {
        setFilters(prev => {
            const current = prev[type];
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
            const matchesContentType = filters.contentType.length === 0 || filters.contentType.some(t => gig.type.includes(t));
            const matchesBudget = gig.budgetMax >= filters.budgetRange.min && gig.budgetMin <= filters.budgetRange.max;

            return matchesSearch && matchesCategory && matchesPlatform && matchesContentType && matchesBudget;
        });
    }, [searchTerm, filters]);

    const toggleDropdown = (name: string) => {
        setActiveFilterDropdown(activeFilterDropdown === name ? null : name);
    };

    const getActiveFilterCount = () => {
        let count = 0;
        if (filters.category.length > 0) count++;
        if (filters.platform.length > 0) count++;
        if (filters.contentType.length > 0) count++;
        if (filters.budgetRange.min > 0 || filters.budgetRange.max < Infinity) count++;
        return count;
    };

    const clearAllFilters = () => {
        setFilters({ category: [], platform: [], contentType: [], budgetRange: { min: 0, max: Infinity } });
        setSearchTerm('');
    };

    const FilterButton: React.FC<{ label: string; name: string; count?: number; children?: React.ReactNode }> = ({ label, name, count, children }) => (
        <div className="relative">
            <button
                onClick={() => toggleDropdown(name)}
                className={`h-10 px-4 rounded-lg border text-sm font-medium flex items-center gap-2 transition-all ${activeFilterDropdown === name || (count && count > 0)
                    ? 'bg-primary/10 text-primary border-primary/30 dark:bg-primary/20'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-text-secondary dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
            >
                {label}
                {count !== undefined && count > 0 && (
                    <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{count}</span>
                )}
                <span className={`material-symbols-outlined text-[18px] transition-transform ${activeFilterDropdown === name ? 'rotate-180' : ''}`}>expand_more</span>
            </button>

            {activeFilterDropdown === name && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setActiveFilterDropdown(null)}></div>
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-float border border-gray-200 dark:border-gray-700 p-3 z-20 animate-in fade-in zoom-in-95 duration-100">
                        {children}
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className="flex flex-col h-full max-w-[1600px] mx-auto p-6 lg:p-8 overflow-hidden relative">
            <TutorialOverlay
                isOpen={showTutorial}
                steps={GIGS_TUTORIAL_STEPS}
                onComplete={handleTutorialComplete}
                onSkip={handleTutorialComplete}
            />

            {/* Header */}
            <div id="gigs-header" className="mb-6 shrink-0">
                <h1 className="text-2xl md:text-3xl font-display font-bold text-text-primary dark:text-white mb-1">Find Opportunities</h1>
                <p className="text-sm text-text-secondary dark:text-gray-400">Discover campaigns that match your unique style and audience.</p>
            </div>

            {/* Search & Filters */}
            <div id="gigs-filters" className="flex flex-col gap-4 mb-6 shrink-0">
                <div className="relative max-w-2xl">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </span>
                    <input
                        type="text"
                        placeholder="Search by brand, keyword, or vibe..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-11 pl-11 pr-4 rounded-lg border border-gray-200/60 dark:border-gray-700 bg-white dark:bg-gray-800 text-text-primary dark:text-white focus:ring-2 focus:ring-primary/15 focus:border-gray-300 transition-all outline-none text-sm placeholder-gray-400"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <FilterButton label="Category" name="category" count={filters.category.length}>
                        <div className="space-y-0.5 max-h-64 overflow-y-auto">
                            {['Tech', 'Lifestyle', 'Gaming', 'Fashion', 'Food & Drink', 'Health & Fitness', 'Travel', 'Beauty', 'Finance', 'Education'].map(opt => (
                                <label key={opt} className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={filters.category.includes(opt)}
                                        onChange={() => toggleFilter('category', opt)}
                                        className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-4 h-4"
                                    />
                                    <span className="text-sm text-text-primary dark:text-gray-200">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </FilterButton>

                    <FilterButton label="Platform" name="platform" count={filters.platform.length}>
                        <div className="space-y-0.5">
                            {Object.entries(PLATFORM_ICONS).map(([platform, style]) => (
                                <label key={platform} className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={filters.platform.includes(platform)}
                                        onChange={() => toggleFilter('platform', platform)}
                                        className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-4 h-4"
                                    />
                                    <div className={`size-6 rounded-md ${style.bg} ${style.color} flex items-center justify-center`}>
                                        <span className="material-symbols-outlined text-[14px]">{style.icon}</span>
                                    </div>
                                    <span className="text-sm text-text-primary dark:text-gray-200">{platform}</span>
                                </label>
                            ))}
                        </div>
                    </FilterButton>

                    <FilterButton label="Content Type" name="contentType" count={filters.contentType.length}>
                        <div className="space-y-0.5">
                            {CONTENT_TYPE_OPTIONS.map(opt => (
                                <label key={opt} className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={filters.contentType.includes(opt)}
                                        onChange={() => toggleFilter('contentType', opt)}
                                        className="rounded text-primary focus:ring-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-4 h-4"
                                    />
                                    <span className="text-sm text-text-primary dark:text-gray-200">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </FilterButton>

                    <FilterButton label="Budget" name="budget" count={filters.budgetRange.min > 0 || filters.budgetRange.max < Infinity ? 1 : 0}>
                        <div className="space-y-0.5">
                            {BUDGET_OPTIONS.map(opt => (
                                <label key={opt.label} className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
                                    <input
                                        type="radio"
                                        name="budget"
                                        checked={filters.budgetRange.min === opt.min && filters.budgetRange.max === opt.max}
                                        onChange={() => setFilters({ ...filters, budgetRange: { min: opt.min, max: opt.max } })}
                                        className="text-primary focus:ring-primary border-gray-300 dark:border-gray-600 dark:bg-gray-700 w-4 h-4"
                                    />
                                    <span className="text-sm text-text-primary dark:text-gray-200">{opt.label}</span>
                                </label>
                            ))}
                        </div>
                    </FilterButton>

                    {getActiveFilterCount() > 0 && (
                        <button
                            onClick={clearAllFilters}
                            className="h-10 px-3 text-sm text-gray-500 font-medium hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                            Clear all
                        </button>
                    )}
                </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-4 shrink-0">
                <p className="text-sm text-text-secondary dark:text-gray-400">
                    Showing <span className="font-bold text-text-primary dark:text-white">{opportunities.length}</span> opportunities
                </p>
            </div>

            {/* Grid */}
            <div id="gigs-grid" className="flex-1 overflow-y-auto pb-8">
                {opportunities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                        {opportunities.map((item) => (
                            <Link to={`/gigs/${item.id}`} key={item.id} className="group">
                                <Card padding="p-0" className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    {/* Image */}
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                        {/* Category badge */}
                                        <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide text-text-primary dark:text-white">
                                            {item.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 flex-1 flex flex-col">
                                        {/* Title & Brand */}
                                        <h3 className="font-bold text-text-primary dark:text-white mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-text-secondary dark:text-gray-400 mb-3">
                                            {item.brand} • {item.posted}
                                        </p>

                                        {/* Description */}
                                        <p className="text-sm text-text-secondary dark:text-gray-400 line-clamp-2 mb-4 flex-1">
                                            {item.desc}
                                        </p>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                                            {/* Platforms */}
                                            <div className="flex items-center gap-1">
                                                {item.platform.slice(0, 3).map((p) => {
                                                    const style = PLATFORM_ICONS[p] || PLATFORM_ICONS['UGC Only'];
                                                    return (
                                                        <div
                                                            key={p}
                                                            className={`size-7 rounded-md ${style.bg} ${style.color} flex items-center justify-center`}
                                                            title={p}
                                                        >
                                                            <span className="material-symbols-outlined text-[14px]">{style.icon}</span>
                                                        </div>
                                                    );
                                                })}
                                                {item.platform.length > 3 && (
                                                    <span className="text-xs text-text-secondary dark:text-gray-400 ml-1">+{item.platform.length - 3}</span>
                                                )}
                                            </div>

                                            {/* Budget */}
                                            <span className="text-sm font-bold text-green-600 dark:text-green-400">
                                                {item.budget}
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-80 text-center">
                        <div className="size-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-3xl text-gray-400 dark:text-gray-500">search_off</span>
                        </div>
                        <h3 className="text-lg font-bold text-text-primary dark:text-white mb-2">No Opportunities Found</h3>
                        <p className="text-sm text-text-secondary dark:text-gray-400 max-w-sm mb-4">
                            Try adjusting your filters or search terms to find more campaigns.
                        </p>
                        <Button variant="secondary" onClick={clearAllFilters}>
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gigs;