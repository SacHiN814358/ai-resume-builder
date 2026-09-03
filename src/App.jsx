import React, { useState } from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import Navbar from './components/Navbar';
import ResumeEditor from './components/ResumeEditor';
import ResumePreview from './templates/ResumePreview';
import ApiKeyModal from './components/ApiKeyModal';
import { exportToPdf } from './utils/pdfExport';
import { Eye, Edit3 } from 'lucide-react';

function AppContent() {
  const { resumeData, activeTab } = useResume();
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [mobileView, setMobileView] = useState('editor'); // 'editor' | 'preview'

  const handleExportPdf = () => {
    const rawName = resumeData.personalInfo.fullName || 'Candidate';
    const cleanName = rawName.replace(/[^a-zA-Z0-9]/g, '_');
    const docType = activeTab === 'cover-letter' ? 'Cover_Letter' : 'Resume';
    const filename = `${cleanName}_${docType}.pdf`;
    
    exportToPdf({
      elementId: 'resume-export-container',
      filename
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30">
      
      {/* Top Main Navigation */}
      <Navbar 
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onExportPdf={handleExportPdf}
      />

      {/* Mobile Tab Toggle (Editor vs Preview) */}
      <div className="lg:hidden flex items-center justify-center p-2 bg-slate-900 border-b border-slate-800">
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 w-full max-w-xs">
          <button
            onClick={() => setMobileView('editor')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mobileView === 'editor'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            Editor
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mobileView === 'preview'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Live Preview
          </button>
        </div>
      </div>

      {/* Main Workspace: 2-Column Split */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Column: Form Editor (5 cols on large screens) */}
        <div className={`lg:col-span-5 border-r border-slate-800/80 bg-slate-950 flex flex-col ${
          mobileView === 'editor' ? 'block' : 'hidden lg:flex'
        }`}>
          <ResumeEditor />
        </div>

        {/* Right Column: Live Resume Preview (7 cols on large screens) */}
        <div className={`lg:col-span-7 bg-slate-900/50 flex flex-col ${
          mobileView === 'preview' ? 'block' : 'hidden lg:flex'
        }`}>
          <ResumePreview />
        </div>

      </main>

      {/* Gemini API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}
