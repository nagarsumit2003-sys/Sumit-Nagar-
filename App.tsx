
import React, { useState, useRef, useCallback, useEffect } from 'react';
import CodePanel from './components/CodePanel';
import PreviewPanel from './components/PreviewPanel';
import { DEFAULT_CODE } from './constants';
import type { DimensionPreset, ExportFormat } from './types';
import { SOCIAL_PRESETS, DEVICE_PRESETS } from './constants';

// For TypeScript to recognize the htmlToImage library loaded from CDN
declare const htmlToImage: {
  toSvg: (node: HTMLElement, options?: any) => Promise<string>;
  toPng: (node: HTMLElement, options?: any) => Promise<string>;
  toJpeg: (node: HTMLElement, options?: any) => Promise<string>;
};

// For TypeScript to recognize the jsPDF library loaded from CDN
declare const jspdf: {
  jsPDF: new (options?: any) => any;
};

const App: React.FC = () => {
  const [code, setCode] = useState<string>(DEFAULT_CODE);
  const [width, setWidth] = useState<number>(1080);
  const [height, setHeight] = useState<number>(1080);
  const [activePresetName, setActivePresetName] = useState<string>(SOCIAL_PRESETS[0].name);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('svg');
  const [jpegQuality, setJpegQuality] = useState<number>(95);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('Ready to export.');

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const allPresets = [...SOCIAL_PRESETS, ...DEVICE_PRESETS];
    const matchingPreset = allPresets.find(p => p.width === width && p.height === height);
    setActivePresetName(matchingPreset ? matchingPreset.name : 'Custom');
  }, [width, height]);

  const handlePresetChange = (preset: DimensionPreset) => {
    setWidth(preset.width);
    setHeight(preset.height);
  };

  const handleExport = useCallback(async () => {
    if (!iframeRef.current?.contentWindow?.document.body) {
      setStatus('Error: Preview content is not available.');
      return;
    }
    
    setIsLoading(true);
    setStatus(`Generating ${exportFormat.toUpperCase()}...`);

    const nodeToCapture = iframeRef.current.contentWindow.document.body;
    const originalMargin = nodeToCapture.style.margin;
    nodeToCapture.style.margin = '0';

    const options = {
      width: width,
      height: height,
      quality: 1.0,
    };

    try {
      if (exportFormat === 'pdf') {
        const pngDataUrl = await htmlToImage.toPng(nodeToCapture, options);
        const orientation = width > height ? 'l' : 'p';
        const pdf = new jspdf.jsPDF({ orientation, unit: 'px', format: [width, height] });
        pdf.addImage(pngDataUrl, 'PNG', 0, 0, width, height);
        pdf.save('export.pdf');
        setStatus('PDF downloaded successfully!');
      } else {
        let dataUrl: string;
        let filename: string;

        switch (exportFormat) {
          case 'png':
            dataUrl = await htmlToImage.toPng(nodeToCapture, options);
            filename = 'export.png';
            break;
          case 'jpg':
            dataUrl = await htmlToImage.toJpeg(nodeToCapture, { ...options, quality: jpegQuality / 100 });
            filename = 'export.jpg';
            break;
          case 'svg':
          default:
            dataUrl = await htmlToImage.toSvg(nodeToCapture, options);
            filename = 'export.svg';
            break;
        }

        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
        setStatus(`${exportFormat.toUpperCase()} downloaded successfully!`);
      }
    } catch (error) {
      console.error('oops, something went wrong!', error);
      setStatus(`Error: Could not generate ${exportFormat.toUpperCase()}.`);
    } finally {
      nodeToCapture.style.margin = originalMargin;
      setIsLoading(false);
    }
  }, [width, height, exportFormat, jpegQuality]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col p-4 font-sans">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
          Code to Image Generator
        </h1>
        <p className="text-gray-400 mt-2">Paste your code, see it live, and export it as an SVG, PNG, JPG, or PDF.</p>
      </header>
      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
        <CodePanel
          code={code}
          setCode={setCode}
        />
        <PreviewPanel
          code={code}
          width={width}
          height={height}
          setWidth={setWidth}
          setHeight={setHeight}
          socialPresets={SOCIAL_PRESETS}
          devicePresets={DEVICE_PRESETS}
          onPresetChange={handlePresetChange}
          onExport={handleExport}
          isLoading={isLoading}
          status={status}
          iframeRef={iframeRef}
          exportFormat={exportFormat}
          setExportFormat={setExportFormat}
          jpegQuality={jpegQuality}
          setJpegQuality={setJpegQuality}
          activePresetName={activePresetName}
        />
      </main>
    </div>
  );
};

export default App;
