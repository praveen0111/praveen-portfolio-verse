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
   * Hero subtitle middle pill (decrypt effect; synced with left/right). Spacing vs pills added in ThinkPage.
   */
  subtitleRotatingBetween: [
    "writing",
    "building",
    "crafting",
    "developing",
    "shaping",
    "designing",
  ],
  subtitleRotatingRoles: ["Product strategist", "Marketing strategist", "Filmmaker", "Engineer"],
  subtitleRotatingIntersection: ["strategies", "stories", "systems"],
  /** ms between phrase changes — all three hero rotators tick together on this interval. */
  subtitleRotationMs: 3600,
  /** Tailwind: outer “pill” around each rotating phrase (edit freely). */
  subtitleRotatingMainClassName:
    "inline-flex w-max max-w-none shrink-0 flex-nowrap items-center justify-center overflow-hidden whitespace-nowrap px-0.5 sm:px-1 md:justify-start md:pl-0 md:pr-1 bg-cyan-300 text-white py-2 sm:py-2.5 md:py-3 rounded-lg leading-normal",
  /** Clip vertical scroll; fixed min-height keeps the row visually one line. */
  subtitleRotatingSplitLevelClassName:
    "pb-1 pt-0.5",
  /** Optional accent lines below subtitle; omit or use [] to hide. */
  heroCaptionLines: [] as string[],
  profileImage: "/images/PE.webp",
};

/**
 * Tool ids parallel to `thinkTechstackIconImageUrls` (uniform 512×512 PNG under `/public/logo-cloud/icons/`; a matching `.svg` wrapper lives beside each PNG for reuse).
 */
export const thinkTechstackIconSlugs: string[] = [
  "canva",
  "figma",
  "premierepro",
  "aftereffects",
  "photoshop",
  "xd",
  "powerpoint",
  "excel",
  "clickup",
  "python",
  "higgsfield",
  "powerbi",
  "davinciresolve",
  "cursor",
  "jira",
  "github",
  "vscode",
];

/** Human-readable names for icon cloud hover (same order as URLs / slugs). */
export const thinkTechstackIconLabels: string[] = [
  "Canva",
  "Figma",
  "Adobe Premiere Pro",
  "Adobe After Effects",
  "Adobe Photoshop",
  "Adobe XD",
  "PowerPoint",
  "Excel",
  "ClickUp",
  "Python",
  "Higgsfield",
  "Power BI",
  "DaVinci Resolve",
  "Cursor",
  "Jira",
  "GitHub",
  "Visual Studio Code",
];

const logoIcon = (slug: string) => `/logo-cloud/icons/${slug}.png`;

export const thinkTechstackIconImageUrls: string[] = thinkTechstackIconSlugs.map(logoIcon);

/** 1–5 stars per tool — same order as icons (edit to match your experience). */
export type ThinkTechstackXpStars = 1 | 2 | 3 | 4 | 5;

export const thinkTechstackIconXp: ThinkTechstackXpStars[] = [
  4, 5, 5, 4, 4, 4, 5, 4, 4, 4, 3, 4, 5, 5, 4, 5, 5,
];

/**
 * How and why you use each tool — same order as icons.
 * Edit freely; shown on desktop when hovering the cloud.
 */
export const thinkTechstackIconUsage: string[] = [
  "Quick social and pitch visuals: Canva keeps brand-consistent layouts fast when I don’t need a full design file.",
  "Figma is where I prototype flows, hand off specs, and align with design on UX before anything ships.",
  "Premiere is my timeline for narrative cuts, dialogue, and delivery—especially for creative and campaign pieces.",
  "After Effects for motion titles, simple compositing, and polish that sells the story without over-building.",
  "Photoshop for still retouching, key art tweaks, and asset cleanup when pixels matter.",
  "XD when I need lightweight prototypes or legacy handoffs tied to older Adobe-centric workflows.",
  "PowerPoint for storytelling decks: narrative arc, clear asks, and exec-ready visuals.",
  "Excel for models, budgets, and data sanity checks when decisions need a spreadsheet backbone.",
  "ClickUp for sprint hygiene: tasks, owners, and visibility across product and marketing workstreams.",
  "Python for scripting, light automation, and gluing data pipelines when no-code isn’t enough.",
  "Higgsfield for generative experiments and rapid visual ideation alongside traditional pipelines.",
  "Power BI for dashboards and stakeholder reporting when data needs to be readable, not just accurate.",
  "DaVinci Resolve for colour, finishing, and heavier post when the project demands a grading-first workflow.",
  "Cursor is my daily IDE for this site and side projects—AI-assisted coding with tight iteration loops.",
  "Jira for backlog hygiene, epics, and engineering alignment when delivery needs traceability.",
  "GitHub for version control, reviews, and shipping changes with a clear history.",
  "VS Code for editing, extensions, and a familiar environment across stacks and repos.",
];

export const thinkManifesto = {
  statement: [
    // Each item is a segment; mark { text, highlight: true } for accent color
    { text: "At the intersection of story, strategy, and systems" },
  ],
};

export const thinkCV = {
  label: "Resume / Curriculum Vitae",
  buttonText: "Download CV",
  // Replace "#" with your actual hosted PDF link e.g. Google Drive, etc.
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
    // Replace "#" with LinkedIn post, Google Drive, etc.
    link: "#",
    linkLabel: "Case Study — Coming Soon",
  },
  {
    role: "Summer Intern — Brand-Aligned Marketing Strategies",
    company: "Madarth",
    period: "May – Jul 2025",
    description:
      "Built social media calendars, copywriting, and video scripts for TAFE and DahNAY. Experimented with 3D modelling and AI-based design workflows.",
    tools: ["Canva", "Adobe Suite"],
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
