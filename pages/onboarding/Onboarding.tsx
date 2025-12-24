import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 8;
  
  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  
  const finishOnboarding = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Top Bar */}
      <div className="w-full max-w-xl flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
            <div className="size-8 bg-gradient-to-tr from-primary to-orange-500 rounded-lg flex items-center justify-center text-white shadow-glow">
                <span className="material-symbols-outlined text-[18px]">hub</span>
            </div>
            <span className="font-display font-bold text-text-primary dark:text-white text-lg tracking-tight">Creonity</span>
        </div>
        {step < 8 && (
            <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-text-primary dark:text-white">Step {step} of {totalSteps}</span>
                <span className="text-[10px] text-text-secondary dark:text-gray-500 hidden sm:block">Setup Wizard</span>
            </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-xl flex-1 flex flex-col relative">
        
        {/* Progress Bar */}
        {step < 8 && (
            <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full mb-8 sm:mb-12 overflow-hidden">
                <div 
                    className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
            </div>
        )}

        {/* Step 1: Welcome / Value Intro */}
        {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full justify-center">
                <div className="text-center space-y-4 mb-4">
                    <h1 className="text-3xl sm:text-4xl font-display font-bold text-text-primary dark:text-white leading-tight">
                        Work with brands.<br/>Get paid on time.
                    </h1>
                    <p className="text-text-secondary dark:text-gray-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
                        Join the workspace designed for professional creators. 
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { icon: 'gavel', title: 'Transparent Auctions', desc: 'Bid clearly.' },
                        { icon: 'lock_clock', title: 'Escrow Payments', desc: 'Secure funds.' },
                        { icon: 'monitoring', title: 'Deep Analytics', desc: 'Track ROI.' },
                    ].map((item, i) => (
                        <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm text-center hover:border-primary/50 transition-colors cursor-default group">
                            <div className="size-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">{item.icon}</span>
                            </div>
                            <h3 className="font-bold text-text-primary dark:text-white text-sm mb-1">{item.title}</h3>
                            <p className="text-xs text-text-secondary dark:text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="pt-4 mt-auto">
                    <Button size="lg" onClick={nextStep} className="w-full shadow-lg shadow-primary/20">Get Started</Button>
                </div>
            </div>
        )}

        {/* Step 2: Basic Profile Setup */}
        {step === 2 && (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="text-center mb-2">
                    <h2 className="text-2xl font-bold text-text-primary dark:text-white">Profile Essentials</h2>
                    <p className="text-text-secondary dark:text-gray-400 text-sm">How should brands identify you?</p>
                </div>

                <Card className="space-y-5 p-5 sm:p-8">
                    <div className="flex justify-center mb-2">
                        <div className="size-24 rounded-full bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group relative overflow-hidden">
                             <span className="material-symbols-outlined text-gray-400 group-hover:text-primary mb-1">add_a_photo</span>
                             <span className="text-[10px] text-gray-400 font-bold uppercase group-hover:text-primary">Upload</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="First Name" placeholder="Alex" />
                        <Input label="Last Name" placeholder="Morgan" />
                    </div>
                    <Input label="Display Name" placeholder="@alexmorgan" helperText="Visible to brands on the marketplace." />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Location" placeholder="San Francisco, CA" leftIcon="location_on" />
                        <div>
                             <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-1.5">Language</label>
                             <select className="w-full rounded-lg bg-gray-50 dark:bg-gray-800 border border-border-color dark:border-gray-700 text-text-primary dark:text-white px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                                 <option>English (US)</option>
                                 <option>Spanish</option>
                                 <option>French</option>
                             </select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                         <Button variant="secondary" onClick={prevStep} className="flex-1">Back</Button>
                         <Button onClick={nextStep} className="flex-[2]">Continue</Button>
                    </div>
                </Card>
             </div>
        )}

        {/* Step 3: Connect Socials */}
        {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="text-center mb-2">
                    <h2 className="text-2xl font-bold text-text-primary dark:text-white">Connect Platforms</h2>
                    <p className="text-text-secondary dark:text-gray-400 text-sm">We verify stats via read-only access.</p>
                </div>

                <div className="space-y-4">
                    {[
                        { name: 'Instagram', icon: 'photo_camera', color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/20' },
                        { name: 'YouTube', icon: 'smart_display', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
                        { name: 'Twitter / X', icon: 'flutter_dash', color: 'text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                    ].map((platform, i) => (
                        <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-xl flex items-center justify-between group hover:border-gray-300 dark:hover:border-gray-700 transition-all shadow-sm">
                             <div className="flex items-center gap-4">
                                 <div className={`p-3 rounded-lg ${platform.bg} ${platform.color}`}>
                                     <span className="material-symbols-outlined">{platform.icon}</span>
                                 </div>
                                 <div className="text-left">
                                     <h3 className="font-bold text-text-primary dark:text-white text-sm">{platform.name}</h3>
                                     <p className="text-xs text-text-secondary dark:text-gray-500">Not connected</p>
                                 </div>
                             </div>
                             <button className="px-4 py-2 text-xs font-bold border border-gray-200 dark:border-gray-700 rounded-lg text-text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                 Connect
                             </button>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-4 mt-8 pt-4">
                     <div className="flex gap-3 w-full">
                         <Button variant="secondary" onClick={prevStep} className="flex-1">Back</Button>
                         <Button onClick={nextStep} className="flex-[2]">Continue</Button>
                    </div>
                     <button onClick={nextStep} className="text-xs text-text-secondary dark:text-gray-500 hover:text-text-primary dark:hover:text-white transition-colors">Skip for now</button>
                </div>
            </div>
        )}

        {/* Step 4: Category & Audience */}
        {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="text-center mb-2">
                    <h2 className="text-2xl font-bold text-text-primary dark:text-white">Your Niche</h2>
                    <p className="text-text-secondary dark:text-gray-400 text-sm">Select categories that fit your content.</p>
                </div>

                <div>
                    <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-3 px-1">Primary Category</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                        {['Tech', 'Lifestyle', 'Fashion', 'Gaming', 'Fitness', 'Travel'].map(cat => (
                            <button key={cat} className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-text-secondary dark:text-gray-300 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-all focus:ring-2 focus:ring-primary/20 hover:shadow-sm">
                                {cat}
                            </button>
                        ))}
                    </div>

                    <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-3 px-1">Audience Geography</label>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {['USA', 'Canada', 'UK', 'Europe', 'Asia', 'LatAm'].map(geo => (
                             <button key={geo} className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-medium text-text-secondary dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                + {geo}
                             </button>
                        ))}
                    </div>

                    <div className="flex gap-3 mt-8">
                         <Button variant="secondary" onClick={prevStep} className="flex-1">Back</Button>
                         <Button onClick={nextStep} className="flex-[2]">Continue</Button>
                    </div>
                </div>
            </div>
        )}

        {/* Step 5: Pricing & Availability */}
        {step === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="text-center mb-2">
                    <h2 className="text-2xl font-bold text-text-primary dark:text-white">Pricing & Availability</h2>
                    <p className="text-text-secondary dark:text-gray-400 text-sm">Set your baseline. Change anytime.</p>
                </div>

                <Card className="space-y-6 p-5 sm:p-8">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                             <label className="text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide">Rate Range</label>
                             <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">$500 - $2,500</span>
                        </div>
                        <input type="range" className="w-full accent-primary h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                        <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
                            <span>$0</span>
                            <span>$10k+</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-3">Deliverables</label>
                        <div className="flex flex-wrap gap-2">
                            {['Instagram Reel', 'YouTube Video', 'TikTok', 'Story', 'UGC'].map(d => (
                                <button key={d} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                                    {d}
                                </button>
                            ))}
                            <button className="px-3 py-1.5 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-gray-400 text-xs font-medium hover:text-white hover:border-gray-400 transition-colors">
                                + Add
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div>
                            <p className="font-bold text-sm text-text-primary dark:text-white">Accepting Work</p>
                            <p className="text-xs text-text-secondary dark:text-gray-500">Brands can invite you</p>
                        </div>
                         <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                    </div>

                    <div className="flex gap-3 pt-2">
                         <Button variant="secondary" onClick={prevStep} className="flex-1">Back</Button>
                         <Button onClick={nextStep} className="flex-[2]">Continue</Button>
                    </div>
                </Card>
            </div>
        )}

        {/* Step 6: Payment Setup (Escrow Explained) */}
        {step === 6 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-text-primary dark:text-white">Payment Setup</h2>
                    <p className="text-text-secondary dark:text-gray-400 text-sm">Secured via Escrow.</p>
                </div>

                <div className="w-full">
                    {/* Visual Flow - Responsive */}
                    <div className="flex items-center justify-between mb-8 px-0 sm:px-4 relative w-full">
                        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-200 dark:bg-gray-800 -z-10"></div>
                        {[
                            { label: 'Bid', icon: 'gavel' },
                            { label: 'Work', icon: 'edit' },
                            { label: 'Escrow', icon: 'lock' },
                            { label: 'Paid', icon: 'attach_money' },
                        ].map((s, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 bg-gray-50 dark:bg-gray-950 px-1 sm:px-2">
                                <div className="size-8 sm:size-10 rounded-full bg-white dark:bg-gray-800 border-2 border-primary/20 flex items-center justify-center text-primary shadow-sm">
                                    <span className="material-symbols-outlined text-[16px] sm:text-[20px]">{s.icon}</span>
                                </div>
                                <span className="text-[10px] font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide">{s.label}</span>
                            </div>
                        ))}
                    </div>

                    <Card className="space-y-5 p-6">
                         <div>
                            <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-1.5">Payout Method</label>
                            <select className="w-full rounded-lg bg-gray-50 dark:bg-gray-800 border border-border-color dark:border-gray-700 text-text-primary dark:text-white px-4 py-3 text-sm outline-none">
                                <option>Stripe (Recommended)</option>
                                <option>PayPal</option>
                                <option>Bank Transfer</option>
                            </select>
                        </div>
                        <div>
                             <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-1.5">Currency</label>
                             <select className="w-full rounded-lg bg-gray-50 dark:bg-gray-800 border border-border-color dark:border-gray-700 text-text-primary dark:text-white px-4 py-3 text-sm outline-none">
                                <option>USD ($)</option>
                                <option>EUR (€)</option>
                                <option>GBP (£)</option>
                            </select>
                        </div>
                        
                        <div className="flex gap-3 pt-2">
                             <Button variant="secondary" onClick={prevStep} className="flex-1">Back</Button>
                             <Button onClick={nextStep} className="flex-[2]">Save & Next</Button>
                        </div>
                    </Card>
                    <div className="text-center mt-4">
                        <button onClick={nextStep} className="text-xs font-medium text-text-secondary dark:text-gray-500 hover:underline">Set up later</button>
                    </div>
                </div>
            </div>
        )}

        {/* Step 7: Dashboard Prefs */}
        {step === 7 && (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="text-center mb-2">
                    <h2 className="text-2xl font-bold text-text-primary dark:text-white">Customize Home</h2>
                    <p className="text-text-secondary dark:text-gray-400 text-sm">Tailor your workspace.</p>
                </div>

                <Card className="space-y-4 p-5 sm:p-8">
                    {['Earnings Summary', 'Active Bids', 'Recommended Gigs'].map((item) => (
                        <div key={item} className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <div>
                                <p className="font-bold text-sm text-text-primary dark:text-white">{item}</p>
                                <p className="text-[10px] text-text-secondary dark:text-gray-500">Visible on dashboard</p>
                            </div>
                            <input type="checkbox" defaultChecked className="w-5 h-5 text-primary rounded bg-gray-200 border-transparent focus:ring-primary dark:bg-gray-700" />
                        </div>
                    ))}
                    
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                        <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-2">Landing Page</label>
                        <select className="w-full rounded-lg bg-gray-50 dark:bg-gray-800 border border-border-color dark:border-gray-700 text-text-primary dark:text-white px-4 py-2.5 text-sm outline-none">
                            <option>Dashboard (Default)</option>
                            <option>Messages</option>
                            <option>Auctions</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                         <Button variant="secondary" onClick={prevStep} className="flex-1">Back</Button>
                         <Button onClick={nextStep} className="flex-[2]">Finish Setup</Button>
                    </div>
                </Card>
             </div>
        )}

        {/* Step 8: Complete */}
        {step === 8 && (
             <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 text-center flex flex-col items-center justify-center h-full pt-12 sm:pt-0">
                <div className="size-24 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/10">
                    <span className="material-symbols-outlined text-[48px]">check_circle</span>
                </div>
                
                <div className="space-y-3 max-w-sm mx-auto">
                    <h1 className="text-3xl font-display font-bold text-text-primary dark:text-white">
                        You're All Set!
                    </h1>
                    <p className="text-text-secondary dark:text-gray-400 text-base leading-relaxed">
                        Your workspace is ready. Start exploring campaigns and connecting with brands.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm">
                    <Button onClick={finishOnboarding} size="lg" className="flex-1 shadow-lg shadow-primary/20">
                        Go to Dashboard
                    </Button>
                    <Button onClick={finishOnboarding} variant="secondary" size="lg" className="flex-1">
                        Find Gigs
                    </Button>
                </div>
             </div>
        )}

      </div>
      
      {/* Footer Links */}
      {step < 8 && (
        <div className="w-full text-center py-6 mt-auto">
            <button className="text-[10px] text-text-secondary dark:text-gray-600 hover:text-primary transition-colors font-medium">
                Need help? Contact Support
            </button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;