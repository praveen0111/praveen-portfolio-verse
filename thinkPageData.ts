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
  "illustrator",
  "powerpoint",
  "excel",
  "clickup",
  "python",
  "higgsfield",
  "powerbi",
  "davinciresolve",
  "cursor",
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
  "Adobe Illustrator",
  "PowerPoint",
  "Excel",
  "ClickUp",
  "Python",
  "Higgsfield",
  "Power BI",
  "DaVinci Resolve",
  "Cursor",
  "GitHub",
  "Visual Studio Code",
];

/** Bump when any raster under `/logo-cloud/icons/` changes so the canvas cloud reloads images (same path is otherwise cached). */
const LOGO_CLOUD_ICONS_VERSION = "20260406-stack";

const logoIcon = (slug: string) => `/logo-cloud/icons/${slug}.png?v=${LOGO_CLOUD_ICONS_VERSION}`;

export const thinkTechstackIconImageUrls: string[] = thinkTechstackIconSlugs.map(logoIcon);

/** Star rating per tool (0.5 steps). Same order as icons. */
export type ThinkTechstackXpStars = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export const thinkTechstackIconXp: ThinkTechstackXpStars[] = [
  4, 3.5, 5, 4, 3.5, 3.5, 3, 4.5, 4, 4, 4, 3.5, 3, 3.5, 4, 3, 3,
];

/**
 * How and why you use each tool — same order as icons.
 * Edit freely; shown on desktop when hovering the cloud.
 */
export const thinkTechstackIconUsage: string[] = [
  "My go-to tool for anything on deck is Canva — assets, pitch one-pagers, quick decks — without dragging me into a design rabbit hole.",
  "My shared language with design. Figma is where I test flows, poke at UX assumptions, and make sure what I'm imagining is actually buildable.",
  "This is my home. Every narrative cut, every dialogue sequence, every creative piece that needs to actually land is brewed there. Premiere is where I live.",
  "The polish layer. I reach for After Effects when I feel the difference between a video that feels finished and one that just... ends.",
  "Pixel-level work when it counts. Key art, asset cleanup, that one image that needs to look exactly right.",
  "When a lightweight prototype needs to slot into an older Adobe-centric workflow without friction.",
  "Just to be safe in the Adobe ecosystem to control assets in the most possible way!",
  "PowerPoint is where I build the story before I'm in the war-room.",
  "When a decision needs a number behind it, Excel is where I go to either prove or kill the idea. Models, budgets, sanity checks, pros and cons, organizing. Spreadsheet thinking is real!",
  "Sprint hygiene matters. ClickUp keeps tasks owned, workstreams visible, and the gap between product and marketing from becoming a blame conversation. The agile gun.",
  "I reach for Python when I want total control over a tool. Automation, light scripting, stitching data pipelines together, IoT side quests… This snake is a no brainer.",
  "Still figuring out where generative AI fits in my workflow, but Higgsfield is where I run the experiments. Fast visual ideation that sometimes produces something worth keeping.",
  "Not my favourite, but when someone needs a dashboard, not just a spreadsheet, I reach for this tool. But still figuring out!",
  "Colour, finishing, the kind of post that Premiere isn't built to obsess over — this is my grading-first workflow. Node < < Layer.",
  "My driver for this site and everything I'm building on the side.",
  "Version control, reviews, a clean history.",
  "Reliable across every stack I've touched. Extensions for whatever I need, familiar enough to never slow me down.",
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
    focusLine: "Major in Marketing, Business Analysis & IT Consulting",
    description:
      "Specialising in the intersection of technology, marketing, and strategies — with applied work in brand communication.",
  },
  {
    institution: "Loyola ICAM College of Engineering and Technology, Chennai",
    degree: "B.E. Electronics & Communication Engineering",
    period: "2020 – 2024",
    focus: "Technical Foundation",
    description:
      "Strong grounding in systems thinking, IoT, emerging technologies and hardware — the engineering lens I bring to every decision.",
  },
];

