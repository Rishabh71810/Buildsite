export interface FileStructure {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileStructure[];
  content?: string;
  language?: string;
}

export interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress?: number;
}

export interface GeneratedWebsite {
  prompt: string;
  files: FileStructure[];
  steps: ExecutionStep[];
}