import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { generateSummary } from '../services/geminiService';
import { Sparkles, Loader2, User, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo, apiKey } = useResume();
  const { personalInfo, skills, experiences } = resumeData;
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiSummary = async () => {
    setIsGenerating(true);
    try {
      const summary = await generateSummary({
        jobTitle: personalInfo.jobTitle,
        skills,
        experiences,
        apiKey
      });
      if (summary) {
        updatePersonalInfo('summary', summary);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
          <div className="relative">
            <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              placeholder="e.g. Sachin Gupta"
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Target Job Title</label>
          <input
            type="text"
            value={personalInfo.jobTitle}
            onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
            placeholder="e.g. Senior Frontend Engineer"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              placeholder="name@example.com"
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              placeholder="+91 99136 29460"
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Location</label>
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              placeholder="Gujarat, India"
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Portfolio / Website</label>
          <div className="relative">
            <Globe className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="url"
              value={personalInfo.website}
              onChange={(e) => updatePersonalInfo('website', e.target.value)}
              placeholder="https://sachin-creates.vercel.app"
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">LinkedIn Profile</label>
          <div className="relative">
            <LinkedinIcon className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="url"
              value={personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/sachin-gupta"
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">GitHub Profile</label>
          <div className="relative">
            <GithubIcon className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="url"
              value={personalInfo.github}
              onChange={(e) => updatePersonalInfo('github', e.target.value)}
              placeholder="https://github.com/SacHiN814358"
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Professional Summary with AI Generator */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-slate-300">Professional Summary</label>
          <button
            type="button"
            onClick={handleAiSummary}
            disabled={isGenerating}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 px-2.5 py-1 rounded-lg transition-all cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />
                <span>Generating with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>✨ AI Write Summary</span>
              </>
            )}
          </button>
        </div>
        <textarea
          rows={4}
          value={personalInfo.summary}
          onChange={(e) => updatePersonalInfo('summary', e.target.value)}
          placeholder="Brief 3-4 sentences outlining your key achievements, specialties, and impact..."
          className="w-full p-3 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
        />
      </div>
    </div>
  );
}
