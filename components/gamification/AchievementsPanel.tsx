import React from 'react';
import { BADGES, MOCK_EARNED_BADGES, MOCK_CREATOR_STATS, TIER_THRESHOLDS, getTierFromEarnings, CURRENT_USER_ID, EARNINGS_LEADERBOARD } from '../../data/gamificationData';

interface AchievementsPanelProps {
    userName?: string;
    userAvatar?: string;
}

const AchievementsPanel: React.FC<AchievementsPanelProps> = ({ userName, userAvatar }) => {
    // Get current user data from leaderboard
    const currentUser = EARNINGS_LEADERBOARD.find(e => e.creatorId === CURRENT_USER_ID);
    const displayName = userName || currentUser?.name || 'Alex Morgan';
    const avatar = userAvatar || currentUser?.avatar || 'https://randomuser.me/api/portraits/men/75.jpg';

    const tier = getTierFromEarnings(MOCK_CREATOR_STATS.lifetimeEarnings);
    const tierConfig = TIER_THRESHOLDS[tier];

    // Calculate progress to next tier
    const nextTier = tier === 'rookie' ? 'rising' : tier === 'rising' ? 'pro' : tier === 'pro' ? 'elite' : tier === 'elite' ? 'legend' : null;
    const nextTierConfig = nextTier ? TIER_THRESHOLDS[nextTier] : null;
    const progressPercent = nextTierConfig
        ? ((MOCK_CREATOR_STATS.lifetimeEarnings - tierConfig.min) / (nextTierConfig.min - tierConfig.min)) * 100
        : 100;

    const earnedBadges = BADGES.filter(b => MOCK_EARNED_BADGES.includes(b.id));
    const lockedBadges = BADGES.filter(b => !MOCK_EARNED_BADGES.includes(b.id)).slice(0, 3);

    return (
        <div className="space-y-4">
            {/* Your Card */}
            <div
                className="rounded-xl p-4 relative overflow-hidden border"
                style={{
                    background: `linear-gradient(135deg, ${tierConfig.color}15 0%, ${tierConfig.color}05 100%)`,
                    borderColor: `${tierConfig.color}30`,
                }}
            >
                {/* Glow accent */}
                <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20"
                    style={{ backgroundColor: tierConfig.color }}
                />

                <div className="relative">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                        <img
                            src={avatar}
                            alt={displayName}
                            className="w-12 h-12 rounded-full border-2"
                            style={{ borderColor: tierConfig.color }}
                        />
                        <div>
                            <p className="font-bold text-text-primary dark:text-white text-sm">{displayName}</p>
                            <div className="flex items-center gap-1 text-xs" style={{ color: tierConfig.color }}>
                                {tierConfig.icon} {tierConfig.label} Tier
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-2 text-center border border-gray-200/50 dark:border-transparent">
                            <p className="text-lg font-bold text-text-primary dark:text-white">${(MOCK_CREATOR_STATS.lifetimeEarnings / 1000).toFixed(1)}K</p>
                            <p className="text-[10px] text-text-secondary dark:text-gray-400 uppercase">Earnings</p>
                        </div>
                        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-2 text-center border border-gray-200/50 dark:border-transparent">
                            <p className="text-lg font-bold text-text-primary dark:text-white">{MOCK_CREATOR_STATS.totalCampaigns}</p>
                            <p className="text-[10px] text-text-secondary dark:text-gray-400 uppercase">Campaigns</p>
                        </div>
                    </div>

                    {/* Tier Progress */}
                    {nextTierConfig && (
                        <div>
                            <div className="flex justify-between text-[10px] text-text-secondary dark:text-gray-400 mb-1">
                                <span>{tierConfig.label}</span>
                                <span>{nextTierConfig.label}</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-black/30 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                        width: `${Math.min(progressPercent, 100)}%`,
                                        backgroundColor: tierConfig.color
                                    }}
                                />
                            </div>
                            <p className="text-[10px] text-text-secondary dark:text-gray-400 mt-1 text-center">
                                ${((nextTierConfig.min - MOCK_CREATOR_STATS.lifetimeEarnings) / 1000).toFixed(1)}K to {nextTierConfig.label}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Earned Badges */}
            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700/50">
                <h3 className="text-xs font-semibold text-text-primary dark:text-white mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-yellow-500 dark:text-yellow-400">emoji_events</span>
                    Earned Badges ({earnedBadges.length})
                </h3>
                <div className="grid grid-cols-3 gap-2">
                    {earnedBadges.slice(0, 6).map(badge => (
                        <div
                            key={badge.id}
                            className="bg-gray-100 dark:bg-black/30 rounded-lg p-2 text-center hover:bg-gray-200 dark:hover:bg-black/40 transition-colors cursor-pointer group"
                            title={badge.description}
                        >
                            <span className="text-2xl group-hover:scale-110 transition-transform inline-block">{badge.icon}</span>
                            <p className="text-[9px] text-text-secondary dark:text-gray-400 mt-1 truncate">{badge.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Next Badges */}
            <div className="bg-gray-100 dark:bg-gray-800/30 rounded-xl p-4 border border-gray-200 dark:border-gray-700/30">
                <h3 className="text-xs font-semibold text-text-secondary dark:text-gray-400 mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    Up Next
                </h3>
                <div className="space-y-2">
                    {lockedBadges.map(badge => (
                        <div
                            key={badge.id}
                            className="flex items-center gap-2 opacity-50"
                        >
                            <span className="text-lg grayscale">{badge.icon}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-text-secondary dark:text-gray-400 truncate">{badge.name}</p>
                                <p className="text-[10px] text-text-tertiary dark:text-gray-500 truncate">{badge.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-white dark:bg-gray-800/30 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700/30">
                    <p className="text-orange-500 dark:text-orange-400 text-lg font-bold">🔥 {MOCK_CREATOR_STATS.currentStreak}</p>
                    <p className="text-[10px] text-text-secondary dark:text-gray-400">Day Streak</p>
                </div>
                <div className="bg-white dark:bg-gray-800/30 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700/30">
                    <p className="text-yellow-500 dark:text-yellow-400 text-lg font-bold">⭐ {MOCK_CREATOR_STATS.avgRating}</p>
                    <p className="text-[10px] text-text-secondary dark:text-gray-400">Avg Rating</p>
                </div>
            </div>
        </div>
    );
};

export default AchievementsPanel;
