import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, FolderGit2, Link as LinkIcon, Code } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const { projects } = resumeData;

  return (
    <div className="space-y-4 text-left">
      {projects.map((proj, idx) => (
        <div key={proj.id} className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400">Project #{idx + 1}</span>
            <button
              type="button"
              onClick={() => removeProject(proj.id)}
              className="text-slate-400 hover:text-rose-400 p-1 rounded hover:bg-rose-500/10"
              title="Delete Project"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Project Name</label>
              <div className="relative">
                <FolderGit2 className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                  placeholder="e.g. CineVerse Streaming App"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Tech Stack</label>
              <div className="relative">
                <Code className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={proj.tech}
                  onChange={(e) => updateProject(proj.id, 'tech', e.target.value)}
                  placeholder="React, TMDB API, Tailwind CSS"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Live Demo Link</label>
              <div className="relative">
                <LinkIcon className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="url"
                  value={proj.link || ''}
                  onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                  placeholder="https://cineverse.vercel.app"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">GitHub Repo Link</label>
              <div className="relative">
                <GithubIcon className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="url"
                  value={proj.github || ''}
                  onChange={(e) => updateProject(proj.id, 'github', e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Project Description & Impact</label>
            <textarea
              rows={2}
              value={proj.description}
              onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
              placeholder="High-performance entertainment platform with debounced search, trailer modals, and responsive layout..."
              className="w-full p-2.5 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

        </div>
      ))}

      <button
        type="button"
        onClick={addProject}
        className="w-full py-2.5 border-2 border-dashed border-slate-700 hover:border-indigo-500/50 rounded-xl text-xs font-semibold text-slate-400 hover:text-indigo-400 flex items-center justify-center gap-2 hover:bg-indigo-500/5 transition-all"
      >
        <Plus className="w-4 h-4" /> Add Project
      </button>
    </div>
  );
}
