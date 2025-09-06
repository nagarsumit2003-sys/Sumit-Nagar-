
import React from 'react';

interface CodePanelProps {
  code: string;
  setCode: (code: string) => void;
}

const CodePanel: React.FC<CodePanelProps> = ({ code, setCode }) => {
  return (
    <div className="flex flex-col gap-4 bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex-1 flex flex-col">
        <label htmlFor="code-input" className="text-sm font-semibold mb-2 text-gray-400">HTML & CSS Code</label>
        <textarea
          id="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 w-full p-3 bg-gray-900 border border-gray-700 rounded-md resize-none font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          spellCheck="false"
          aria-label="HTML and CSS code editor"
        />
      </div>
    </div>
  );
};

export default CodePanel;
