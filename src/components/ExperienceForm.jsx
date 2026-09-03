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
    <div className="space-y-6 text-left">
      {experiences.map((exp, expIdx) => (
        <div key={exp.id} className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4 relative">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400">Experience #{expIdx + 1}</span>
            <button
              type="button"
              onClick={() => removeExperience(exp.id)}
              className="text-slate-400 hover:text-rose-400 p-1 rounded hover:bg-rose-500/10 transition-all"
              title="Delete Experience"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Company / Organization</label>
              <div className="relative">
                <Building className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Apex Digital Solutions"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Job Position / Title</label>
              <div className="relative">
                <Briefcase className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  placeholder="Lead Frontend Developer"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Location</label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  placeholder="Remote / Ahmedabad"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Start Date</label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-3" />
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    placeholder="Jan 2023"
                    className="w-full pl-8 pr-2 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">End Date</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  placeholder="Present"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Bullet points */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-slate-300">Achievements & Responsibilities</label>
              <button
                type="button"
                onClick={() => addBullet(exp.id)}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
              >
                <Plus className="w-3 h-3" /> Add Bullet
              </button>
            </div>

            {exp.bullets.map((bullet, bIdx) => {
              const bulletKey = `${exp.id}-${bIdx}`;
              const isBulletLoading = loadingBulletId === bulletKey;

              return (
                <div key={bIdx} className="flex items-start gap-2 group">
                  <span className="text-slate-500 text-xs mt-2">•</span>
                  <div className="flex-1 relative">
                    <textarea
                      rows={2}
                      value={bullet}
                      onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                      placeholder="e.g. Built high-traffic SaaS dashboard in React, reducing load times by 35%..."
                      className="w-full p-2.5 pr-28 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed"
                    />
                    <button
                      type="button"
                      onClick={() => handleEnhanceBullet(exp.id, bIdx, bullet, exp.position)}
                      disabled={isBulletLoading || !bullet.trim()}
                      className="absolute right-2 top-2 flex items-center gap-1 text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/30 px-2 py-1 rounded transition-all cursor-pointer disabled:opacity-30"
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
                      className="text-slate-500 hover:text-rose-400 p-1.5 mt-1 rounded hover:bg-rose-500/10"
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
        className="w-full py-2.5 border-2 border-dashed border-slate-700 hover:border-indigo-500/50 rounded-xl text-xs font-semibold text-slate-400 hover:text-indigo-400 flex items-center justify-center gap-2 hover:bg-indigo-500/5 transition-all"
      >
        <Plus className="w-4 h-4" /> Add Another Experience
      </button>
    </div>
  );
}
