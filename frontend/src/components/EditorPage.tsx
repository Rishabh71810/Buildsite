import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Code, Eye, ArrowLeft, Send, Download } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ExecutionProgress from './ExecutionProgress';
import FileExplorer from './FileExplorer';
import MonacoEditor from './MonacoEditor';
import { PreviewFrame } from './WebsitePreview'; 
import {Loader} from './Loader';
import JSZip from 'jszip';
// import { simulateWebsiteGeneration } from '../utils/mockData';
import { Step, StepType } from '../types';
import { BACKEND_URL } from '../utils/config';
import axios from 'axios';
import { parseXml } from '../utils/steps';
import { FileItem } from '../types';
import { useWebContainer } from '../hooks/useWebContainer';
import { FileNode } from '@webcontainer/api';
const EditorPage: React.FC = () => {
  const { 
    selectedFile, 
    activeTab, 
    setActiveTab,
  } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Add protection for missing state/prompt
  const prompt = location.state?.prompt;
  const [steps, setSteps] = useState<Step[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [templateSet, setTemplateSet] = useState(false);
  const webContainer  = useWebContainer();
  const [userPrompt, setPrompt] = useState("");
  const [llmMessages, setLlmMessages] = useState<{role: "user" | "assistant", content: string;}[]>([]);

  // Redirect if no prompt is present
  useEffect(() => {
    if (!prompt) {
      navigate('/');
    }
  }, [prompt, navigate]);

  useEffect(() => {
    let originalFiles = [...files];
    let updateHappened = false;
    steps.filter(({status}) => status === "pending").map(step => {
      updateHappened = true;
      if (step?.type === StepType.CreateFile) {
        let parsedPath = step.path?.split("/") ?? []; // ["src", "components", "App.tsx"]
        let currentFileStructure = [...originalFiles]; // {}
        let finalAnswerRef = currentFileStructure;
  
        let currentFolder = ""
        while(parsedPath.length) {
          currentFolder =  `${currentFolder}/${parsedPath[0]}`;
          let currentFolderName = parsedPath[0];
          parsedPath = parsedPath.slice(1);
  
          if (!parsedPath.length) {
            // final file
            let file = currentFileStructure.find(x => x.path === currentFolder)
            if (!file) {
              currentFileStructure.push({
                name: currentFolderName,
                type: 'file',
                path: currentFolder,
                content: step.code
              })
            } else {
              file.content = step.code;
            }
            webContainer?.mount({
              [currentFolder]:{
                file:{
                  contents: step.code
                }
              } as FileNode
            });
          } else {
            /// in a folder
            let folder = currentFileStructure.find(x => x.path === currentFolder)
            if (!folder) {
              // create the folder
              currentFileStructure.push({
                name: currentFolderName,
                type: 'folder',
                path: currentFolder,
                children: []
              })
            }
   
            currentFileStructure = currentFileStructure.find(x => x.path === currentFolder)!.children!;
          }
        }
        originalFiles = finalAnswerRef;
      }

    })

    if (updateHappened) {

      setFiles(originalFiles)
      setSteps(steps => steps.map((s: Step) => {
        return {
          ...s,
          status: "completed"
        }
        
      }))
    }
    console.log(files);
  }, [steps, files]);


  useEffect(() => {
    const createMountStructure = (files: FileItem[]): Record<string, any> => {
      const mountStructure: Record<string, any> = {};
  
      const processFile = (file: FileItem, isRootFolder: boolean) => {  
        if (file.type === 'folder') {
          // For folders, create a directory entry
          mountStructure[file.name] = {
            directory: file.children ? 
              Object.fromEntries(
                file.children.map(child => [child.name, processFile(child, false)])
              ) 
              : {}
          };
        } else if (file.type === 'file') {
          if (isRootFolder) {
            mountStructure[file.name] = {
              file: {
                contents: file.content || ''
              }
            };
          } else {
            // For files, create a file entry with contents
            return {
              file: {
                contents: file.content || ''
              }
            };
          }
        }
  
        return mountStructure[file.name];
      };
  
      // Process each top-level file/folder
      files.forEach(file => processFile(file, true));
  
      return mountStructure;
    };
  
    const mountStructure = createMountStructure(files);
  
    // Mount the structure if WebContainer is available
    console.log(mountStructure);
    webContainer?.mount(mountStructure);
  }, [files, webContainer]);


  async function init() {
    const response = await axios.post(`${BACKEND_URL}/template`, {
      prompt: prompt.trim()
    });
    setTemplateSet(true);
    
    const {prompts, uiPrompts} = response.data;

    setSteps(parseXml(uiPrompts[0]).map((x: Step) => ({
      ...x,
      status: "pending"
    })));

    setLoading(true);
    const stepsResponse = await axios.post(`${BACKEND_URL}/chat`, {
      messages: [...prompts, prompt].map(content => ({
        role: "user",
        content
      }))
    })

    setLoading(false);

    setSteps(s => [...s, ...parseXml(stepsResponse.data.response).map(x => ({
      ...x,
      status: "pending" as "pending"
    }))]);

    setLlmMessages([...prompts, prompt].map(content => ({
      role: "user",
      content
    })));

    setLlmMessages(x => [...x, {role: "assistant", content: stepsResponse.data.response}])
  }

  useEffect(() => {
    init();
  }, [])


  // Function to download all files as a ZIP
  const downloadProjectAsZip = async () => {
    try {
      const zip = new JSZip();
      
      // Helper function to recursively add files to zip
      const addFilesToZip = (items: FileItem[], folderPath = '') => {
        items.forEach(item => {
          const itemPath = folderPath ? `${folderPath}/${item.name}` : item.name;
          
          if (item.type === 'file') {
            // Add file to zip
            zip.file(itemPath, item.content || '');
          } else if (item.type === 'folder' && item.children) {
            // Recursively add folder contents
            addFilesToZip(item.children, itemPath);
          }
        });
      };
      
      // Add all files to the zip
      addFilesToZip(files);
      
      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      // Create a download link and trigger download
      const downloadUrl = URL.createObjectURL(zipBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadUrl;
      downloadLink.download = 'project-files.zip';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Clean up the URL object
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error creating ZIP file:', error);
      alert('Failed to download files. Please try again.');
    }
  };

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
                BuilderSite.ai
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadProjectAsZip}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md flex items-center gap-1 text-sm font-medium transition-colors"
              title="Download project files as ZIP"
            >
              <Download size={16} />
              <span>Download ZIP</span>
            </motion.button>
            
            <div className="text-gray-300 text-sm">
              <span className="mr-2">Prompt:</span>
              <span className="font-medium italic">{prompt}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel - Execution Progress */}
        <div className="w-1/3 p-4 border-r border-gray-700 overflow-auto">
          <ExecutionProgress steps={steps} />
          <div className='mt-6'>
            {(loading || !templateSet) && <Loader />}
            {!(loading || !templateSet) && (
              <div className='space-y-4'>
                <textarea 
                  value={userPrompt} 
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask me to modify the website..."
                  className='w-full min-h-[100px] bg-gray-800 text-white p-4 rounded-xl border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none placeholder-gray-400'
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={async () => {
                    if (!userPrompt.trim()) return;
                    
                    const newMessage = {
                      role: "user" as "user",
                      content: userPrompt
                    };

                    setLoading(true);
                    const stepsResponse = await axios.post(`${BACKEND_URL}/chat`, {
                      messages: [...llmMessages, newMessage]
                    });
                    setLoading(false);

                    setLlmMessages(x => [...x, newMessage]);
                    setLlmMessages(x => [...x, {
                      role: "assistant",
                      content: stepsResponse.data.response
                    }]);
                    
                    setSteps(s => [...s, ...parseXml(stepsResponse.data.response).map(x => ({
                      ...x,
                      status: "pending" as "pending"
                    }))]);

                    setPrompt('');
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-70 shadow-lg"
                >
                  <Send size={18} />
                  Send Instructions
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Right panel - File Explorer and Editor/Preview */}
        <div className="w-2/3 flex flex-col overflow-hidden">
          <div className="flex-1 flex">
            {/* File Explorer */}
            <div className="w-1/4 p-4 border-r border-gray-700 overflow-auto">
              <FileExplorer files={files} />
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
                ) : webContainer ? (
                  <PreviewFrame webContainer={webContainer} files={files}/>
                ) : (
                  <div>Loading...</div>
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