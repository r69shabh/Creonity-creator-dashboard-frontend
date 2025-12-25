import React, { useState } from 'react';
import { MOCK_LEADERBOARD, RARITY_THRESHOLDS, LeaderboardEntry, CreatorStats, MOCK_CREATOR_STATS, BADGES, MOCK_EARNED_BADGES } from '../data/gamificationData';
import CreatorCard from '../components/gamification/CreatorCard';

type LeaderboardType = 'earners' | 'streak' | 'rating' | 'rising';

// Extended mock data
const CREATOR_DETAILS: Record<string, { stats: CreatorStats; badges: string[] }> = {
    '1': { stats: { lifetimeEarnings: 156200, totalCampaigns: 89, winRate: 45, avgRating: 4.9, currentStreak: 12, repeatBrandRate: 48, avgDeliverySpeed: 22 }, badges: ['100k-legend', '50k-club', '10k-club', 'sharpshooter', 'undefeated'] },
    '2': { stats: { lifetimeEarnings: 142800, totalCampaigns: 76, winRate: 42, avgRating: 4.8, currentStreak: 8, repeatBrandRate: 41, avgDeliverySpeed: 18 }, badges: ['100k-legend', '50k-club', '10k-club', 'five-star-streak', 'brand-favorite'] },
    '3': { stats: { lifetimeEarnings: 98500, totalCampaigns: 54, winRate: 38, avgRating: 4.9, currentStreak: 5, repeatBrandRate: 35, avgDeliverySpeed: 25 }, badges: ['50k-club', '10k-club', 'five-star-streak', 'speed-demon'] },
    '4': { stats: MOCK_CREATOR_STATS, badges: MOCK_EARNED_BADGES },
    '5': { stats: { lifetimeEarnings: 24100, totalCampaigns: 18, winRate: 32, avgRating: 4.7, currentStreak: 3, repeatBrandRate: 28, avgDeliverySpeed: 12 }, badges: ['10k-club', 'first-1k', 'first-campaign', '10-campaigns'] },
};

