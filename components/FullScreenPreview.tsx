import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface FullScreenPreviewProps {
  code: string;
  width: number;
  height: number;
  onClose: () => void;
}

const FullScreenPreview: React.FC<FullScreenPreviewProps> = ({ code, width, height, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-8 overflow-auto"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl font-bold z-50 hover:text-gray-300 transition-colors"
        aria-label="Close full screen preview"
      >
        &times;
      </button>
      <div 
        className="bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking on the iframe container
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <iframe
          title="full-screen-preview"
          srcDoc={code}
          sandbox="allow-scripts"
          className="w-full h-full border-0"
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      </div>
    </div>,
    document.body
  );
};

export default FullScreenPreview;
