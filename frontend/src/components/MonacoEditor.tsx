import React from 'react';
import Editor from '@monaco-editor/react';
import { FileStructure } from '../types';

interface MonacoEditorProps {
  file: FileStructure | null;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ file }) => {
  const getLanguage = (file: FileStructure) => {
    if (file.language) return file.language;
    
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'jsx':
        return 'javascript';
      case 'tsx':
        return 'typescript';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      case 'svg':
        return 'xml';
      default:
        return 'plaintext';
    }
  };

  if (!file) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-800 text-gray-400">
        <p>Select a file to view its content</p>
      </div>
    );
  }

  if (file.type !== 'file') {
    return (
      <div className="flex items-center justify-center h-full bg-gray-800 text-gray-400">
        <p>Cannot display content for directories</p>
      </div>
    );
  }

  return (
    <Editor
      height="100%"
      language={getLanguage(file)}
      value={file.content || ''}
      theme="vs-dark"
      options={{
        readOnly: true,
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        fontSize: 14,
        wordWrap: 'on',
        contextmenu: false,
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        automaticLayout: true,
      }}
    />
  );
};

export default MonacoEditor;