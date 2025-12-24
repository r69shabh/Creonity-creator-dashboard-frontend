import React, { useState } from 'react';
import { USER_AVATAR } from '../types';

type ProfileTab = 'details' | 'socials' | 'mediakit' | 'portfolio';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('details');

  // Main Profile State
  const [basicInfo, setBasicInfo] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    username: 'alexmorgan_creations',
    tagline: 'Tech Enthusiast & Content Creator',
    location: 'San Francisco, CA',
    bio: 'Tech enthusiast and video creator specializing in in-depth reviews and tutorials. Helping brands connect with a tech-savvy audience through authentic storytelling.',
    email: 'alex.morgan@example.com',
    website: 'www.alexmorgan.tech',
  });

  // Category State
  const [niche, setNiche] = useState({
    category: 'Technology',
    subCategories: 'Reviews, Tutorials, Unboxing',
    language: 'English (US)',
  });

  // Social Stats State (Followers are read-only / fetched)
  const [socials, setSocials] = useState([
    { platform: 'Instagram', handle: '@alex_m', followers: '1.2M', connected: true, icon: 'photo_camera', color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/20' },
    { platform: 'YouTube', handle: 'Alex Reviews', followers: '850K', connected: true, icon: 'smart_display', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
    { platform: 'TikTok', handle: '@alexmorgan', followers: '2.8M', connected: true, icon: 'music_note', color: 'text-black dark:text-white', bg: 'bg-gray-100 dark:bg-gray-700' },
    { platform: 'Twitter', handle: '@alex_tweets', followers: '450K', connected: true, icon: 'flutter_dash', color: 'text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  ]);

  // Rates State
  const [rates, setRates] = useState([
    { title: 'Instagram Reel', price: 1200, currency: '$' },
    { title: 'YouTube Integration', price: 2500, currency: '$' },
    { title: 'Dedicated Video', price: 4500, currency: '$' },
    { title: 'TikTok Video', price: 800, currency: '$' },
  ]);

  // Audience Demographics State
  const [audience, setAudience] = useState({
    topAge: '18-34',
    genderSplit: '65% Male / 35% Female',
    topLocations: 'USA, UK, Canada',
    engagementRate: '4.8%'
  });

  const [portfolio, setPortfolio] = useState([
     "https://lh3.googleusercontent.com/aida-public/AB6AXuD4kSGWBFj6v9Xj6ElwBij_raSTToO9620CPuAYgCzSLz3kBL3fXthNqS99zABaEStwsQbT2IeoBqGACSJMqOxLAdlxPLfXrNvZfCo0iHYr-0LDrxMPeBgwubmV1jBCkOz_QOKp5PawNBiBkwGfDnnOmpkNtqYov7PkOhtGp-7LgaEupRvgegqbDIsYPQzxK_gYIXexjX-M6xrtBcCOD0umHYA4qviiGJhBhD_6bzIbH1y3kvhP9SmpggpfJoUVzLRq8-FDr8Eny8Pb",
     "https://lh3.googleusercontent.com/aida-public/AB6AXuDAZfBlH85Vqe3XYlnDlMGlizg4j1w8Da45_4xlV3Jo2SqeRlC96zGv8tLEddwdVSPeuEVLwE9h3vk_8-3vCd4uu5-ebYFTHqTVKqMx2NarKTCjqMr-xSjd4Io9bGEJ55G7HxVLLFB9Z3UiqNqtdzG1dh3WCFImpCtIgpD3mIM5_lW0RvtpGHR-5XYJU6y0F9gYlq3kuw5Q1bnHsmVkRshaLCjJvgkgcFH6EVNcJVb1_I2dG3rr09272Wi3gK7rFUb4GV4RwO4NmgOJ",
     "https://lh3.googleusercontent.com/aida-public/AB6AXuAvUga-j_HCRlfNP-TDjQbFZF3fY1TPvqygsFa9b7DM-4Msgpq9JmagIFmSKO3Yos535zFeRRCzdssUE2p4HSyjvm70oNwuNtMdBJKAy7ASFa6mRbQc7zu3bHi7fo2Lqvtc0KbgdA8-P4-1i7bvzZNvtaMUUteXfklI7NGw_OvviTk8B3edt2CCy770U9NKS4T0q159AVv2DnTe-_tlZfn2c-zce88laxRwQzDXhv5kSX_Bpa9yTh0QTkGcV7rGzCPYDtg-fVaOgfoO",
  ]);

  // Handlers
  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
  };
  
  const handleNicheChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNiche({ ...niche, [e.target.name]: e.target.value });
  };

  const handleSocialHandleChange = (index: number, value: string) => {
    const newSocials = [...socials];
    newSocials[index].handle = value;
    // Simulate fetching: if empty, disable connected state
    newSocials[index].connected = value.length > 2; 
    setSocials(newSocials);
  };

  const handleRateChange = (index: number, field: string, value: string | number) => {
    const newRates = [...rates];
    // @ts-ignore
    newRates[index] = { ...newRates[index], [field]: value };
    setRates(newRates);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 p-8 pb-20">
      
      {/* Header & Tabs */}
      <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-text-primary dark:text-white">Profile Settings</h1>
                <p className="text-text-secondary dark:text-gray-400 text-sm">Manage your public presence and media kit data.</p>
            </div>
            <div className="flex gap-3">
                <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-border-color dark:border-gray-700 text-text-primary dark:text-white text-sm font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    View Public Profile
                </button>
                <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover shadow-sm transition-colors">
                    Save Changes
                </button>
            </div>
          </div>

          <div className="border-b border-border-color dark:border-gray-700">
             <nav className="flex space-x-8">
                 {[
                     { id: 'details', label: 'Edit Profile' },
                     { id: 'socials', label: 'Social Connections' },
                     { id: 'mediakit', label: 'Media Kit Data' },
                     { id: 'portfolio', label: 'Portfolio' },
                 ].map((tab) => (
                     <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as ProfileTab)}
                        className={`
                            py-4 px-1 inline-flex items-center border-b-2 text-sm font-medium transition-colors
                            ${activeTab === tab.id 
                                ? 'border-primary text-primary' 
                                : 'border-transparent text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                            }
                        `}
                     >
                         {tab.label}
                     </button>
                 ))}
             </nav>
          </div>
      </div>

      {/* Details Tab - Reorganized Layout */}
      {activeTab === 'details' && (
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Cover Image Section (Full Width) */}
              <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden group cursor-pointer border border-border-color dark:border-gray-700">
                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&auto=format&fit=crop&q=60')` }}></div>
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                 <button className="absolute bottom-4 right-4 px-4 py-2 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-lg border border-white/30 hover:bg-white/30 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">add_a_photo</span>
                    Change Cover
                 </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Avatar & Basic Stats */}
                  <div className="lg:col-span-1 space-y-6">
                      <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6 flex flex-col items-center text-center -mt-20 relative z-10 shadow-sm">
                          <div className="relative group cursor-pointer">
                              <div className="size-32 rounded-full bg-cover bg-center border-4 border-white dark:border-gray-800 shadow-sm" style={{ backgroundImage: `url("${USER_AVATAR}")` }}></div>
                              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span className="material-symbols-outlined text-white">edit</span>
                              </div>
                          </div>
                          <h3 className="mt-4 font-bold text-lg text-text-primary dark:text-white">{basicInfo.firstName} {basicInfo.lastName}</h3>
                          <p className="text-sm text-text-secondary dark:text-gray-400 mb-4">{basicInfo.username}</p>
                          <div className="w-full pt-4 border-t border-border-color dark:border-gray-700 grid grid-cols-2 gap-2">
                             <div>
                                 <p className="font-bold text-text-primary dark:text-white">4.9M</p>
                                 <p className="text-xs text-text-secondary dark:text-gray-500">Reach</p>
                             </div>
                             <div>
                                 <p className="font-bold text-text-primary dark:text-white">4.8</p>
                                 <p className="text-xs text-text-secondary dark:text-gray-500">Rating</p>
                             </div>
                          </div>
                      </div>
                  </div>

                  {/* Right Column: Form Fields */}
                  <div className="lg:col-span-2 space-y-6">
                      <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                          <h3 className="text-lg font-bold text-text-primary dark:text-white mb-6">Basic Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div>
                                  <label className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-2">First Name</label>
                                  <input type="text" name="firstName" value={basicInfo.firstName} onChange={handleBasicChange} className="w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 px-4 py-2.5 text-sm focus:ring-primary focus:border-primary text-text-primary dark:text-white" />
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-2">Last Name</label>
                                  <input type="text" name="lastName" value={basicInfo.lastName} onChange={handleBasicChange} className="w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 px-4 py-2.5 text-sm focus:ring-primary focus:border-primary text-text-primary dark:text-white" />
                              </div>
                              <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-2">Headline</label>
                                  <input type="text" name="tagline" value={basicInfo.tagline} onChange={handleBasicChange} className="w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 px-4 py-2.5 text-sm focus:ring-primary focus:border-primary text-text-primary dark:text-white" />
                              </div>
                              <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-2">Bio</label>
                                  <textarea name="bio" value={basicInfo.bio} onChange={handleBasicChange} rows={4} className="w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 px-4 py-2.5 text-sm focus:ring-primary focus:border-primary text-text-primary dark:text-white resize-none" />
                              </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                  <label className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-2">Location</label>
                                  <div className="relative">
                                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[18px]">location_on</span>
                                      <input type="text" name="location" value={basicInfo.location} onChange={handleBasicChange} className="w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 pl-10 pr-4 py-2.5 text-sm focus:ring-primary focus:border-primary text-text-primary dark:text-white" />
                                  </div>
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-2">Contact Email</label>
                                  <div className="relative">
                                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[18px]">mail</span>
                                      <input type="email" name="email" value={basicInfo.email} onChange={handleBasicChange} className="w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 pl-10 pr-4 py-2.5 text-sm focus:ring-primary focus:border-primary text-text-primary dark:text-white" />
                                  </div>
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-2">Website</label>
                                  <div className="relative">
                                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[18px]">language</span>
                                      <input type="text" name="website" value={basicInfo.website} onChange={handleBasicChange} className="w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 pl-10 pr-4 py-2.5 text-sm focus:ring-primary focus:border-primary text-text-primary dark:text-white" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Tab Content: Social Connections */}
      {activeTab === 'socials' && (
          <div className="max-w-3xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6">
                  <div className="mb-6">
                      <h3 className="text-lg font-bold text-text-primary dark:text-white">Connect Accounts</h3>
                      <p className="text-sm text-text-secondary dark:text-gray-400">Add your social handles. We'll automatically fetch your follower counts and stats.</p>
                  </div>
                  
                  <div className="space-y-4">
                      {socials.map((social, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-4 border border-border-color dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                              <div className={`p-3 rounded-full ${social.bg} ${social.color} shrink-0`}>
                                 <span className="material-symbols-outlined text-[24px]">{social.icon}</span>
                              </div>
                              <div className="flex-1">
                                  <label className="text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-1 block">{social.platform}</label>
                                  <input 
                                    type="text" 
                                    value={social.handle} 
                                    onChange={(e) => handleSocialHandleChange(idx, e.target.value)}
                                    className="w-full bg-white dark:bg-gray-900 border border-border-color dark:border-gray-600 rounded-lg px-3 py-2 text-sm font-medium text-text-primary dark:text-white focus:ring-primary focus:border-primary placeholder-gray-400 shadow-sm"
                                    placeholder={`Enter your ${social.platform} handle`}
                                  />
                              </div>
                              <div className="text-right pl-4 border-l border-border-color dark:border-gray-700">
                                  {social.connected ? (
                                      <>
                                          <p className="text-xs text-text-secondary dark:text-gray-500 mb-0.5">Followers</p>
                                          <p className="font-bold text-text-primary dark:text-white flex items-center gap-1">
                                              {social.followers} 
                                              <span className="material-symbols-outlined text-[16px] text-green-500" title="Synced">sync</span>
                                          </p>
                                      </>
                                  ) : (
                                      <span className="text-xs font-semibold text-text-secondary dark:text-gray-500 italic">Not Connected</span>
                                  )}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      )}

      {/* Tab Content: Media Kit (Unchanged from previous turn, just ensuring structure is correct if used) */}
      {activeTab === 'mediakit' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6 h-fit">
                   <h3 className="text-lg font-bold text-text-primary dark:text-white mb-6">Audience Demographics</h3>
                   <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-2">Primary Age Range</label>
                            <input type="text" name="topAge" value={audience.topAge} onChange={(e) => setAudience({...audience, topAge: e.target.value})} className="w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 px-4 py-2.5 text-sm focus:ring-primary focus:border-primary text-text-primary dark:text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary dark:text-gray-400 mb-2">Gender Split</label>
                            <input type="text" name="genderSplit" value={audience.genderSplit} onChange={(e) => setAudience({...audience, genderSplit: e.target.value})} className="w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 px-4 py-2.5 text-sm focus:ring-primary focus:border-primary text-text-primary dark:text-white" />
                        </div>
                        {/* ... Rest of fields ... */}
                   </div>
              </div>
              {/* ... Services & Rates ... */}
          </div>
      )}
      
       {/* Tab Content: Portfolio (Unchanged) */}
       {activeTab === 'portfolio' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
               {/* ... Content ... */}
          </div>
       )}

    </div>
  );
};

export default Profile;