import { describe, it, expect } from 'vitest';
import { sampleResumeData, emptyResumeData, sampleCoverLetter } from '../utils/initialData';

describe('Resume Data Model & Integrity', () => {
  it('should have valid personal info in sample data', () => {
    expect(sampleResumeData.personalInfo.fullName).toBe('Sachin Gupta');
    expect(sampleResumeData.personalInfo.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(sampleResumeData.personalInfo.summary.length).toBeGreaterThan(20);
  });

  it('should have valid experiences structure with bullet points array', () => {
    expect(Array.isArray(sampleResumeData.experiences)).toBe(true);
    expect(sampleResumeData.experiences.length).toBeGreaterThanOrEqual(1);
    const exp = sampleResumeData.experiences[0];
    expect(exp).toHaveProperty('company');
    expect(exp).toHaveProperty('position');
    expect(Array.isArray(exp.bullets)).toBe(true);
    expect(exp.bullets.length).toBeGreaterThanOrEqual(1);
  });

  it('should have valid skills categories', () => {
    expect(Array.isArray(sampleResumeData.skills)).toBe(true);
    sampleResumeData.skills.forEach(cat => {
      expect(cat).toHaveProperty('category');
      expect(Array.isArray(cat.items)).toBe(true);
      expect(cat.items.length).toBeGreaterThan(0);
    });
  });

  it('should contain a default cover letter template', () => {
    expect(sampleCoverLetter.body.length).toBeGreaterThan(50);
    expect(sampleCoverLetter).toHaveProperty('companyName');
    expect(sampleCoverLetter).toHaveProperty('jobTitle');
  });

  it('should provide clean empty template with empty strings and arrays', () => {
    expect(emptyResumeData.personalInfo.fullName).toBe('');
    expect(emptyResumeData.experiences).toEqual([]);
    expect(emptyResumeData.education).toEqual([]);
    expect(emptyResumeData.projects).toEqual([]);
  });
});
