// Gamification Types and Data

export type CardRarity = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface CreatorStats {
    lifetimeEarnings: number;
    totalCampaigns: number;
    winRate: number; // percentage
    avgRating: number; // out of 5
    currentStreak: number;
    repeatBrandRate: number; // percentage
    avgDeliverySpeed: number; // percentage faster than deadline
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
    previousRank?: number;
    creatorId: string;
    name: string;
    avatar: string;
    value: string | number;
    rarity: CardRarity;
    niche: string;
}

// Rarity thresholds based on earnings
export const RARITY_THRESHOLDS: Record<CardRarity, { min: number; max: number; label: string; color: string }> = {
    bronze: { min: 0, max: 5000, label: 'Bronze', color: '#CD7F32' },
    silver: { min: 5000, max: 25000, label: 'Silver', color: '#C0C0C0' },
    gold: { min: 25000, max: 100000, label: 'Gold', color: '#FFD700' },
    platinum: { min: 100000, max: 500000, label: 'Platinum', color: '#E5E4E2' },
    diamond: { min: 500000, max: Infinity, label: 'Diamond', color: '#B9F2FF' },
};

export const getRarityFromEarnings = (earnings: number): CardRarity => {
    if (earnings >= 500000) return 'diamond';
    if (earnings >= 100000) return 'platinum';
    if (earnings >= 25000) return 'gold';
    if (earnings >= 5000) return 'silver';
    return 'bronze';
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

// Mock creator data for demo
export const MOCK_CREATOR_STATS: CreatorStats = {
    lifetimeEarnings: 28450,
    totalCampaigns: 24,
    winRate: 28.5,
    avgRating: 4.9,
    currentStreak: 5,
    repeatBrandRate: 35,
    avgDeliverySpeed: 15,
};

// Mock leaderboard data
export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
    { rank: 1, previousRank: 1, creatorId: '1', name: 'Sarah Chen', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', value: '$156,200', rarity: 'platinum', niche: 'Tech' },
    { rank: 2, previousRank: 3, creatorId: '2', name: 'Marcus Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', value: '$142,800', rarity: 'platinum', niche: 'Lifestyle' },
    { rank: 3, previousRank: 2, creatorId: '3', name: 'Emma Rodriguez', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', value: '$98,500', rarity: 'gold', niche: 'Fashion' },
    { rank: 4, previousRank: 5, creatorId: '4', name: 'Alex Morgan', avatar: 'https://randomuser.me/api/portraits/men/75.jpg', value: '$28,450', rarity: 'gold', niche: 'Tech' },
    { rank: 5, previousRank: 4, creatorId: '5', name: 'Priya Sharma', avatar: 'https://randomuser.me/api/portraits/women/26.jpg', value: '$24,100', rarity: 'silver', niche: 'Beauty' },
];

// Earned badges for demo user
export const MOCK_EARNED_BADGES = ['first-1k', '10k-club', 'first-campaign', '10-campaigns', 'five-star-streak', 'sharpshooter'];
