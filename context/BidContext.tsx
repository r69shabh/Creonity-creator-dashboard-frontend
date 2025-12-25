import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Bid {
    id: string;
    gigId: string;
    gigTitle: string;
    brand: string;
    brandLogo: string;
    category: string;
    budgetRange: string;
    bidAmount: number;
    pitch: string;
    status: 'active' | 'leading' | 'outbid' | 'won' | 'lost';
    timeLeft: string;
    topBid?: number;
    submittedAt: Date;
}

interface BidContextType {
    bids: Bid[];
    addBid: (bid: Omit<Bid, 'id' | 'submittedAt'>) => void;
    updateBid: (id: string, amount: number) => void;
    getBid: (gigId: string) => Bid | undefined;
    withdrawBid: (id: string) => void;
}

const BidContext = createContext<BidContextType | undefined>(undefined);

// Initial mock data
const INITIAL_BIDS: Bid[] = [
    {
        id: '1',
        gigId: 'vr-headset-review',
        gigTitle: 'VR Headset Review',
        brand: 'Nexus Tech',
        brandLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaaFbQihFfy-F6e5rien4N3nqD2ZVjagkT3ggFv5wZ2ytBjVxB3e5Lkw-2gUBg_mOc4f5FYiQ0Oyh0IQd8HYm49V1abSGN9so7_FUIO7nIMJVa4dg2k954krxoVARfLWHqET9tWAIrvxZViGNb290HSv5nG2vATLeKmVbexOJ6UPbuv0eQg3kUXQYHoRCJAbwj8L8L7ye9IqMX-sHBm0ehaYkW-GV4TYQsbW4xkfa1C1bLafHNqlfawtpnEGQsoYzRnMwznSWulJ-r',
        category: 'Tech',
        budgetRange: '$500 - $800',
        bidAmount: 500,
        pitch: 'I have extensive experience reviewing VR headsets...',
        status: 'leading',
        timeLeft: '02h:15m',
        submittedAt: new Date(Date.now() - 3600000),
    },
    {
        id: '2',
        gigId: 'morning-routine',
        gigTitle: 'Morning Routine Integration',
        brand: 'Bean & Brew',
        brandLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0KEVIufmRbG5G7uMWmmBaRdcU0MaBYz558XRi5f85Uze8-jAvdH4yqi_QyqMQBU8oqDMooc4g4EarPeiBAPdDhwymdA4sP7cNVnYTdtGAgy81PxhQhB_f2lTIdp-iAksJBIUV7AdBPvQXb6C_m438sEO6Dj_AB3SeDBKzvVwBf95Ju9sPQdlxTzCN3akyDJgD3MXDkXMEF4qnt4YqT4c7JiLSnzjcG0-6bz3XdVvV81r9TDZ8Me0h2O_ojTbRRs3-CPw8tCqF400g',
        category: 'Lifestyle',
        budgetRange: '$300 - $500',
        bidAmount: 350,
        pitch: 'Morning content is my specialty...',
        status: 'outbid',
        timeLeft: '45m:10s',
        topBid: 380,
        submittedAt: new Date(Date.now() - 7200000),
    },
    {
        id: '3',
        gigId: 'productivity-tool',
        gigTitle: 'SaaS Productivity Tool',
        brand: 'TaskFlow',
        brandLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbzJmYMka3XY2SY90mz06-ZK9S09_1YMjnP0yrDw_hnXXbRkkwSuBCxiTZx2AvC1ITGpexeJnbOBVSW6bdmpAS4GXhLeiATCF8Q9DTKSZyG8AlV_kMW7sQVcDIZnQ15BahLINB9mgZKy4Kcf6wnn7joxLrqleXm-2Ci1RXsvnApVSpoizr90xGUtYvLNH0F7TqASA2qRamuW9SG1t1D3GDIEy9QdV7rfIWdeTHzkFo8Fdy9cNP3LJpbhny66GnieYtDHJyjcpCcD88',
        category: 'Business',
        budgetRange: '$800 - $1200',
        bidAmount: 850,
        pitch: 'I create in-depth productivity content...',
        status: 'active',
        timeLeft: '05h:30m',
        submittedAt: new Date(Date.now() - 10800000),
    },
];

export const BidProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [bids, setBids] = useState<Bid[]>(INITIAL_BIDS);

    const addBid = (bid: Omit<Bid, 'id' | 'submittedAt'>) => {
        const newBid: Bid = {
            ...bid,
            id: Date.now().toString(),
            submittedAt: new Date(),
        };
        setBids(prev => [newBid, ...prev]);
    };

    const updateBid = (id: string, amount: number) => {
        setBids(prev => prev.map(bid =>
            bid.id === id
                ? { ...bid, bidAmount: amount, status: amount > (bid.topBid || 0) ? 'leading' : 'active' }
                : bid
        ));
    };

    const getBid = (gigId: string) => {
        return bids.find(b => b.gigId === gigId);
    };

    const withdrawBid = (id: string) => {
        setBids(prev => prev.filter(b => b.id !== id));
    };

    return (
        <BidContext.Provider value={{ bids, addBid, updateBid, getBid, withdrawBid }}>
            {children}
        </BidContext.Provider>
    );
};

export const useBids = () => {
    const context = useContext(BidContext);
    if (!context) {
        throw new Error('useBids must be used within a BidProvider');
    }
    return context;
};
