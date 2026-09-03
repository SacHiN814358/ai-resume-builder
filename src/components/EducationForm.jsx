import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, GraduationCap, School, MapPin } from 'lucide-react';

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;

  return (
    <div className="space-y-3 pt-2 text-left">
      {education.map((edu, idx) => (
        <div key={edu.id} className="p-3 bg-[#090b12] border border-zinc-800/80 rounded-xl space-y-2.5 relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Education #{idx + 1}</span>
            <button
              type="button"
              onClick={() => removeEducation(edu.id)}
              className="text-zinc-500 hover:text-rose-400 p-1 rounded hover:bg-rose-500/10 cursor-pointer"
              title="Delete Education"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-medium text-zinc-400 block mb-1">University / College</label>
              <div className="relative">
                <School className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  placeholder="University Name"
                  className="w-full pl-8 pr-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-medium text-zinc-400 block mb-1">Degree & Major</label>
              <div className="relative">
                <GraduationCap className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="B.Tech in Computer Engg"
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
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                  placeholder="Gujarat, India"
                  className="w-full pl-8 pr-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-medium text-zinc-400 block mb-1">Years (e.g. 2018 - 2022)</label>
                <input
                  type="text"
                  value={edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : (edu.endDate || edu.startDate || '')}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.includes('-')) {
                      const [s, end] = val.split('-').map(x => x.trim());
                      updateEducation(edu.id, 'startDate', s);
                      updateEducation(edu.id, 'endDate', end);
                    } else {
                      updateEducation(edu.id, 'endDate', val);
                    }
                  }}
                  placeholder="2018 - 2022"
                  className="w-full px-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-medium text-zinc-400 block mb-1">GPA / Score</label>
                <input
                  type="text"
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  placeholder="8.6 / 10.0"
                  className="w-full px-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="w-full py-2 border border-dashed border-zinc-800 hover:border-zinc-700 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 flex items-center justify-center gap-1.5 hover:bg-zinc-800/40 transition-all cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" /> Add Education
      </button>
    </div>
  );
}
