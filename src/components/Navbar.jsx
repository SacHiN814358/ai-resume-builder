import React, { useState } from 'react';
import { useResume, THEME_COLORS, TEMPLATES } from '../context/ResumeContext';
import { 
  FileText, 
  Mail, 
  Palette, 
  Layout, 
  Key, 
  RotateCcw, 
  Plus, 
  Check, 
  Upload, 
  Download,
  FileJson,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Navbar({ onOpenApiKeyModal, onExportPdf }) {
  const { 
    activeTab, 
    setActiveTab, 
    selectedTemplate, 
    setSelectedTemplate, 
    themeColor, 
    setThemeColor, 
    apiKey,
    loadSampleData, 
    clearAllData,
    resumeData,
    setResumeData 
  } = useResume();

  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);

  const handleJsonExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resumeData.personalInfo.fullName.replace(/\s+/g, '_') || 'Resume'}_data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleJsonImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.personalInfo) {
          setResumeData(parsed);
          confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
        } else {
          alert('Invalid resume JSON format.');
        }
      } catch {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0e16]/95 backdrop-blur-md border-b border-zinc-800/80 px-4 lg:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Clean Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-xs">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-tight text-zinc-100">
                ResuMate
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                AI
              </span>
            </div>
          </div>
        </div>

        {/* Center: Apple-style Segmented Switcher */}
        <div className="flex items-center bg-[#141724] p-1 rounded-lg border border-zinc-800/80">
          <button
            onClick={() => setActiveTab('resume')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'resume'
                ? 'bg-zinc-800 text-white shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </button>
          <button
            onClick={() => setActiveTab('cover-letter')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'cover-letter'
                ? 'bg-zinc-800 text-white shadow-xs'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Cover Letter
          </button>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center flex-wrap gap-2">
          
          {/* Template Selector Dropdown */}
          {activeTab === 'resume' && (
            <div className="relative">
              <button
                onClick={() => {
                  setShowTemplateDropdown(!showTemplateDropdown);
                  setShowColorDropdown(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900/90 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-all cursor-pointer"
                title="Choose Resume Template"
              >
                <Layout className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">{TEMPLATES.find(t => t.id === selectedTemplate)?.name}</span>
              </button>

              {showTemplateDropdown && (
                <div className="absolute right-0 mt-2 w-60 bg-[#11131f] border border-zinc-800 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="text-[10px] font-semibold text-zinc-400 px-2.5 py-1 uppercase tracking-wider">
                    Layout Template
                  </div>
                  {TEMPLATES.map(tmpl => (
                    <button
                      key={tmpl.id}
                      onClick={() => {
                        setSelectedTemplate(tmpl.id);
                        setShowTemplateDropdown(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg flex items-start justify-between text-xs transition-all ${
                        selectedTemplate === tmpl.id
                          ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30'
                          : 'text-zinc-300 hover:bg-zinc-800/80'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-xs">{tmpl.name}</div>
                        <p className="text-[10px] text-zinc-400 mt-0.5">{tmpl.description}</p>
                      </div>
                      {selectedTemplate === tmpl.id && <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Color Palette Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowColorDropdown(!showColorDropdown);
                setShowTemplateDropdown(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900/90 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-all cursor-pointer"
              title="Theme Color"
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: themeColor.primary }}></span>
              <Palette className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {showColorDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-[#11131f] border border-zinc-800 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="text-[10px] font-semibold text-zinc-400 px-2 py-1 uppercase tracking-wider">
                  Color Theme
                </div>
                <div className="grid grid-cols-2 gap-1 mt-1">
                  {THEME_COLORS.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setThemeColor(c);
                        setShowColorDropdown(false);
                      }}
                      className={`flex items-center gap-1.5 p-1.5 rounded-lg text-xs transition-all ${
                        themeColor.id === c.id
                          ? 'bg-zinc-800 text-white'
                          : 'text-zinc-300 hover:bg-zinc-800/60'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.primary }} />
                      <span className="truncate text-[11px]">{c.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Settings Key */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              apiKey
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
            title="Google Gemini AI Setup"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{apiKey ? 'AI Ready' : 'Gemini Key'}</span>
          </button>

          {/* Quick Menu */}
          <div className="flex items-center bg-zinc-900/90 rounded-lg border border-zinc-800 p-0.5">
            <button
              onClick={loadSampleData}
              className="flex items-center gap-1 px-2 py-1 text-zinc-400 hover:text-zinc-200 text-xs rounded hover:bg-zinc-800 transition-all cursor-pointer"
              title="Reload Sample Data"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden xl:inline text-[11px]">Sample</span>
            </button>
            <label className="p-1 text-zinc-400 hover:text-zinc-200 rounded hover:bg-zinc-800 cursor-pointer transition-all" title="Import JSON">
              <Upload className="w-3.5 h-3.5" />
              <input type="file" accept=".json" onChange={handleJsonImport} className="hidden" />
            </label>
            <button
              onClick={handleJsonExport}
              className="p-1 text-zinc-400 hover:text-zinc-200 rounded hover:bg-zinc-800 transition-all cursor-pointer"
              title="Export JSON"
            >
              <FileJson className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* + New Blank Resume Button */}
          <button
            onClick={() => {
              if (confirm('Start a new blank resume? (You can click "Sample" anytime to load demo data)')) {
                clearAllData();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-300 bg-zinc-800/90 hover:bg-zinc-800 hover:text-white border border-zinc-700/80 rounded-lg transition-all cursor-pointer active:scale-95"
            title="Clear all fields and start a fresh resume"
          >
            <Plus className="w-3.5 h-3.5 text-zinc-400" />
            <span>New Resume</span>
          </button>

          {/* Primary Export PDF Button */}
          <button
            onClick={onExportPdf}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>

        </div>
      </div>
    </header>
  );
}
