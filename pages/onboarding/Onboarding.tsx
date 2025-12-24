import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6; 
  
  // State for form data
  const [formData, setFormData] = useState({
      // Step 1: Identity
      handle: '@alexmorgan',
      phone: '',
      location: '',
      bio: '',
      // Step 2: Socials
      socials: { meta: false, youtube: false, tiktok: false, twitch: false },
      // Step 3: Niche
      selectedCategories: [] as string[],
      primaryAudience: '18-34',
      // Step 4: Rates
      rates: {
          video: 1200,
          post: 800,
          story: 400
      },
      // Step 5: Payout
      payoutMethod: 'stripe',
      payoutDetails: ''
  });

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  
  const finishOnboarding = () => {
    const btn = document.getElementById('finish-btn');
    if(btn) btn.innerHTML = '<span class="material-symbols-outlined animate-spin">progress_activity</span>';
    setTimeout(onComplete, 800);
  };

  const toggleSocial = (key: keyof typeof formData.socials) => {
      setFormData(prev => ({
          ...prev,
          socials: { ...prev.socials, [key]: !prev.socials[key] }
      }));
  };

  const toggleCategory = (id: string) => {
      setFormData(prev => {
          const current = prev.selectedCategories;
          const updated = current.includes(id) 
            ? current.filter(c => c !== id) 
            : [...current, id];
          return { ...prev, selectedCategories: updated };
      });
  };

  // Content for the left sidebar
  const renderSidebarContent = () => {
      switch(step) {
          case 1:
              return (
                  <div className="space-y-6 text-white">
                      <div className="size-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/30">
                          <span className="material-symbols-outlined text-[32px]">badge</span>
                      </div>
                      <h2 className="text-3xl font-display font-bold leading-tight">Identity & Verification</h2>
                      <p className="text-white/80 text-lg leading-relaxed">Brands trust verified creators. Add your contact details so we can verify your identity and match you with legitimate offers.</p>
                  </div>
              );
          case 2:
              return (
                  <div className="space-y-6 text-white">
                      <div className="size-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/30">
                          <span className="material-symbols-outlined text-[32px]">share_reviews</span>
                      </div>
                      <h2 className="text-3xl font-display font-bold leading-tight">Connect Your Reach</h2>
                      <p className="text-white/80 text-lg leading-relaxed">Link your social accounts to automatically pull follower counts and engagement metrics. This creates your dynamic media kit.</p>
                  </div>
              );
          case 3:
              return (
                  <div className="space-y-6 text-white">
                      <div className="size-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/30">
                          <span className="material-symbols-outlined text-[32px]">group</span>
                      </div>
                      <h2 className="text-3xl font-display font-bold leading-tight">Define Your Niche</h2>
                      <p className="text-white/80 text-lg leading-relaxed">Are you a tech reviewer or a fashion icon? Telling us your niche helps our AI recommend relevant campaigns.</p>
                  </div>
              );
          case 4:
              return (
                  <div className="space-y-6 text-white">
                      <div className="size-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/30">
                          <span className="material-symbols-outlined text-[32px]">attach_money</span>
                      </div>
                      <h2 className="text-3xl font-display font-bold leading-tight">Set Your Rates</h2>
                      <p className="text-white/80 text-lg leading-relaxed">Establish a baseline for your work. You can always negotiate per campaign, but this sets expectations for brands.</p>
                  </div>
              );
          case 5:
              return (
                  <div className="space-y-6 text-white">
                      <div className="size-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/30">
                          <span className="material-symbols-outlined text-[32px]">account_balance</span>
                      </div>
                      <h2 className="text-3xl font-display font-bold leading-tight">Get Paid</h2>
                      <p className="text-white/80 text-lg leading-relaxed">Secure your earnings. We hold funds in escrow and release them directly to your preferred account upon project completion.</p>
                  </div>
              );
          default:
              return (
                  <div className="space-y-6 text-white">
                      <div className="size-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/30">
                          <span className="material-symbols-outlined text-[32px]">rocket_launch</span>
                      </div>
                      <h2 className="text-3xl font-display font-bold leading-tight">You're Ready to Launch</h2>
                      <p className="text-white/80 text-lg leading-relaxed">Your professional profile is complete. Step into the dashboard to start your journey.</p>
                  </div>
              );
      }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 flex font-display selection:bg-primary/30">
      
      {/* Left Sidebar (Desktop Only) */}
      <div className="hidden lg:flex w-[40%] bg-brand-navy relative overflow-hidden flex-col justify-between p-12 transition-all duration-500">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#000563] to-[#075CD1] z-0"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl z-0"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-black/20 rounded-full blur-3xl z-0 translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0 mix-blend-overlay"></div>

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3">
             <img src="https://cdn-icons-png.flaticon.com/512/6062/6062646.png" alt="Creonity Logo" className="size-10 object-contain brightness-0 invert" />
             <span className="text-2xl font-bold text-white tracking-tight">Creonity</span>
          </div>

          {/* Dynamic Content */}
          <div className="relative z-10 my-auto animate-in fade-in slide-in-from-left-8 duration-500 key={step}">
              {renderSidebarContent()}
          </div>

          {/* Steps Indicator */}
          <div className="relative z-10 flex gap-2">
              {[1, 2, 3, 4, 5, 6].map(i => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
                  ></div>
              ))}
          </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
          
          {/* Mobile Logo & Progress */}
          <div className="lg:hidden w-full max-w-md mb-8 flex justify-between items-center">
             <div className="flex items-center gap-2">
                <img src="https://cdn-icons-png.flaticon.com/512/6062/6062646.png" alt="Creonity Logo" className="size-8 object-contain" />
                <span className="font-bold text-text-primary dark:text-white text-lg">Creonity</span>
             </div>
             <span className="text-xs font-bold text-text-secondary">Step {step}/{totalSteps}</span>
          </div>

          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Step 1: Identity & Contact */}
            {step === 1 && (
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold text-text-primary dark:text-white mb-2">Let's verify your identity</h3>
                        <p className="text-text-secondary dark:text-gray-400">Complete your profile to get discovered.</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group cursor-pointer shrink-0">
                            <div className="size-24 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden transition-colors group-hover:border-primary group-hover:bg-primary/5">
                                <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-primary transition-colors">add_a_photo</span>
                            </div>
                            <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 border-2 border-white dark:border-gray-950 shadow-md">
                                <span className="material-symbols-outlined text-[14px] block">edit</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-text-primary dark:text-white">Profile Picture</p>
                            <p className="text-xs text-text-secondary dark:text-gray-500 mt-1">Min 400x400px, PNG or JPG.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Input 
                            label="Display Handle" 
                            placeholder="@alexmorgan" 
                            leftIcon="alternate_email" 
                            value={formData.handle}
                            onChange={(e) => setFormData({...formData, handle: e.target.value})}
                            className="bg-gray-50 dark:bg-gray-900" 
                        />
                        <Input 
                            label="Phone Number" 
                            type="tel"
                            placeholder="+1 (555) 000-0000" 
                            leftIcon="phone" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            helperText="Used for account security and urgent campaign alerts."
                            className="bg-gray-50 dark:bg-gray-900" 
                        />
                        <Input 
                            label="Location" 
                            placeholder="Los Angeles, CA" 
                            leftIcon="location_on" 
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            className="bg-gray-50 dark:bg-gray-900" 
                        />
                        <div>
                             <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-1.5">Bio / Tagline</label>
                             <textarea 
                                className="w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-border-color dark:border-gray-700 p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-text-primary dark:text-white"
                                rows={3}
                                placeholder="Tell brands about your vibe..."
                                value={formData.bio}
                                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                             ></textarea>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button onClick={nextStep} className="w-full">Continue</Button>
                    </div>
                </div>
            )}

            {/* Step 2: Social Connections */}
            {step === 2 && (
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold text-text-primary dark:text-white mb-2">Connect Accounts</h3>
                        <p className="text-text-secondary dark:text-gray-400">Link your platforms to verify your reach. We need at least one.</p>
                    </div>

                    <div className="space-y-4">
                        {/* Meta */}
                        <div className="flex items-center justify-between p-4 border border-border-color dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                                    <span className="material-symbols-outlined text-[24px]">public</span> 
                                </div>
                                <div>
                                    <p className="font-bold text-text-primary dark:text-white text-sm">Meta (Instagram/FB)</p>
                                    <p className="text-xs text-text-secondary dark:text-gray-500">Connect via Graph API</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => toggleSocial('meta')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${formData.socials.meta ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-text-primary dark:text-white hover:bg-gray-200'}`}
                            >
                                {formData.socials.meta ? 'Connected' : 'Connect'}
                            </button>
                        </div>

                        {/* YouTube */}
                        <div className="flex items-center justify-between p-4 border border-border-color dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg">
                                    <span className="material-symbols-outlined text-[24px]">smart_display</span> 
                                </div>
                                <div>
                                    <p className="font-bold text-text-primary dark:text-white text-sm">YouTube</p>
                                    <p className="text-xs text-text-secondary dark:text-gray-500">Channel Stats</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => toggleSocial('youtube')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${formData.socials.youtube ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-text-primary dark:text-white hover:bg-gray-200'}`}
                            >
                                {formData.socials.youtube ? 'Connected' : 'Connect'}
                            </button>
                        </div>

                        {/* TikTok */}
                        <div className="flex items-center justify-between p-4 border border-border-color dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-black/5 dark:bg-gray-800 text-black dark:text-white rounded-lg">
                                    <span className="material-symbols-outlined text-[24px]">music_note</span> 
                                </div>
                                <div>
                                    <p className="font-bold text-text-primary dark:text-white text-sm">TikTok</p>
                                    <p className="text-xs text-text-secondary dark:text-gray-500">Profile Data</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => toggleSocial('tiktok')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${formData.socials.tiktok ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-text-primary dark:text-white hover:bg-gray-200'}`}
                            >
                                {formData.socials.tiktok ? 'Connected' : 'Connect'}
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button variant="ghost" onClick={prevStep} className="flex-1">Back</Button>
                        <Button onClick={nextStep} className="flex-1" disabled={!Object.values(formData.socials).some(Boolean)}>Continue</Button>
                    </div>
                </div>
            )}

            {/* Step 3: Niche & Audience */}
            {step === 3 && (
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold text-text-primary dark:text-white mb-2">Your Expertise</h3>
                        <p className="text-text-secondary dark:text-gray-400">Select up to 3 categories that best describe your content.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { id: 'tech', icon: 'devices', label: 'Tech' },
                            { id: 'lifestyle', icon: 'self_improvement', label: 'Lifestyle' },
                            { id: 'gaming', icon: 'sports_esports', label: 'Gaming' },
                            { id: 'fashion', icon: 'checkroom', label: 'Fashion' },
                            { id: 'fitness', icon: 'fitness_center', label: 'Health' },
                            { id: 'travel', icon: 'flight', label: 'Travel' },
                        ].map((cat) => (
                            <button 
                                key={cat.id}
                                onClick={() => toggleCategory(cat.id)}
                                className={`
                                    flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all h-28
                                    ${formData.selectedCategories.includes(cat.id) 
                                        ? 'border-primary bg-primary/5 text-primary' 
                                        : 'border-border-color dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary/50 text-text-secondary dark:text-gray-400'}
                                `}
                            >
                                <span className="material-symbols-outlined text-[28px]">{cat.icon}</span>
                                <span className="font-bold text-sm">{cat.label}</span>
                            </button>
                        ))}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-3">Primary Audience Age</label>
                        <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                            {['13-17', '18-34', '35-50', '50+'].map(age => (
                                <button
                                    key={age}
                                    onClick={() => setFormData({...formData, primaryAudience: age})}
                                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.primaryAudience === age ? 'bg-white dark:bg-gray-700 shadow-sm text-text-primary dark:text-white' : 'text-text-secondary dark:text-gray-500 hover:text-text-primary'}`}
                                >
                                    {age}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button variant="ghost" onClick={prevStep} className="flex-1">Back</Button>
                        <Button onClick={nextStep} className="flex-1" disabled={formData.selectedCategories.length === 0}>Continue</Button>
                    </div>
                </div>
            )}

            {/* Step 4: Rate Card */}
            {step === 4 && (
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold text-text-primary dark:text-white mb-2">Rate Card</h3>
                        <p className="text-text-secondary dark:text-gray-400">Set your starting prices for standard deliverables.</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-bold text-text-primary dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-text-secondary">smart_display</span>
                                    Dedicated Video
                                </label>
                                <span className="text-primary font-bold">${formData.rates.video}</span>
                            </div>
                            <input 
                                type="range" min="100" max="10000" step="50" 
                                value={formData.rates.video}
                                onChange={(e) => setFormData({...formData, rates: {...formData.rates, video: parseInt(e.target.value)}})}
                                className="w-full accent-primary h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer" 
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-bold text-text-primary dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-text-secondary">post</span>
                                    Sponsored Post
                                </label>
                                <span className="text-primary font-bold">${formData.rates.post}</span>
                            </div>
                            <input 
                                type="range" min="50" max="5000" step="50" 
                                value={formData.rates.post}
                                onChange={(e) => setFormData({...formData, rates: {...formData.rates, post: parseInt(e.target.value)}})}
                                className="w-full accent-primary h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer" 
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-bold text-text-primary dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-text-secondary">auto_stories</span>
                                    Story Set (3 frames)
                                </label>
                                <span className="text-primary font-bold">${formData.rates.story}</span>
                            </div>
                            <input 
                                type="range" min="50" max="2000" step="25" 
                                value={formData.rates.story}
                                onChange={(e) => setFormData({...formData, rates: {...formData.rates, story: parseInt(e.target.value)}})}
                                className="w-full accent-primary h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer" 
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button variant="ghost" onClick={prevStep} className="flex-1">Back</Button>
                        <Button onClick={nextStep} className="flex-1">Continue</Button>
                    </div>
                </div>
            )}

            {/* Step 5: Payment Details */}
            {step === 5 && (
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold text-text-primary dark:text-white mb-2">Financial Setup</h3>
                        <p className="text-text-secondary dark:text-gray-400">Choose how you want to receive your earnings.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            onClick={() => setFormData({...formData, payoutMethod: 'stripe'})}
                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.payoutMethod === 'stripe' ? 'border-primary bg-primary/5 text-primary' : 'border-border-color dark:border-gray-800 bg-white dark:bg-gray-900 text-text-secondary dark:text-gray-400'}`}
                        >
                            <span className="material-symbols-outlined text-[32px]">credit_card</span>
                            <span className="text-sm font-bold">Bank / Stripe</span>
                        </button>
                        <button 
                            onClick={() => setFormData({...formData, payoutMethod: 'paypal'})}
                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.payoutMethod === 'paypal' ? 'border-primary bg-primary/5 text-primary' : 'border-border-color dark:border-gray-800 bg-white dark:bg-gray-900 text-text-secondary dark:text-gray-400'}`}
                        >
                            <span className="material-symbols-outlined text-[32px]">payments</span>
                            <span className="text-sm font-bold">PayPal</span>
                        </button>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-border-color dark:border-gray-800">
                        {formData.payoutMethod === 'stripe' ? (
                            <div className="space-y-4">
                                <Input label="Account Holder Name" placeholder="e.g. Alex Morgan" className="bg-white dark:bg-gray-800" />
                                <Input label="Routing Number" placeholder="9 digits" className="bg-white dark:bg-gray-800" />
                                <Input label="Account Number" placeholder="Account number" className="bg-white dark:bg-gray-800" />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Input label="PayPal Email Address" type="email" placeholder="alex@example.com" className="bg-white dark:bg-gray-800" />
                            </div>
                        )}
                        <div className="flex items-start gap-2 mt-4 text-[11px] text-text-secondary dark:text-gray-500">
                            <span className="material-symbols-outlined text-[14px] text-green-600 mt-0.5">lock</span>
                            Data is encrypted. We use Stripe Connect for secure payouts.
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button variant="ghost" onClick={prevStep} className="flex-1">Back</Button>
                        <Button onClick={nextStep} className="flex-1">Review</Button>
                    </div>
                </div>
            )}

            {/* Step 6: Success */}
            {step === 6 && (
                <div className="flex flex-col items-center text-center space-y-8 py-8">
                    <div className="size-24 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center shadow-glow mb-4 animate-bounce-slow">
                        <span className="material-symbols-outlined text-[48px]">check</span>
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="text-3xl font-bold text-text-primary dark:text-white">All Systems Go!</h3>
                        <p className="text-text-secondary dark:text-gray-400 max-w-xs mx-auto">
                            Your profile is verified and payment rails are set. You are ready to accept campaigns.
                        </p>
                    </div>

                    <Button id="finish-btn" onClick={finishOnboarding} size="lg" className="w-full max-w-xs shadow-xl shadow-primary/30">
                        Enter Dashboard
                    </Button>
                </div>
            )}

          </div>
          
          {/* Footer - Copyright or Help */}
          <div className="absolute bottom-6 w-full text-center">
              <button className="text-[11px] font-bold text-text-secondary dark:text-gray-600 hover:text-primary transition-colors uppercase tracking-widest">
                  Need Help?
              </button>
          </div>
      </div>
    </div>
  );
};

export default Onboarding;