import React, { createContext, useContext, useState } from 'react';
import { ExecutionStep, FileStructure, GeneratedWebsite } from '../types';

interface AppContextType {
  website: GeneratedWebsite | null;
  setWebsite: React.Dispatch<React.SetStateAction<GeneratedWebsite | null>>;
  selectedFile: FileStructure | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<FileStructure | null>>;
  activeTab: 'code' | 'preview';
  setActiveTab: React.Dispatch<React.SetStateAction<'code' | 'preview'>>;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [website, setWebsite] = useState<GeneratedWebsite | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileStructure | null>(null);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        website,
        setWebsite,
        selectedFile,
        setSelectedFile,
        activeTab,
        setActiveTab,
        prompt,
        setPrompt,
        isGenerating,
        setIsGenerating,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};