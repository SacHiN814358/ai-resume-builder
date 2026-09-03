import React from 'react';
import { useResume } from '../context/ResumeContext';
import FormAccordion from './FormAccordion';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import CertificationsForm from './CertificationsForm';
import CoverLetterForm from './CoverLetterForm';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  FolderGit2, 
  Award, 
  Mail, 
  Lightbulb 
} from 'lucide-react';

export default function ResumeEditor() {
  const { 
    activeTab, 
    activeAccordion, 
    setActiveAccordion, 
    resumeData 
  } = useResume();

  if (activeTab === 'cover-letter') {
    return (
      <div className="p-4 md:p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-65px)]">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 text-left">
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Mail className="w-4 h-4" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider m-0">Cover Letter Builder</h2>
          </div>
          <p className="text-xs text-slate-400 m-0">Craft a targeted, high-impact application letter tailored to your dream company.</p>
        </div>
        <CoverLetterForm />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-3.5 overflow-y-auto max-h-[calc(100vh-65px)] text-left">
      
      {/* Quick AI Pro Tip Banner */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/20 rounded-2xl p-3.5 flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div className="text-xs text-slate-300">
          <span className="font-bold text-white">AI Pro Tip:</span> Click the <span className="text-indigo-300 font-semibold">"✨ AI Polish"</span> button next to any experience bullet point to automatically rewrite it using Google's <em>XYZ Formula</em> (Accomplished [X] by [Y] measured by [Z]).
        </div>
      </div>

      {/* 1. Personal Information Accordion */}
      <FormAccordion
        id="personal"
        title="Personal Information"
        icon={User}
        activeId={activeAccordion}
        onToggle={setActiveAccordion}
        badge={resumeData.personalInfo.fullName ? 'Filled' : 'Required'}
      >
        <PersonalInfoForm />
      </FormAccordion>

      {/* 2. Work Experience Accordion */}
      <FormAccordion
        id="experience"
        title="Work Experience"
        icon={Briefcase}
        activeId={activeAccordion}
        onToggle={setActiveAccordion}
        badge={`${resumeData.experiences?.length || 0} Added`}
      >
        <ExperienceForm />
      </FormAccordion>

      {/* 3. Skills & Competencies Accordion */}
      <FormAccordion
        id="skills"
        title="Skills & Technologies"
        icon={Sparkles}
        activeId={activeAccordion}
        onToggle={setActiveAccordion}
        badge={`${resumeData.skills?.reduce((acc, cat) => acc + (cat.items?.length || 0), 0) || 0} Skills`}
      >
        <SkillsForm />
      </FormAccordion>

      {/* 4. Projects Accordion */}
      <FormAccordion
        id="projects"
        title="Featured Projects"
        icon={FolderGit2}
        activeId={activeAccordion}
        onToggle={setActiveAccordion}
        badge={`${resumeData.projects?.length || 0} Projects`}
      >
        <ProjectsForm />
      </FormAccordion>

      {/* 5. Education Accordion */}
      <FormAccordion
        id="education"
        title="Education & Academics"
        icon={GraduationCap}
        activeId={activeAccordion}
        onToggle={setActiveAccordion}
        badge={`${resumeData.education?.length || 0} Degrees`}
      >
        <EducationForm />
      </FormAccordion>

      {/* 6. Certifications Accordion */}
      <FormAccordion
        id="certifications"
        title="Certifications & Awards"
        icon={Award}
        activeId={activeAccordion}
        onToggle={setActiveAccordion}
        badge={`${resumeData.certifications?.length || 0} Certs`}
      >
        <CertificationsForm />
      </FormAccordion>

    </div>
  );
}
