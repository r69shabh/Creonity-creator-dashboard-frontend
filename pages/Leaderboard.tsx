import React, { useState } from 'react';
import { MOCK_LEADERBOARD, RARITY_THRESHOLDS, LeaderboardEntry, CreatorStats, MOCK_CREATOR_STATS, BADGES, MOCK_EARNED_BADGES } from '../data/gamificationData';
import Card from '../components/ui/Card';
import CreatorCard from '../components/gamification/CreatorCard';

type LeaderboardType = 'earners' | 'streak' | 'rating' | 'rising';
type TimeFrame = 'week' | 'month' | 'all';

// Extended mock data for viewing other creators
const CREATOR_DETAILS: Record<string, { stats: CreatorStats; badges: string[] }> = {
    '1': { stats: { lifetimeEarnings: 156200, totalCampaigns: 89, winRate: 45, avgRating: 4.9, currentStreak: 12, repeatBrandRate: 48, avgDeliverySpeed: 22 }, badges: ['100k-legend', '50k-club', '10k-club', 'first-1k', 'sharpshooter', 'undefeated'] },
    '2': { stats: { lifetimeEarnings: 142800, totalCampaigns: 76, winRate: 42, avgRating: 4.8, currentStreak: 8, repeatBrandRate: 41, avgDeliverySpeed: 18 }, badges: ['100k-legend', '50k-club', '10k-club', 'first-1k', 'five-star-streak', 'brand-favorite'] },
    '3': { stats: { lifetimeEarnings: 98500, totalCampaigns: 54, winRate: 38, avgRating: 4.9, currentStreak: 5, repeatBrandRate: 35, avgDeliverySpeed: 25 }, badges: ['50k-club', '10k-club', 'first-1k', 'five-star-streak', 'speed-demon'] },
    '4': { stats: MOCK_CREATOR_STATS, badges: MOCK_EARNED_BADGES },
    '5': { stats: { lifetimeEarnings: 24100, totalCampaigns: 18, winRate: 32, avgRating: 4.7, currentStreak: 3, repeatBrandRate: 28, avgDeliverySpeed: 12 }, badges: ['10k-club', 'first-1k', 'first-campaign', '10-campaigns'] },
};

