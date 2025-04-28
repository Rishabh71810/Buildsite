import React from 'react';
import { Folder, FileText, ChevronRight } from 'lucide-react';
import { FileItem } from '../types';
import { useAppContext } from '../context/AppContext';

interface FileExplorerProps {
  files: FileItem[];
}

const FileExplorer: React.FC<FileExplorerProps> = ({ files }) => {
  const { setSelectedFile, selectedFile } = useAppContext();

  const renderFiles = (files: FileItem[], depth = 0) => {
    return files.map((file) => (
      <div key={file.path} className="text-sm">
        <button
          className={`w-full flex items-center py-1.5 px-2 rounded hover:bg-gray-700 cursor-pointer text-left ${
            selectedFile?.path === file.path ? 'bg-gray-700' : ''
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => {
            if (file.type === 'file') {
              setSelectedFile(file);
            }
          }}
        >
          {file.type === 'folder' ? (
            <>
              <ChevronRight size={16} className="text-gray-400 mr-1 flex-shrink-0" />
              <Folder size={16} className="text-yellow-400 mr-2 flex-shrink-0" />
            </>
          ) : (
            <FileText size={16} className="text-blue-400 mr-2 ml-4 flex-shrink-0" />
          )}
          <span className="text-gray-200 truncate">{file.name}</span>
        </button>
        
        {file.type === 'folder' && file.children && renderFiles(file.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold text-white mb-4 px-2">File Explorer</h2>
      
      <div className="flex-1 overflow-auto">
        {files && files.length > 0 ? (
          <div className="space-y-1">
            {renderFiles(files)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
            <Folder size={40} className="mb-2 opacity-50" />
            <p className="text-center">No files generated yet</p>
          </div> 
        )}
      </div>
    </div>
  );
};

export default FileExplorer;