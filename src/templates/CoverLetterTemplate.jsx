import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon } from '../components/Icons';

export default function CoverLetterTemplate({ data, coverLetter, theme }) {
  const { personalInfo } = data;

  return (
    <div className="w-full bg-white text-slate-900 p-10 min-h-[1050px] flex flex-col font-sans leading-relaxed text-left selection:bg-indigo-100 print-page shadow-sm">
      
      {/* Sender Header Banner */}
      <header className="border-b-2 pb-6 mb-8" style={{ borderColor: theme.primary }}>
        <h1 className="text-3xl font-extrabold tracking-tight mb-1" style={{ color: theme.primary }}>
          {personalInfo.fullName || 'Candidate Name'}
        </h1>
        <p className="text-sm font-semibold text-slate-600 mb-3">
          {personalInfo.jobTitle || 'Professional Title'}
        </p>

        {/* Sender details */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" style={{ color: theme.primary }} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" style={{ color: theme.primary }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" style={{ color: theme.primary }} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <LinkedinIcon className="w-3.5 h-3.5" style={{ color: theme.primary }} />
              <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" style={{ color: theme.primary }} />
              <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
        </div>
      </header>

      {/* Date & Recipient Details */}
      <div className="mb-6 text-xs text-slate-700 space-y-1">
        <p className="font-semibold text-slate-500">{coverLetter.date || 'September 2026'}</p>
        <div className="pt-2">
          <p className="font-bold text-slate-900">{coverLetter.recipientName || 'Hiring Team'}</p>
          {coverLetter.recipientTitle && <p className="text-slate-600">{coverLetter.recipientTitle}</p>}
          <p className="font-semibold" style={{ color: theme.primary }}>{coverLetter.companyName || 'Target Company'}</p>
          {coverLetter.companyAddress && <p className="text-slate-500">{coverLetter.companyAddress}</p>}
        </div>
      </div>

      {/* Subject Line */}
      <div className="mb-6">
        <p className="text-xs font-bold text-slate-900 border-l-4 pl-3 py-1 bg-slate-50" style={{ borderColor: theme.primary }}>
          APPLICATION FOR: {coverLetter.jobTitle || personalInfo.jobTitle || 'TARGET ROLE'}
        </p>
      </div>

      {/* Body Content */}
      <div className="flex-1 space-y-4 text-xs text-slate-800 leading-relaxed whitespace-pre-line font-normal">
        {coverLetter.body || 'Dear Hiring Team,\n\nI am writing to express my strong enthusiasm...'}
      </div>

      {/* Sign-off */}
      <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-800">
        <p className="mb-4">Sincerely,</p>
        <p className="font-serif italic text-lg font-bold" style={{ color: theme.primary }}>
          {personalInfo.fullName || 'Candidate Name'}
        </p>
        <p className="text-slate-500 text-[11px] mt-0.5">{personalInfo.jobTitle}</p>
      </div>

    </div>
  );
}
