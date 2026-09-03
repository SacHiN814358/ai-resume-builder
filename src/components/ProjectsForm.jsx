import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, FolderGit2, Link as LinkIcon, Code } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const { projects } = resumeData;

  return (
    <div className="space-y-3.5 pt-2 text-left">
      {projects.map((proj, idx) => (
        <div key={proj.id} className="p-3 bg-[#090b12] border border-zinc-800/80 rounded-xl space-y-2.5 relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Project #{idx + 1}</span>
            <button
              type="button"
              onClick={() => removeProject(proj.id)}
              className="text-zinc-500 hover:text-rose-400 p-1 rounded hover:bg-rose-500/10 cursor-pointer"
              title="Delete Project"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-medium text-zinc-400 block mb-1">Project Name</label>
              <div className="relative">
                <FolderGit2 className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                  placeholder="e.g. CineVerse"
                  className="w-full pl-8 pr-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-medium text-zinc-400 block mb-1">Technologies</label>
              <div className="relative">
                <Code className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={proj.tech}
                  onChange={(e) => updateProject(proj.id, 'tech', e.target.value)}
                  placeholder="React, Tailwind, API"
                  className="w-full pl-8 pr-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-medium text-zinc-400 block mb-1">Live URL</label>
              <div className="relative">
                <LinkIcon className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
                <input
                  type="url"
                  value={proj.link || ''}
                  onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                  placeholder="https://..."
                  className="w-full pl-8 pr-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-medium text-zinc-400 block mb-1">GitHub Repo</label>
              <div className="relative">
                <GithubIcon className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
                <input
                  type="url"
                  value={proj.github || ''}
                  onChange={(e) => updateProject(proj.id, 'github', e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full pl-8 pr-2.5 py-1.5 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-medium text-zinc-400 block mb-1">Summary & Highlights</label>
            <textarea
              rows={2}
              value={proj.description}
              onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
              placeholder="Key architectural decisions, performance results, and metrics..."
              className="w-full p-2 bg-[#0f111a] border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

        </div>
      ))}

      <button
        type="button"
        onClick={addProject}
        className="w-full py-2 border border-dashed border-zinc-800 hover:border-zinc-700 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 flex items-center justify-center gap-1.5 hover:bg-zinc-800/40 transition-all cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" /> Add Project
      </button>
    </div>
  );
}
