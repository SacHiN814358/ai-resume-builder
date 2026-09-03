import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import ModernTemplate from './ModernTemplate';
import AtsTemplate from './AtsTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import CoverLetterTemplate from './CoverLetterTemplate';
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

export default function ResumePreview() {
  const { resumeData, coverLetter, activeTab, selectedTemplate, themeColor } = useResume();
  const [zoomLevel, setZoomLevel] = useState(100);

  const renderTemplate = () => {
    if (activeTab === 'cover-letter') {
      return <CoverLetterTemplate data={resumeData} coverLetter={coverLetter} theme={themeColor} />;
    }

    switch (selectedTemplate) {
      case 'ats':
        return <AtsTemplate data={resumeData} theme={themeColor} />;
      case 'executive':
        return <ExecutiveTemplate data={resumeData} theme={themeColor} />;
      case 'modern':
      default:
        return <ModernTemplate data={resumeData} theme={themeColor} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#07080d]">
      
      {/* Sleek Canvas Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0c0e16] border-b border-zinc-800/80 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="font-medium text-zinc-300 text-[11px] uppercase tracking-wider">
            {activeTab === 'resume' ? `${selectedTemplate} Layout` : 'Cover Letter'}
          </span>
        </div>

        {/* Minimal Zoom Controls */}
        <div className="flex items-center gap-1 bg-[#141724] px-1.5 py-0.5 rounded-md border border-zinc-800">
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.max(prev - 10, 60))}
            className="p-1 hover:text-white rounded hover:bg-zinc-800 transition-all cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3 h-3" />
          </button>
          <span className="font-mono text-[10px] w-8 text-center text-zinc-300">{zoomLevel}%</span>
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.min(prev + 10, 140))}
            className="p-1 hover:text-white rounded hover:bg-zinc-800 transition-all cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(100)}
            className="p-1 hover:text-white rounded hover:bg-zinc-800 transition-all cursor-pointer"
            title="Reset Zoom"
          >
            <RotateCw className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* Canvas Paper Container */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center items-start">
        <div 
          className="transition-transform duration-150 origin-top shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-sm overflow-hidden bg-white max-w-[800px] w-full"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          <div id="resume-export-container">
            {renderTemplate()}
          </div>
        </div>
      </div>

    </div>
  );
}