// ─── EXPERIENCE ─────────────────────────────────────────────
export const thinkExperience = [
  {
    role: "Management Consultant",
    company: "Tamizh Research and Development Pvt. Ltd.",
    period: "Jul 2024 – Present",
    description:
      "Consulted on strategy and execution while the team builds next-generation AR smart glasses — clarifying priorities with people and process management, keeping delivery honest when hardware, software, and partnerships move in parallel, and turning fuzzy goals into workable plans. Set up and ran project rhythm in ClickUp and Zoho suite for ownership, milestones, reviews; so choices stay tied to roadmaps.",
    tools: ["Zoho Suite", "ClickUp", "Strategy", "Project management"],
    // Replace "#" with LinkedIn post, Google Drive, etc.
    link: "#",
    linkLabel: "Case Study — Coming Soon",
  },
  {
    role: "Summer Intern — Brand-Aligned Marketing Strategies",
    company: "Madarth",
    period: "May 2025 – Jul 2025",
    description:
      "Built social media calendars, copywriting, and video scripts for TAFE and DahNAY. Experimented with 3D modelling and AI-based design workflows.",
    tools: ["Canva", "Adobe Suite", "Excel", "Basecamp"],
    link: "https://madarthintern.my.canva.site/",
    linkLabel: "Summer internship summary",
    /** Renders a bottom-right “View Deck” chip (same sizing as tool tags); card is not wrapped in a link. */
    viewDeck: true,
  },
  {
    role: "Product Design Intern",
    company: "Tamizh Research and Development Pvt. Ltd.",
    period: "Jul 2023 – Jan 2024",
    description:
      "Conducted market research on AR smart glasses and translated findings into cross-functional briefs. Managed prototyping documentation, iterative design tracking, and brand asset development so outputs met team quality standards and process compliance.",
    tools: ["Market research", "Prototyping", "Documentation", "Brand assets"],
    link: "#",
    linkLabel: "Portfolio / case study — coming soon",
  },
];

// ─── PROJECTS ───────────────────────────────────────────────
export const thinkProjects = [
  {
    title: "MBA Connect – Application Framework",
    kind: "Academic Project - NIT Trichy",
    period: "Aug 2025 – Oct 2025",
    highlights: [
      "Contributed to the project plan for MBA Connect, a data-driven placement and networking platform.",
      "Designed module scope, 90-day Gantt schedule, resource allocation matrix, and performed COCOMO-based effort and schedule estimation.",
    ],
    ctaLinks: [
      {
        label: "Figma Design",
        href: "https://www.figma.com/proto/nL8bRdTpxkrFDsdcVzIVYm/MBA-Connect_SPM?page-id=0%3A1&node-id=19-3&viewport=679%2C344%2C0.3&t=8bZKcZM5MwSphX88-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=19%3A3",
      },
      {
        label: "View Doc",
        href: "https://drive.google.com/file/d/1eU4DDYrM2M4Z_61TpD2eoLQ0mmOBfJ7K/view?usp=drive_link",
      },
    ],
  },
  {
    title: "Tactile Feedback – Haptic VR Gloves",
    kind: "Academic Project",
    period: "Feb 2024 – May 2024",
    highlights: [
      "Managed end-to-end execution: research, design, prototyping, risk tracking, and documentation; supported internal review to ensure project quality compliance.",
      "Documented project outcomes and improvement recommendations; supported internal review processes to minimize risk and ensure compliance with project standards.",
    ],
    ctaLinks: [
      {
        label: "View Doc",
        href: "https://drive.google.com/file/d/1UxsLQZiHQ303ScSmnwXR7Qbd2fWDqZs9/view",
      },
    ],
  },
  {
    title: "BeakHen – BLE Tracker",
    kind: "Academic Project",
    period: "Nov 2022 – Dec 2022",
    highlights: [
      "Built a BLE-based item tracker (BeakHen) on ESP32 with 3D-printed prototype.",
      "Conducted competitive benchmarking against Apple AirTag and Samsung SmartTag, pricing and B2C market strategy, positioning as a low-cost, open-ecosystem alternative.",
    ],
    ctaLinks: [
      {
        label: "View Doc",
        href: "https://drive.google.com/file/d/1fXaiAgQPYZHzA_FdM0rM5U78uMGRgALf/view?usp=sharing",
      },
    ],
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
