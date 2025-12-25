import React, { useState } from 'react';
import { USER_AVATAR } from '../types';
import { MOCK_CREATOR_STATS, BADGES, MOCK_EARNED_BADGES, getRarityFromEarnings, RARITY_THRESHOLDS } from '../data/gamificationData';

type ProfileTab = 'details' | 'socials' | 'portfolio';

const Profile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ProfileTab>('details');

    const [basicInfo, setBasicInfo] = useState({
        firstName: 'Alex',
        lastName: 'Morgan',
        username: 'alexmorgan_creations',
        tagline: 'Tech Enthusiast & Content Creator',
        location: 'San Francisco, CA',
        bio: 'Tech enthusiast and video creator specializing in in-depth reviews and tutorials. Helping brands connect with a tech-savvy audience through authentic storytelling.',
        email: 'alex.morgan@example.com',
        website: 'www.alexmorgan.tech',
        phone: '+1 (555) 123-4567',
        languages: 'English, Spanish',
        availability: 'Available for collaborations',
    });

    const [niche] = useState({
        category: 'Technology',
        subCategories: ['Reviews', 'Tutorials', 'Unboxing'],
    });

    const [socials, setSocials] = useState([
        { platform: 'Instagram', handle: '@alex_m', followers: '1.2M', connected: true, icon: 'photo_camera', color: 'text-pink-500', bg: 'bg-pink-500/10' },
        { platform: 'YouTube', handle: 'Alex Reviews', followers: '850K', connected: true, icon: 'smart_display', color: 'text-red-500', bg: 'bg-red-500/10' },
        { platform: 'TikTok', handle: '@alexmorgan', followers: '2.8M', connected: true, icon: 'music_note', color: 'text-white', bg: 'bg-gray-700' },
        { platform: 'Twitter', handle: '@alex_tweets', followers: '450K', connected: true, icon: 'flutter_dash', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    ]);

    const [portfolio, setPortfolio] = useState([
        { id: '1', type: 'video', title: 'iPhone 16 Pro Deep Dive Review', platform: 'YouTube', thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400', url: 'https://youtube.com', views: '2.4M', date: 'Oct 2024' },
        { id: '2', type: 'campaign', title: 'Samsung Galaxy Partnership', platform: 'Campaign', thumbnail: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', url: '#', views: '1.8M reach', date: 'Sep 2024' },
        { id: '3', type: 'article', title: 'Best Tech Gadgets 2024', platform: 'Blog', thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400', url: '#', views: '45K reads', date: 'Aug 2024' },
        { id: '4', type: 'video', title: 'MacBook M3 Max vs M2: Worth the Upgrade?', platform: 'YouTube', thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', url: '#', views: '890K', date: 'Jul 2024' },
    ]);

    const [newLink, setNewLink] = useState({ title: '', url: '', type: 'video' });
    const [showAddLink, setShowAddLink] = useState(false);

    const rarity = getRarityFromEarnings(MOCK_CREATOR_STATS.lifetimeEarnings);
    const rarityInfo = RARITY_THRESHOLDS[rarity];

    const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
    };

    const handleSocialHandleChange = (index: number, value: string) => {
        const newSocials = [...socials];
        newSocials[index].handle = value;
        newSocials[index].connected = value.length > 2;
        setSocials(newSocials);
    };

    const addPortfolioLink = () => {
        if (newLink.title && newLink.url) {
            setPortfolio([...portfolio, {
                id: Date.now().toString(),
                type: newLink.type,
                title: newLink.title,
                platform: newLink.type === 'video' ? 'YouTube' : newLink.type === 'campaign' ? 'Campaign' : 'Link',
                thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
                url: newLink.url,
                views: 'New',
                date: 'Dec 2024'
            }]);
            setNewLink({ title: '', url: '', type: 'video' });
            setShowAddLink(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 lg:p-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-text-primary dark:text-white">Profile Settings</h1>
                    <p className="text-sm text-text-secondary dark:text-gray-400">Build your creator profile</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-text-primary dark:text-white border border-border-color dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        Preview
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">
                        Save
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg mb-8 w-fit">
                {[
                    { id: 'details', label: 'Profile' },
                    { id: 'socials', label: 'Socials' },
                    { id: 'portfolio', label: 'Portfolio' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as ProfileTab)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === tab.id
                                ? 'bg-white dark:bg-gray-700 text-text-primary dark:text-white shadow-sm'
                                : 'text-text-secondary dark:text-gray-400 hover:text-text-primary'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Profile Tab */}
            {activeTab === 'details' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Card Preview */}
                    <div className="space-y-4">
                        {/* Mini Profile Card */}
                        <div
                            className="rounded-2xl p-6 text-center relative overflow-hidden"
                            style={{ background: `linear-gradient(135deg, #1a1a2e 0%, ${rarityInfo.color}20 100%)` }}
                        >
                            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase" style={{ backgroundColor: rarityInfo.color, color: '#000' }}>
                                {rarity}
                            </div>
                            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/10 text-white/80">
                                {niche.category}
                            </div>

                            <img src={USER_AVATAR} alt="Avatar" className="w-20 h-20 rounded-full mx-auto border-2 mb-3" style={{ borderColor: rarityInfo.color }} />
                            <h3 className="text-white font-bold">{basicInfo.firstName} {basicInfo.lastName}</h3>
                            <p className="text-white/60 text-xs mb-4">{basicInfo.tagline}</p>

                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div>
                                    <p className="text-white/50 text-[9px] uppercase">Earnings</p>
                                    <p className="text-white font-bold text-sm">${(MOCK_CREATOR_STATS.lifetimeEarnings / 1000).toFixed(1)}K</p>
                                </div>
                                <div>
                                    <p className="text-white/50 text-[9px] uppercase">Win Rate</p>
                                    <p className="text-white font-bold text-sm">{MOCK_CREATOR_STATS.winRate}%</p>
                                </div>
                                <div>
                                    <p className="text-white/50 text-[9px] uppercase">Rating</p>
                                    <p className="text-white font-bold text-sm">★{MOCK_CREATOR_STATS.avgRating}</p>
                                </div>
                            </div>
                        </div>

                        {/* Badges */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-4">
                            <h4 className="text-sm font-medium text-text-primary dark:text-white mb-3">Badges</h4>
                            <div className="flex flex-wrap gap-2">
                                {BADGES.filter(b => MOCK_EARNED_BADGES.includes(b.id)).slice(0, 6).map((badge) => (
                                    <span key={badge.id} className="text-xl" title={badge.description}>{badge.icon}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                            <h3 className="font-medium text-text-primary dark:text-white mb-4">Basic Info</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-text-secondary dark:text-gray-400 mb-1 block">First Name</label>
                                    <input type="text" name="firstName" value={basicInfo.firstName} onChange={handleBasicChange} className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 text-text-primary dark:text-white" />
                                </div>
                                <div>
                                    <label className="text-xs text-text-secondary dark:text-gray-400 mb-1 block">Last Name</label>
                                    <input type="text" name="lastName" value={basicInfo.lastName} onChange={handleBasicChange} className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 text-text-primary dark:text-white" />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-xs text-text-secondary dark:text-gray-400 mb-1 block">Headline</label>
                                    <input type="text" name="tagline" value={basicInfo.tagline} onChange={handleBasicChange} className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 text-text-primary dark:text-white" />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-xs text-text-secondary dark:text-gray-400 mb-1 block">Bio</label>
                                    <textarea name="bio" value={basicInfo.bio} onChange={handleBasicChange} rows={3} className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 text-text-primary dark:text-white resize-none" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                            <h3 className="font-medium text-text-primary dark:text-white mb-4">Contact & Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-text-secondary dark:text-gray-400 mb-1 block">Email</label>
                                    <input type="email" name="email" value={basicInfo.email} onChange={handleBasicChange} className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 text-text-primary dark:text-white" />
                                </div>
                                <div>
                                    <label className="text-xs text-text-secondary dark:text-gray-400 mb-1 block">Phone</label>
                                    <input type="tel" name="phone" value={basicInfo.phone} onChange={handleBasicChange} className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 text-text-primary dark:text-white" />
                                </div>
                                <div>
                                    <label className="text-xs text-text-secondary dark:text-gray-400 mb-1 block">Location</label>
                                    <input type="text" name="location" value={basicInfo.location} onChange={handleBasicChange} className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 text-text-primary dark:text-white" />
                                </div>
                                <div>
                                    <label className="text-xs text-text-secondary dark:text-gray-400 mb-1 block">Website</label>
                                    <input type="url" name="website" value={basicInfo.website} onChange={handleBasicChange} className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 text-text-primary dark:text-white" />
                                </div>
                                <div>
                                    <label className="text-xs text-text-secondary dark:text-gray-400 mb-1 block">Languages</label>
                                    <input type="text" name="languages" value={basicInfo.languages} onChange={handleBasicChange} className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 text-text-primary dark:text-white" />
                                </div>
                                <div>
                                    <label className="text-xs text-text-secondary dark:text-gray-400 mb-1 block">Availability</label>
                                    <select name="availability" value={basicInfo.availability} onChange={handleBasicChange} className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 text-text-primary dark:text-white">
                                        <option>Available for collaborations</option>
                                        <option>Limited availability</option>
                                        <option>Not available</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Socials Tab */}
            {activeTab === 'socials' && (
                <div className="max-w-2xl space-y-3">
                    {socials.map((social, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${social.bg} ${social.color}`}>
                                <span className="material-symbols-outlined text-[20px]">{social.icon}</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-text-secondary dark:text-gray-500 mb-1">{social.platform}</p>
                                <input
                                    type="text"
                                    value={social.handle}
                                    onChange={(e) => handleSocialHandleChange(idx, e.target.value)}
                                    className="w-full bg-transparent text-sm font-medium text-text-primary dark:text-white border-none outline-none"
                                    placeholder={`@username`}
                                />
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sm text-text-primary dark:text-white">{social.followers}</p>
                                <p className="text-[10px] text-text-secondary dark:text-gray-500">followers</p>
                            </div>
                            {social.connected && (
                                <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span>
                            )}
                        </div>
                    ))}
                    <button className="w-full py-3 border-2 border-dashed border-border-color dark:border-gray-700 rounded-xl text-sm text-text-secondary dark:text-gray-400 hover:border-primary hover:text-primary transition-colors">
                        + Connect Another Platform
                    </button>
                </div>
            )}

            {/* Portfolio Tab - Rich Links */}
            {activeTab === 'portfolio' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-text-secondary dark:text-gray-400">{portfolio.length} items</p>
                        <button
                            onClick={() => setShowAddLink(true)}
                            className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            Add Link
                        </button>
                    </div>

                    {/* Add Link Modal */}
                    {showAddLink && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-4 mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-medium text-text-primary dark:text-white">Add to Portfolio</h4>
                                <button onClick={() => setShowAddLink(false)} className="text-text-secondary hover:text-text-primary">
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="col-span-2">
                                    <label className="text-xs text-text-secondary dark:text-gray-400 mb-1 block">Title</label>
                                    <input
                                        type="text"
                                        value={newLink.title}
                                        onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                                        placeholder="My awesome video"
                                        className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 text-text-primary dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-text-secondary dark:text-gray-400 mb-1 block">URL</label>
                                    <input
                                        type="url"
                                        value={newLink.url}
                                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                        placeholder="https://..."
                                        className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 text-text-primary dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-text-secondary dark:text-gray-400 mb-1 block">Type</label>
                                    <select
                                        value={newLink.type}
                                        onChange={(e) => setNewLink({ ...newLink, type: e.target.value })}
                                        className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 text-text-primary dark:text-white"
                                    >
                                        <option value="video">Video</option>
                                        <option value="campaign">Campaign</option>
                                        <option value="article">Article</option>
                                        <option value="link">Other Link</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={addPortfolioLink} className="w-full py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover">
                                Add to Portfolio
                            </button>
                        </div>
                    )}

                    {/* Portfolio Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {portfolio.map((item) => (
                            <a
                                key={item.id}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 hover:border-primary/50 transition-all"
                            >
                                <img src={item.thumbnail} alt={item.title} className="w-24 h-16 rounded-lg object-cover shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="font-medium text-sm text-text-primary dark:text-white truncate group-hover:text-primary transition-colors">{item.title}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-text-secondary dark:text-gray-400">{item.platform}</span>
                                                <span className="text-[10px] text-text-secondary dark:text-gray-500">{item.views}</span>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-[18px] transition-colors">open_in_new</span>
                                    </div>
                                    <p className="text-[10px] text-text-secondary dark:text-gray-500 mt-2">{item.date}</p>
                                </div>
                            </a>
                        ))}
                    </div>

                    <button className="w-full py-4 border-2 border-dashed border-border-color dark:border-gray-700 rounded-xl text-sm text-text-secondary dark:text-gray-400 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">add_link</span>
                        Add Rich Link
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;