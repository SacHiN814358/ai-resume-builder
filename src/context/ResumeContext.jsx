import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleResumeData, emptyResumeData, sampleCoverLetter } from '../utils/initialData';

const ResumeContext = createContext(null);

const STORAGE_KEY_RESUME = 'resucraft_resume_data_v1';
const STORAGE_KEY_LETTER = 'resucraft_cover_letter_v1';
const STORAGE_KEY_SETTINGS = 'resucraft_settings_v1';

export const THEME_COLORS = [
  { id: 'indigo', name: 'Indigo Blue', primary: '#4f46e5', secondary: '#e0e7ff', text: '#312e81', border: '#c7d2fe' },
  { id: 'emerald', name: 'Emerald Green', primary: '#059669', secondary: '#d1fae5', text: '#064e3b', border: '#a7f3d0' },
  { id: 'rose', name: 'Rose Red', primary: '#e11d48', secondary: '#ffe4e6', text: '#881337', border: '#fecdd3' },
  { id: 'amber', name: 'Warm Amber', primary: '#d97706', secondary: '#fef3c7', text: '#78350f', border: '#fde68a' },
  { id: 'cyan', name: 'Electric Cyan', primary: '#0891b2', secondary: '#cffafe', text: '#164e63', border: '#a5f3fc' },
  { id: 'slate', name: 'Executive Slate', primary: '#334155', secondary: '#f1f5f9', text: '#0f172a', border: '#cbd5e1' }
];

export const TEMPLATES = [
  { id: 'modern', name: 'Modern Tech', badge: 'Popular', description: 'Two-column layout with sidebar and accent skills' },
  { id: 'ats', name: 'Minimal ATS', badge: 'ATS High Score', description: 'Single-column clean hierarchy ideal for scanning' },
  { id: 'executive', name: 'Executive Elegance', badge: 'Leadership', description: 'Classic centered header with refined dividers' }
];

export function ResumeProvider({ children }) {
  // 1. Resume State with LocalStorage Autosave
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RESUME);
      return saved ? JSON.parse(saved) : sampleResumeData;
    } catch {
      return sampleResumeData;
    }
  });

  // 2. Cover Letter State
  const [coverLetter, setCoverLetter] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LETTER);
      return saved ? JSON.parse(saved) : sampleCoverLetter;
    } catch {
      return sampleCoverLetter;
    }
  });

  // 3. Settings & Active View State
  const [activeTab, setActiveTab] = useState('resume'); // 'resume' | 'cover-letter'
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [themeColor, setThemeColor] = useState(THEME_COLORS[0]);
  const [apiKey, setApiKey] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      return saved ? JSON.parse(saved)?.apiKey || '' : '';
    } catch {
      return '';
    }
  });

  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState('personal');

  // Autosave to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RESUME, JSON.stringify(resumeData));
    } catch (e) {
      console.error('Failed to save resume to localStorage', e);
    }
  }, [resumeData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LETTER, JSON.stringify(coverLetter));
    } catch (e) {
      console.error('Failed to save cover letter to localStorage', e);
    }
  }, [coverLetter]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify({ apiKey }));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  }, [apiKey]);

  // Actions
  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  // Experiences
  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: ['']
    };
    setResumeData(prev => ({ ...prev, experiences: [newExp, ...prev.experiences] }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const addBullet = (expId) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => {
        if (exp.id === expId) {
          return { ...exp, bullets: [...exp.bullets, ''] };
        }
        return exp;
      })
    }));
  };

  const updateBullet = (expId, index, value) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => {
        if (exp.id === expId) {
          const newBullets = [...exp.bullets];
          newBullets[index] = value;
          return { ...exp, bullets: newBullets };
        }
        return exp;
      })
    }));
  };

  const removeBullet = (expId, index) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => {
        if (exp.id === expId) {
          return { ...exp, bullets: exp.bullets.filter((_, i) => i !== index) };
        }
        return exp;
      })
    }));
  };

  // Education
  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    setResumeData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // Skills
  const addSkillCategory = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { category: 'New Category', items: [] }]
    }));
  };

  const updateSkillCategoryName = (index, name) => {
    setResumeData(prev => {
      const newSkills = [...prev.skills];
      newSkills[index] = { ...newSkills[index], category: name };
      return { ...prev, skills: newSkills };
    });
  };

  const addSkillItem = (categoryIndex, skill) => {
    if (!skill || !skill.trim()) return;
    setResumeData(prev => {
      const newSkills = [...prev.skills];
      const items = newSkills[categoryIndex].items || [];
      if (!items.includes(skill.trim())) {
        newSkills[categoryIndex] = { ...newSkills[categoryIndex], items: [...items, skill.trim()] };
      }
      return { ...prev, skills: newSkills };
    });
  };

  const removeSkillItem = (categoryIndex, itemIndex) => {
    setResumeData(prev => {
      const newSkills = [...prev.skills];
      newSkills[categoryIndex] = {
        ...newSkills[categoryIndex],
        items: newSkills[categoryIndex].items.filter((_, i) => i !== itemIndex)
      };
      return { ...prev, skills: newSkills };
    });
  };

  const removeSkillCategory = (index) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  // Projects
  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      name: '',
      tech: '',
      link: '',
      github: '',
      description: ''
    };
    setResumeData(prev => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const updateProject = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => proj.id === id ? { ...proj, [field]: value } : proj)
    }));
  };

  const removeProject = (id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  // Certifications
  const addCertification = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: ''
    };
    setResumeData(prev => ({ ...prev, certifications: [...prev.certifications, newCert] }));
  };

  const updateCertification = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => cert.id === id ? { ...cert, [field]: value } : cert)
    }));
  };

  const removeCertification = (id) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  // Cover letter updates
  const updateCoverLetter = (field, value) => {
    setCoverLetter(prev => ({ ...prev, [field]: value }));
  };

  // Load Sample & Clear Data
  const loadSampleData = () => {
    setResumeData(sampleResumeData);
    setCoverLetter(sampleCoverLetter);
  };

  const clearAllData = () => {
    setResumeData(emptyResumeData);
    setCoverLetter({
      recipientName: '',
      recipientTitle: '',
      companyName: '',
      companyAddress: '',
      jobTitle: '',
      date: '',
      body: ''
    });
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      setResumeData,
      coverLetter,
      setCoverLetter,
      activeTab,
      setActiveTab,
      selectedTemplate,
      setSelectedTemplate,
      themeColor,
      setThemeColor,
      apiKey,
      setApiKey,
      isAiLoading,
      setIsAiLoading,
      activeAccordion,
      setActiveAccordion,
      updatePersonalInfo,
      addExperience,
      updateExperience,
      removeExperience,
      addBullet,
      updateBullet,
      removeBullet,
      addEducation,
      updateEducation,
      removeEducation,
      addSkillCategory,
      updateSkillCategoryName,
      addSkillItem,
      removeSkillItem,
      removeSkillCategory,
      addProject,
      updateProject,
      removeProject,
      addCertification,
      updateCertification,
      removeCertification,
      updateCoverLetter,
      loadSampleData,
      clearAllData
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
