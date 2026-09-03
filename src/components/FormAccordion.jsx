import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function FormAccordion({ id, title, icon: Icon, activeId, onToggle, children, badge = null }) {
  const isOpen = activeId === id;

  return (
    <div className={`rounded-xl border transition-all duration-150 ${
      isOpen 
        ? 'bg-[#121520] border-indigo-500/40 shadow-xs' 
        : 'bg-[#0f111a] border-zinc-800/80 hover:border-zinc-700/80'
    }`}>
      <button
        type="button"
        onClick={() => onToggle(isOpen ? null : id)}
        className="w-full px-4 py-3 flex items-center justify-between transition-all text-left cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
            isOpen ? 'bg-indigo-600/20 text-indigo-400' : 'bg-zinc-800/60 text-zinc-400'
          }`}>
            {Icon && <Icon className="w-3.5 h-3.5" />}
          </div>
          <span className="text-xs font-semibold text-zinc-200 tracking-tight">{title}</span>
          {badge && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/60 font-medium">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-1 border-t border-zinc-800/60 animate-in fade-in duration-150">
          {children}
        </div>
      )}
    </div>
  );
}
