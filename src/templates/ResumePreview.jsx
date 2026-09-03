import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import ModernTemplate from './ModernTemplate';
import AtsTemplate from './AtsTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import CoverLetterTemplate from './CoverLetterTemplate';
import { ZoomIn, ZoomOut, Maximize2, RotateCw } from 'lucide-react';

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
    <div className="flex flex-col h-full">
      
      {/* Top Preview Controls Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-300">
            Live Preview • {activeTab === 'resume' ? `${selectedTemplate.toUpperCase()} Template` : 'Cover Letter'}
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.max(prev - 10, 60))}
            className="p-1 hover:text-white rounded hover:bg-slate-800 transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] w-9 text-center text-slate-300">{zoomLevel}%</span>
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.min(prev + 10, 140))}
            className="p-1 hover:text-white rounded hover:bg-slate-800 transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(100)}
            className="p-1 hover:text-white rounded hover:bg-slate-800 transition-all"
            title="Reset Zoom (100%)"
          >
            <RotateCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Preview Scrollable Canvas Area */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center bg-slate-950/80 items-start">
        <div 
          className="transition-transform duration-150 origin-top shadow-2xl rounded-lg overflow-hidden bg-white max-w-[800px] w-full"
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
