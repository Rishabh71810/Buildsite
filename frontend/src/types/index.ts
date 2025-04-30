export interface FileItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
  content?: string;
  path: string;
}
export enum StepType{
  CreateFile,
  CreateFolder,
  EditFile,
  DeleteFile,
  RunScript 
}

export interface Step {
  id: string | number;
  title: string;
  description: string;
  type:StepType;
  status: 'pending' | 'processing' | 'completed' | 'error';
  code?: string;
  path?: string;
}

export interface GeneratedWebsite {
  prompt: string;
  files: FileItem[];
  steps: Step[];
}



