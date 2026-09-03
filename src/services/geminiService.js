/**
 * Gemini AI Service for ResuMate AI
 * Handles AI Bullet Point Polish, Professional Summary Generation, 
 * Skill Suggestions, and Tailored Cover Letters.
 */

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

/**
 * Helper to call Gemini REST API or fallback to rule-based smart AI generator
 */
export async function callGeminiApi(prompt, systemInstruction = "", userApiKey = null) {
  const apiKey = userApiKey || (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GEMINI_API_KEY : null);

  if (!apiKey) {
    // Return offline high-quality fallback if no API key is available
    return generateOfflineFallback(prompt);
  }

  try {
    const url = `${GEMINI_API_URL}?key=${apiKey}`;
    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemInstruction ? `System Context: ${systemInstruction}\n\n` : ''}${prompt}` }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `API error: HTTP ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedText) {
      throw new Error("No response generated from AI.");
    }

    return cleanAiText(generatedText);
  } catch (error) {
    console.warn("Gemini API call failed, falling back to smart generator:", error.message);
    return generateOfflineFallback(prompt);
  }
}

/**
 * Cleans unwanted markdown wrapping or excessive quotes
 */
export function cleanAiText(text) {
  if (!text) return "";
  let cleaned = text.trim();
  // Remove wrapping quotes if AI returned it as a quote
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith('`') && cleaned.endsWith('`'))) {
    cleaned = cleaned.slice(1, -1).trim();
  }
  return cleaned;
}

/**
 * 1. Enhance Resume Bullet Point
 */
export async function enhanceBulletPoint({ bulletText, role = "Software Engineer", tone = "impactful", apiKey = null }) {
  if (!bulletText || !bulletText.trim()) return "";

  const prompt = `You are a Fortune 500 Senior Tech Recruiter and Resume Writer. 
Transform this resume bullet point for a "${role}" into a strong, quantifiable, ATS-optimized action statement using the XYZ formula (Accomplished [X] as measured by [Y], by doing [Z]).
Tone: ${tone}.
Original bullet: "${bulletText}"

Provide ONLY the enhanced single bullet sentence without bullet markers, introductory text, or quotes.`;

  return callGeminiApi(prompt, "You are a professional ATS resume optimizer.", apiKey);
}

/**
 * 2. Generate Professional Summary
 */
export async function generateSummary({ jobTitle, skills = [], experiences = [], tone = "professional", apiKey = null }) {
  const skillsList = skills.flatMap(s => s.items || []).slice(0, 10).join(", ");
  const expHighlights = experiences.slice(0, 2).map(e => `${e.position} at ${e.company}`).join(", ");

  const prompt = `Write a high-impact, 3-4 sentence ATS-friendly professional summary for a resume.
Target Job Title: ${jobTitle || "Frontend Developer"}
Key Skills: ${skillsList || "React, JavaScript, Web Development"}
Experience Highlights: ${expHighlights || "Frontend Development"}
Tone: ${tone}

Return ONLY the summary paragraph without any headers or quotation marks.`;

  return callGeminiApi(prompt, "You are an executive resume writer.", apiKey);
}

/**
 * 3. Generate Tailored Cover Letter
 */
export async function generateCoverLetter({ resumeData, jobTitle, companyName, jobDescription, tone = "enthusiastic", apiKey = null }) {
  const candidateName = resumeData?.personalInfo?.fullName || "Candidate";
  const currentTitle = resumeData?.personalInfo?.jobTitle || "Developer";
  const topSkills = (resumeData?.skills || []).flatMap(s => s.items || []).slice(0, 8).join(", ");

  const prompt = `Write a compelling, professional 3-paragraph Cover Letter.
Candidate Name: ${candidateName}
Current Title: ${currentTitle}
Target Position: ${jobTitle || "Frontend Developer"}
Target Company: ${companyName || "Tech Innovations Inc."}
Key Candidate Skills: ${topSkills}
Job Description / Notes: ${jobDescription || "Looking for an experienced engineer to build modern web applications."}
Tone: ${tone}

Format:
Dear Hiring Team,

[Paragraph 1: Hook and enthusiasm for role and company]
[Paragraph 2: Key relevant achievements, technical alignment, and value proposition]
[Paragraph 3: Confident call to action and appreciation]

Sincerely,
${candidateName}

Return ONLY the complete letter text.`;

  return callGeminiApi(prompt, "You are a world-class career strategist.", apiKey);
}

/**
 * 4. Suggest Skills for a Job Title
 */
export async function suggestSkillsForRole({ jobTitle, apiKey = null }) {
  const prompt = `Provide a JSON array of 12 most sought-after technical skills and tools for a "${jobTitle || "Frontend Engineer"}".
Format must be strictly valid JSON array of strings, e.g. ["Skill 1", "Skill 2"]. Do not wrap in markdown backticks.`;

  const result = await callGeminiApi(prompt, "Return strictly a JSON array of strings.", apiKey);
  try {
    const parsed = JSON.parse(result.replace(/```json|```/g, '').trim());
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // fallback
  }
  return ["React.js", "TypeScript", "Next.js", "Tailwind CSS", "REST APIs", "Git", "State Management", "Performance Optimization"];
}

/**
 * Offline Fallback Generator when API Key is not set or network is offline
 */
export function generateOfflineFallback(prompt) {
  if (prompt.includes("bullet point") || prompt.includes("Accomplished [X]")) {
    const enhancedVariants = [
      "Architected and deployed high-performance web modules utilizing modern React architectures, resulting in a 40% reduction in page latency.",
      "Spearheaded the redesign of core user workflows, boosting user engagement by 28% and achieving 99.8% crash-free sessions.",
      "Engineered automated caching and state management pipelines, improving API query throughput and cutting infrastructure overhead."
    ];
    return enhancedVariants[Math.floor(Math.random() * enhancedVariants.length)];
  }

  if (prompt.includes("professional summary")) {
    return "Results-driven Software Engineer with a proven track record of designing scalable, high-performing web applications. Adept at bridging modern UI/UX design with robust frontend architectures to drive user satisfaction and business growth.";
  }

  if (prompt.includes("Cover Letter")) {
    return `Dear Hiring Team,\n\nI am writing to convey my keen interest in joining your team. With a proven background in engineering scalable, modern applications, I am eager to contribute to your upcoming product milestones.\n\nThroughout my career, I have focused on writing clean, maintainable code, accelerating release cycles, and translating complex Figma designs into responsive, accessible web interfaces.\n\nThank you for your time and consideration. I welcome the opportunity to discuss how my skill set can deliver immediate impact.\n\nSincerely,\nCandidate`;
  }

  return "Enhanced with modern AI precision.";
}
