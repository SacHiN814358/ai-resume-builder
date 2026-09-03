import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { generateCoverLetter } from '../services/geminiService';
import { Sparkles, Loader2, Building, Briefcase, Calendar, User } from 'lucide-react';

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
    <div className="space-y-4 pt-1 text-left">
      
      {/* AI Letter Generator Prompt Box */}
      <div className="p-3.5 bg-[#090b12] border border-zinc-800 rounded-xl space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <h4 className="text-xs font-bold text-zinc-200 m-0">AI Tailored Generation</h4>
          </div>

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="px-2 py-1 bg-[#0f111a] border border-zinc-800 rounded-md text-xs text-zinc-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="enthusiastic">Tone: Enthusiastic</option>
            <option value="professional">Tone: Professional</option>
            <option value="confident">Tone: Confident</option>
            <option value="concise">Tone: Concise</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-zinc-400 block mb-1">
            Target Job Description Notes (Optional):
          </label>
          <textarea
            rows={2}
            value={jobDescriptionInput}
            onChange={(e) => setJobDescriptionInput(e.target.value)}
            placeholder="Paste keywords or requirements from the job description..."
            className="w-full p-2 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="button"
          onClick={handleGenerateLetter}
          disabled={isGenerating}
          className="w-full py-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-xs transition-all cursor-pointer disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Generating Letter with AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate AI Cover Letter</span>
            </>
          )}
        </button>
      </div>

      {/* Manual Letter Header Fields */}
      <div className="p-3.5 bg-[#090b12] border border-zinc-800/80 rounded-xl space-y-3">
        <h4 className="text-xs font-semibold text-zinc-300 m-0">Recipient & Company</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <div>
            <label className="text-[10px] font-medium text-zinc-400 block mb-1">Company Name</label>
            <div className="relative">
              <Building className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={coverLetter.companyName}
                onChange={(e) => updateCoverLetter('companyName', e.target.value)}
                placeholder="Google"
                className="w-full pl-8 pr-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-medium text-zinc-400 block mb-1">Role Title</label>
            <div className="relative">
              <Briefcase className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={coverLetter.jobTitle}
                onChange={(e) => updateCoverLetter('jobTitle', e.target.value)}
                placeholder="Senior Engineer"
                className="w-full pl-8 pr-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-medium text-zinc-400 block mb-1">Recipient Name</label>
            <div className="relative">
              <User className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={coverLetter.recipientName}
                onChange={(e) => updateCoverLetter('recipientName', e.target.value)}
                placeholder="Hiring Team"
                className="w-full pl-8 pr-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-medium text-zinc-400 block mb-1">Date</label>
            <div className="relative">
              <Calendar className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={coverLetter.date}
                onChange={(e) => updateCoverLetter('date', e.target.value)}
                placeholder="September 2026"
                className="w-full pl-8 pr-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Letter Body Textarea */}
        <div>
          <label className="text-[10px] font-medium text-zinc-400 block mb-1">Letter Content</label>
          <textarea
            rows={8}
            value={coverLetter.body}
            onChange={(e) => updateCoverLetter('body', e.target.value)}
            placeholder="Dear Hiring Team,&#10;&#10;I am writing to express my interest in..."
            className="w-full p-2.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
          />
        </div>
      </div>

    </div>
  );
}
