import { WebContainer } from '@webcontainer/api';
import { useEffect, useState, useCallback } from 'react';

interface PreviewFrameProps {
  files: any[];
  webContainer: WebContainer;
}
 
export function PreviewFrame({ files, webContainer }: PreviewFrameProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const startDevServer = useCallback(async () => {
    if (!webContainer || files.length === 0) return;

    try {
      setLoading(true);
      setError(null);
      
      // Install dependencies
      console.log('Installing dependencies...');
      const installProcess = await webContainer.spawn('npm', ['install']);
      
      // Stream the install output
      installProcess.output.pipeTo(new WritableStream({
        write(data) {
          console.log('Install output:', data);
        }
      }));

      // Wait for install to complete
      const installExitCode = await installProcess.exit;
      
      if (installExitCode !== 0) {
        throw new Error('Installation failed');
      }
      
      console.log('Dependencies installed successfully');

      // Kill any existing dev server process
      try {
        await webContainer.spawn('pkill', ['-f', 'vite']);
      } catch (e) {
        // Ignore errors here as the process might not exist
      }

      // Start the dev server
      console.log('Starting dev server...');
      const devProcess = await webContainer.spawn('npm', ['run', 'dev']);
      
      // Stream the server output
      devProcess.output.pipeTo(new WritableStream({
        write(data) {
          console.log('Server output:', data);
          // Check if the output contains a URL
          if (data.includes('Local:')) {
            const matches = data.match(/Local:\s*(http:\/\/localhost:[0-9]+)/);
            if (matches && matches[1]) {
              setUrl(matches[1]);
              setLoading(false);
            }
          }
        }
      }));

      // Listen for server-ready event as a backup
      webContainer.on('server-ready', (port, serverUrl) => {
        console.log('Server ready event received:', { port, serverUrl });
        setUrl(serverUrl);
        setLoading(false);
      });

    } catch (error) {
      console.error('Error starting server:', error);
      setError(error instanceof Error ? error.message : 'Failed to start development server');
      setLoading(false);
    }
  }, [webContainer, files]);

  // Start the server when component mounts or when dependencies change
  useEffect(() => {
    startDevServer();

    // Cleanup function
    return () => {
      // Try to kill the dev server when component unmounts
      if (webContainer) {
        webContainer.spawn('pkill', ['-f', 'vite']).catch(() => {
          // Ignore errors during cleanup
        });
      }
    };
  }, [startDevServer]);

  return (
    <div className="h-full flex items-center justify-center bg-gray-900">
      {loading && (
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-t-2 border-blue-500 border-solid rounded-full animate-spin mx-auto"/>
          <p className="text-gray-400">Starting development server...</p>
        </div>
      )}
      {error && (
        <div className="text-center text-red-500 p-4">
          <p>Error: {error}</p>
          <button 
            onClick={startDevServer}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      )}
      {!loading && !error && url && (
        <iframe 
          className="w-full h-full border-none" 
          src={url}
          title="Website Preview"
        />
      )}
    </div>
  );
}