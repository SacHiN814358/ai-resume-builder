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
  Info 
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
      <div className="p-4 md:p-5 space-y-4 overflow-y-auto max-h-[calc(100vh-60px)]">
        <div className="bg-[#121520] border border-zinc-800/80 rounded-xl p-4 text-left">
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Mail className="w-4 h-4" />
            <h2 className="text-xs font-bold text-zinc-100 uppercase tracking-wider m-0">Cover Letter Builder</h2>
          </div>
          <p className="text-xs text-zinc-400 m-0">Create a tailored cover letter matching your target role and company.</p>
        </div>
        <CoverLetterForm />
      </div>
    );
  }

  return (
    <div className="p-3.5 md:p-5 space-y-2.5 overflow-y-auto max-h-[calc(100vh-60px)] text-left">
      
      {/* Subtle Pro Tip Bar */}
      <div className="bg-[#121520] border border-zinc-800/80 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-3 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>Use <strong>✨ AI Polish</strong> to optimize bullet points with quantifiable metrics.</span>
        </div>
      </div>

      {/* 1. Personal Information */}
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

      {/* 2. Work Experience */}
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

      {/* 3. Skills & Technologies */}
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

      {/* 4. Projects */}
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

      {/* 5. Education */}
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

      {/* 6. Certifications */}
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
