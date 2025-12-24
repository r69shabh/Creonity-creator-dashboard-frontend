import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEntityProfile } from '../context/EntityProfileContext';

const GigDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { openProfile } = useEntityProfile();

  // Mock data
  const gigData = {
    title: "VR Headset Review",
    brand: "Nexus Tech",
    category: "Technology",
    posted: "2 days ago",
    budget: "$500 - $800",
    description: "We are looking for authentic tech enthusiasts to unbox and review our new AI-driven VR headset. The review should focus on comfort, display clarity, and ease of setup. We want honest feedback presented in an engaging, high-energy format.",
    requirements: [
      "Must have previous experience reviewing VR/AR tech",
      "Video quality must be 4K",
      "Turnaround time: 5 days from receipt of product",
      "Deliverables: 1 YouTube Video (10-15 mins) + 2 Shorts/Reels"
    ],
    platform: ["YouTube", "Instagram"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4kSGWBFj6v9Xj6ElwBij_raSTToO9620CPuAYgCzSLz3kBL3fXthNqS99zABaEStwsQbT2IeoBqGACSJMqOxLAdlxPLfXrNvZfCo0iHYr-0LDrxMPeBgwubmV1jBCkOz_QOKp5PawNBiBkwGfDnnOmpkNtqYov7PkOhtGp-7LgaEupRvgegqbDIsYPQzxK_gYIXexjX-M6xrtBcCOD0umHYA4qviiGJhBhD_6bzIbH1y3kvhP9SmpggpfJoUVzLRq8-FDr8Eny8Pb",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaaFbQihFfy-F6e5rien4N3nqD2ZVjagkT3ggFv5wZ2ytBjVxB3e5Lkw-2gUBg_mOc4f5FYiQ0Oyh0IQd8HYm49V1abSGN9so7_FUIO7nIMJVa4dg2k954krxoVARfLWHqET9tWAIrvxZViGNb290HSv5nG2vATLeKmVbexOJ6UPbuv0eQg3kUXQYHoRCJAbwj8L8L7ye9IqMX-sHBm0ehaYkW-GV4TYQsbW4xkfa1C1bLafHNqlfawtpnEGQsoYzRnMwznSWulJ-r"
  };

  const handleApply = () => {
      setIsSuccess(true);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 pb-20">
      {/* Back Link */}
      <Link to="/gigs" className="inline-flex items-center gap-2 text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white mb-6 font-medium text-sm transition-colors">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Back to Gigs
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Content */}
        <div className="flex-1 w-full">
            {/* Header Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-border-color dark:border-gray-700 shadow-sm overflow-hidden mb-6">
                <div className="h-64 w-full bg-cover bg-center relative" style={{ backgroundImage: `url("${gigData.img}")` }}>
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-text-primary dark:text-white shadow-sm uppercase tracking-wide">
                        {gigData.category}
                    </div>
                </div>
                <div className="p-6 relative">
                    <div className="absolute -top-10 right-6 size-20 bg-white dark:bg-gray-800 rounded-2xl border-2 border-white dark:border-gray-700 shadow-lg flex items-center justify-center p-2 cursor-pointer hover:scale-105 transition-transform" onClick={() => openProfile('company')}>
                        <img src={gigData.logo} alt="Brand" className="w-full h-full object-contain" />
                    </div>
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-text-primary dark:text-white mb-2">{gigData.title}</h1>
                        <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-400">
                             <span className="font-semibold text-text-primary dark:text-gray-200 cursor-pointer hover:text-primary" onClick={() => openProfile('company')}>{gigData.brand}</span>
                             <span>•</span>
                             <span>Posted {gigData.posted}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-border-color dark:border-gray-700 mb-6">
                        <div>
                            <p className="text-xs uppercase text-text-secondary dark:text-gray-500 font-bold tracking-wider mb-1">Budget</p>
                            <p className="text-lg font-bold text-text-primary dark:text-white">{gigData.budget}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-text-secondary dark:text-gray-500 font-bold tracking-wider mb-1">Platforms</p>
                            <div className="flex gap-2">
                                {gigData.platform.map(p => (
                                    <span key={p} className="text-sm font-medium text-text-primary dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{p}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-text-primary dark:text-white mb-3">Description</h3>
                            <p className="text-text-secondary dark:text-gray-300 leading-relaxed">
                                {gigData.description}
                            </p>
                        </div>
                        <div>
                             <h3 className="text-lg font-bold text-text-primary dark:text-white mb-3">Key Requirements</h3>
                             <ul className="space-y-2">
                                {gigData.requirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-3 text-text-secondary dark:text-gray-300">
                                        <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">check_circle</span>
                                        {req}
                                    </li>
                                ))}
                             </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Sidebar Action Card */}
        <div className="w-full lg:w-80 shrink-0 space-y-6 sticky top-24">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-card p-6">
                <h3 className="font-bold text-lg text-text-primary dark:text-white mb-4">Interested?</h3>
                <button 
                    onClick={() => {setIsModalOpen(true); setIsSuccess(false);}}
                    className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center justify-center gap-2"
                >
                    Apply Now
                </button>
                <p className="text-center text-xs text-text-secondary dark:text-gray-500 mt-3">
                    Applications close in 24 hours.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-card p-6">
                <h3 className="font-bold text-sm text-text-primary dark:text-white mb-3">About the Brand</h3>
                <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => openProfile('company')}>
                    <div className="size-10 rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-center p-1">
                        <img src={gigData.logo} alt="Brand" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <p className="font-bold text-text-primary dark:text-white text-sm hover:text-primary transition-colors">Nexus Tech</p>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-yellow-500">star</span>
                            <span className="text-xs font-bold text-text-primary dark:text-white">4.9</span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => openProfile('company')}
                    className="w-full py-2 bg-gray-50 dark:bg-gray-700 text-text-primary dark:text-white font-semibold text-sm rounded-lg border border-border-color dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                    View Brand Profile
                </button>
            </div>
        </div>
      </div>

      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-float w-full max-w-lg relative z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
             
             {!isSuccess ? (
                 <>
                    <div className="px-6 py-4 border-b border-border-color dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center">
                        <h3 className="font-bold text-text-primary dark:text-white">Apply for Gig</h3>
                        <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-text-primary dark:text-gray-400 dark:hover:text-white"><span className="material-symbols-outlined">close</span></button>
                    </div>
                    <div className="p-6 flex flex-col gap-4">
                        <div>
                            <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">Your Rate Quote ($)</label>
                            <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary dark:text-gray-500 font-bold">$</span>
                            <input type="number" className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-primary focus:border-primary font-bold" placeholder="0.00" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">Why are you a good fit?</label>
                            <textarea className="w-full px-4 py-3 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-primary focus:border-primary resize-none h-32 text-sm" placeholder="Tell the brand about your experience and ideas..."></textarea>
                        </div>
                        <button onClick={handleApply} className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
                            Submit Application
                        </button>
                    </div>
                 </>
             ) : (
                 <div className="p-8 flex flex-col items-center text-center">
                     <div className="size-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-4">
                         <span className="material-symbols-outlined text-[32px]">check_circle</span>
                     </div>
                     <h3 className="text-xl font-bold text-text-primary dark:text-white mb-2">Application Sent!</h3>
                     <p className="text-text-secondary dark:text-gray-400 text-sm mb-6">Your application for <strong>{gigData.title}</strong> has been sent to the brand. You can track the status in the "My Work" section.</p>
                     <div className="flex gap-3 w-full">
                        <Link to="/collaborations" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-text-primary dark:text-white font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            Go to My Work
                        </Link>
                        <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors">
                            Browse More
                        </button>
                     </div>
                 </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GigDetail;