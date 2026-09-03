export const sampleResumeData = {
  personalInfo: {
    fullName: "Sachin Gupta",
    jobTitle: "Senior Frontend Engineer & React Specialist",
    email: "sachingupta00134@gmail.com",
    phone: "+91 99136 29460",
    location: "Gujarat, India",
    website: "https://sachin-creates.vercel.app",
    linkedin: "https://linkedin.com/in/sachin-gupta",
    github: "https://github.com/SacHiN814358",
    summary: "Innovative and results-driven Frontend Developer with 4+ years of expertise in building high-performance, accessible, and responsive web applications using React, Next.js, and modern CSS architectures. Proven track record of improving site speed by 40% and delivering robust client solutions."
  },
  experiences: [
    {
      id: "exp-1",
      company: "Apex Digital Solutions",
      position: "Lead Frontend Developer",
      location: "Remote",
      startDate: "Jan 2023",
      endDate: "Present",
      current: true,
      bullets: [
        "Architected and deployed a high-traffic SaaS dashboard utilizing React, Tailwind CSS, and Vite, serving 50k+ active users.",
        "Refactored legacy codebases into modular functional components with Custom Hooks, cutting load times by 35%.",
        "Integrated secure REST & GraphQL APIs with automated caching layers and optimistic UI updates."
      ]
    },
    {
      id: "exp-2",
      company: "Nexus Creative Tech",
      position: "Frontend Developer",
      location: "Ahmedabad, India",
      startDate: "Jun 2021",
      endDate: "Dec 2022",
      current: false,
      bullets: [
        "Developed 15+ responsive client websites and interactive landing pages with pixel-perfect Figma translations.",
        "Collaborated with UI/UX designers to implement fluid animations using Framer Motion and GSAP.",
        "Authored comprehensive end-to-end and unit test suites ensuring 95%+ code coverage."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "Gujarat Technological University",
      degree: "Bachelor of Technology in Computer Engineering",
      location: "Gujarat, India",
      startDate: "2018",
      endDate: "2022",
      gpa: "8.6 / 10.0"
    }
  ],
  skills: [
    { category: "Frontend", items: ["React.js", "JavaScript (ES6+)", "TypeScript", "HTML5/CSS3", "Tailwind CSS", "Next.js"] },
    { category: "Tools & DevOps", items: ["Git", "GitHub", "Vite", "Webpack", "Vercel", "Figma", "REST APIs"] },
    { category: "Architecture & Testing", items: ["Redux Toolkit", "Context API", "Vitest", "Jest", "Performance Optimization"] }
  ],
  projects: [
    {
      id: "proj-1",
      name: "CineVerse Streaming Platform",
      tech: "React, TMDB API, Tailwind CSS, Framer Motion",
      link: "https://cineverse.vercel.app",
      github: "https://github.com/SacHiN814358/cineverse",
      description: "A Netflix-grade entertainment discovery hub featuring live trailer playback, debounced search, and local watchlist persistence."
    },
    {
      id: "proj-2",
      name: "ResuMate AI Builder",
      tech: "React, Google Gemini API, Tailwind CSS, html2pdf",
      link: "https://resumate-ai.vercel.app",
      github: "https://github.com/SacHiN814358/resumate-ai",
      description: "An AI-powered resume and cover letter builder with instant bullet enhancement, ATS formatting, and PDF export."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Meta Certified Front-End Developer",
      issuer: "Coursera / Meta",
      date: "2023"
    },
    {
      id: "cert-2",
      name: "Responsive Web Design Certification",
      issuer: "freeCodeCamp",
      date: "2022"
    }
  ]
};

export const emptyResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: ""
  },
  experiences: [],
  education: [],
  skills: [
    { category: "Core Skills", items: [] }
  ],
  projects: [],
  certifications: []
};

export const sampleCoverLetter = {
  recipientName: "Hiring Team",
  recipientTitle: "Talent Acquisition Manager",
  companyName: "Innovate Labs",
  companyAddress: "Bengaluru, India",
  jobTitle: "Senior Frontend Engineer",
  date: "September 2026",
  body: "Dear Hiring Team,\n\nI am writing to express my enthusiastic interest in the Senior Frontend Engineer role at Innovate Labs. With 4+ years of professional experience crafting scalable, responsive, and performance-optimized web applications using React, Tailwind CSS, and modern web APIs, I am eager to contribute to your engineering team's mission.\n\nIn my previous roles, I have consistently led the frontend architecture for high-traffic SaaS products, cutting bundle sizes by 35% and streamlining user onboarding funnels. My passion lies at the intersection of aesthetic UI/UX precision and high-efficiency code.\n\nThank you for considering my application. I look forward to the opportunity to discuss how my technical skills and passion for building stellar web experiences align with your team's goals.\n\nWarm regards,\nSachin Gupta"
};
