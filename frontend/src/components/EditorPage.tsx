import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Eye, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ExecutionProgress from './ExecutionProgress';
import FileExplorer from './FileExplorer';
import MonacoEditor from './MonacoEditor';
import WebsitePreview from './WebsitePreview';
// import { simulateWebsiteGeneration } from '../utils/mockData';
import { Step } from '../types';
import { BACKEND_URL } from '../utils/config';
import axios from 'axios';
import { parseXml } from '../utils/steps';
const EditorPage: React.FC = () => {
  const { 
    prompt, 
    // setWebsite, 
    website, 
    selectedFile, 
    activeTab, 
    setActiveTab,
    // isGenerating,
    // setIsGenerating
  } = useAppContext();
  const [steps, setSteps] = useState<Step[]>([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // If no prompt, redirect back to landing page
  //   if (!prompt) {
  //     navigate('/');
  //     return;
  //   }

  //   // Start the generation process
  //   setIsGenerating(true);
  //   simulateWebsiteGeneration(
  //     prompt,
  //     (updatedSteps) => {
  //       setSteps(updatedSteps);
  //     },
  //     (generatedWebsite) => {
  //       setWebsite(generatedWebsite);
  //       setIsGenerating(false);
  //     }
  //   );
  // }, [prompt, navigate, setWebsite, setIsGenerating]);

  async function init(){
    const response = await axios.post(`${BACKEND_URL}/template`,{
      prompt:prompt.trim()
    });

    const {prompts,uiPrompts}=response.data;

    setSteps(parseXml(uiPrompts[0]));

    const stepsResponse = await axios.post(`${BACKEND_URL}/chat`,{
      messages:[...prompts,prompt].map(content=>({
        role:"user",
        content
      }))
    })
  }

  useEffect(()=>{
    init();
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg border-b border-gray-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="text-gray-300 hover:text-white flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </motion.button>
            <div className="h-5 w-px bg-gray-700 mx-2"></div>
            <div className="flex items-center gap-2">
              <Code size={20} className="text-blue-400" />
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                WebsiteBuilder.ai
              </h1>
            </div>
          </div>
          
          <div className="text-gray-300 text-sm">
            <span className="mr-2">Prompt:</span>
            <span className="font-medium italic">{prompt}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel - Execution Progress */}
        <div className="w-1/3 p-4 border-r border-gray-700 overflow-auto">
          <ExecutionProgress steps={steps} />
        </div>

        {/* Right panel - File Explorer and Editor/Preview */}
        <div className="w-2/3 flex flex-col overflow-hidden">
          <div className="flex-1 flex">
            {/* File Explorer */}
            <div className="w-1/4 p-4 border-r border-gray-700 overflow-auto">
              <FileExplorer files={website?.files || []} />
            </div>

            {/* Editor/Preview Panel */}
            <div className="w-3/4 flex flex-col overflow-hidden">
              {/* Tabs */}
              <div className="flex bg-gray-800 border-b border-gray-700">
                <button
                  className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
                    activeTab === 'code'
                      ? 'text-white border-b-2 border-blue-500'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab('code')}
                >
                  <Code size={16} />
                  Code
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
                    activeTab === 'preview'
                      ? 'text-white border-b-2 border-blue-500'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab('preview')}
                >
                  <Eye size={16} />
                  Preview
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden">
                {activeTab === 'code' ? (
                  <MonacoEditor file={selectedFile} />
                ) : (
                  <WebsitePreview />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;