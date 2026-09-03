import React, { useState } from 'react';
import { useResume, THEME_COLORS, TEMPLATES } from '../context/ResumeContext';
import { 
  Sparkles, 
  Download, 
  FileText, 
  Mail, 
  Palette, 
  Layout, 
  Key, 
  RotateCcw, 
  Trash2, 
  Check, 
  Upload, 
  FileSpreadsheet 
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
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
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
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white m-0 flex items-center gap-1.5">
                ResuMate <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AI</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                Pro
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block m-0 text-left">ATS-Optimized Resume & Cover Letter Engine</p>
          </div>
        </div>

        {/* Center: Mode Tabs (Resume vs Cover Letter) */}
        <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          <button
            onClick={() => setActiveTab('resume')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'resume'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </button>
          <button
            onClick={() => setActiveTab('cover-letter')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'cover-letter'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Cover Letter
          </button>
        </div>

        {/* Right: Controls (Template, Theme, API Key, Export) */}
        <div className="flex items-center flex-wrap gap-2">
          
          {/* Template Selector Dropdown (for Resume) */}
          {activeTab === 'resume' && (
            <div className="relative">
              <button
                onClick={() => {
                  setShowTemplateDropdown(!showTemplateDropdown);
                  setShowColorDropdown(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition-all"
                title="Choose Resume Template"
              >
                <Layout className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden md:inline">{TEMPLATES.find(t => t.id === selectedTemplate)?.name}</span>
              </button>

              {showTemplateDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    Select Layout Template
                  </div>
                  {TEMPLATES.map(tmpl => (
                    <button
                      key={tmpl.id}
                      onClick={() => {
                        setSelectedTemplate(tmpl.id);
                        setShowTemplateDropdown(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-lg flex items-start justify-between text-xs transition-all ${
                        selectedTemplate === tmpl.id
                          ? 'bg-indigo-600/20 border border-indigo-500/40 text-white'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-semibold flex items-center gap-1.5">
                          {tmpl.name}
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300">{tmpl.badge}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">{tmpl.description}</p>
                      </div>
                      {selectedTemplate === tmpl.id && <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Color Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowColorDropdown(!showColorDropdown);
                setShowTemplateDropdown(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition-all"
              title="Theme Color Palette"
            >
              <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: themeColor.primary }}></span>
              <Palette className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showColorDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                  Color Themes
                </div>
                <div className="grid grid-cols-2 gap-1.5 mt-1">
                  {THEME_COLORS.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setThemeColor(c);
                        setShowColorDropdown(false);
                      }}
                      className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-all ${
                        themeColor.id === c.id
                          ? 'bg-slate-800 border border-slate-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: c.primary }} />
                      <span className="truncate text-[11px]">{c.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              apiKey
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
            }`}
            title="Google Gemini AI Key Setup"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{apiKey ? 'AI Active' : 'Set Gemini Key'}</span>
          </button>

          {/* Quick Actions Menu (Load sample, Import, Export JSON) */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700/60">
            <button
              onClick={loadSampleData}
              className="flex items-center gap-1 px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded text-xs transition-all"
              title="Load Sample / Demo Data"
            >
              <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden xl:inline text-[11px]">Sample Data</span>
            </button>
            <label className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded cursor-pointer transition-all" title="Import JSON Backup">
              <Upload className="w-3.5 h-3.5" />
              <input type="file" accept=".json" onChange={handleJsonImport} className="hidden" />
            </label>
            <button
              onClick={handleJsonExport}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-all"
              title="Backup Resume as JSON"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* + New Blank Resume Button */}
          <button
            onClick={() => {
              if (confirm('Start a fresh new blank resume? (You can always click "Sample Data" to restore demo content)')) {
                clearAllData();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg transition-all cursor-pointer"
            title="Clear all fields and start a fresh resume"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>+ New Resume</span>
          </button>

          {/* Export PDF Button */}
          <button
            onClick={onExportPdf}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>

        </div>
      </div>
    </header>
  );
}
