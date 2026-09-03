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
    <div className="space-y-3.5 pt-2 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">Full Name</label>
          <div className="relative">
            <User className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              placeholder="Sachin Gupta"
              className="w-full pl-8 pr-3 py-1.5 bg-[#090b12] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">Target Job Title</label>
          <input
            type="text"
            value={personalInfo.jobTitle}
            onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
            placeholder="Senior Frontend Developer"
            className="w-full px-3 py-1.5 bg-[#090b12] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>

        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              placeholder="sachin@example.com"
              className="w-full pl-8 pr-3 py-1.5 bg-[#090b12] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              placeholder="+91 99136 29460"
              className="w-full pl-8 pr-3 py-1.5 bg-[#090b12] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">Location</label>
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              placeholder="Gujarat, India"
              className="w-full pl-8 pr-3 py-1.5 bg-[#090b12] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">Portfolio / Website</label>
          <div className="relative">
            <Globe className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="url"
              value={personalInfo.website}
              onChange={(e) => updatePersonalInfo('website', e.target.value)}
              placeholder="https://sachin-creates.vercel.app"
              className="w-full pl-8 pr-3 py-1.5 bg-[#090b12] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">LinkedIn Profile</label>
          <div className="relative">
            <LinkedinIcon className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="url"
              value={personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/sachin-gupta"
              className="w-full pl-8 pr-3 py-1.5 bg-[#090b12] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-medium text-zinc-400 block mb-1">GitHub Profile</label>
          <div className="relative">
            <GithubIcon className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="url"
              value={personalInfo.github}
              onChange={(e) => updatePersonalInfo('github', e.target.value)}
              placeholder="https://github.com/SacHiN814358"
              className="w-full pl-8 pr-3 py-1.5 bg-[#090b12] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-1">
          <label className="text-[11px] font-medium text-zinc-400">Professional Summary</label>
          <button
            type="button"
            onClick={handleAiSummary}
            disabled={isGenerating}
            className="flex items-center gap-1 text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded-md transition-all cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>AI Polish Summary</span>
              </>
            )}
          </button>
        </div>
        <textarea
          rows={3}
          value={personalInfo.summary}
          onChange={(e) => updatePersonalInfo('summary', e.target.value)}
          placeholder="Brief 3-4 sentences outlining your key achievements, specialties, and business impact..."
          className="w-full p-2.5 bg-[#090b12] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 leading-relaxed transition-all"
        />
      </div>
    </div>
  );
}
