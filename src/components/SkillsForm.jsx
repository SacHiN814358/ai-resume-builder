import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { suggestSkillsForRole } from '../services/geminiService';
import { Plus, Trash2, X, Sparkles, Loader2, Tag } from 'lucide-react';

export default function SkillsForm() {
  const { resumeData, addSkillCategory, updateSkillCategoryName, addSkillItem, removeSkillItem, removeSkillCategory, apiKey } = useResume();
  const { skills, personalInfo } = resumeData;
  const [newSkillInputs, setNewSkillInputs] = useState({});
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedSkills, setSuggestedSkills] = useState([]);

  const handleAddSkill = (catIdx) => {
    const inputVal = newSkillInputs[catIdx] || '';
    if (!inputVal.trim()) return;
    addSkillItem(catIdx, inputVal);
    setNewSkillInputs(prev => ({ ...prev, [catIdx]: '' }));
  };

  const handleAiSuggest = async () => {
    setIsSuggesting(true);
    try {
      const suggestions = await suggestSkillsForRole({
        jobTitle: personalInfo.jobTitle || 'Frontend Developer',
        apiKey
      });
      setSuggestedSkills(suggestions);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleAddSuggestedSkill = (skill, targetCatIdx = 0) => {
    if (skills.length === 0) {
      addSkillCategory();
    }
    addSkillItem(targetCatIdx, skill);
    setSuggestedSkills(prev => prev.filter(s => s !== skill));
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* AI Suggest Skills header banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5 m-0">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            AI Skills Recommendation
          </h4>
          <p className="text-[11px] text-slate-400 m-0">Discover high-priority keywords for "{personalInfo.jobTitle || 'Developer'}"</p>
        </div>
        <button
          type="button"
          onClick={handleAiSuggest}
          disabled={isSuggesting}
          className="flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-all cursor-pointer disabled:opacity-50"
        >
          {isSuggesting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Suggest Skills</span>
            </>
          )}
        </button>
      </div>

      {/* Suggested Skills Pill Drawer */}
      {suggestedSkills.length > 0 && (
        <div className="p-3 bg-indigo-950/30 border border-indigo-500/30 rounded-xl animate-in fade-in">
          <span className="text-[11px] font-semibold text-indigo-300 block mb-2">Click to add recommended skill:</span>
          <div className="flex flex-wrap gap-1.5">
            {suggestedSkills.map((sk, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddSuggestedSkill(sk, 0)}
                className="flex items-center gap-1 text-[11px] bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700/80 px-2.5 py-1 rounded-full transition-all"
              >
                <Plus className="w-3 h-3 text-indigo-400" />
                {sk}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {skills.map((cat, catIdx) => (
        <div key={catIdx} className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3 relative">
          <div className="flex items-center justify-between gap-2">
            <input
              type="text"
              value={cat.category}
              onChange={(e) => updateSkillCategoryName(catIdx, e.target.value)}
              placeholder="Category Name (e.g. Frontend, DevOps)"
              className="bg-transparent font-bold text-xs text-indigo-400 border-b border-dashed border-slate-700 focus:border-indigo-400 focus:outline-none pb-0.5"
            />
            {skills.length > 1 && (
              <button
                type="button"
                onClick={() => removeSkillCategory(catIdx)}
                className="text-slate-500 hover:text-rose-400 p-1 rounded"
                title="Remove Category"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Skill Tag Chips */}
          <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-slate-950 rounded-lg border border-slate-800">
            {cat.items && cat.items.map((item, itemIdx) => (
              <span
                key={itemIdx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800 text-slate-200 border border-slate-700 group hover:border-slate-600 transition-all"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeSkillItem(catIdx, itemIdx)}
                  className="text-slate-500 hover:text-rose-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {(!cat.items || cat.items.length === 0) && (
              <span className="text-[11px] text-slate-600 italic">No skills added in this group yet.</span>
            )}
          </div>

          {/* Add skill item input */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Tag className="w-3 h-3 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={newSkillInputs[catIdx] || ''}
                onChange={(e) => setNewSkillInputs(prev => ({ ...prev, [catIdx]: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(catIdx);
                  }
                }}
                placeholder="Type skill & press Enter (e.g. Next.js, TypeScript)"
                className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="button"
              onClick={() => handleAddSkill(catIdx)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-all"
            >
              Add
            </button>
          </div>

        </div>
      ))}

      <button
        type="button"
        onClick={addSkillCategory}
        className="w-full py-2.5 border-2 border-dashed border-slate-700 hover:border-indigo-500/50 rounded-xl text-xs font-semibold text-slate-400 hover:text-indigo-400 flex items-center justify-center gap-2 hover:bg-indigo-500/5 transition-all"
      >
        <Plus className="w-4 h-4" /> Add Skill Category
      </button>

    </div>
  );
}
