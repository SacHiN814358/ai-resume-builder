import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, Award, Building, Calendar } from 'lucide-react';

export default function CertificationsForm() {
  const { resumeData, addCertification, updateCertification, removeCertification } = useResume();
  const { certifications } = resumeData;

  return (
    <div className="space-y-4 text-left">
      {certifications.map((cert, idx) => (
        <div key={cert.id} className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400">Certification #{idx + 1}</span>
            <button
              type="button"
              onClick={() => removeCertification(cert.id)}
              className="text-slate-400 hover:text-rose-400 p-1 rounded hover:bg-rose-500/10"
              title="Delete Certification"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Certification Name</label>
              <div className="relative">
                <Award className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                  placeholder="Meta Front-End Developer"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Issuer / Platform</label>
              <div className="relative">
                <Building className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                  placeholder="Coursera / Meta"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Date / Year</label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                  placeholder="2023"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addCertification}
        className="w-full py-2.5 border-2 border-dashed border-slate-700 hover:border-indigo-500/50 rounded-xl text-xs font-semibold text-slate-400 hover:text-indigo-400 flex items-center justify-center gap-2 hover:bg-indigo-500/5 transition-all"
      >
        <Plus className="w-4 h-4" /> Add Certification
      </button>
    </div>
  );
}
