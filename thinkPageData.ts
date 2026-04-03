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
  "When I need something on deck, Canva is the move. Assets, pitch one-pagers, quick decks — my go-to without dragging me into a design rabbit hole.",
  "My shared language with design. Where I test flows, poke at UX assumptions, and make sure what I'm imagining is actually buildable.",
  "This is home. Every narrative cut, every dialogue sequence, every creative piece that needs to actually land — Premiere is where I live when the story has to be earned in the edit.",
  "The polish layer. I reach for After Effects when a motion title or a clean composite is the difference between a video that feels finished and one that just... ends.",
  "Pixel-level work when it counts. Key art, asset cleanup, that one image that needs to look exactly right — no substitute when the still matters.",
  "When a lightweight prototype needs to slot into an older Adobe-centric handoff without friction, XD is still there.",
  "My safety net in the Adobe ecosystem. When an asset needs to be controlled at the vector level and done properly, Illustrator is the answer.",
  "A good deck has a narrative arc, a clear ask, and visuals that hold the room. PowerPoint is where I build the story before I'm in the war-room.",
  "When a decision needs a number behind it, Excel is where I go to either prove or kill the idea. Models, budgets, sanity checks, pros and cons — spreadsheet thinking is still real thinking.",
  "Sprint hygiene isn't glamorous but it matters. ClickUp keeps tasks owned, workstreams visible, and the gap between product and marketing from becoming a blame conversation.",
  "I reach for Python when no-code hits its ceiling. Automation, light scripting, stitching data pipelines together, IoT side quests — it's a no-brainer.",
  "Still figuring out where generative fits in my workflow, but Higgsfield is where I run the experiments. Fast visual ideation that sometimes produces something worth keeping.",
  "Not my favourite, but when someone needs a dashboard they can actually read — not just a spreadsheet they'll ignore — Power BI steps in. Still figuring it out honestly.",
  "When a project lives or dies in the grade, I move to Resolve. Colour, finishing, the kind of post Premiere isn't built to obsess over — this is my grading-first workflow.",
  "My driver for this site and everything I'm building on the side. AI-assist that keeps the iteration loop tight and me in flow.",
  "Version control, reviews, a clean history of what shipped and why. Not exciting — just non-negotiable.",
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
    focus: "Product Management & Marketing Strategy",
    description:
      "Specialising in the intersection of technology, marketing, and product design — with applied work in AR/XR and brand communication.",
  },
  {
    institution: "Loyola ICAM College of Engineering and Technology, Chennai",
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
