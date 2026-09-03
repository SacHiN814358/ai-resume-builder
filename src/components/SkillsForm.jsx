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
    <div className="space-y-4 pt-2 text-left">
      
      {/* AI Suggest Bar */}
      <div className="bg-[#090b12] border border-zinc-800 rounded-lg p-2.5 flex items-center justify-between gap-2">
        <div className="text-xs text-zinc-300">
          <span>AI Skill Keywords for <span className="text-indigo-400 font-semibold">{personalInfo.jobTitle || 'Role'}</span></span>
        </div>
        <button
          type="button"
          onClick={handleAiSuggest}
          disabled={isSuggesting}
          className="flex items-center gap-1 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-2.5 py-1 rounded-md transition-all cursor-pointer disabled:opacity-50"
        >
          {isSuggesting ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3" />
              <span>Suggest Skills</span>
            </>
          )}
        </button>
      </div>

      {/* Suggested Skills Pill Drawer */}
      {suggestedSkills.length > 0 && (
        <div className="p-2.5 bg-indigo-950/20 border border-indigo-500/20 rounded-lg animate-in fade-in">
          <span className="text-[10px] font-semibold text-indigo-300 block mb-1.5 uppercase tracking-wider">Click to add skill:</span>
          <div className="flex flex-wrap gap-1">
            {suggestedSkills.map((sk, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddSuggestedSkill(sk, 0)}
                className="flex items-center gap-1 text-[11px] bg-[#090b12] hover:bg-indigo-600 hover:text-white text-zinc-300 border border-zinc-800 px-2 py-0.5 rounded-md transition-all cursor-pointer"
              >
                <Plus className="w-2.5 h-2.5 text-indigo-400" />
                {sk}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {skills.map((cat, catIdx) => (
        <div key={catIdx} className="p-3 bg-[#090b12] border border-zinc-800/80 rounded-xl space-y-2.5 relative">
          <div className="flex items-center justify-between gap-2">
            <input
              type="text"
              value={cat.category}
              onChange={(e) => updateSkillCategoryName(catIdx, e.target.value)}
              placeholder="Category Name"
              className="bg-transparent font-semibold text-xs text-zinc-200 border-b border-zinc-800 focus:border-indigo-400 focus:outline-none pb-0.5"
            />
            {skills.length > 1 && (
              <button
                type="button"
                onClick={() => removeSkillCategory(catIdx)}
                className="text-zinc-500 hover:text-rose-400 p-1 rounded cursor-pointer"
                title="Remove Group"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Skill Tag Chips */}
          <div className="flex flex-wrap gap-1 min-h-[28px] p-1.5 bg-[#0f111a] rounded-lg border border-zinc-800/80">
            {cat.items && cat.items.map((item, itemIdx) => (
              <span
                key={itemIdx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-800/80 text-zinc-200 border border-zinc-700/60"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeSkillItem(catIdx, itemIdx)}
                  className="text-zinc-400 hover:text-rose-400 cursor-pointer"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
            {(!cat.items || cat.items.length === 0) && (
              <span className="text-[10px] text-zinc-600 italic">No skills in this group yet.</span>
            )}
          </div>

          {/* Add skill item input */}
          <div className="flex items-center gap-1.5">
            <div className="relative flex-1">
              <Tag className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2" />
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
                placeholder="Type skill & press Enter (e.g. Next.js)"
                className="w-full pl-7 pr-2.5 py-1 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="button"
              onClick={() => handleAddSkill(catIdx)}
              className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-lg transition-all cursor-pointer"
            >
              Add
            </button>
          </div>

        </div>
      ))}

      <button
        type="button"
        onClick={addSkillCategory}
        className="w-full py-2 border border-dashed border-zinc-800 hover:border-zinc-700 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 flex items-center justify-center gap-1.5 hover:bg-zinc-800/40 transition-all cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" /> Add Skill Category
      </button>

    </div>
  );
}
