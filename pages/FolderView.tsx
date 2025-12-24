import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const FolderView: React.FC = () => {
  const { folderName } = useParams<{ folderName: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock file generator based on folder type
  const getMockFiles = (folder: string) => {
    const typeMap: Record<string, { icon: string; color: string; ext: string }> = {
      'Contracts': { icon: 'description', color: 'text-blue-600', ext: 'pdf' },
      'Media Assets': { icon: 'image', color: 'text-yellow-600', ext: 'png' },
      'Brand Guidelines': { icon: 'palette', color: 'text-purple-600', ext: 'pdf' },
      'Invoices': { icon: 'receipt', color: 'text-green-600', ext: 'pdf' },
    };

    const config = typeMap[folder || ''] || { icon: 'folder', color: 'text-gray-600', ext: 'dat' };
    
    // Generate some deterministic mock files
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      name: `${folder?.split(' ')[0]}_${2023 + i}_v${i + 1}.${config.ext}`,
      size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
      date: `Oct ${10 + i}, 2023`,
      ...config
    }));
  };

  const files = getMockFiles(folderName || '');

  return (
    <div className="max-w-[1600px] mx-auto p-6 lg:p-8 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-400 mb-1">
            <span>Workspace</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-text-primary dark:text-white font-medium">{folderName}</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-text-primary dark:text-white">{folderName}</h1>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="bg-white dark:bg-gray-800 p-1 rounded-xl border border-border-color dark:border-gray-700 flex items-center shadow-sm">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-700 text-text-primary dark:text-white' : 'text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white'}`}
              >
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-700 text-text-primary dark:text-white' : 'text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white'}`}
              >
                 <span className="material-symbols-outlined text-[20px]">list</span>
              </button>
           </div>
           <Button icon="upload_file">Upload File</Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {files.length > 0 ? (
          <div className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" : "flex flex-col gap-3"}>
            {files.map((file) => (
               <Card 
                 key={file.id} 
                 padding="p-4" 
                 hoverable 
                 className={`group ${viewMode === 'list' ? 'flex items-center gap-6' : 'flex flex-col'}`}
               >
                  <div className={`${viewMode === 'list' ? 'size-12' : 'aspect-square w-full mb-4'} rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center relative overflow-hidden`}>
                     <div className={`absolute inset-0 opacity-10 ${file.color.replace('text-', 'bg-')}`}></div>
                     <span className={`material-symbols-outlined ${viewMode === 'list' ? 'text-[24px]' : 'text-[48px]'} ${file.color}`}>
                       {file.icon}
                     </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-text-primary dark:text-white truncate mb-1 group-hover:text-primary transition-colors">{file.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-text-secondary dark:text-gray-400">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.date}</span>
                    </div>
                  </div>

                  <button className="p-2 text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all">
                     <span className="material-symbols-outlined">more_vert</span>
                  </button>
               </Card>
            ))}
            
            {/* Upload Placeholder */}
            {viewMode === 'grid' && (
              <button className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center gap-3 text-text-secondary dark:text-gray-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group">
                 <span className="material-symbols-outlined text-[32px] group-hover:scale-110 transition-transform">add</span>
                 <span className="text-sm font-bold">Add New</span>
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
             <span className="material-symbols-outlined text-[64px] text-gray-300 dark:text-gray-600 mb-4">folder_open</span>
             <h3 className="text-xl font-bold text-text-primary dark:text-white">This folder is empty</h3>
             <p className="text-text-secondary dark:text-gray-400">Upload files to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderView;