import React from 'react';
import { Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, FolderGit2 } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/Icons';

export default function ModernTemplate({ data, theme }) {
  const { personalInfo, experiences, education, skills, projects, certifications } = data;

  return (
    <div className="w-full bg-white text-slate-800 p-6 flex flex-col font-sans leading-normal text-left selection:bg-indigo-100 print-page" style={{ color: '#1e293b' }}>
      
      {/* Header Banner */}
      <div className="resume-header-section border-b pb-3.5 mb-3.5" style={{ borderColor: theme.primary }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight mb-0.5" style={{ color: theme.primary }}>
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <p className="text-xs font-bold tracking-wide text-slate-600">
              {personalInfo.jobTitle || 'Target Job Title'}
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[10px] text-slate-600">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-2.5 h-2.5 shrink-0" style={{ color: theme.primary }} />
                <span className="truncate">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-2.5 h-2.5 shrink-0" style={{ color: theme.primary }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 shrink-0" style={{ color: theme.primary }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-2.5 h-2.5 shrink-0" style={{ color: theme.primary }} />
                <span className="truncate">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <LinkedinIcon className="w-2.5 h-2.5 shrink-0" style={{ color: theme.primary }} />
                <span className="truncate">{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-1">
                <GithubIcon className="w-2.5 h-2.5 shrink-0" style={{ color: theme.primary }} />
                <span className="truncate">{personalInfo.github.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <p className="mt-2 text-[11px] text-slate-600 leading-snug border-t border-slate-100 pt-1.5 italic">
            {personalInfo.summary}
          </p>
        )}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-12 gap-5">
        
        {/* Left / Main Column (7 cols): Experience & Projects */}
        <div className="col-span-7 space-y-3.5">
          
          {/* Work Experience */}
          {experiences && experiences.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 pb-0.5 mb-2 border-b border-slate-200" style={{ color: theme.primary }}>
                <Briefcase className="w-3 h-3" /> Work Experience
              </h2>
              <div className="space-y-2.5">
                {experiences.map(exp => (
                  <div key={exp.id} className="space-y-0.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-[11px] font-bold text-slate-800">{exp.position}</h3>
                        <p className="text-[10px] font-semibold text-slate-600">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                      </div>
                      <span className="text-[9px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {exp.startDate} - {exp.endDate || (exp.current ? 'Present' : '')}
                      </span>
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-[10.5px] text-slate-600 leading-tight pt-0.5">
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

          {/* Key Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 pb-0.5 mb-2 border-b border-slate-200" style={{ color: theme.primary }}>
                <FolderGit2 className="w-3 h-3" /> Featured Projects
              </h2>
              <div className="space-y-2">
                {projects.map(proj => (
                  <div key={proj.id} className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
                        {proj.name}
                        {proj.tech && <span className="text-[9.5px] font-normal text-slate-500">({proj.tech})</span>}
                      </h3>
                      {proj.link && (
                        <span className="text-[9px] font-medium underline" style={{ color: theme.primary }}>
                          Live Demo
                        </span>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-[10.5px] text-slate-600 leading-tight">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Column / Sidebar (5 cols): Skills, Education, Certifications */}
        <div className="col-span-5 space-y-3.5">
          
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider pb-0.5 mb-2 border-b border-slate-200" style={{ color: theme.primary }}>
                Core Skills & Tools
              </h2>
              <div className="space-y-2">
                {skills.map((cat, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide">{cat.category}</span>
                    <div className="flex flex-wrap gap-1">
                      {cat.items && cat.items.map((item, iIdx) => (
                        <span
                          key={iIdx}
                          className="text-[9.5px] font-medium px-1.5 py-0.5 rounded border"
                          style={{
                            backgroundColor: theme.secondary,
                            borderColor: theme.border,
                            color: theme.text
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 pb-0.5 mb-2 border-b border-slate-200" style={{ color: theme.primary }}>
                <GraduationCap className="w-3 h-3" /> Education
              </h2>
              <div className="space-y-1.5">
                {education.map(edu => (
                  <div key={edu.id} className="space-y-0.5">
                    <h3 className="text-[10.5px] font-bold text-slate-800">{edu.degree}</h3>
                    <p className="text-[10px] text-slate-600 font-medium">{edu.institution}</p>
                    <div className="flex items-center justify-between text-[9px] text-slate-500">
                      <span>{edu.startDate ? `${edu.startDate} - ${edu.endDate}` : edu.endDate}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 pb-0.5 mb-2 border-b border-slate-200" style={{ color: theme.primary }}>
                <Award className="w-3 h-3" /> Certifications
              </h2>
              <div className="space-y-1.5">
                {certifications.map(cert => (
                  <div key={cert.id} className="text-[10px] space-y-0.5">
                    <p className="font-bold text-slate-800 leading-tight">{cert.name}</p>
                    <p className="text-[9px] text-slate-500">{cert.issuer} {cert.date ? `• ${cert.date}` : ''}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

      </div>

    </div>
  );
}
