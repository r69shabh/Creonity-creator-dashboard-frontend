import React, { useState, useMemo } from 'react';
import {
    LeaderboardEntry,
    TIER_THRESHOLDS,
    BADGES,
    getLeaderboardByTypeAndTime,
    formatLeaderboardValue,
    getPositionChange,
    CURRENT_USER_ID,
    LeaderboardType,
    TimeFilter,
} from '../data/gamificationData';
import HeroPodium from '../components/gamification/HeroPodium';
import AchievementsPanel from '../components/gamification/AchievementsPanel';
import CreatorCard from '../components/gamification/CreatorCard';

const leaderboardTypes = [
    { id: 'earners' as const, label: 'Top Earners', icon: 'payments', description: 'Highest lifetime earnings' },
    { id: 'streak' as const, label: 'Hot Streak', icon: 'local_fire_department', description: 'Longest campaign streaks' },
    { id: 'rating' as const, label: 'Brand Favorites', icon: 'favorite', description: 'Most repeat brand hires' },
    { id: 'rising' as const, label: 'Rising Stars', icon: 'trending_up', description: 'Fastest growing creators' },
];

const timeFilters = [
    { id: 'week' as const, label: 'This Week' },
    { id: 'month' as const, label: 'This Month' },
    { id: 'all' as const, label: 'All Time' },
];

