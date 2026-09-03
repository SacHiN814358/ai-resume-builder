import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, Award, Building, Calendar } from 'lucide-react';

export default function CertificationsForm() {
  const { resumeData, addCertification, updateCertification, removeCertification } = useResume();
  const { certifications } = resumeData;

  return (
    <div className="space-y-3 pt-2 text-left">
      {certifications.map((cert, idx) => (
        <div key={cert.id} className="p-3 bg-[#090b12] border border-zinc-800/80 rounded-xl space-y-2.5 relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Certification #{idx + 1}</span>
            <button
              type="button"
              onClick={() => removeCertification(cert.id)}
              className="text-zinc-500 hover:text-rose-400 p-1 rounded hover:bg-rose-500/10 cursor-pointer"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <div>
              <label className="text-[10px] font-medium text-zinc-400 block mb-1">Name</label>
              <div className="relative">
                <Award className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                  placeholder="Meta Frontend"
                  className="w-full pl-8 pr-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-medium text-zinc-400 block mb-1">Issuer</label>
              <div className="relative">
                <Building className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                  placeholder="Coursera"
                  className="w-full pl-8 pr-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-medium text-zinc-400 block mb-1">Year</label>
              <div className="relative">
                <Calendar className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                  placeholder="2023"
                  className="w-full pl-8 pr-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addCertification}
        className="w-full py-2 border border-dashed border-zinc-800 hover:border-zinc-700 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 flex items-center justify-center gap-1.5 hover:bg-zinc-800/40 transition-all cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" /> Add Certification
      </button>
    </div>
  );
}
