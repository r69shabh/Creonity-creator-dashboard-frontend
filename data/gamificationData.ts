// Gamification Types and Data

export type CreatorTier = 'rookie' | 'rising' | 'pro' | 'elite' | 'legend';
export type TimeFilter = 'week' | 'month' | 'all';
export type LeaderboardType = 'earners' | 'streak' | 'rating' | 'rising';

export interface CreatorStats {
    lifetimeEarnings: number;
    totalCampaigns: number;
    winRate: number; // percentage
    avgRating: number; // out of 5
    currentStreak: number;
    repeatBrandRate: number; // percentage
    avgDeliverySpeed: number; // percentage faster than deadline
    monthlyGrowth?: number; // percentage month-over-month
}

export interface Badge {
    id: string;
    name: string;
    icon: string;
    description: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    earned?: boolean;
    earnedDate?: string;
}

export interface LeaderboardEntry {
    rank: number;
    previousRank: number;
    creatorId: string;
    name: string;
    avatar: string;
    value: string | number;
    tier: CreatorTier;
    niche: string;
    stats: CreatorStats;
    topBadges?: string[];
}

// Creator Tier thresholds based on lifetime earnings
export const TIER_THRESHOLDS: Record<CreatorTier, { min: number; max: number; label: string; color: string; icon: string; bgGradient: string }> = {
    rookie: { min: 0, max: 5000, label: 'Rookie', color: '#6B7280', icon: '🌱', bgGradient: 'from-gray-500/20 to-gray-600/10' },
    rising: { min: 5000, max: 25000, label: 'Rising', color: '#1BD1C9', icon: '⚡', bgGradient: 'from-teal-500/20 to-cyan-500/10' },
    pro: { min: 25000, max: 100000, label: 'Pro', color: '#075CD1', icon: '💎', bgGradient: 'from-blue-500/20 to-indigo-500/10' },
    elite: { min: 100000, max: 500000, label: 'Elite', color: '#F59E0B', icon: '👑', bgGradient: 'from-yellow-500/20 to-amber-500/10' },
    legend: { min: 500000, max: Infinity, label: 'Legend', color: '#7C3AED', icon: '🔥', bgGradient: 'from-purple-500/20 to-violet-500/10' },
};

export const getTierFromEarnings = (earnings: number): CreatorTier => {
    if (earnings >= 500000) return 'legend';
    if (earnings >= 100000) return 'elite';
    if (earnings >= 25000) return 'pro';
    if (earnings >= 5000) return 'rising';
    return 'rookie';
};

// Badge definitions
export const BADGES: Badge[] = [
    // Earnings
    { id: 'first-1k', name: 'First $1K', icon: '💰', description: 'Earned your first $1,000', rarity: 'common' },
    { id: '10k-club', name: '$10K Club', icon: '💎', description: 'Earned $10,000 lifetime', rarity: 'rare' },
    { id: '50k-club', name: '$50K Club', icon: '🏆', description: 'Earned $50,000 lifetime', rarity: 'epic' },
    { id: '100k-legend', name: '$100K Legend', icon: '👑', description: 'Earned $100,000 lifetime', rarity: 'legendary' },

    // Win Rate
    { id: 'sharpshooter', name: 'Sharpshooter', icon: '🎯', description: '50%+ bid win rate (min 10 bids)', rarity: 'rare' },
    { id: 'undefeated', name: 'Undefeated', icon: '🔥', description: '10 campaign wins in a row', rarity: 'epic' },

    // Quality
    { id: 'five-star-streak', name: '5-Star Streak', icon: '⭐', description: '5 perfect reviews in a row', rarity: 'rare' },
    { id: 'brand-favorite', name: 'Brand Favorite', icon: '❤️', description: 'Hired by the same brand 3+ times', rarity: 'epic' },
    { id: 'speed-demon', name: 'Speed Demon', icon: '⚡', description: 'Delivered 50% faster than deadline', rarity: 'rare' },

    // Milestones
    { id: 'first-campaign', name: 'First Campaign', icon: '🚀', description: 'Completed your first campaign', rarity: 'common' },
    { id: '10-campaigns', name: 'Veteran', icon: '🎖️', description: 'Completed 10 campaigns', rarity: 'common' },
    { id: '50-campaigns', name: 'Pro Creator', icon: '🌟', description: 'Completed 50 campaigns', rarity: 'epic' },
];

// Helper to format values by category
export const formatLeaderboardValue = (type: LeaderboardType, entry: LeaderboardEntry): string => {
    switch (type) {
        case 'earners':
            return `$${(entry.stats.lifetimeEarnings / 1000).toFixed(1)}K`;
        case 'streak':
            return `🔥 ${entry.stats.currentStreak} days`;
        case 'rating':
            return `❤️ ${entry.stats.repeatBrandRate}%`;
        case 'rising':
            return `↑${entry.stats.monthlyGrowth || 0}%`;
        default:
            return String(entry.value);
    }
};

