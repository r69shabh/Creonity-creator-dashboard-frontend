import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBids, Bid } from '../context/BidContext';
import { useToast } from '../context/ToastContext';

type Tab = 'active' | 'won' | 'lost';

const Campaigns: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('active');
  const [editingBid, setEditingBid] = useState<Bid | null>(null);
  const [newAmount, setNewAmount] = useState('');
  const { bids, updateBid, withdrawBid } = useBids();
  const { addToast } = useToast();

  const activeBids = bids.filter(b => b.status === 'active' || b.status === 'leading' || b.status === 'outbid');
  const wonBids = bids.filter(b => b.status === 'won');
  const lostBids = bids.filter(b => b.status === 'lost');

  const handleUpdateBid = () => {
    if (!editingBid) return;
    const amount = parseFloat(newAmount);
    if (!amount || amount <= editingBid.bidAmount) {
      addToast('New bid must be higher than current bid', 'error');
      return;
    }
    updateBid(editingBid.id, amount);
    addToast('Bid updated successfully!', 'success');
    setEditingBid(null);
    setNewAmount('');
  };

  const handleWithdraw = (bid: Bid) => {
    if (window.confirm(`Withdraw bid for "${bid.gigTitle}"?`)) {
      withdrawBid(bid.id);
      addToast('Bid withdrawn', 'success');
    }
  };

  const getStatusBadge = (status: Bid['status']) => {
    switch (status) {
      case 'leading':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Leading</span>;
      case 'outbid':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"><span className="material-symbols-outlined text-[12px]">warning</span>Outbid</span>;
      case 'won':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-700"><span className="material-symbols-outlined text-[12px]">check_circle</span>Won</span>;
      case 'lost':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">Lost</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">In Review</span>;
    }
  };

  const renderBidCard = (bid: Bid) => (
    <div key={bid.id} className={`bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-4 ${bid.status === 'outbid' ? 'border-l-4 border-l-red-500' : ''}`}>
      <div className="flex items-start gap-4">
        {/* Brand Logo */}
        <div className="w-11 h-11 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center shrink-0 overflow-hidden">
          <img src={bid.brandLogo} alt={bid.brand} className="w-8 h-8 object-contain" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <Link to={`/gigs/${bid.gigId}`} className="font-medium text-sm text-text-primary dark:text-white hover:text-primary truncate">
              {bid.gigTitle}
            </Link>
            {getStatusBadge(bid.status)}
          </div>
          <p className="text-xs text-text-secondary dark:text-gray-400">{bid.brand} • {bid.category}</p>

          <div className="flex items-center gap-4 mt-3">
            <div>
              <p className="text-[10px] text-text-secondary dark:text-gray-500 uppercase">Your Bid</p>
              <p className="font-bold text-text-primary dark:text-white">${bid.bidAmount}</p>
              {bid.status === 'outbid' && bid.topBid && (
                <p className="text-[10px] text-red-500">Top: ${bid.topBid}</p>
              )}
            </div>
            <div>
              <p className="text-[10px] text-text-secondary dark:text-gray-500 uppercase">Time Left</p>
              <div className="flex items-center gap-1 text-sm font-medium text-text-primary dark:text-white">
                <span className="material-symbols-outlined text-[14px] text-text-secondary">timer</span>
                {bid.timeLeft}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4 pt-3 border-t border-border-color dark:border-gray-700">
        {bid.status === 'outbid' ? (
          <button
            onClick={() => { setEditingBid(bid); setNewAmount(''); }}
            className="flex-1 py-2 text-xs font-medium text-white bg-primary rounded-lg hover:bg-primary-hover flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            Increase Bid
          </button>
        ) : (
          <button
            onClick={() => { setEditingBid(bid); setNewAmount(''); }}
            className="flex-1 py-2 text-xs font-medium text-text-primary dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Edit Bid
          </button>
        )}
        <button
          onClick={() => handleWithdraw(bid)}
          className="px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
        >
          Withdraw
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary dark:text-white">My Bids</h1>
          <p className="text-sm text-text-secondary dark:text-gray-400">Track your bid status</p>
        </div>
        <Link to="/gigs" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">
          Find Opportunities
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6 w-fit">
        {[
          { id: 'active', label: 'Active', count: activeBids.length },
          { id: 'won', label: 'Won', count: wonBids.length },
          { id: 'lost', label: 'Lost', count: lostBids.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-text-primary dark:text-white shadow-sm'
                : 'text-text-secondary dark:text-gray-400 hover:text-text-primary'
              }`}
          >
            {tab.label}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-primary/10 text-primary' : 'bg-gray-200 dark:bg-gray-600 text-text-secondary dark:text-gray-400'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Bid List */}
      <div className="space-y-4">
        {activeTab === 'active' && (
          activeBids.length > 0 ? (
            activeBids.map(renderBidCard)
          ) : (
            <div className="py-12 text-center text-text-secondary dark:text-gray-400">
              <span className="material-symbols-outlined text-[48px] opacity-50 mb-2">gavel</span>
              <p>No active bids</p>
              <Link to="/gigs" className="text-primary font-medium text-sm hover:underline mt-2 inline-block">
                Browse Opportunities
              </Link>
            </div>
          )
        )}

        {activeTab === 'won' && (
          wonBids.length > 0 ? (
            wonBids.map(bid => (
              <div key={bid.id} className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400">emoji_events</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-text-primary dark:text-white">{bid.gigTitle}</p>
                    <p className="text-xs text-text-secondary dark:text-gray-400">{bid.brand} • ${bid.bidAmount}</p>
                  </div>
                  <Link to={`/collaborations/${bid.gigId}`} className="px-4 py-2 text-xs font-medium text-text-primary dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                    View Workroom
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-text-secondary dark:text-gray-400">
              <span className="material-symbols-outlined text-[48px] opacity-50 mb-2">emoji_events</span>
              <p>No won bids yet</p>
            </div>
          )
        )}

        {activeTab === 'lost' && (
          lostBids.length > 0 ? (
            lostBids.map(bid => (
              <div key={bid.id} className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 p-4 opacity-60">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-400">history</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-text-primary dark:text-white">{bid.gigTitle}</p>
                    <p className="text-xs text-text-secondary dark:text-gray-400">{bid.brand} • Your bid: ${bid.bidAmount}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-text-secondary dark:text-gray-400">
              <span className="material-symbols-outlined text-[48px] opacity-50 mb-2">history</span>
              <p>No lost bids</p>
            </div>
          )
        )}
      </div>

      {/* Edit Bid Modal */}
      {editingBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingBid(null)} />
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-sm relative z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-border-color dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-bold text-text-primary dark:text-white">Update Bid</h3>
              <button onClick={() => setEditingBid(null)} className="text-text-secondary hover:text-text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <p className="text-xs text-text-secondary dark:text-gray-400">{editingBid.gigTitle}</p>
                <p className="text-sm font-medium text-text-primary dark:text-white">Current bid: ${editingBid.bidAmount}</p>
                {editingBid.topBid && <p className="text-xs text-red-500">Top bid: ${editingBid.topBid}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-text-primary dark:text-gray-300 uppercase tracking-wide mb-1.5">New Amount ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary font-bold">$</span>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-gray-900 text-text-primary dark:text-white font-bold"
                    placeholder={`More than $${editingBid.bidAmount}`}
                  />
                </div>
              </div>
              <button onClick={handleUpdateBid} className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover">
                Update Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;