import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon } from '../components/Icons';

export default function ExecutiveTemplate({ data, theme }) {
  const { personalInfo, experiences, education, skills, projects, certifications } = data;

  return (
    <div className="w-full bg-slate-50/50 text-slate-800 p-8 min-h-[1050px] flex flex-col font-sans leading-normal text-left selection:bg-slate-200 print-page">
      
      {/* Executive Header */}
      <div className="resume-header-section bg-white border-b-4 shadow-sm p-6 -mx-8 -mt-8 mb-6 text-center" style={{ borderColor: theme.primary }}>
        <h1 className="text-3xl font-serif font-black tracking-tight text-slate-900 mb-1">
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: theme.primary }}>
          {personalInfo.jobTitle || 'Executive Title'}
        </p>

        {/* Contact links */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-400" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <LinkedinIcon className="w-3 h-3 text-slate-400" />
              <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-slate-400" />
              <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 font-serif" style={{ color: theme.primary }}>
            Executive Overview
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed italic">
            "{personalInfo.summary}"
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b-2 font-serif flex items-center justify-between" style={{ borderColor: theme.primary, color: theme.primary }}>
            <span>Professional Career History</span>
            <span className="text-[10px] font-normal text-slate-500 uppercase tracking-normal">Chronological</span>
          </h2>
          <div className="space-y-4">
            {experiences.map(exp => (
              <div key={exp.id} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs space-y-1.5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{exp.position}</h3>
                    <p className="text-[11px] font-semibold text-slate-600">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-white px-2 py-0.5 rounded shadow-xs" style={{ backgroundColor: theme.primary }}>
                    {exp.startDate} - {exp.endDate || (exp.current ? 'Present' : '')}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-[11px] text-slate-700 leading-relaxed pt-1">
                    {exp.bullets.filter(b => b.trim()).map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grid: Skills, Projects, Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b font-serif" style={{ color: theme.primary, borderColor: theme.border }}>
              Executive Capabilities
            </h2>
            <div className="space-y-2 text-xs">
              {skills.map((cat, idx) => (
                <div key={idx}>
                  <strong className="text-[11px] text-slate-900 block">{cat.category}:</strong>
                  <p className="text-[11px] text-slate-600">{cat.items && cat.items.join(' • ')}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certs */}
        <section className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-1 border-b font-serif" style={{ color: theme.primary, borderColor: theme.border }}>
            Academic Credentials & Honors
          </h2>
          {education && education.map(edu => (
            <div key={edu.id} className="text-xs space-y-0.5">
              <h3 className="font-bold text-slate-900">{edu.degree}</h3>
              <p className="text-[11px] text-slate-600">{edu.institution} {edu.location ? `• ${edu.location}` : ''}</p>
              <p className="text-[10px] text-slate-500">{edu.startDate ? `${edu.startDate} - ${edu.endDate}` : edu.endDate} {edu.gpa ? `• GPA: ${edu.gpa}` : ''}</p>
            </div>
          ))}
          {certifications && certifications.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <strong className="text-[11px] text-slate-900 block mb-1">Key Certifications:</strong>
              {certifications.map(c => (
                <p key={c.id} className="text-[10px] text-slate-600">• {c.name} ({c.issuer})</p>
              ))}
            </div>
          )}
        </section>

      </div>

    </div>
  );
}