// Helper to get position change
export const getPositionChange = (current: number, previous: number): { direction: 'up' | 'down' | 'same'; amount: number } => {
    if (previous === current) return { direction: 'same', amount: 0 };
    if (previous > current) return { direction: 'up', amount: previous - current };
    return { direction: 'down', amount: current - previous };
};

// Current user ID (for highlighting)
export const CURRENT_USER_ID = '4';

// ========== MOCK DATA ==========

// Top Earners Leaderboard
export const EARNINGS_LEADERBOARD: LeaderboardEntry[] = [
    {
        rank: 1, previousRank: 1, creatorId: '1', name: 'Sarah Chen',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        value: '$156,200', tier: 'elite', niche: 'Tech',
        stats: { lifetimeEarnings: 156200, totalCampaigns: 89, winRate: 45, avgRating: 4.9, currentStreak: 12, repeatBrandRate: 48, avgDeliverySpeed: 22, monthlyGrowth: 8 },
        topBadges: ['100k-legend', 'sharpshooter', 'undefeated']
    },
    {
        rank: 2, previousRank: 3, creatorId: '2', name: 'Marcus Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        value: '$142,800', tier: 'elite', niche: 'Lifestyle',
        stats: { lifetimeEarnings: 142800, totalCampaigns: 76, winRate: 42, avgRating: 4.8, currentStreak: 8, repeatBrandRate: 41, avgDeliverySpeed: 18, monthlyGrowth: 15 },
        topBadges: ['100k-legend', 'five-star-streak', 'brand-favorite']
    },
    {
        rank: 3, previousRank: 2, creatorId: '3', name: 'Emma Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        value: '$98,500', tier: 'pro', niche: 'Fashion',
        stats: { lifetimeEarnings: 98500, totalCampaigns: 54, winRate: 38, avgRating: 4.9, currentStreak: 5, repeatBrandRate: 35, avgDeliverySpeed: 25, monthlyGrowth: 12 },
        topBadges: ['50k-club', 'five-star-streak', 'speed-demon']
    },
    {
        rank: 4, previousRank: 5, creatorId: '4', name: 'Alex Morgan',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        value: '$28,450', tier: 'pro', niche: 'Tech',
        stats: { lifetimeEarnings: 28450, totalCampaigns: 24, winRate: 28.5, avgRating: 4.9, currentStreak: 5, repeatBrandRate: 35, avgDeliverySpeed: 15, monthlyGrowth: 45 },
        topBadges: ['10k-club', 'five-star-streak', 'sharpshooter']
    },
    {
        rank: 5, previousRank: 4, creatorId: '5', name: 'Priya Sharma',
        avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
        value: '$24,100', tier: 'rising', niche: 'Beauty',
        stats: { lifetimeEarnings: 24100, totalCampaigns: 18, winRate: 32, avgRating: 4.7, currentStreak: 3, repeatBrandRate: 28, avgDeliverySpeed: 12, monthlyGrowth: 22 },
        topBadges: ['10k-club', 'first-1k', '10-campaigns']
    },
    {
        rank: 6, previousRank: 6, creatorId: '6', name: 'Jordan Lee',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        value: '$18,200', tier: 'rising', niche: 'Gaming',
        stats: { lifetimeEarnings: 18200, totalCampaigns: 15, winRate: 30, avgRating: 4.6, currentStreak: 2, repeatBrandRate: 25, avgDeliverySpeed: 20, monthlyGrowth: 35 },
        topBadges: ['10k-club', 'speed-demon']
    },
    {
        rank: 7, previousRank: 9, creatorId: '7', name: 'Mia Williams',
        avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
        value: '$15,800', tier: 'rising', niche: 'Lifestyle',
        stats: { lifetimeEarnings: 15800, totalCampaigns: 12, winRate: 28, avgRating: 4.8, currentStreak: 4, repeatBrandRate: 30, avgDeliverySpeed: 18, monthlyGrowth: 55 },
        topBadges: ['10k-club', 'five-star-streak']
    },
    {
        rank: 8, previousRank: 7, creatorId: '8', name: 'Chris Taylor',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        value: '$12,400', tier: 'rising', niche: 'Fitness',
        stats: { lifetimeEarnings: 12400, totalCampaigns: 10, winRate: 25, avgRating: 4.5, currentStreak: 1, repeatBrandRate: 20, avgDeliverySpeed: 15, monthlyGrowth: 18 },
        topBadges: ['10k-club', '10-campaigns']
    },
];

