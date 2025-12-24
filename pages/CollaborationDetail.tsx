import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CollaborationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock Milestones
  const steps = [
    { label: "Contract Signed", date: "Oct 24", status: "completed" },
    { label: "Concept Approval", date: "Oct 26", status: "completed" },
    { label: "Content Creation", date: "In Progress", status: "current" },
    { label: "Brand Review", date: "Due Oct 30", status: "upcoming" },
    { label: "Payment Release", date: "Pending", status: "upcoming" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 pb-20">
      <Link to="/collaborations" className="inline-flex items-center gap-2 text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white mb-6 font-medium text-sm transition-colors">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Back to Collaborations
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Workspace */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-border-color dark:border-gray-700 shadow-sm flex items-start justify-between">
                <div className="flex gap-4">
                    <div className="size-14 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-center shrink-0">
                         <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaaFbQihFfy-F6e5rien4N3nqD2ZVjagkT3ggFv5wZ2ytBjVxB3e5Lkw-2gUBg_mOc4f5FYiQ0Oyh0IQd8HYm49V1abSGN9so7_FUIO7nIMJVa4dg2k954krxoVARfLWHqET9tWAIrvxZViGNb290HSv5nG2vATLeKmVbexOJ6UPbuv0eQg3kUXQYHoRCJAbwj8L8L7ye9IqMX-sHBm0ehaYkW-GV4TYQsbW4xkfa1C1bLafHNqlfawtpnEGQsoYzRnMwznSWulJ-r" alt="Brand" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-text-primary dark:text-white">VR Headset Unboxing</h1>
                        <p className="text-sm text-text-secondary dark:text-gray-400">TechFlow AI • $1,200.00</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                                <span className="material-symbols-outlined text-[14px]">videocam</span> 1 Video
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-100 dark:border-purple-800">
                                <span className="material-symbols-outlined text-[14px]">auto_stories</span> 2 Stories
                            </span>
                        </div>
                    </div>
                </div>
                <Link to="/messages" className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors">
                    <span className="material-symbols-outlined">chat</span>
                </Link>
            </div>

            {/* Timeline Stepper */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-border-color dark:border-gray-700 shadow-sm overflow-x-auto">
                <h3 className="font-bold text-text-primary dark:text-white mb-6">Timeline</h3>
                <div className="flex items-center justify-between min-w-[500px]">
                    {steps.map((step, i) => (
                        <div key={i} className="flex flex-col items-center relative z-10 w-full group">
                             <div className={`size-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                                 step.status === 'completed' ? 'bg-green-500 border-green-500 text-white' : 
                                 step.status === 'current' ? 'bg-white dark:bg-gray-800 border-primary text-primary' : 
                                 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400'
                             }`}>
                                 {step.status === 'completed' ? <span className="material-symbols-outlined text-[18px]">check</span> : i + 1}
                             </div>
                             <div className="text-center mt-2">
                                 <p className={`text-xs font-bold ${step.status === 'upcoming' ? 'text-gray-400' : 'text-text-primary dark:text-white'}`}>{step.label}</p>
                                 <p className="text-[10px] text-text-secondary dark:text-gray-500">{step.date}</p>
                             </div>
                             {i < steps.length - 1 && (
                                 <div className={`absolute top-4 left-[50%] w-full h-0.5 -z-10 ${
                                     step.status === 'completed' ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                                 }`}></div>
                             )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Deliverables / Work Area */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-border-color dark:border-gray-700 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-text-primary dark:text-white">Content Deliverables</h3>
                    <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">history</span> History
                    </button>
                </div>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                    <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                    </div>
                    <p className="font-bold text-text-primary dark:text-white">Upload Draft Content</p>
                    <p className="text-xs text-text-secondary dark:text-gray-400 mt-1 max-w-xs">Drag & drop your video files (MP4, MOV) or images. Max file size 2GB.</p>
                </div>

                <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border-color dark:border-gray-700 bg-white dark:bg-gray-900">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-secondary">
                                <span className="material-symbols-outlined">movie</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-text-primary dark:text-white">Draft_V1.mp4</p>
                                <p className="text-xs text-text-secondary dark:text-gray-400">Uploaded 2 hours ago • 245 MB</p>
                            </div>
                        </div>
                        <span className="px-2 py-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-[10px] uppercase font-bold tracking-wider rounded border border-yellow-100 dark:border-yellow-800">Pending Review</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
             {/* Action Box */}
             <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-6">
                 <h3 className="font-bold text-text-primary dark:text-white mb-2">Next Step</h3>
                 <p className="text-sm text-text-secondary dark:text-gray-400 mb-4">Upload your first draft for brand review before <strong>Oct 30</strong>.</p>
                 <button className="w-full py-2.5 bg-primary text-white font-bold rounded-lg shadow-sm hover:bg-primary-hover transition-colors">
                     Submit for Review
                 </button>
             </div>

             {/* Contract Info */}
             <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-sm p-6">
                 <h3 className="font-bold text-text-primary dark:text-white mb-4">Contract & Terms</h3>
                 <div className="space-y-3 mb-6">
                     <div className="flex justify-between text-sm">
                         <span className="text-text-secondary dark:text-gray-400">Status</span>
                         <span className="font-bold text-green-600 dark:text-green-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">edit_document</span> Signed</span>
                     </div>
                     <div className="flex justify-between text-sm">
                         <span className="text-text-secondary dark:text-gray-400">Date</span>
                         <span className="font-medium text-text-primary dark:text-white">Oct 24, 2023</span>
                     </div>
                     <div className="flex justify-between text-sm">
                         <span className="text-text-secondary dark:text-gray-400">Total Value</span>
                         <span className="font-bold text-text-primary dark:text-white">$1,200.00</span>
                     </div>
                 </div>
                 <button className="w-full py-2 border border-border-color dark:border-gray-600 rounded-lg text-sm font-semibold text-text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                     <span className="material-symbols-outlined text-[16px]">description</span> View Agreement
                 </button>
             </div>

             {/* Brand Contact */}
             <div className="bg-white dark:bg-gray-800 rounded-xl border border-border-color dark:border-gray-700 shadow-sm p-6">
                 <h3 className="font-bold text-text-primary dark:text-white mb-4">Brand Contact</h3>
                 <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-text-secondary dark:text-gray-400">SM</div>
                    <div>
                        <p className="text-sm font-bold text-text-primary dark:text-white">Sarah Miller</p>
                        <p className="text-xs text-text-secondary dark:text-gray-400">Campaign Manager</p>
                    </div>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationDetail;