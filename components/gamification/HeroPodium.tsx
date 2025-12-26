import React from 'react';
import { LeaderboardEntry, TIER_THRESHOLDS, getPositionChange, CURRENT_USER_ID, formatLeaderboardValue, LeaderboardType } from '../../data/gamificationData';

interface HeroPodiumProps {
    entries: LeaderboardEntry[];
    onCreatorClick: (entry: LeaderboardEntry) => void;
    activeType: LeaderboardType;
}

const HeroPodium: React.FC<HeroPodiumProps> = ({ entries, onCreatorClick, activeType }) => {
    const top3 = entries.slice(0, 3);

    // Reorder for podium layout: [2nd, 1st, 3rd]
    const podiumOrder = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3;

    const getPodiumHeight = (rank: number): string => {
        switch (rank) {
            case 1: return 'h-28';
            case 2: return 'h-20';
            case 3: return 'h-16';
            default: return 'h-16';
        }
    };

    const getAvatarSize = (rank: number): string => {
        switch (rank) {
            case 1: return 'w-20 h-20';
            case 2: return 'w-16 h-16';
            case 3: return 'w-14 h-14';
            default: return 'w-14 h-14';
        }
    };

    const getMedalIcon = (rank: number): string => {
        switch (rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return '';
        }
    };

    const PositionChange: React.FC<{ current: number; previous: number }> = ({ current, previous }) => {
        const change = getPositionChange(current, previous);

        // Don't show anything if position is same
        if (change.direction === 'same') {
            return null;
        }

        if (change.direction === 'up') {
            return (
                <span className="text-green-600 dark:text-green-400 text-xs font-medium flex items-center gap-0.5">
                    ▲{change.amount}
                </span>
            );
        }

        return (
            <span className="text-red-600 dark:text-red-400 text-xs font-medium flex items-center gap-0.5">
                ▼{change.amount}
            </span>
        );
    };

    return (
        <div className="mb-6">
            {/* Podium Container */}
            <div className="flex items-end justify-center gap-4 px-2">
                {podiumOrder.map((entry) => {
                    const tierConfig = TIER_THRESHOLDS[entry.tier];
                    const isCurrentUser = entry.creatorId === CURRENT_USER_ID;
                    const isFirst = entry.rank === 1;

                    return (
                        <div
                            key={entry.creatorId}
                            className="flex flex-col items-center cursor-pointer group"
                            onClick={() => onCreatorClick(entry)}
                        >
                            {/* Avatar Section */}
                            <div className="relative mb-2">
                                {/* Glow effect - only for #1 */}
                                {isFirst && (
                                    <div
                                        className="absolute -inset-2 rounded-full blur-lg opacity-50 animate-pulse"
                                        style={{ backgroundColor: tierConfig.color }}
                                    />
                                )}

                                {/* Medal */}
                                <div className={`absolute ${isFirst ? '-top-5' : '-top-4'} left-1/2 -translate-x-1/2 ${isFirst ? 'text-2xl' : 'text-xl'} z-10`}>
                                    {getMedalIcon(entry.rank)}
                                </div>

                                {/* Avatar */}
                                <img
                                    src={entry.avatar}
                                    alt={entry.name}
                                    className={`relative ${getAvatarSize(entry.rank)} rounded-full object-cover border-3 group-hover:scale-105 transition-transform`}
                                    style={{
                                        borderColor: tierConfig.color,
                                        boxShadow: isFirst ? `0 0 20px ${tierConfig.color}60` : `0 0 10px ${tierConfig.color}30`
                                    }}
                                />
                            </div>

                            {/* Name & Info - Below avatar */}
                            <div className="text-center mt-1 mb-2 w-24">
                                <p className={`font-semibold text-sm truncate ${isCurrentUser ? 'text-primary' : 'text-text-primary dark:text-white'}`}>
                                    {entry.name}
                                </p>
                                <div className="flex items-center justify-center gap-1.5 text-xs mt-0.5">
                                    <span style={{ color: tierConfig.color }}>{tierConfig.icon}</span>
                                    <span className="text-text-secondary dark:text-gray-400 truncate">{entry.niche}</span>
                                    <PositionChange current={entry.rank} previous={entry.previousRank} />
                                </div>
                            </div>

                            {/* Podium Block */}
                            <div
                                className={`${getPodiumHeight(entry.rank)} w-24 rounded-t-lg flex flex-col items-center justify-center relative`}
                                style={{
                                    background: `linear-gradient(180deg, ${tierConfig.color}30 0%, ${tierConfig.color}10 100%)`,
                                    borderTop: `3px solid ${tierConfig.color}`,
                                }}
                            >
                                {/* Rank Number */}
                                <span className="text-3xl font-black text-gray-300 dark:text-white/20">
                                    {entry.rank}
                                </span>

                                {/* Value */}
                                <span className="text-xs font-bold text-text-primary dark:text-white absolute bottom-2">
                                    {formatLeaderboardValue(activeType, entry)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HeroPodium;
