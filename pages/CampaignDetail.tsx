import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - in a real app this would come from an API based on ID
  const campaignData = {
    title: "VR Headset Review",
    brand: "Nexus Tech",
    category: "Technology",
    posted: "2 days ago",
    timeLeft: "02h:15m",
    budget: "$500 - $800",
    currentBid: "$500",
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

  return (
    <div className="max-w-5xl mx-auto p-6 pb-20">
      {/* Back Link */}
      <Link to="/campaigns" className="inline-flex items-center gap-2 text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white mb-6 font-medium text-sm transition-colors">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Back to Campaigns
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Content */}
        <div className="flex-1 w-full">
            {/* Header Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-border-color dark:border-gray-700 shadow-sm overflow-hidden mb-6">
                <div className="h-64 w-full bg-cover bg-center relative" style={{ backgroundImage: `url("${campaignData.img}")` }}>
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-text-primary dark:text-white shadow-sm uppercase tracking-wide">
                        {campaignData.category}
                    </div>
                </div>
                <div className="p-6 relative">
                    <div className="absolute -top-10 right-6 size-20 bg-white dark:bg-gray-800 rounded-2xl border-2 border-white dark:border-gray-700 shadow-lg flex items-center justify-center p-2">
                        <img src={campaignData.logo} alt="Brand" className="w-full h-full object-contain" />
                    </div>
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-text-primary dark:text-white mb-2">{campaignData.title}</h1>
                        <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-400">
                             <span className="font-semibold text-text-primary dark:text-gray-200">{campaignData.brand}</span>
                             <span>•</span>
                             <span>Posted {campaignData.posted}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-border-color dark:border-gray-700 mb-6">
                        <div>
                            <p className="text-xs uppercase text-text-secondary dark:text-gray-500 font-bold tracking-wider mb-1">Time Left</p>
                            <p className="text-lg font-bold text-orange-600 font-mono flex items-center gap-1">
                                <span className="material-symbols-outlined text-[18px]">timer</span> {campaignData.timeLeft}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-text-secondary dark:text-gray-500 font-bold tracking-wider mb-1">Budget</p>
                            <p className="text-lg font-bold text-text-primary dark:text-white">{campaignData.budget}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-text-secondary dark:text-gray-500 font-bold tracking-wider mb-1">Current Bid</p>
                            <p className="text-lg font-bold text-green-600 dark:text-green-400">{campaignData.currentBid}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-text-secondary dark:text-gray-500 font-bold tracking-wider mb-1">Status</p>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                                Open
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-text-primary dark:text-white mb-3">Description</h3>
                            <p className="text-text-secondary dark:text-gray-300 leading-relaxed">
                                {campaignData.description}
                            </p>
                        </div>
                        <div>
                             <h3 className="text-lg font-bold text-text-primary dark:text-white mb-3">Key Requirements</h3>
                             <ul className="space-y-2">
                                {campaignData.requirements.map((req, i) => (
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
                <h3 className="font-bold text-lg text-text-primary dark:text-white mb-4">Submit Proposal</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase mb-1.5">Your Offer ($)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary font-bold">$</span>
                            <input type="number" className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-border-color dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-text-primary dark:text-white font-bold focus:ring-primary focus:border-primary" placeholder="Enter amount" />
                        </div>
                        <p className="text-[10px] text-text-secondary dark:text-gray-500 mt-1.5">Platform fee: 5%</p>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-secondary dark:text-gray-400 uppercase mb-1.5">Delivery Time</label>
                        <select className="w-full px-3 py-2.5 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white focus:ring-primary focus:border-primary text-sm">
                            <option>3 Days</option>
                            <option>5 Days</option>
                            <option>7 Days</option>
                        </select>
                    </div>
                    <button className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">send</span>
                        Submit Proposal
                    </button>
                    <p className="text-center text-xs text-text-secondary dark:text-gray-500">
                        By submitting, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a>.
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-card p-6">
                <h3 className="font-bold text-sm text-text-primary dark:text-white mb-3">About the Brand</h3>
                <div className="flex items-center gap-3 mb-4">
                    <div className="size-10 rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-center p-1">
                        <img src={campaignData.logo} alt="Brand" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <p className="font-bold text-text-primary dark:text-white text-sm">Nexus Tech</p>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-yellow-500">star</span>
                            <span className="text-xs font-bold text-text-primary dark:text-white">4.9</span>
                            <span className="text-xs text-text-secondary dark:text-gray-500">(12 Campaigns)</span>
                        </div>
                    </div>
                </div>
                <button className="w-full py-2 bg-gray-50 dark:bg-gray-700 text-text-primary dark:text-white font-semibold text-sm rounded-lg border border-border-color dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    View Brand Profile
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;