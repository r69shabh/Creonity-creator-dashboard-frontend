import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEntityProfile } from '../context/EntityProfileContext';
import { useBids } from '../context/BidContext';
import { useToast } from '../context/ToastContext';

const GigDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bidAmount, setBidAmount] = useState('');
    const [pitch, setPitch] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const { openProfile } = useEntityProfile();
    const { addBid, getBid } = useBids();
    const { addToast } = useToast();

    // Check for existing bid
    const existingBid = getBid(id || '');

    // Mock gig data
    const gigData = {
        id: id || '1',
        title: "VR Headset Review",
        brand: "Nexus Tech",
        category: "Technology",
        posted: "2 days ago",
        budget: "$500 - $800",
        budgetMin: 500,
        budgetMax: 800,
        description: "We are looking for authentic tech enthusiasts to unbox and review our new AI-driven VR headset. The review should focus on comfort, display clarity, and ease of setup.",
        requirements: [
            "Must have previous experience reviewing VR/AR tech",
            "Video quality must be 4K",
            "Turnaround time: 5 days from receipt of product",
            "Deliverables: 1 YouTube Video (10-15 mins) + 2 Shorts/Reels"
        ],
        platform: ["YouTube", "Instagram"],
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4kSGWBFj6v9Xj6ElwBij_raSTToO9620CPuAYgCzSLz3kBL3fXthNqS99zABaEStwsQbT2IeoBqGACSJMqOxLAdlxPLfXrNvZfCo0iHYr-0LDrxMPeBgwubmV1jBCkOz_QOKp5PawNBiBkwGfDnnOmpkNtqYov7PkOhtGp-7LgaEupRvgegqbDIsYPQzxK_gYIXexjX-M6xrtBcCOD0umHYA4qviiGJhBhD_6bzIbH1y3kvhP9SmpggpfJoUVzLRq8-FDr8Eny8Pb",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaaFbQihFfy-F6e5rien4N3nqD2ZVjagkT3ggFv5wZ2ytBjVxB3e5Lkw-2gUBg_mOc4f5FYiQ0Oyh0IQd8HYm49V1abSGN9so7_FUIO7nIMJVa4dg2k954krxoVARfLWHqET9tWAIrvxZViGNb290HSv5nG2vATLeKmVbexOJ6UPbuv0eQg3kUXQYHoRCJAbwj8L8L7ye9IqMX-sHBm0ehaYkW-GV4TYQsbW4xkfa1C1bLafHNqlfawtpnEGQsoYzRnMwznSWulJ-r",
        bidsCount: 8,
        timeLeft: "24 hours"
    };

    const handleSubmitBid = () => {
        const amount = parseFloat(bidAmount);
        if (!amount || amount < gigData.budgetMin) {
            addToast(`Bid must be at least $${gigData.budgetMin}`, 'error');
            return;
        }
        if (!pitch.trim()) {
            addToast('Please add a pitch for your bid', 'error');
            return;
        }

        addBid({
            gigId: gigData.id,
            gigTitle: gigData.title,
            brand: gigData.brand,
            brandLogo: gigData.logo,
            category: gigData.category,
            budgetRange: gigData.budget,
            bidAmount: amount,
            pitch: pitch,
            status: 'active',
            timeLeft: gigData.timeLeft,
        });

        setIsSuccess(true);
        addToast('Bid submitted successfully!', 'success');
    };

    return (
        <div className="max-w-4xl mx-auto p-6 pb-20">
            {/* Back Link */}
            <Link to="/gigs" className="inline-flex items-center gap-1.5 text-text-secondary dark:text-gray-400 hover:text-primary mb-6 text-sm">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back to Opportunities
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 overflow-hidden">
                        <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url("${gigData.img}")` }}>
                            <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-text-primary dark:text-white uppercase">
                                {gigData.category}
                            </span>
                        </div>
                        <div className="p-5">
                            <h1 className="text-xl font-bold text-text-primary dark:text-white mb-2">{gigData.title}</h1>
                            <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-400">
                                <span className="font-medium text-text-primary dark:text-white cursor-pointer hover:text-primary" onClick={() => openProfile('company')}>{gigData.brand}</span>
                                <span>•</span>
                                <span>{gigData.posted}</span>
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-4">
                            <p className="text-[10px] uppercase text-text-secondary dark:text-gray-500 font-bold tracking-wider mb-1">Budget</p>
                            <p className="font-bold text-text-primary dark:text-white">{gigData.budget}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-4">
                            <p className="text-[10px] uppercase text-text-secondary dark:text-gray-500 font-bold tracking-wider mb-1">Platforms</p>
                            <div className="flex gap-1.5">
                                {gigData.platform.map(p => (
                                    <span key={p} className="text-xs font-medium text-text-primary dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{p}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-5">
                        <h3 className="font-medium text-text-primary dark:text-white mb-3">Description</h3>
                        <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed">{gigData.description}</p>
                    </div>

                    {/* Requirements */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-5">
                        <h3 className="font-medium text-text-primary dark:text-white mb-3">Requirements</h3>
                        <ul className="space-y-2">
                            {gigData.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary dark:text-gray-300">
                                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Bid Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-5">
                        {existingBid ? (
                            <>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                                    <span className="font-medium text-text-primary dark:text-white">You've already bid</span>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg mb-3">
                                    <p className="text-xs text-text-secondary dark:text-gray-400">Your bid</p>
                                    <p className="text-xl font-bold text-text-primary dark:text-white">${existingBid.bidAmount}</p>
                                    <p className={`text-xs font-medium mt-1 ${existingBid.status === 'leading' ? 'text-green-500' : existingBid.status === 'outbid' ? 'text-red-500' : 'text-blue-500'}`}>
                                        {existingBid.status === 'leading' ? '🏆 Leading' : existingBid.status === 'outbid' ? '⚠️ Outbid' : 'In review'}
                                    </p>
                                </div>
                                <Link to="/campaigns" className="w-full py-2.5 bg-gray-100 dark:bg-gray-700 text-text-primary dark:text-white font-medium rounded-lg text-center text-sm block hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                    View My Bids
                                </Link>
                            </>
                        ) : (
                            <>
                                <h3 className="font-medium text-text-primary dark:text-white mb-2">Ready to Bid?</h3>
                                <p className="text-xs text-text-secondary dark:text-gray-400 mb-4">Submit your rate and pitch to compete.</p>
                                <button
                                    onClick={() => { setIsModalOpen(true); setIsSuccess(false); }}
                                    className="w-full py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">gavel</span>
                                    Place Your Bid
                                </button>
                                <p className="text-center text-[10px] text-text-secondary dark:text-gray-500 mt-2">
                                    {gigData.bidsCount} bids • Closes in {gigData.timeLeft}
                                </p>
                            </>
                        )}
                    </div>

                    {/* Brand Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-5">
                        <p className="text-xs text-text-secondary dark:text-gray-400 mb-3">About the Brand</p>
                        <div className="flex items-center gap-3 mb-3 cursor-pointer" onClick={() => openProfile('company')}>
                            <img src={gigData.logo} alt="Brand" className="w-10 h-10 rounded-lg object-contain border border-gray-100 dark:border-gray-700" />
                            <div>
                                <p className="font-medium text-text-primary dark:text-white text-sm hover:text-primary">{gigData.brand}</p>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px] text-yellow-500">star</span>
                                    <span className="text-xs font-bold text-text-primary dark:text-white">4.9</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => openProfile('company')} className="w-full py-2 bg-gray-50 dark:bg-gray-700 text-text-primary dark:text-white text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                            View Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Bid Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        {!isSuccess ? (
                            <>
                                <div className="px-5 py-4 border-b border-border-color dark:border-gray-700 flex justify-between items-center">
                                    <h3 className="font-bold text-text-primary dark:text-white">Place Your Bid</h3>
                                    <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-text-primary dark:text-gray-400">
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs text-blue-700 dark:text-blue-400">
                                        Budget range: {gigData.budget}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">Bid Amount ($)</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary dark:text-gray-500 font-bold">$</span>
                                            <input
                                                type="number"
                                                value={bidAmount}
                                                onChange={(e) => setBidAmount(e.target.value)}
                                                className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white font-bold"
                                                placeholder={`Min $${gigData.budgetMin}`}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">Your Pitch</label>
                                        <textarea
                                            value={pitch}
                                            onChange={(e) => setPitch(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white resize-none h-24 text-sm"
                                            placeholder="Why should they choose you?"
                                        />
                                    </div>
                                    <button onClick={handleSubmitBid} className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">gavel</span>
                                        Submit Bid
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="p-8 text-center">
                                <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto mb-4">
                                    <span className="material-symbols-outlined text-[28px]">check_circle</span>
                                </div>
                                <h3 className="text-lg font-bold text-text-primary dark:text-white mb-2">Bid Submitted!</h3>
                                <p className="text-sm text-text-secondary dark:text-gray-400 mb-6">Your bid of <strong>${bidAmount}</strong> has been submitted. Track it in My Bids.</p>
                                <div className="flex gap-3">
                                    <Link to="/campaigns" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-text-primary dark:text-white font-medium rounded-lg text-center hover:bg-gray-200 dark:hover:bg-gray-600">
                                        View My Bids
                                    </Link>
                                    <button onClick={() => navigate('/gigs')} className="flex-1 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover">
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