import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function FormAccordion({ id, title, icon: Icon, activeId, onToggle, children, badge = null }) {
  const isOpen = activeId === id;

  return (
    <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl overflow-hidden transition-all shadow-md">
      <button
        type="button"
        onClick={() => onToggle(isOpen ? null : id)}
        className="w-full px-5 py-4 flex items-center justify-between bg-slate-900/40 hover:bg-slate-800/50 transition-all text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center text-indigo-400">
            {Icon && <Icon className="w-4 h-4" />}
          </div>
          <span className="text-sm font-bold text-white tracking-wide">{title}</span>
          {badge && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
      </button>

      {isOpen && (
        <div className="p-5 border-t border-slate-800/80 bg-slate-950/40 animate-in fade-in duration-200">
          {children}
        </div>
      )}
    </div>
  );
}
