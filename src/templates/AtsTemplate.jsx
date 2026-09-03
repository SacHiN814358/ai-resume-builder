import React from 'react';

export default function AtsTemplate({ data, theme }) {
  const { personalInfo, experiences, education, skills, projects, certifications } = data;

  return (
    <div className="w-full bg-white text-black p-8 min-h-[1050px] flex flex-col font-serif leading-normal text-left selection:bg-slate-200 print-page" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
      
      {/* Centered ATS Header */}
      <header className="text-center pb-4 mb-4 border-b border-black">
        <h1 className="text-2xl font-bold tracking-normal uppercase mb-1 text-black">
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <p className="text-sm font-semibold text-slate-800 mb-2">
          {personalInfo.jobTitle || 'Target Job Title'}
        </p>

        {/* Contact info bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-700 font-sans">
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span>• {personalInfo.email}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.github && <span>• {personalInfo.github.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.website && <span>• {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 font-sans" style={{ color: theme.primary }}>
            Professional Summary
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed font-sans">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Technical Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 font-sans" style={{ color: theme.primary }}>
            Skills & Competencies
          </h2>
          <div className="space-y-1 text-xs font-sans">
            {skills.map((cat, idx) => (
              <p key={idx} className="text-slate-800">
                <strong className="font-semibold text-black">{cat.category}: </strong>
                {cat.items && cat.items.join(', ')}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {experiences && experiences.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2 font-sans" style={{ color: theme.primary }}>
            Work Experience
          </h2>
          <div className="space-y-3 font-sans">
            {experiences.map(exp => (
              <div key={exp.id} className="space-y-0.5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold text-black">{exp.position}</span>
                    <span className="text-xs text-slate-700"> — {exp.company}</span>
                    {exp.location && <span className="text-xs text-slate-500"> ({exp.location})</span>}
                  </div>
                  <span className="text-xs text-slate-600 font-medium">
                    {exp.startDate} - {exp.endDate || (exp.current ? 'Present' : '')}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-5 space-y-0.5 text-xs text-slate-800 leading-relaxed pt-0.5">
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

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2 font-sans" style={{ color: theme.primary }}>
            Projects
          </h2>
          <div className="space-y-2 font-sans">
            {projects.map(proj => (
              <div key={proj.id} className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-black">
                    {proj.name} {proj.tech && <span className="font-normal text-slate-600">| {proj.tech}</span>}
                  </span>
                  {proj.link && <span className="text-[11px] text-slate-600">{proj.link.replace(/^https?:\/\//, '')}</span>}
                </div>
                {proj.description && (
                  <p className="text-xs text-slate-800 leading-relaxed">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2 font-sans" style={{ color: theme.primary }}>
            Education
          </h2>
          <div className="space-y-2 font-sans">
            {education.map(edu => (
              <div key={edu.id} className="flex items-baseline justify-between text-xs">
                <div>
                  <strong className="font-bold text-black">{edu.degree}</strong>
                  <span className="text-slate-700">, {edu.institution} {edu.location ? `(${edu.location})` : ''}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-600">{edu.startDate ? `${edu.startDate} - ${edu.endDate}` : edu.endDate}</span>
                  {edu.gpa && <span className="text-slate-600"> • GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-1.5 font-sans" style={{ color: theme.primary }}>
            Certifications
          </h2>
          <div className="space-y-1 text-xs font-sans">
            {certifications.map(cert => (
              <p key={cert.id} className="text-slate-800">
                <strong className="font-semibold text-black">{cert.name}</strong> — {cert.issuer} {cert.date ? `(${cert.date})` : ''}
              </p>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
