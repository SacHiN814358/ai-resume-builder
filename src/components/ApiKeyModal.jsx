import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Key, X, ExternalLink, ShieldCheck, Check } from 'lucide-react';

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
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-[#11131f] border border-zinc-800 rounded-2xl w-full max-w-md p-5 shadow-2xl relative text-left">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-100 m-0">Google Gemini API Key</h3>
            <p className="text-xs text-zinc-400 m-0">Enable custom AI model generation</p>
          </div>
        </div>

        {/* Info card */}
        <div className="bg-[#090b12] border border-zinc-800 rounded-xl p-3 mb-4 text-xs text-zinc-300 space-y-2">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="m-0 text-zinc-400">Stored exclusively in your local browser storage (`localStorage`).</p>
          </div>
          <div className="pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-xs font-medium"
            >
              Get Free Gemini API Key <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-1.5 mb-4">
          <label className="text-xs font-medium text-zinc-300">API Key:</label>
          <input
            type="password"
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full px-3 py-2 bg-[#090b12] border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 font-mono transition-all"
          />
          <p className="text-[10px] text-zinc-500">
            *Leave blank to automatically use smart offline resume suggestions.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-xs transition-all cursor-pointer"
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Saved</span>
              </>
            ) : (
              <span>Save Key</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
