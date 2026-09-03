import React from 'react';
import { Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, FolderGit2 } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/Icons';

export default function ModernTemplate({ data, theme }) {
  const { personalInfo, experiences, education, skills, projects, certifications } = data;

  return (
    <div className="w-full bg-white text-zinc-900 p-10 font-sans leading-relaxed text-left selection:bg-indigo-100 print-page" style={{ color: '#111827', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      
      {/* 1. Clean Top Header */}
      <div className="resume-header-section pb-3 mb-4 border-b-2" style={{ borderColor: theme.primary }}>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-zinc-950 mb-0.5">
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-2" style={{ color: theme.primary }}>
          {personalInfo.jobTitle || 'Target Job Title'}
        </p>

        {/* One-Line Clean Contact Bar */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-600 font-medium">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.email && <span>| {personalInfo.email}</span>}
          {personalInfo.linkedin && (
            <span>| {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
          )}
          {personalInfo.github && (
            <span>| {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
          )}
          {personalInfo.website && (
            <span>| {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
          )}
        </div>
      </div>

      {/* 2. Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 pb-1 mb-1.5 border-b border-zinc-300">
            Professional Summary
          </h2>
          <p className="text-[11.5px] text-zinc-700 leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* 3. Core Competencies / Technical Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 pb-1 mb-1.5 border-b border-zinc-300">
            Technical Skills & Competencies
          </h2>
          <div className="space-y-1 text-[11px]">
            {skills.map((cat, idx) => (
              <div key={idx} className="flex items-baseline">
                <span className="font-bold text-zinc-900 w-36 shrink-0">{cat.category}:</span>
                <span className="text-zinc-700 font-medium">{cat.items && cat.items.join(' • ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Professional Work Experience */}
      {experiences && experiences.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 pb-1 mb-2 border-b border-zinc-300">
            Professional Experience
          </h2>
          <div className="space-y-3.5">
            {experiences.map(exp => (
              <div key={exp.id} className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold text-zinc-950">{exp.position}</span>
                    <span className="text-xs font-semibold text-zinc-700"> — {exp.company}</span>
                    {exp.location && <span className="text-[11px] text-zinc-500"> ({exp.location})</span>}
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-600">
                    {exp.startDate} – {exp.endDate || (exp.current ? 'Present' : '')}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-[11px] text-zinc-700 leading-relaxed">
                    {exp.bullets.filter(b => b.trim()).map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Featured Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 pb-1 mb-2 border-b border-zinc-300">
            Key Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map(proj => (
              <div key={proj.id} className="space-y-0.5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold text-zinc-950">{proj.name}</span>
                    {proj.tech && <span className="text-[11px] font-medium text-zinc-600"> | {proj.tech}</span>}
                  </div>
                  {proj.link && (
                    <span className="text-[11px] font-medium text-indigo-600 underline">
                      {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <p className="text-[11px] text-zinc-700 leading-relaxed">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Education & Certifications (2 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 pb-1 mb-1.5 border-b border-zinc-300">
              Education
            </h2>
            <div className="space-y-1.5">
              {education.map(edu => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-zinc-900">{edu.degree}</div>
                  <div className="text-[11px] text-zinc-600 font-medium">{edu.institution} {edu.location ? `• ${edu.location}` : ''}</div>
                  <div className="text-[10px] text-zinc-500">
                    {edu.startDate ? `${edu.startDate} – ${edu.endDate}` : edu.endDate} {edu.gpa ? `| GPA: ${edu.gpa}` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 pb-1 mb-1.5 border-b border-zinc-300">
              Certifications & Honors
            </h2>
            <div className="space-y-1.5">
              {certifications.map(cert => (
                <div key={cert.id} className="text-xs">
                  <span className="font-bold text-zinc-900">{cert.name}</span>
                  <span className="text-[11px] text-zinc-600"> — {cert.issuer} {cert.date ? `(${cert.date})` : ''}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
