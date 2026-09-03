import { describe, it, expect } from 'vitest';
import { 
  cleanAiText, 
  generateOfflineFallback, 
  enhanceBulletPoint, 
  generateSummary, 
  generateCoverLetter, 
  suggestSkillsForRole 
} from '../services/geminiService';
import { sampleResumeData } from '../utils/initialData';

describe('Gemini AI Service Layer & Fallbacks', () => {
  it('should clean quotes and backticks from AI text', () => {
    expect(cleanAiText('"Built a scalable React web app"')).toBe('Built a scalable React web app');
    expect(cleanAiText('`Spearheaded frontend refactor`')).toBe('Spearheaded frontend refactor');
    expect(cleanAiText('   Clean text with spaces   ')).toBe('Clean text with spaces');
  });

  it('should generate an enhanced bullet point even without an API key (offline fallback)', async () => {
    const result = await enhanceBulletPoint({
      bulletText: 'made website faster',
      role: 'Frontend Engineer',
      apiKey: null
    });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(20);
    expect(result).not.toContain('"');
  });

  it('should generate a professional summary without an API key', async () => {
    const result = await generateSummary({
      jobTitle: 'React Specialist',
      skills: sampleResumeData.skills,
      experiences: sampleResumeData.experiences,
      apiKey: null
    });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(40);
  });

  it('should generate a structured cover letter', async () => {
    const letter = await generateCoverLetter({
      resumeData: sampleResumeData,
      jobTitle: 'Senior Frontend Developer',
      companyName: 'Google',
      jobDescription: 'Build next-gen user interfaces.',
      apiKey: null
    });
    expect(letter).toContain('Dear Hiring Team');
    expect(letter.length).toBeGreaterThan(100);
  });

  it('should suggest an array of skills for a given job title', async () => {
    const skills = await suggestSkillsForRole({ jobTitle: 'Frontend Engineer', apiKey: null });
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
    expect(typeof skills[0]).toBe('string');
  });

  it('should handle empty bullet points gracefully', async () => {
    const emptyResult = await enhanceBulletPoint({ bulletText: '   ' });
    expect(emptyResult).toBe('');
  });
});