// Hot Streak Leaderboard (sorted by currentStreak)
export const STREAK_LEADERBOARD: LeaderboardEntry[] = [...EARNINGS_LEADERBOARD]
    .sort((a, b) => b.stats.currentStreak - a.stats.currentStreak)
    .map((entry, idx) => ({ ...entry, rank: idx + 1, previousRank: entry.rank }));

// Brand Favorites Leaderboard (sorted by repeatBrandRate)
export const FAVORITES_LEADERBOARD: LeaderboardEntry[] = [...EARNINGS_LEADERBOARD]
    .sort((a, b) => b.stats.repeatBrandRate - a.stats.repeatBrandRate)
    .map((entry, idx) => ({ ...entry, rank: idx + 1, previousRank: entry.rank }));

// Rising Stars Leaderboard (sorted by monthlyGrowth)
export const RISING_LEADERBOARD: LeaderboardEntry[] = [...EARNINGS_LEADERBOARD]
    .sort((a, b) => (b.stats.monthlyGrowth || 0) - (a.stats.monthlyGrowth || 0))
    .map((entry, idx) => ({ ...entry, rank: idx + 1, previousRank: entry.rank }));

// Get leaderboard by type
export const getLeaderboardByType = (type: LeaderboardType): LeaderboardEntry[] => {
    switch (type) {
        case 'earners': return EARNINGS_LEADERBOARD;
        case 'streak': return STREAK_LEADERBOARD;
        case 'rating': return FAVORITES_LEADERBOARD;
        case 'rising': return RISING_LEADERBOARD;
        default: return EARNINGS_LEADERBOARD;
    }
};

// Time-based value multipliers (simulate time-filtered data)
const TIME_MULTIPLIERS: Record<TimeFilter, { earnings: number; streak: number; repeat: number; growth: number }> = {
    week: { earnings: 0.03, streak: 0.15, repeat: 0.6, growth: 0.3 },
    month: { earnings: 0.12, streak: 0.4, repeat: 0.8, growth: 0.6 },
    all: { earnings: 1, streak: 1, repeat: 1, growth: 1 },
};

// Get leaderboard filtered by time period
export const getLeaderboardByTypeAndTime = (type: LeaderboardType, timeFilter: TimeFilter): LeaderboardEntry[] => {
    const baseData = getLeaderboardByType(type);
    const multipliers = TIME_MULTIPLIERS[timeFilter];

    // Create time-adjusted entries
    const adjustedData = baseData.map(entry => {
        const adjustedStats = { ...entry.stats };

        if (timeFilter !== 'all') {
            // Adjust stats based on time period
            adjustedStats.lifetimeEarnings = Math.round(entry.stats.lifetimeEarnings * multipliers.earnings);
            adjustedStats.currentStreak = Math.round(entry.stats.currentStreak * multipliers.streak);
            adjustedStats.repeatBrandRate = Math.round(entry.stats.repeatBrandRate * multipliers.repeat);
            adjustedStats.monthlyGrowth = Math.round((entry.stats.monthlyGrowth || 0) * multipliers.growth);
        }

        return { ...entry, stats: adjustedStats };
    });

    // Re-sort and re-rank based on type
    let sortedData: LeaderboardEntry[];
    switch (type) {
        case 'earners':
            sortedData = adjustedData.sort((a, b) => b.stats.lifetimeEarnings - a.stats.lifetimeEarnings);
            break;
        case 'streak':
            sortedData = adjustedData.sort((a, b) => b.stats.currentStreak - a.stats.currentStreak);
            break;
        case 'rating':
            sortedData = adjustedData.sort((a, b) => b.stats.repeatBrandRate - a.stats.repeatBrandRate);
            break;
        case 'rising':
            sortedData = adjustedData.sort((a, b) => (b.stats.monthlyGrowth || 0) - (a.stats.monthlyGrowth || 0));
            break;
        default:
            sortedData = adjustedData;
    }

    // Update ranks based on new order
    return sortedData.map((entry, idx) => ({
        ...entry,
        previousRank: entry.rank,
        rank: idx + 1,
    }));
};

// Mock creator data for demo (current user)
export const MOCK_CREATOR_STATS: CreatorStats = {
    lifetimeEarnings: 28450,
    totalCampaigns: 24,
    winRate: 28.5,
    avgRating: 4.9,
    currentStreak: 5,
    repeatBrandRate: 35,
    avgDeliverySpeed: 15,
    monthlyGrowth: 45,
};

// Earned badges for demo user
export const MOCK_EARNED_BADGES = ['first-1k', '10k-club', 'first-campaign', '10-campaigns', 'five-star-streak', 'sharpshooter'];

// Legacy exports for backward compatibility
export type CardRarity = CreatorTier;
export const RARITY_THRESHOLDS = TIER_THRESHOLDS;
export const getRarityFromEarnings = getTierFromEarnings;
export const MOCK_LEADERBOARD = EARNINGS_LEADERBOARD;
