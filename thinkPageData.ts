// ============================================================
// THINK PAGE — Content Data File
// Edit all copy, links, and content here.
// Feed this into Cursor alongside ThinkPage.tsx
// ============================================================

export const thinkMeta = {
  /** Each string is one stacked line; use one entry for a single-line name. */
  name: ["Praveen Elanchezhian"],
  /** Which `name` line (0-based) gets outline styling; use an index with no line to disable (e.g. 1 when only one line). */
  nameOutlineIndex: 1,
  /**
   * Hero subtitle: [rotate1]  working at the intersection of  [rotate2] (single line in UI).
   * Include any leading/trailing spaces you want; use whitespace-pre in UI so they don’t collapse.
   */
  subtitleBetween: "  working at the intersection of  ",
  subtitleRotatingRoles: ["Product & Marketing Strategist", "Filmmaker", "Engineer"],
  subtitleRotatingIntersection: ["Strategies", "Stories", "Systems"],
  /** ms between phrase changes — both hero rotators tick together on this interval. */
  subtitleRotationMs: 3600,
  /** Tailwind: outer “pill” around each rotating phrase (edit freely). */
  subtitleRotatingMainClassName:
    "inline-flex w-max shrink-0 flex-nowrap items-center justify-center overflow-hidden px-2 sm:px-2 md:px-3 bg-cyan-300 text-black py-2 sm:py-2.5 md:py-3 rounded-lg leading-normal",
  /** Clip vertical scroll; fixed min-height keeps the row visually one line. */
  subtitleRotatingSplitLevelClassName:
    "pb-1 pt-0.5",
  /** Optional accent lines below subtitle; omit or use [] to hide. */
  heroCaptionLines: [] as string[],
  profileImage: "/images/PE.webp",
};

export const thinkManifesto = {
  statement: [
    // Each item is a segment; mark { text, highlight: true } for accent color
    { text: "At the intersection of story, strategy, and systems" },
  ],
};

export const thinkCV = {
  label: "Resume / Curriculum Vitae",
  buttonText: "Download CV",
  // Replace "#" with your actual hosted PDF link e.g. Google Drive, Notion, etc.
  link: "#",
};

// ─── EDUCATION ──────────────────────────────────────────────
export const thinkEducation = [
  {
    institution: "NIT Trichy",
    degree: "Master of Business Administration (MBA)",
    period: "2024 – 2026",
    focus: "Product Management & Marketing Strategy",
    description:
      "Specialising in the intersection of technology, marketing, and product design — with applied work in AR/XR and brand communication.",
  },
  {
    institution: "Loyola ICAM College of Engineering, Chennai",
    degree: "B.E. Electronics & Communication Engineering",
    period: "2020 – 2024",
    focus: "Technical Foundation",
    description:
      "Strong grounding in systems thinking, signal processing, and hardware — the engineering lens I bring to every product decision.",
  },
];

// ─── EXPERIENCE ─────────────────────────────────────────────
export const thinkExperience = [
  {
    role: "Product Design Engineer & Consultant — AR Smart Glass",
    company: "Tamizh",
    period: "Jul 2024 – Present",
    description:
      "Designing UI/UX for AR Smart Glasses with hand gesture and voice control. Collaborating on display and interaction systems for early-stage XR hardware.",
    tools: ["Figma", "Unity", "Blender"],
    // Replace "#" with LinkedIn post, Notion case study, Google Drive, etc.
    link: "#",
    linkLabel: "Case Study — Coming Soon",
  },
  {
    role: "Summer Intern — Brand-Aligned Marketing Strategies",
    company: "Madarth",
    period: "May – Jul 2025",
    description:
      "Built social media calendars, copywriting, and video scripts for TAFE and DahNAY. Experimented with 3D modelling and AI-based design workflows.",
    tools: ["Notion", "Canva", "Adobe Suite"],
    link: "#",
    linkLabel: "View Work — Coming Soon",
  },
];

// ─── SKILLS ─────────────────────────────────────────────────
export const thinkSkills = [
  {
    group: "Product & Strategy",
    items: [
      "Product Management",
      "Go-to-Market Strategy",
      "User Research",
      "Competitive Analysis",
    ],
  },
  {
    group: "Design & UX",
    items: ["UI/UX Design", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    group: "Marketing",
    items: [
      "Brand Strategy",
      "Content Marketing",
      "Social Media",
      "Campaign Management",
    ],
  },
  {
    group: "Technical",
    items: ["Data Analysis", "SQL Basics", "A/B Testing", "Agile Methodologies"],
  },
];

// ─── TOOLS ──────────────────────────────────────────────────
// tier: "Proficient" | "Advanced" | "Expert"
// level: 0–100 (drives the bar width visually)
export const thinkTools = [
  { name: "Figma",            category: "Design",       level: 90, tier: "Advanced"  },
  { name: "Notion",           category: "Productivity", level: 95, tier: "Expert"    },
  { name: "Canva",            category: "Design",       level: 92, tier: "Expert"    },
  { name: "Adobe XD",         category: "Design",       level: 85, tier: "Proficient"},
  { name: "Google Analytics", category: "Analytics",    level: 85, tier: "Proficient"},
  { name: "Miro",             category: "Collaboration",level: 88, tier: "Advanced"  },
  { name: "Jira",             category: "Project Mgmt", level: 80, tier: "Proficient"},
  { name: "Excel",            category: "Analytics",    level: 90, tier: "Advanced"  },
];

// ─── CERTIFICATIONS (add when available) ────────────────────
// Leave empty array [] to hide the section entirely
export const thinkCertifications: {
  name: string;
  issuer: string;
  year: string | number;
  link: string;
}[] = [
  // Example:
  // { name: "Google Analytics Certification", issuer: "Google", year: 2025, link: "https://..." },
  // { name: "Product Management Fundamentals", issuer: "Coursera / NIT", year: 2025, link: "#" },
];
