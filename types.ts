
export interface NavItem {
  icon: string;
  label: string;
  path: string;
  badge?: string;
  badgeColor?: string;
}

export interface DriveFolder {
  color: string;
  label: string;
  count: number;
}

export const NAV_ITEMS: NavItem[] = [
  { icon: 'dashboard', label: 'Dashboard', path: '/' },
  { icon: 'work', label: 'Opportunities', path: '/gigs', badge: 'New', badgeColor: 'bg-brand-teal text-brand-navy' },
  { icon: 'gavel', label: 'My Bids', path: '/campaigns' },
  { icon: 'handshake', label: 'My Work', path: '/collaborations' },
  { icon: 'chat', label: 'Messages', path: '/messages', badge: '3', badgeColor: 'bg-brand-teal text-white' },
  { icon: 'analytics', label: 'Analytics', path: '/analytics' },
  { icon: 'emoji_events', label: 'Leaderboard', path: '/leaderboard' },
  { icon: 'account_balance_wallet', label: 'Wallet', path: '/wallet' },
];


export const DRIVE_FOLDERS: DriveFolder[] = [
  { color: 'text-brand-blue', label: 'Contracts', count: 12 },
  { color: 'text-accent-teal', label: 'Media Assets', count: 45 },
  { color: 'text-purple-500', label: 'Brand Guidelines', count: 8 },
  { color: 'text-green-500', label: 'Invoices', count: 24 },
];

export const USER_AVATAR = "https://randomuser.me/api/portraits/men/75.jpg";

// Using the provided file name
export const BRAND_LOGO = "/logo.png";
