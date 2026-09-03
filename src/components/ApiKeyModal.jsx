import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Key, Sparkles, X, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose }) {
  const { apiKey, setApiKey } = useResume();
  const [tempKey, setTempKey] = useState(apiKey || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiKey(tempKey.trim());
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-left">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Sparkles className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white m-0">Google Gemini API Key</h3>
            <p className="text-xs text-slate-400 m-0">Supercharge resume bullets & cover letters</p>
          </div>
        </div>

        {/* Info card */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3.5 mb-4 text-xs text-slate-300 space-y-2">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="m-0">Your API key is stored <strong>locally in your browser</strong> (`localStorage`) and is never transmitted to any third-party server.</p>
          </div>
          <p className="m-0 text-slate-400">
            Don't have a key? Get a free API key in 30 seconds from Google AI Studio.
          </p>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium underline"
          >
            Get Free Gemini API Key <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Input */}
        <div className="space-y-2 mb-5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-slate-400" /> Enter Gemini API Key:
          </label>
          <input
            type="password"
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono transition-all"
          />
          <p className="text-[11px] text-slate-500">
            *Tip: If left blank, the app will automatically use smart offline AI templates.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save & Activate</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