const ALL_CREATORS = [
    ...MOCK_LEADERBOARD,
    { rank: 6, creatorId: '6', name: 'Jordan Lee', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', value: '$18,200', rarity: 'silver' as const, niche: 'Gaming' },
    { rank: 7, creatorId: '7', name: 'Mia Williams', avatar: 'https://randomuser.me/api/portraits/women/55.jpg', value: '$15,800', rarity: 'silver' as const, niche: 'Lifestyle' },
    { rank: 8, creatorId: '8', name: 'Chris Taylor', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', value: '$12,400', rarity: 'silver' as const, niche: 'Fitness' },
];

const leaderboardTypes = [
    { id: 'earners', label: 'Top Earners', icon: 'payments' },
    { id: 'streak', label: 'Hot Streak', icon: 'local_fire_department' },
    { id: 'rating', label: 'Brand Favorites', icon: 'star' },
    { id: 'rising', label: 'Rising Stars', icon: 'trending_up' },
];

const Leaderboard: React.FC = () => {
    const [activeType, setActiveType] = useState<LeaderboardType>('earners');
    const [selectedCreator, setSelectedCreator] = useState<LeaderboardEntry | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);

    const activeTypeInfo = leaderboardTypes.find(t => t.id === activeType)!;

    const filteredCreators = searchQuery
        ? ALL_CREATORS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.niche.toLowerCase().includes(searchQuery.toLowerCase()))
        : MOCK_LEADERBOARD;

    const getCreatorStats = (creatorId: string): CreatorStats => {
        return CREATOR_DETAILS[creatorId]?.stats || { lifetimeEarnings: 10000, totalCampaigns: 10, winRate: 25, avgRating: 4.5, currentStreak: 2, repeatBrandRate: 20, avgDeliverySpeed: 10 };
    };

    return (
        <div className="max-w-4xl mx-auto p-6 lg:p-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-xl font-bold text-text-primary dark:text-white">Leaderboard</h1>

                {/* Search */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[18px]">search</span>
                    <input
                        type="text"
                        placeholder="Search creators..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-4 py-2 w-48 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-gray-800 text-text-primary dark:text-white text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                </div>
            </div>

            {/* Type Selector Dropdown */}
            {!searchQuery && (
                <div className="relative mb-6">
                    <button
                        onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                        className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border border-border-color dark:border-gray-700 rounded-xl w-full sm:w-auto"
                    >
                        <span className="material-symbols-outlined text-primary">{activeTypeInfo.icon}</span>
                        <span className="font-medium text-text-primary dark:text-white">{activeTypeInfo.label}</span>
                        <span className="material-symbols-outlined text-gray-400 ml-auto">expand_more</span>
                    </button>

                    {showTypeDropdown && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setShowTypeDropdown(false)} />
                            <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-border-color dark:border-gray-700 rounded-xl shadow-lg z-20 min-w-[200px] py-2">
                                {leaderboardTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => { setActiveType(type.id as LeaderboardType); setShowTypeDropdown(false); }}
                                        className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${activeType === type.id ? 'text-primary bg-primary/5' : 'text-text-primary dark:text-white'}`}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{type.icon}</span>
                                        <span className="text-sm font-medium">{type.label}</span>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Search Results Count */}
            {searchQuery && (
                <p className="text-sm text-text-secondary dark:text-gray-400 mb-4">
                    {filteredCreators.length} result{filteredCreators.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
            )}

            {/* Creator List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 overflow-hidden">
                {filteredCreators.map((entry, index) => {
                    const isCurrentUser = entry.name === 'Alex Morgan';

                    return (
                        <div
                            key={entry.creatorId}
                            onClick={() => setSelectedCreator(entry)}
                            className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors ${index !== filteredCreators.length - 1 ? 'border-b border-border-color/50 dark:border-gray-700/50' : ''
                                } ${isCurrentUser ? 'bg-primary/5 dark:bg-primary/10' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}
                        >
                            {/* Rank */}
                            <div className="w-8 text-center">
                                {entry.rank <= 3 ? (
                                    <span className={`text-lg ${entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}`}>
                                        {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                                    </span>
                                ) : (
                                    <span className="text-sm font-medium text-text-secondary dark:text-gray-500">#{entry.rank}</span>
                                )}
                            </div>

                            {/* Avatar */}
                            <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-full object-cover" />

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className={`font-medium text-sm ${isCurrentUser ? 'text-primary' : 'text-text-primary dark:text-white'}`}>
                                    {entry.name}
                                    {isCurrentUser && <span className="text-[10px] text-text-secondary dark:text-gray-500 ml-1.5">(you)</span>}
                                </p>
                                <p className="text-xs text-text-secondary dark:text-gray-500">{entry.niche}</p>
                            </div>

                            {/* Value */}
                            <div className="flex items-center gap-3">
                                <span className="font-semibold text-sm text-text-primary dark:text-white">{entry.value}</span>
                                <span
                                    className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                                    style={{ backgroundColor: RARITY_THRESHOLDS[entry.rarity].color, color: entry.rarity === 'platinum' || entry.rarity === 'silver' ? '#000' : '#fff' }}
                                >
                                    {entry.rarity.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Your Position */}
            {!searchQuery && (
                <div className="mt-4 text-center">
                    <p className="text-sm text-text-secondary dark:text-gray-400">
                        Your position: <span className="font-semibold text-text-primary dark:text-white">#4</span>
                        <span className="text-text-secondary dark:text-gray-500 ml-2">· $27,550 to next rank</span>
                    </p>
                </div>
            )}

            {/* Creator Card Modal */}
            {selectedCreator && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedCreator(null)} />
                    <div className="relative z-10 animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setSelectedCreator(null)}
                            className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm flex items-center gap-1"
                        >
                            Close <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                        <CreatorCard
                            name={selectedCreator.name}
                            avatar={selectedCreator.avatar}
                            niche={selectedCreator.niche}
                            stats={getCreatorStats(selectedCreator.creatorId)}
                        />

                        {/* Badges */}
                        <div className="mt-4 bg-white/10 backdrop-blur-md rounded-xl p-4 max-w-72">
                            <div className="flex flex-wrap gap-2">
                                {(CREATOR_DETAILS[selectedCreator.creatorId]?.badges || ['first-campaign', 'first-1k']).slice(0, 5).map(badgeId => {
                                    const badge = BADGES.find(b => b.id === badgeId);
                                    return badge ? (
                                        <span key={badgeId} className="text-lg" title={`${badge.name}: ${badge.description}`}>{badge.icon}</span>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
