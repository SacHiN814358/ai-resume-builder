import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { enhanceBulletPoint } from '../services/geminiService';
import { Plus, Trash2, Sparkles, Loader2, Building, Briefcase, Calendar, MapPin } from 'lucide-react';

export default function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience, addBullet, updateBullet, removeBullet, apiKey } = useResume();
  const { experiences, personalInfo } = resumeData;
  const [loadingBulletId, setLoadingBulletId] = useState(null);

  const handleEnhanceBullet = async (expId, index, originalBullet, role) => {
    if (!originalBullet.trim()) return;
    const bulletKey = `${expId}-${index}`;
    setLoadingBulletId(bulletKey);
    try {
      const enhanced = await enhanceBulletPoint({
        bulletText: originalBullet,
        role: role || personalInfo.jobTitle || 'Software Engineer',
        apiKey
      });
      if (enhanced) {
        updateBullet(expId, index, enhanced);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBulletId(null);
    }
  };

  return (
    <div className="space-y-4 pt-2 text-left">
      {experiences.map((exp, expIdx) => (
        <div key={exp.id} className="p-3.5 bg-[#090b12] border border-zinc-800/80 rounded-xl space-y-3 relative">
          
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Position #{expIdx + 1}</span>
            <button
              type="button"
              onClick={() => removeExperience(exp.id)}
              className="text-zinc-500 hover:text-rose-400 p-1 rounded hover:bg-rose-500/10 transition-all cursor-pointer"
              title="Delete Position"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-medium text-zinc-400 block mb-1">Company</label>
              <div className="relative">
                <Building className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Apex Digital"
                  className="w-full pl-8 pr-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-medium text-zinc-400 block mb-1">Role / Position</label>
              <div className="relative">
                <Briefcase className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  placeholder="Lead Developer"
                  className="w-full pl-8 pr-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-medium text-zinc-400 block mb-1">Location</label>
              <div className="relative">
                <MapPin className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  placeholder="Remote / City"
                  className="w-full pl-8 pr-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-medium text-zinc-400 block mb-1">Start Date</label>
                <div className="relative">
                  <Calendar className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    placeholder="Jan 2023"
                    className="w-full pl-7 pr-2 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-medium text-zinc-400 block mb-1">End Date</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  placeholder="Present"
                  className="w-full px-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Bullet points */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Achievements</label>
              <button
                type="button"
                onClick={() => addBullet(exp.id)}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Add Point
              </button>
            </div>

            {exp.bullets.map((bullet, bIdx) => {
              const bulletKey = `${exp.id}-${bIdx}`;
              const isBulletLoading = loadingBulletId === bulletKey;

              return (
                <div key={bIdx} className="flex items-start gap-1.5">
                  <span className="text-zinc-600 text-xs mt-2">•</span>
                  <div className="flex-1 relative">
                    <textarea
                      rows={2}
                      value={bullet}
                      onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                      placeholder="e.g. Architected and deployed high-performance modules in React, reducing load times by 35%..."
                      className="w-full p-2 pr-24 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 leading-relaxed transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => handleEnhanceBullet(exp.id, bIdx, bullet, exp.position)}
                      disabled={isBulletLoading || !bullet.trim()}
                      className="absolute right-1.5 top-1.5 flex items-center gap-1 text-[10px] font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 px-1.5 py-0.5 rounded transition-all cursor-pointer disabled:opacity-30"
                      title="AI Polish with XYZ formula"
                    >
                      {isBulletLoading ? (
                        <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-indigo-400" />
                          <span>AI Polish</span>
                        </>
                      )}
                    </button>
                  </div>
                  {exp.bullets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBullet(exp.id, bIdx)}
                      className="text-zinc-500 hover:text-rose-400 p-1 mt-1 rounded hover:bg-rose-500/10 cursor-pointer"
                      title="Remove Bullet"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="w-full py-2 border border-dashed border-zinc-800 hover:border-zinc-700 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 flex items-center justify-center gap-1.5 hover:bg-zinc-800/40 transition-all cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" /> Add Experience
      </button>
    </div>
  );
}
