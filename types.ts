
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
  { icon: 'work', label: 'Gigs', path: '/gigs', badge: 'New', badgeColor: 'bg-brand-teal text-brand-navy' },
  { icon: 'campaign', label: 'Campaigns', path: '/campaigns' },
  { icon: 'storefront', label: 'Marketplace', path: '/marketplace' },
  { icon: 'handshake', label: 'My Work', path: '/collaborations' },
  { icon: 'analytics', label: 'Analytics', path: '/analytics' },
  { icon: 'account_balance_wallet', label: 'Wallet', path: '/wallet' },
  { icon: 'settings', label: 'Settings', path: '/settings' },
];

export const DRIVE_FOLDERS: DriveFolder[] = [
  { color: 'text-brand-blue', label: 'Contracts', count: 12 },
  { color: 'text-accent-teal', label: 'Media Assets', count: 45 },
  { color: 'text-purple-500', label: 'Brand Guidelines', count: 8 },
  { color: 'text-green-500', label: 'Invoices', count: 24 },
];

export const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuAYtolB4MoPCaLd8-GruiXPnxicFrdsUjXkxG5954nO-HE27pn1vBACtX_oZhVcySrMi-M2D9ZjAFd6Kurn75azi_VFk4W_jS4qQsW0BSzfpV7Hd5RP3A3Mp3KmHZxDqAdAnYoEsSzG4E3zi1mmmbcxiKzL05R2sW7gnNLD0K_N_okZ6H6MJfXags6dMuy-XgHTY3TIv8FZiEdZr4HK2z9ZkSdOfwPID9Y7RtSwdmA0n_C2n9fDxCSB3-8mmCk8XeIkZwmFg3bGnmyt";

// Using the provided file name
export const BRAND_LOGO = "/logo.png";
