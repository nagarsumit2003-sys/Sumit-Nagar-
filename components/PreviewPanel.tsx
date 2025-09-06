import React, { useState } from 'react';
import type { DimensionPreset, ExportFormat } from '../types';
import FullScreenPreview from './FullScreenPreview';

interface PreviewPanelProps {
  code: string;
  width: number;
  height: number;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  socialPresets: DimensionPreset[];
  devicePresets: DimensionPreset[];
  onPresetChange: (preset: DimensionPreset) => void;
  onExport: () => void;
  isLoading: boolean;
  status: string;
  iframeRef: React.RefObject<HTMLIFrameElement>;
  exportFormat: ExportFormat;
  setExportFormat: (format: ExportFormat) => void;
  jpegQuality: number;
  setJpegQuality: (quality: number) => void;
  activePresetName: string;
}

const LoadingSpinner: React.FC = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const ExpandIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5v4m0 0h4" />
    </svg>
);


const PreviewPanel: React.FC<PreviewPanelProps> = ({
  code,
  width,
  height,
  setWidth,
  setHeight,
  socialPresets,
  devicePresets,
  onPresetChange,
  onExport,
  isLoading,
  status,
  iframeRef,
  exportFormat,
  setExportFormat,
  jpegQuality,
  setJpegQuality,
  activePresetName,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="relative bg-dots-pattern flex-grow flex items-center justify-center p-4 rounded-md bg-gray-900/50 min-h-[300px]">
          <button
            onClick={() => setIsExpanded(true)}
            className="absolute top-2 right-2 z-10 p-2 bg-gray-700/50 rounded-full text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
            aria-label="Expand preview"
          >
            <ExpandIcon />
          </button>
          <div 
              className="shadow-2xl overflow-auto bg-white cursor-grab"
              style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%', maxHeight: '50vh', resize: 'both' }}
          >
            <iframe
              ref={iframeRef}
              title="preview"
              sandbox="allow-scripts allow-same-origin"
              srcDoc={code}
              className="w-full h-full border-0"
              style={{ width: `${width}px`, height: `${height}px` }}
            />
          </div>
        </div>
        
        <div className="bg-gray-700/50 p-4 rounded-lg flex flex-col gap-6">
          <div>
              <h3 className="text-lg font-semibold mb-3">Dimensions</h3>
              
              <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="width-input" className="font-medium text-gray-400">W:</label>
                  <input
                      id="width-input"
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(parseInt(e.target.value, 10) || 0)}
                      className="w-20 p-2 bg-gray-800 border border-gray-600 rounded-md text-center"
                      aria-label="Width"
                  />
                  <span className="text-gray-400">×</span>
                  <label htmlFor="height-input" className="font-medium text-gray-400">H:</label>
                  <input
                      id="height-input"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value, 10) || 0)}
                      className="w-20 p-2 bg-gray-800 border border-gray-600 rounded-md text-center"
                      aria-label="Height"
                  />
                </div>
                <div className="flex-grow"></div>
                <button
                  key="custom"
                  className={`px-3 py-2 rounded-md text-sm transition-colors cursor-default ${
                      activePresetName === 'Custom'
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-gray-600 text-gray-400'
                  }`}
                  aria-pressed={activePresetName === 'Custom'}
                  aria-label="Custom dimensions are currently active"
                >
                    Custom
                </button>
              </div>

              <h4 className="text-sm font-semibold mb-2 text-gray-400">Device Views</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {devicePresets.map((preset) => (
                    <button
                    key={preset.name}
                    onClick={() => onPresetChange(preset)}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${
                      activePresetName === preset.name
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-600 hover:bg-indigo-600'
                    }`}
                    aria-pressed={activePresetName === preset.name}
                    aria-label={`Set dimensions to ${preset.name} (${preset.width} by ${preset.height})`}
                    >
                    {preset.name}
                    </button>
                ))}
              </div>
              
              <h4 className="text-sm font-semibold mb-2 text-gray-400">Social Media</h4>
              <div className="flex flex-wrap gap-2 mb-4">
              {socialPresets.map((preset) => (
                  <button
                  key={preset.name}
                  onClick={() => onPresetChange(preset)}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    activePresetName === preset.name
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-600 hover:bg-indigo-600'
                  }`}
                  aria-pressed={activePresetName === preset.name}
                  aria-label={`Set dimensions to ${preset.name} (${preset.width} by ${preset.height})`}
                  >
                  {preset.name}
                  </button>
              ))}
              </div>
          </div>

          <div className="border-t border-gray-600 pt-4">
               <h3 className="text-lg font-semibold mb-3">Export Settings</h3>
               <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-400 mb-2" id="export-format-label">Format</label>
                  <div className="flex flex-wrap gap-2" role="group" aria-labelledby="export-format-label">
                      {(['svg', 'png', 'jpg', 'pdf'] as ExportFormat[]).map(format => (
                      <button
                          key={format}
                          onClick={() => setExportFormat(format)}
                          className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                          exportFormat === format 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-gray-600 hover:bg-gray-500'
                          }`}
                      >
                          {format.toUpperCase()}
                      </button>
                      ))}
                  </div>
              </div>

              {exportFormat === 'jpg' && (
                  <div className="mb-4">
                      <label htmlFor="quality" className="flex justify-between text-sm font-medium text-gray-400 mb-2">
                      <span>Quality</span>
                      <span>{jpegQuality}</span>
                      </label>
                      <input
                      id="quality"
                      type="range"
                      min="1"
                      max="100"
                      value={jpegQuality}
                      onChange={(e) => setJpegQuality(parseInt(e.target.value, 10))}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                  </div>
              )}

              <div>
                  <button
                      onClick={onExport}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                      {isLoading ? <LoadingSpinner /> : null}
                      {isLoading ? 'Exporting...' : `Export to ${exportFormat.toUpperCase()}`}
                  </button>
                  <p className="text-center text-sm text-gray-400 mt-2 h-5" role="status">{status}</p>
              </div>
          </div>
        </div>
      </div>
      {isExpanded && (
        <FullScreenPreview
          code={code}
          width={width}
          height={height}
          onClose={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default PreviewPanel;