// Additional creators for search
const ALL_CREATORS = [
    ...MOCK_LEADERBOARD,
    { rank: 6, creatorId: '6', name: 'Jordan Lee', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', value: '$18,200', rarity: 'silver' as const, niche: 'Gaming' },
    { rank: 7, creatorId: '7', name: 'Mia Williams', avatar: 'https://randomuser.me/api/portraits/women/55.jpg', value: '$15,800', rarity: 'silver' as const, niche: 'Lifestyle' },
    { rank: 8, creatorId: '8', name: 'Chris Taylor', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', value: '$12,400', rarity: 'silver' as const, niche: 'Fitness' },
    { rank: 9, creatorId: '9', name: 'Sofia Martinez', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', value: '$9,100', rarity: 'silver' as const, niche: 'Beauty' },
    { rank: 10, creatorId: '10', name: 'Ryan Kim', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', value: '$7,500', rarity: 'silver' as const, niche: 'Tech' },
];

const Leaderboard: React.FC = () => {
    const [activeType, setActiveType] = useState<LeaderboardType>('earners');
    const [timeFrame, setTimeFrame] = useState<TimeFrame>('month');
    const [selectedCreator, setSelectedCreator] = useState<LeaderboardEntry | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const leaderboardTypes = [
        { id: 'earners', label: 'Top Earners', icon: 'payments', description: 'Highest lifetime earnings' },
        { id: 'streak', label: 'Hot Streak', icon: 'local_fire_department', description: 'Longest win streaks' },
        { id: 'rating', label: 'Brand Favorites', icon: 'star', description: 'Highest rated creators' },
        { id: 'rising', label: 'Rising Stars', icon: 'trending_up', description: 'Fastest growing this month' },
    ];

    const getRankChange = (current: number, previous?: number) => {
        if (!previous) return null;
        const change = previous - current;
        if (change > 0) return { direction: 'up', value: change };
        if (change < 0) return { direction: 'down', value: Math.abs(change) };
        return null;
    };

    const filteredCreators = searchQuery
        ? ALL_CREATORS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.niche.toLowerCase().includes(searchQuery.toLowerCase()))
        : MOCK_LEADERBOARD;

    const getCreatorStats = (creatorId: string): CreatorStats => {
        return CREATOR_DETAILS[creatorId]?.stats || { lifetimeEarnings: 10000, totalCampaigns: 10, winRate: 25, avgRating: 4.5, currentStreak: 2, repeatBrandRate: 20, avgDeliverySpeed: 10 };
    };

    return (
        <div className="max-w-6xl mx-auto p-6 lg:p-8 pb-20">
            {/* Header with Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary dark:text-white mb-2">Leaderboard</h1>
                    <p className="text-text-secondary dark:text-gray-400">See how you rank against other creators</p>
                </div>

                {/* Search */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[20px]">search</span>
                    <input
                        type="text"
                        placeholder="Search creators..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2.5 w-full md:w-64 rounded-xl border border-border-color dark:border-gray-700 bg-white dark:bg-gray-800 text-text-primary dark:text-white text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                </div>
            </div>

            {/* Leaderboard Type Selector */}
            {!searchQuery && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {leaderboardTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setActiveType(type.id as LeaderboardType)}
                            className={`p-4 rounded-xl border transition-all text-left ${activeType === type.id
                                    ? 'border-primary bg-primary/5 dark:bg-primary/10'
                                    : 'border-border-color dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/50'
                                }`}
                        >
                            <div className={`size-10 rounded-lg flex items-center justify-center mb-3 ${activeType === type.id
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-text-secondary dark:text-gray-400'
                                }`}>
                                <span className="material-symbols-outlined">{type.icon}</span>
                            </div>
                            <h3 className={`font-bold text-sm ${activeType === type.id ? 'text-primary' : 'text-text-primary dark:text-white'
                                }`}>
                                {type.label}
                            </h3>
                            <p className="text-[10px] text-text-secondary dark:text-gray-500 mt-0.5">{type.description}</p>
                        </button>
                    ))}
                </div>
            )}

            {/* Search Results Header */}
            {searchQuery && (
                <div className="mb-6">
                    <p className="text-sm text-text-secondary dark:text-gray-400">
                        Found <span className="font-bold text-text-primary dark:text-white">{filteredCreators.length}</span> creators matching "{searchQuery}"
                    </p>
                </div>
            )}

            {/* Time Frame Selector */}
            {!searchQuery && (
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        {[
                            { id: 'week', label: 'This Week' },
                            { id: 'month', label: 'This Month' },
                            { id: 'all', label: 'All Time' },
                        ].map((tf) => (
                            <button
                                key={tf.id}
                                onClick={() => setTimeFrame(tf.id as TimeFrame)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${timeFrame === tf.id
                                        ? 'bg-white dark:bg-gray-700 text-text-primary dark:text-white shadow-sm'
                                        : 'text-text-secondary dark:text-gray-400 hover:text-text-primary'
                                    }`}
                            >
                                {tf.label}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-text-secondary dark:text-gray-500">
                        Updated 2 hours ago
                    </p>
                </div>
            )}

            {/* Leaderboard Table */}
            <Card className="overflow-hidden">
                {/* Top 3 Podium - only show when not searching */}
                {!searchQuery && (
                    <div className="p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800 border-b border-border-color dark:border-gray-700">
                        <div className="flex items-end justify-center gap-4">
                            {/* 2nd Place */}
                            <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedCreator(MOCK_LEADERBOARD[1])}>
                                <div className="relative mb-2">
                                    <img src={MOCK_LEADERBOARD[1].avatar} alt={MOCK_LEADERBOARD[1].name} className="w-16 h-16 rounded-full object-cover border-2" style={{ borderColor: RARITY_THRESHOLDS[MOCK_LEADERBOARD[1].rarity].color }} />
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gray-400 text-white text-xs font-bold flex items-center justify-center shadow-md">2</div>
                                </div>
                                <p className="text-sm font-bold text-text-primary dark:text-white">{MOCK_LEADERBOARD[1].name.split(' ')[0]}</p>
                                <p className="text-xs text-text-secondary dark:text-gray-500">{MOCK_LEADERBOARD[1].value}</p>
                            </div>

                            {/* 1st Place */}
                            <div className="flex flex-col items-center -mt-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedCreator(MOCK_LEADERBOARD[0])}>
                                <div className="relative mb-2">
                                    <div className="absolute -inset-2 bg-yellow-400/20 rounded-full blur-lg" />
                                    <img src={MOCK_LEADERBOARD[0].avatar} alt={MOCK_LEADERBOARD[0].name} className="relative w-20 h-20 rounded-full object-cover border-3 border-yellow-400 shadow-lg" />
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-yellow-400 text-yellow-900 text-sm font-bold flex items-center justify-center shadow-md">👑</div>
                                </div>
                                <p className="text-base font-bold text-text-primary dark:text-white">{MOCK_LEADERBOARD[0].name.split(' ')[0]}</p>
                                <p className="text-sm font-bold text-primary">{MOCK_LEADERBOARD[0].value}</p>
                            </div>

                            {/* 3rd Place */}
                            <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedCreator(MOCK_LEADERBOARD[2])}>
                                <div className="relative mb-2">
                                    <img src={MOCK_LEADERBOARD[2].avatar} alt={MOCK_LEADERBOARD[2].name} className="w-16 h-16 rounded-full object-cover border-2" style={{ borderColor: RARITY_THRESHOLDS[MOCK_LEADERBOARD[2].rarity].color }} />
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center shadow-md">3</div>
                                </div>
                                <p className="text-sm font-bold text-text-primary dark:text-white">{MOCK_LEADERBOARD[2].name.split(' ')[0]}</p>
                                <p className="text-xs text-text-secondary dark:text-gray-500">{MOCK_LEADERBOARD[2].value}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Full List */}
                <div className="divide-y divide-border-color dark:divide-gray-700">
                    {filteredCreators.map((entry) => {
                        const rankChange = getRankChange(entry.rank, entry.previousRank);
                        const isCurrentUser = entry.name === 'Alex Morgan';

                        return (
                            <div
                                key={entry.creatorId}
                                onClick={() => setSelectedCreator(entry)}
                                className={`flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${isCurrentUser ? 'bg-primary/5 dark:bg-primary/10' : ''
                                    }`}
                            >
                                {/* Rank */}
                                <div className="w-12 flex items-center justify-center">
                                    <span className={`text-lg font-bold ${entry.rank === 1 ? 'text-yellow-500' :
                                            entry.rank === 2 ? 'text-gray-400' :
                                                entry.rank === 3 ? 'text-amber-600' :
                                                    'text-text-secondary dark:text-gray-500'
                                        }`}>
                                        {entry.rank}
                                    </span>
                                </div>

                                {/* Rank Change */}
                                <div className="w-8 flex items-center justify-center">
                                    {rankChange ? (
                                        <span className={`flex items-center gap-0.5 text-xs font-bold ${rankChange.direction === 'up' ? 'text-green-500' : 'text-red-500'
                                            }`}>
                                            <span className="material-symbols-outlined text-[14px]">
                                                {rankChange.direction === 'up' ? 'arrow_upward' : 'arrow_downward'}
                                            </span>
                                            {rankChange.value}
                                        </span>
                                    ) : (
                                        <span className="text-gray-300 dark:text-gray-600">-</span>
                                    )}
                                </div>

                                {/* Avatar */}
                                <div className="relative">
                                    <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: RARITY_THRESHOLDS[entry.rarity].color, color: entry.rarity === 'platinum' || entry.rarity === 'silver' ? '#000' : '#fff' }}>
                                        {entry.rarity.charAt(0).toUpperCase()}
                                    </div>
                                </div>

                                {/* Name & Niche */}
                                <div className="flex-1 min-w-0">
                                    <p className={`font-bold text-sm truncate ${isCurrentUser ? 'text-primary' : 'text-text-primary dark:text-white'}`}>
                                        {entry.name}
                                        {isCurrentUser && <span className="text-[10px] font-normal text-text-secondary dark:text-gray-500 ml-2">(You)</span>}
                                    </p>
                                    <p className="text-xs text-text-secondary dark:text-gray-500">{entry.niche}</p>
                                </div>

                                {/* Value */}
                                <div className="text-right flex items-center gap-2">
                                    <p className="font-bold text-text-primary dark:text-white">{entry.value}</p>
                                    <span className="material-symbols-outlined text-gray-400 text-[18px]">chevron_right</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Your Position (if not in top 5) */}
                {!searchQuery && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-border-color dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-text-secondary dark:text-gray-400">
                                Your current position: <span className="font-bold text-text-primary dark:text-white">#4</span>
                            </p>
                            <p className="text-xs text-text-secondary dark:text-gray-500">
                                $27,550 to reach #3
                            </p>
                        </div>
                    </div>
                )}
            </Card>

            {/* Creator Card Modal */}
            {selectedCreator && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedCreator(null)}></div>
                    <div className="relative z-10 animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setSelectedCreator(null)}
                            className="absolute -top-12 right-0 text-white/70 hover:text-white flex items-center gap-1 text-sm"
                        >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                            Close
                        </button>
                        <CreatorCard
                            name={selectedCreator.name}
                            avatar={selectedCreator.avatar}
                            niche={selectedCreator.niche}
                            stats={getCreatorStats(selectedCreator.creatorId)}
                        />

                        {/* Badges below card */}
                        <div className="mt-4 bg-white/10 backdrop-blur-md rounded-xl p-4 max-w-72">
                            <h4 className="text-white/70 text-xs font-bold uppercase tracking-wider mb-3">Earned Badges</h4>
                            <div className="flex flex-wrap gap-2">
                                {(CREATOR_DETAILS[selectedCreator.creatorId]?.badges || ['first-campaign', 'first-1k']).slice(0, 6).map(badgeId => {
                                    const badge = BADGES.find(b => b.id === badgeId);
                                    return badge ? (
                                        <div key={badgeId} className="flex items-center gap-1.5 px-2 py-1 bg-white/10 rounded-lg" title={badge.description}>
                                            <span className="text-base">{badge.icon}</span>
                                            <span className="text-white/80 text-[10px] font-medium">{badge.name}</span>
                                        </div>
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
