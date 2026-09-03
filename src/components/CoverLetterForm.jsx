import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { generateCoverLetter } from '../services/geminiService';
import { Sparkles, Loader2, Mail, Building, Briefcase, Calendar, User } from 'lucide-react';

export default function CoverLetterForm() {
  const { coverLetter, updateCoverLetter, resumeData, apiKey } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);
  const [jobDescriptionInput, setJobDescriptionInput] = useState('');
  const [tone, setTone] = useState('enthusiastic');

  const handleGenerateLetter = async () => {
    setIsGenerating(true);
    try {
      const generated = await generateCoverLetter({
        resumeData,
        jobTitle: coverLetter.jobTitle || resumeData.personalInfo.jobTitle,
        companyName: coverLetter.companyName,
        jobDescription: jobDescriptionInput,
        tone,
        apiKey
      });
      if (generated) {
        updateCoverLetter('body', generated);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* AI Letter Generator Prompt Box */}
      <div className="p-4 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white m-0">AI Cover Letter Generator</h4>
              <p className="text-[11px] text-slate-400 m-0">Customizes letter to any job description & role</p>
            </div>
          </div>

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="enthusiastic">Tone: Enthusiastic</option>
            <option value="professional">Tone: Professional</option>
            <option value="confident">Tone: Confident</option>
            <option value="concise">Tone: Concise</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-slate-300 block mb-1">
            Target Job Description / Key Requirements (Optional):
          </label>
          <textarea
            rows={3}
            value={jobDescriptionInput}
            onChange={(e) => setJobDescriptionInput(e.target.value)}
            placeholder="Paste snippet of the job description or role requirements here..."
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="button"
          onClick={handleGenerateLetter}
          disabled={isGenerating}
          className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating Tailored Letter with AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate AI Cover Letter</span>
            </>
          )}
        </button>
      </div>

      {/* Manual Letter Header Fields */}
      <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-4">
        <h4 className="text-xs font-bold text-indigo-400 m-0">Letter Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Target Company Name</label>
            <div className="relative">
              <Building className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={coverLetter.companyName}
                onChange={(e) => updateCoverLetter('companyName', e.target.value)}
                placeholder="Google / Innovate Labs"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Target Job Title</label>
            <div className="relative">
              <Briefcase className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={coverLetter.jobTitle}
                onChange={(e) => updateCoverLetter('jobTitle', e.target.value)}
                placeholder="Senior Frontend Developer"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Recipient Name / Team</label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={coverLetter.recipientName}
                onChange={(e) => updateCoverLetter('recipientName', e.target.value)}
                placeholder="Hiring Manager / Team"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Date</label>
            <div className="relative">
              <Calendar className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={coverLetter.date}
                onChange={(e) => updateCoverLetter('date', e.target.value)}
                placeholder="September 2026"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Letter Body Textarea */}
        <div>
          <label className="text-[11px] font-semibold text-slate-400 block mb-1">Cover Letter Body</label>
          <textarea
            rows={10}
            value={coverLetter.body}
            onChange={(e) => updateCoverLetter('body', e.target.value)}
            placeholder="Dear Hiring Team,&#10;&#10;I am writing to express my interest in..."
            className="w-full p-3.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed"
          />
        </div>
      </div>

    </div>
  );
}
