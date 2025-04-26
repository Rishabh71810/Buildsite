import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

const WebsitePreview: React.FC = () => {
  const { website } = useAppContext();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!website || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
    
    if (!iframeDocument) return;

    // Create a bundle of all files for the preview
    const htmlFile = website.files.find(file => file.path === '/index.html');
    const cssFile = website.files.find(file => file.path === '/style.css');
    const jsFile = website.files.find(file => file.path === '/script.js');

    // Write the base HTML
    iframeDocument.open();
    iframeDocument.write(htmlFile?.content || '<html><body><h1>Preview not available</h1></body></html>');
    iframeDocument.close();

    // Inject CSS if available
    if (cssFile?.content) {
      const style = iframeDocument.createElement('style');
      style.textContent = cssFile.content;
      iframeDocument.head.appendChild(style);
    }

    // Inject JS if available
    if (jsFile?.content) {
      const script = iframeDocument.createElement('script');
      script.textContent = jsFile.content;
      iframeDocument.body.appendChild(script);
    }
  }, [website]);

  return (
    <div className="h-full w-full bg-white">
      <iframe
        ref={iframeRef}
        title="Website Preview"
        className="w-full h-full border-0"
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default WebsitePreview;