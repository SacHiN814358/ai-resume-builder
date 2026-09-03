import React from 'react';
import { Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, FolderGit2 } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/Icons';

export default function ModernTemplate({ data, theme }) {
  const { personalInfo, experiences, education, skills, projects, certifications } = data;

  return (
    <div className="w-full bg-white text-slate-800 p-8 min-h-[1050px] flex flex-col font-sans leading-normal text-left selection:bg-indigo-100 print-page" style={{ color: '#1e293b' }}>
      
      {/* Header Banner */}
      <header className="border-b-2 pb-5 mb-5" style={{ borderColor: theme.primary }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-1" style={{ color: theme.primary }}>
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <p className="text-base font-semibold tracking-wide text-slate-600">
              {personalInfo.jobTitle || 'Target Job Title'}
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-600">
            {personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 shrink-0" style={{ color: theme.primary }} />
                <span className="truncate">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 shrink-0" style={{ color: theme.primary }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 shrink-0" style={{ color: theme.primary }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-3 h-3 shrink-0" style={{ color: theme.primary }} />
                <span className="truncate">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1.5">
                <LinkedinIcon className="w-3 h-3 shrink-0" style={{ color: theme.primary }} />
                <span className="truncate">{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-1.5">
                <GithubIcon className="w-3 h-3 shrink-0" style={{ color: theme.primary }} />
                <span className="truncate">{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <p className="mt-3 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5 italic">
            {personalInfo.summary}
          </p>
        )}
      </header>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-12 gap-6 flex-1">
        
        {/* Left / Main Column (7 cols): Experience & Projects */}
        <div className="col-span-7 space-y-5">
          
          {/* Work Experience */}
          {experiences && experiences.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 pb-1 mb-2.5 border-b border-slate-200" style={{ color: theme.primary }}>
                <Briefcase className="w-3.5 h-3.5" /> Work Experience
              </h2>
              <div className="space-y-3.5">
                {experiences.map(exp => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-slate-800">{exp.position}</h3>
                        <p className="text-[11px] font-semibold text-slate-600">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {exp.startDate} - {exp.endDate || (exp.current ? 'Present' : '')}
                      </span>
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-1 text-[11px] text-slate-600 leading-relaxed pt-0.5">
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
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 pb-1 mb-2.5 border-b border-slate-200" style={{ color: theme.primary }}>
                <FolderGit2 className="w-3.5 h-3.5" /> Featured Projects
              </h2>
              <div className="space-y-2.5">
                {projects.map(proj => (
                  <div key={proj.id} className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        {proj.name}
                        {proj.tech && <span className="text-[10px] font-normal text-slate-500">({proj.tech})</span>}
                      </h3>
                      {proj.link && (
                        <span className="text-[10px] font-medium underline" style={{ color: theme.primary }}>
                          Live Demo
                        </span>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-[11px] text-slate-600 leading-relaxed">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Column / Sidebar (5 cols): Skills, Education, Certifications */}
        <div className="col-span-5 space-y-5">
          
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b border-slate-200" style={{ color: theme.primary }}>
                Core Skills & Tools
              </h2>
              <div className="space-y-2.5">
                {skills.map((cat, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{cat.category}</span>
                    <div className="flex flex-wrap gap-1">
                      {cat.items && cat.items.map((item, iIdx) => (
                        <span
                          key={iIdx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md border"
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
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 pb-1 mb-2.5 border-b border-slate-200" style={{ color: theme.primary }}>
                <GraduationCap className="w-3.5 h-3.5" /> Education
              </h2>
              <div className="space-y-2.5">
                {education.map(edu => (
                  <div key={edu.id} className="space-y-0.5">
                    <h3 className="text-xs font-bold text-slate-800">{edu.degree}</h3>
                    <p className="text-[11px] text-slate-600 font-medium">{edu.institution}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
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
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 pb-1 mb-2.5 border-b border-slate-200" style={{ color: theme.primary }}>
                <Award className="w-3.5 h-3.5" /> Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map(cert => (
                  <div key={cert.id} className="text-[11px] space-y-0.5">
                    <p className="font-bold text-slate-800 leading-tight">{cert.name}</p>
                    <p className="text-[10px] text-slate-500">{cert.issuer} {cert.date ? `• ${cert.date}` : ''}</p>
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