const Leaderboard: React.FC = () => {
    const [activeType, setActiveType] = useState<LeaderboardType>('earners');
    const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
    const [selectedCreator, setSelectedCreator] = useState<LeaderboardEntry | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Get leaderboard data based on active type AND time filter
    const leaderboardData = useMemo(() => {
        return getLeaderboardByTypeAndTime(activeType, timeFilter);
    }, [activeType, timeFilter]);

    // Filter by search
    const filteredData = useMemo(() => {
        if (!searchQuery) return leaderboardData;
        return leaderboardData.filter(c =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.niche.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [leaderboardData, searchQuery]);

    // Get current user's position
    const currentUserEntry = useMemo(() => {
        return leaderboardData.find(e => e.creatorId === CURRENT_USER_ID);
    }, [leaderboardData]);

    const PositionChange: React.FC<{ current: number; previous: number }> = ({ current, previous }) => {
        const change = getPositionChange(current, previous);

        // Don't show anything if same position
        if (change.direction === 'same') {
            return null;
        }

        if (change.direction === 'up') {
            return (
                <span className="text-green-500 text-[10px] font-medium flex items-center">
                    ▲{change.amount}
                </span>
            );
        }

        return (
            <span className="text-red-500 text-[10px] font-medium flex items-center">
                ▼{change.amount}
            </span>
        );
    };

    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 pb-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-text-primary dark:text-white">Leaderboard</h1>
                        <p className="text-xs text-text-secondary dark:text-gray-400 mt-0.5">
                            {leaderboardTypes.find(t => t.id === activeType)?.description}
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[16px]">search</span>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 pr-3 py-1.5 w-32 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-gray-800 text-text-primary dark:text-white text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="flex gap-6">
                    {/* Left Column - Leaderboard (wider) */}
                    <div className="flex-1 min-w-0">
                        {/* Category Tabs */}
                        <div className="flex gap-1.5 mb-3 overflow-x-auto no-scrollbar pb-1">
                            {leaderboardTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setActiveType(type.id)}
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeType === type.id
                                        ? 'bg-primary text-white shadow-md shadow-primary/25'
                                        : 'bg-white dark:bg-gray-800 text-text-secondary dark:text-gray-400 border border-border-color dark:border-gray-700 hover:border-primary/50 hover:text-primary'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[16px]">{type.icon}</span>
                                    <span className="hidden sm:inline">{type.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Time Filter */}
                        <div className="flex items-center gap-1 mb-5 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit">
                            {timeFilters.map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setTimeFilter(filter.id)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${timeFilter === filter.id
                                        ? 'bg-white dark:bg-gray-700 text-text-primary dark:text-white shadow-sm'
                                        : 'text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white'
                                        }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        {/* Hero Podium - Only show when not searching */}
                        {!searchQuery && (
                            <HeroPodium
                                entries={leaderboardData}
                                onCreatorClick={setSelectedCreator}
                                activeType={activeType}
                            />
                        )}

                        {/* Search Results Count */}
                        {searchQuery && (
                            <p className="text-sm text-text-secondary dark:text-gray-400 mb-3">
                                {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} for "{searchQuery}"
                            </p>
                        )}

                        {/* Creator List (4th onwards, or all if searching) */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 overflow-hidden">
                            {(searchQuery ? filteredData : filteredData.slice(3)).map((entry, index, arr) => {
                                const isCurrentUser = entry.creatorId === CURRENT_USER_ID;
                                const tierConfig = TIER_THRESHOLDS[entry.tier];

                                return (
                                    <div
                                        key={entry.creatorId}
                                        onClick={() => setSelectedCreator(entry)}
                                        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all ${index !== arr.length - 1 ? 'border-b border-border-color/50 dark:border-gray-700/50' : ''
                                            } ${isCurrentUser
                                                ? 'bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/15'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
                                            }`}
                                    >
                                        {/* Rank */}
                                        <div className="w-7 text-center flex flex-col items-center">
                                            <span className="text-sm font-bold text-text-primary dark:text-white">#{entry.rank}</span>
                                            <PositionChange current={entry.rank} previous={entry.previousRank} />
                                        </div>

                                        {/* Avatar with Tier Icon */}
                                        <div className="relative flex-shrink-0">
                                            <img
                                                src={entry.avatar}
                                                alt={entry.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                                style={{
                                                    border: `2px solid ${tierConfig.color}`,
                                                }}
                                            />
                                            <span
                                                className="absolute -bottom-0.5 -right-0.5 text-xs"
                                                title={tierConfig.label}
                                            >
                                                {tierConfig.icon}
                                            </span>
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5">
                                                <p className={`font-semibold text-sm truncate ${isCurrentUser ? 'text-primary' : 'text-text-primary dark:text-white'}`}>
                                                    {entry.name}
                                                    {isCurrentUser && <span className="text-[10px] text-text-secondary dark:text-gray-500 ml-1">(you)</span>}
                                                </p>
                                                {/* Top Badges */}
                                                <div className="flex items-center gap-0.5">
                                                    {entry.topBadges?.slice(0, 2).map(badgeId => {
                                                        const badge = BADGES.find(b => b.id === badgeId);
                                                        return badge ? (
                                                            <span key={badgeId} className="text-xs" title={badge.name}>{badge.icon}</span>
                                                        ) : null;
                                                    })}
                                                </div>
                                            </div>
                                            <p className="text-[11px] text-text-secondary dark:text-gray-500">{entry.niche}</p>
                                        </div>

                                        {/* Value */}
                                        <div className="text-right">
                                            <span className="font-bold text-sm text-text-primary dark:text-white">
                                                {formatLeaderboardValue(activeType, entry)}
                                            </span>
                                        </div>

                                        {/* Chevron */}
                                        <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 text-[18px]">
                                            chevron_right
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column - Achievements (narrower) */}
                    <div className="w-64 flex-shrink-0 hidden lg:block">
                        <h2 className="text-sm font-semibold text-text-primary dark:text-white mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-primary">military_tech</span>
                            My Achievements
                        </h2>
                        <AchievementsPanel />
                    </div>
                </div>

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
                                stats={selectedCreator.stats}
                            />

                            {/* Badges */}
                            {selectedCreator.topBadges && selectedCreator.topBadges.length > 0 && (
                                <div className="mt-4 bg-white/10 backdrop-blur-md rounded-xl p-4 max-w-72">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCreator.topBadges.map(badgeId => {
                                            const badge = BADGES.find(b => b.id === badgeId);
                                            return badge ? (
                                                <span key={badgeId} className="text-lg" title={`${badge.name}: ${badge.description}`}>{badge.icon}</span>
                                            ) : null;
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
