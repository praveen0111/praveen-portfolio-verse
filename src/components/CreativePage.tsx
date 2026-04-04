import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import ComicParticles from "./ComicParticles";
import DotGrid from "./DotGrid";

interface CreativePageProps {
  onGoHome: () => void;
  onSwitchToThink: () => void;
  onNavigateToContact: () => void;
}

type CreativeProject = {
  title: string;
  genre: string;
  typeLabel: string;
  year: string;
  runtime: string;
  link: string;
  filters: string[];
  role: string;
  description: string;
  experience: string;
  awards: string[];
};

const projects: CreativeProject[] = [
  {
    title: "Penance",
    genre: "Short film",
    typeLabel: "Short Film · Horror",
    year: "2025",
    runtime: "16 Minutes",
    link: "https://filmfreeway.com/projects/3961431",
    filters: ["shortfilm", "writer", "director", "editor", "vfx", "sounddesign"],
    role: "Writer · Director · Editor · VFX · Sound Design",
    description:
      "Eleven years after a childhood tragedy, Joseph returns to his old home, carrying a silence that never left him. Over the course of a single night, unsettling occurrences begin to surface. Shadows linger. Whistles echo. As the past seeps into the present, Joseph is forced to confront the truth he has long buried.",
    experience:
      "Written and directed in collaboration with my long-time creative collaborator Nishanth, Penance was executed under intense constraints, completed in a continuous 22-hour shoot with minimal resources.\n\nThe project pushed both technical and creative boundaries, incorporating VFX workflows and selectively leveraging AI tools to achieve complex visual sequences, followed by a detailed post-production process.",
    awards: [
      "Best Film · FILMFLIX Film Festival · XLRI Jamshedpur",
      "Best Cinematographer · Centerstage '26 · MCC Chennai",
      "Best Film · Lens Flare '25 · IIIT Bengaluru",
      "Best Film (Runner-Up) · Shorts24 2026 · HCC Trichy",
      "Best Cinematographer · Kalam '26 · SIET Coimbatore",
    ],
  },
  {
    title: "GR3Y",
    genre: "Short film",
    typeLabel: "Short Film · Thriller / Noir",
    year: "2023",
    runtime: "33 Minutes",
    link: "https://youtu.be/s5pPz_CYvmc?si=KbP9BfULiNgo1Wif",
    filters: ["shortfilm", "writer", "director", "editor", "vfx"],
    role: "Writer · Director · Editor · VFX",
    description: "A murder. A trial. A treasure hunt.\nThree narratives, bound by a thin, unsettling thread of grey.",
    experience:
      "Written and directed alongside my long-time collaborator Nishanth, GR3Y explored a layered, non-linear screenplay structure that interweaves multiple narratives.\nThe film draws subtle influence from classical Tamil literature, adding a mystic undertone to its noir atmosphere. Produced on a minimal budget of ₹3000, it became a turning point in pushing creative ambition under constraints.\nThe project involved complex VFX workflows and early experimentation with AI-generated visuals using Stable Diffusion during its nascent stage, followed by a detailed post-production process.",
    awards: [
      "Best Short Film (2nd Runner-Up) · Kaolin National Level Short Film Festival 2024 · Nehru College, Coimbatore",
      "Best Short Film (2nd Runner-Up) & Best Cinematography · Pathivugal 2024 · PSG College of Arts & Science, Coimbatore",
      "Best Director, Best Short Film, Best Editor, Best Thriller, Best Production · Malda International Film Festival",
      "Official Selection · Pillar4 · MCC, Chennai",
      "Official Selection · Bollywood USA International Film Festival",
      "Official Selection · Amader International Short Film Festival",
    ],
  },
  {
    title: "STRANGERS",
    genre: "Short film",
    typeLabel: "Short Film · Drama",
    year: "2024",
    runtime: "8 Minutes",
    link: "https://youtu.be/vIg_xE6YwXw?si=ppPXXu-qfI6dtKWo",
    filters: ["shortfilm", "editor", "director", "cinematographer"],
    role: "Editor · Director · Cinematographer",
    description:
      "A conversation between a stranger and a bystander unfolds, past and present collide, revealing the enduring impact of one act of courage and kindness, where small gestures ripple through lives, leaving lasting impressions.",
    experience:
      "STRANGERS was conceived and executed at an intense pace, planned within 48 hours, shot in a single day, and completed in under a week including editing and post-production.\nFilmed in live railway stations across Chennai, the project demanded real-time adaptability, working amidst unpredictable environments and uncontrolled public spaces.\nThis film marked a deliberate shift into drama, focusing on performance, subtle emotion, and grounded storytelling. Managing a crew of 15-20 members along with multiple junior artists required tight coordination and on-the-spot decision-making.\nShot entirely on an iPhone 13, the choice of equipment enabled agility, intimacy in framing, and seamless filming in crowded public locations, reinforcing the film's raw and realistic tone.",
    awards: [
      "Winner · Mobile Cinema Category · Pillar4 Film Festival 2024 · MCC, Chennai",
      "Official Selection · Pillar4 Film Festival 2024 · MCC, Chennai",
      "Official Selection · Duemila30 2024 · Milan, Italy",
      "Official Selection · Cineaste International Film Festival of India (CIFFI) 2023/2024",
      "Jury Mention · Cineaste International Film Festival of India (CIFFI) 2023/2024",
      "Official Selection · RECharge Short Film Competition 2024 · REC, Chennai",
      "Second Runner-Up · Best Film · RECharge Short Film Competition 2024 · REC, Chennai",
      "Winner · Best Film · Engenia 2023",
      "Best Director · Engenia 2023",
    ],
  },
  {
    title: "Thiruttu Dhum",
    genre: "Short film",
    typeLabel: "Short Film · Drama",
    year: "2025",
    runtime: "1 Minute",
    link: "https://youtu.be/HuUq15D1RLI?si=42FetzWo8Y44Jiiy",
    filters: ["shortfilm", "cinematographer", "creativepro"],
    role: "Cinematographer · Creative Producer",
    description:
      "A boy sneaks into the bathroom for a forbidden smoke while his strict father sleeps outside. When a sudden knock breaks the silence, panic takes over. He tries to dispose of the cigarette, but it refuses to sink. What follows is a frantic attempt to hide the evidence.",
    experience:
      "Created for the International Toilet Festival 3.0 Short Film Competition under the theme 'Once Upon a Loo,' Thiruttu Dhum was an exercise in speed, constraint, and spontaneity.\n\nThe film was conceptualized, shot, and completed within 24 hours, with the shoot itself taking place over a focused 3-hour midnight schedule.\n\nFilmed entirely on an iPhone 15, the project embraced a guerrilla filmmaking approach, using practical lighting and adapting to the tight, irregular geometry of a small bathroom space. The constraints shaped both the visual style and staging, resulting in a compact, tension-driven narrative.",
    awards: [],
  },
  {
    title: "Policy Bazaar × Sathyeah",
    genre: "AD",
    typeLabel: "Advertisement",
    year: "2025",
    runtime: "2 Minutes",
    link: "https://www.instagram.com/p/DL-CIsaRQVD/",
    filters: ["ad", "cinematographer", "creativepro"],
    role: "Cinematographer · Creative Producer",
    description: "",
    experience:
      "Contributed to the creative production of an influencer-led advertisement for Policy Bazaar, produced in collaboration with the Tamil YouTube creator Sathyeah.\n\nThe visual approach was designed to align seamlessly with Sathyeah's established content style, incorporating dynamic shot choices, whip pans, and high-energy transitions to retain his signature tone while integrating the brand narrative organically.\n\nFocused on maintaining creator authenticity alongside brand communication, the film achieved strong audience engagement and received positive reception across his viewer base.",
    awards: [],
  },
  {
    title: "English Partner × Sathyeah",
    genre: "AD",
    typeLabel: "Advertisement",
    year: "2025",
    runtime: "2 Minutes",
    link: "https://www.instagram.com/p/DPWUX42EWrc/",
    filters: ["ad", "cinematographer", "creativepro"],
    role: "Cinematographer · Creative Producer",
    description: "",
    experience:
      "Contributed to the creative production of an influencer-led advertisement for English Partner, in collaboration with Tamil YouTube creator Sathyeah.\n\nThe film balanced a more serious, awareness-driven narrative with Sathyeah's signature humour and delivery style. It focused on highlighting how language barriers, particularly in English communication, can limit opportunities for capable individuals.\n\nThe challenge was to maintain emotional weight without losing audience engagement, achieved by blending informative messaging with familiar tonal elements from Sathyeah's content. This ensured both relatability and effective brand communication.\n\nThe final piece resonated well with the audience, receiving strong engagement and positive feedback.",
    awards: [],
  },
  {
    title: "TAMIZH Product Concept",
    genre: "AD",
    typeLabel: "Advertisement",
    year: "2026",
    runtime: "1 Minute",
    link: "https://drive.google.com/file/d/1KLaJTFdDQAvU_Z1VVd01-cLYaJGAoIWW/view?usp=sharing",
    filters: ["promo", "ad", "editor", "creativepro"],
    role: "Editor · Concept · AI Prompt Engineer",
    description: "",
    experience:
      "Developed a concept video for XR smart glasses using a fully AI-driven production pipeline, intended for stakeholder presentation and early-stage product visualization.\n\nLeveraged the Higgsfield platform to generate the entire video from scratch, establishing a structured workflow that integrated prompt design, image generation, and video synthesis.\n\nThe project focused on clearly communicating product use cases and vision without traditional production resources, demonstrating the ability to translate abstract ideas into compelling visual narratives using emerging AI tools.",
    awards: [],
  },
  {
    title: "Eggsistence",
    genre: "Short film",
    typeLabel: "Short Film · Drama / Satire",
    year: "2022",
    runtime: "2 Minutes",
    link: "https://youtu.be/VzBBPgxui_I?si=Mh_UoBh_5wtpgUus",
    filters: ["shortfilm", "writer", "director", "editor", "cinematographer"],
    role: "Writer · Director · Editor · Cinematographer",
    description: "A tale of an egg and a nation, where the ordinary becomes a mirror to something far more political, personal, and absurd.",
    experience:
      "Eggsistence was conceived, shot, and completed within an intense 3-day timeframe for a competition. Although it was not selected in its initial submission, the film went on to find recognition across multiple film festivals nationwide.\n\nShot entirely on a OnePlus 8 smartphone, the project embraced minimalism and resourcefulness, using satire as a lens to explore layered themes with simplicity and impact. The experience reinforced the idea that constraints can often sharpen storytelling rather than limit it.",
    awards: [
      "Winner · Best Short Film · Breaking Barriers: Short Film Contest · LSR, Delhi University",
      "Honorable Mention · Student World Impact Film Festival",
      "Finalist · Clapperboard Film Festival · PEFTI Film Festival",
      "Official Selection · Kalakari Film Fest · Urbanite Arts & Film Festival",
    ],
  },
  {
    title: "Nisadya 1-DTG",
    genre: "Promo Video",
    typeLabel: "Promo Video",
    year: "2026",
    runtime: "2 Minutes",
    link: "https://www.instagram.com/reel/DVOW9jNCcfw/",
    filters: ["promo", "director", "cinematographer", "editor"],
    role: "Director · Cinematographer · Editor",
    description: "",
    experience:
      "Executed within a 24-hour turnaround for a college event, Nisadya 1-DTG was an exercise in rapid production under extreme constraints.\n\nThe project explored a horror and mystery-driven visual tone using minimal resources. Low-light cinematography played a central role, with innovative use of thermocol sheets as reflectors and mobile phone torchlights as primary light sources.\n\nShot entirely on an iPhone, the production relied on improvisation, spatial awareness, and quick decision-making to achieve a stylized atmosphere despite limited equipment and time.",
    awards: [],
  },
  {
    title: "Nisadya Date Reveal",
    genre: "Promo Video",
    typeLabel: "Promo Video",
    year: "2026",
    runtime: "1 Minute",
    link: "https://www.instagram.com/reel/DT-FYzDjENr/",
    filters: ["promo", "director", "cinematographer", "editor"],
    role: "Director · Cinematographer · Editor",
    description: "",
    experience:
      "Conceptualized, shot, edited, and released within an intense 4-hour window as part of a promotional campaign for a college event.\n\nThe video embraced a Western cinematic tone, leveraging golden hour lighting to create a warm, atmospheric visual identity. Shot entirely on an iPhone, the project balanced speed with strong visual intent.\n\nRotoscopy and AI-assisted tools were used to enhance select frames, adding stylization and depth while maintaining a fast turnaround.",
    awards: [],
  },
  {
    title: "LICET's FABLAB",
    genre: "Promo Video",
    typeLabel: "Promo Video",
    year: "2022",
    runtime: "1 Minute",
    link: "https://www.youtube.com/watch?v=fz-wXQDsNsI&t=23s",
    filters: ["promo", "director", "cinematographer", "editor"],
    role: "Director · Cinematographer · Editor",
    description: "",
    experience:
      "Shot on an iPhone, this promo video was designed to cinematically showcase the facilities and equipment within LICET's FABLAB.\n\nThe visual narrative focused on dynamic framing and rhythmic editing, with cuts precisely aligned to music beats to create an engaging and immersive viewing experience.\n\nThe final video continues to be featured on LICET's main public display.",
    awards: [],
  },
  {
    title: "ATOM – Campus Partner",
    genre: "AD",
    typeLabel: "Advertisement / Assignment",
    year: "2024",
    runtime: "1 Minute",
    link: "https://drive.google.com/file/d/1tzTkK2a5WI41MQMi0UHb2RSgZulGsGOW/view",
    filters: ["ad", "director", "cinematographer", "editor"],
    role: "Director · Cinematographer · Editor",
    description: "",
    experience:
      "Created as part of a Design Thinking coursework, this video highlights the entrepreneurial ecosystem at NIT Trichy and the institutional support available for student-led innovation.\n\nThe project was developed under a strict sub-1-minute constraint, requiring concise storytelling and clear visual communication.\n\nFocused on presenting a culture of ideation, incubation, and execution, the video balances informational clarity with engaging visuals.",
    awards: [],
  },
  {
    title: "Dumb, Dumber & Dumbest",
    genre: "Short film",
    typeLabel: "Short Film · Dark Humor",
    year: "2025",
    runtime: "8 Minutes",
    link: "https://youtu.be/trQzgJ3--Vw",
    filters: ["shortfilm", "vfx"],
    role: "VFX",
    description:
      "Three eccentric criminals. One unexpected betrayal. A spiral into chaos where things go hilariously, and violently, out of control.",
    experience:
      "Contributed as a VFX artist for this project, directed by Somesh. Brought in to execute specific shots requiring raw, gritty blood effects and subtle visual enhancements.\n\nThe work was completed within a tight one-day turnaround, demanding precision and speed under time constraints.\n\nThis project marked a shift from directing and writing into a focused technical role, collaborating on a film outside my usual creative circle and contributing purely through post-production and VFX execution.",
    awards: [],
  },
];

const FILTER_BAR = [
  { label: "Writer", token: "writer" },
  { label: "Director", token: "director" },
  { label: "Editor", token: "editor" },
  { label: "Cinematographer", token: "cinematographer" },
  { label: "Advertisement", token: "ad" },
  { label: "Short Film", token: "shortfilm" },
  { label: "Promo Videos", token: "promo" },
  { label: "VFX", token: "vfx" },
  { label: "Sound Design", token: "sounddesign" },
  { label: "Creative Producer", token: "creativepro" },
] as const;

const DEFAULT_IMAGES = ["/Create/atom/poster.webp", "/Create/atom/scene1.webp", "/Create/atom/scene2.webp"];

const projectImages: Record<string, string[]> = {
  Penance: ["/Create/penance/poster.webp", "/Create/penance/scene1.webp", "/Create/penance/scene2.webp"],
  GR3Y: ["/Create/gr3y/poster.webp", "/Create/gr3y/scene1.webp", "/Create/gr3y/scene2.webp"],
  STRANGERS: ["/Create/strangers/poster.webp", "/Create/strangers/scene1.webp", "/Create/strangers/scene2.webp"],
  "Thiruttu Dhum": ["/Create/thiruttu/poster.webp", "/Create/thiruttu/scene1.webp", "/Create/thiruttu/scene2.webp"],
  "Policy Bazaar × Sathyeah": ["/Create/policy/poster.webp", "/Create/policy/scene1.webp", "/Create/policy/scene2.webp"],
  "English Partner × Sathyeah": ["/Create/english/poster.webp", "/Create/english/scene1.webp", "/Create/english/scene2.webp"],
  Eggsistence: ["/Create/egg/poster.webp", "/Create/egg/scene1.webp", "/Create/egg/scene2.webp"],
  "Nisadya 1-DTG": [
    "/Create/nisadya1dtg/poster.webp",
    "/Create/nisadya1dtg/scene1.webp",
    "/Create/nisadya1dtg/scene2.webp",
  ],
  "Nisadya Date Reveal": [
    "/Create/nisadyadatereveal/poster.webp",
    "/Create/nisadyadatereveal/scene1.webp",
    "/Create/nisadyadatereveal/scene2.webp",
  ],
  "LICET's FABLAB": ["/Create/fablab/poster.webp", "/Create/fablab/scene1.webp", "/Create/fablab/scene2.webp"],
  "ATOM – Campus Partner": ["/Create/atom/poster.webp", "/Create/atom/scene1.webp", "/Create/atom/scene2.webp"],
  "Dumb, Dumber & Dumbest": [
    "/Create/dumbdumber/poster.webp",
    "/Create/dumbdumber/scene1.webp",
    "/Create/dumbdumber/scene2.webp",
  ],
  "TAMIZH Product Concept": ["/Create/Tamizh/Poster.webp", "/Create/Tamizh/Scene1.webp", "/Create/Tamizh/Scene2.webp"],
};

/** Fixed close (×) — comic tile chrome */
const POPUP_CLOSE_BTN =
  "flex h-11 w-11 shrink-0 items-center justify-center border-4 border-black bg-[hsl(var(--creative-bg))] font-comic font-bold leading-none text-white shadow-[4px_4px_0_hsl(var(--creative-accent))] transition-[transform,box-shadow,filter] duration-150 touch-manipulation hover:brightness-110 active:translate-y-px active:shadow-[2px_2px_0_hsl(var(--creative-accent))] active:brightness-110 md:h-12 md:w-12";

/** Full-screen popup carousel only. Grid cards stay `aspect-video`. */
function popupCarouselAspectRatio(projectTitle: string): "4 / 3" | "16 / 9" | "21 / 9" {
  if (projectTitle === "Penance") return "21 / 9";
  const fourByThree = new Set([
    "Thiruttu Dhum",
    "Policy Bazaar × Sathyeah",
    "English Partner × Sathyeah",
  ]);
  return fourByThree.has(projectTitle) ? "4 / 3" : "16 / 9";
}

function PosterCarousel({
  images,
  runtime,
  paused,
  onIndexChange,
  onDotClickStopPropagation,
}: {
  images: string[];
  runtime: string;
  paused: boolean;
  onIndexChange: (index: number) => void;
  onDotClickStopPropagation?: (e: React.MouseEvent) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    onIndexChange(selectedIndex);
  }, [selectedIndex, onIndexChange]);

  useEffect(() => {
    if (paused) return;
    if (images.length < 2) return;

    const intervalId = window.setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % images.length);
    }, 3400);

    return () => window.clearInterval(intervalId);
  }, [images.length, paused]);

  return (
    <div className="relative w-full aspect-video">
      <div className="absolute inset-0 overflow-hidden">
        {images.map((src, i) => {
          const isActive = i === selectedIndex;
          return (
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out will-change-transform will-change-filter ${
                isActive ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[1.04] blur-[8px] pointer-events-none"
              }`}
            />
          );
        })}
      </div>

      {/* YouTube-style runtime badge */}
      <div
        className="absolute bottom-2 right-2 z-10 px-2 py-1 text-[16px] md:text-[18px] bg-black/70 text-white border-2 border-white/15 font-comic font-extrabold"
        style={{ fontWeight: 800 }}
      >
        {runtime}
      </div>

      {/* Carousel dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2 items-center">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                onDotClickStopPropagation?.(e);
                e.preventDefault();
                setSelectedIndex(i);
              }}
              className={`min-h-[12px] min-w-[12px] rounded-full border-2 ${
                i === selectedIndex
                  ? "bg-[hsl(var(--creative-accent))] border-[hsl(var(--creative-accent))]"
                  : "bg-white/15 border-white/15 hover:bg-white/25 hover:border-white/25 active:bg-white/25 active:border-white/25"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PopupImageCarousel({
  images,
  initialIndex,
}: {
  images: string[];
  initialIndex: number;
}) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  useEffect(() => {
    setSelectedIndex(initialIndex);
  }, [initialIndex]);

  // Endless loop auto-slideshow in popup.
  useEffect(() => {
    if (images.length < 2) return;

    const intervalId = window.setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % images.length);
    }, 3400);

    return () => window.clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 overflow-hidden">
        {images.map((src, i) => {
          const isActive = i === selectedIndex;
          return (
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              className={`absolute inset-0 w-full h-full object-contain object-center transition-all duration-700 ease-out will-change-transform will-change-filter ${
                isActive ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[1.04] blur-[8px] pointer-events-none"
              }`}
            />
          );
        })}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 sm:gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedIndex(i);
              }}
              className="flex h-11 min-h-[44px] min-w-[44px] items-center justify-center touch-manipulation rounded-full p-2"
              aria-label={`Image ${i + 1} of ${images.length}`}
              aria-current={i === selectedIndex ? "true" : undefined}
            >
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full border-2 transition-[transform,background-color,border-color] duration-150 ${
                  i === selectedIndex
                    ? "scale-110 border-[hsl(var(--creative-accent))] bg-[hsl(var(--creative-accent))]"
                    : "border-white/40 bg-white/15 hover:scale-110 hover:border-white/60 hover:bg-white/30 active:bg-white/25"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const CreativePage = ({ onGoHome, onSwitchToThink, onNavigateToContact }: CreativePageProps) => {
  const [selectedFilterToken, setSelectedFilterToken] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupProjectTitle, setPopupProjectTitle] = useState<string | null>(null);
  const [popupInitialIndex, setPopupInitialIndex] = useState(0);

  const [cardCarouselIndices, setCardCarouselIndices] = useState<Record<string, number>>({});

  // Prevent background page scrolling while popup is open.
  useEffect(() => {
    if (!isPopupOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isPopupOpen]);

  const filteredProjects = useMemo(() => {
    if (!selectedFilterToken) return projects;
    const list = projects.filter((p) => p.filters.includes(selectedFilterToken));
    return [...list].sort((a, b) => {
      const ya = parseInt(a.year, 10) || 0;
      const yb = parseInt(b.year, 10) || 0;
      return yb - ya;
    });
  }, [selectedFilterToken]);

  const selectedFilterLabel =
    selectedFilterToken === null ? "" : FILTER_BAR.find((f) => f.token === selectedFilterToken)?.label ?? "";

  const handleOpenPopup = useCallback(
    (project: CreativeProject) => {
      const title = project.title;
      setPopupProjectTitle(title);
      setPopupInitialIndex(cardCarouselIndices[title] ?? 0);
      setIsPopupOpen(true);
    },
    [cardCarouselIndices]
  );

  const handleOpenChange = useCallback((open: boolean) => {
    setIsPopupOpen(open);
    if (!open) {
      setPopupProjectTitle(null);
    }
  }, []);

  const popupProject = useMemo(() => {
    if (!popupProjectTitle) return null;
    return projects.find((p) => p.title === popupProjectTitle) ?? null;
  }, [popupProjectTitle]);

  const popupImages = popupProject ? projectImages[popupProject.title] ?? DEFAULT_IMAGES : DEFAULT_IMAGES;
  const popupXp = popupProject
    ? popupProject.experience?.trim() ? popupProject.experience : popupProject.description
    : "";

  const popupCarouselLayout = useMemo(() => {
    const ar = popupCarouselAspectRatio(popupProjectTitle ?? "");
    const dims =
      ar === "4 / 3" ? { aw: 4, ah: 3 } : ar === "21 / 9" ? { aw: 21, ah: 9 } : { aw: 16, ah: 9 };
    return { ar, aw: dims.aw, ah: dims.ah };
  }, [popupProjectTitle]);

  const popupIndexInFiltered = useMemo(() => {
    if (!popupProjectTitle) return -1;
    return filteredProjects.findIndex((p) => p.title === popupProjectTitle);
  }, [popupProjectTitle, filteredProjects]);

  const handlePopupProjectPrev = useCallback(() => {
    const n = filteredProjects.length;
    if (n === 0) return;
    const idx = popupIndexInFiltered >= 0 ? popupIndexInFiltered : 0;
    const prevIdx = (idx - 1 + n) % n;
    const prev = filteredProjects[prevIdx];
    setPopupProjectTitle(prev.title);
    setPopupInitialIndex(cardCarouselIndices[prev.title] ?? 0);
  }, [popupIndexInFiltered, filteredProjects, cardCarouselIndices]);

  const handlePopupProjectNext = useCallback(() => {
    const n = filteredProjects.length;
    if (n === 0) return;
    const idx = popupIndexInFiltered >= 0 ? popupIndexInFiltered : 0;
    const nextIdx = (idx + 1) % n;
    const next = filteredProjects[nextIdx];
    setPopupProjectTitle(next.title);
    setPopupInitialIndex(cardCarouselIndices[next.title] ?? 0);
  }, [popupIndexInFiltered, filteredProjects, cardCarouselIndices]);

  const canPopupProjectNavigate = filteredProjects.length > 1;

  return (
    <div
      className="relative min-h-screen min-h-screen-mobile overflow-x-hidden bg-energy-creative-red"
      style={{ backgroundColor: "hsl(var(--creative-duotone-bg))" }}
    >
      <DotGrid variant="create" />
      {/* Comic Particles */}
      <ComicParticles mode="creative" />

      {/* Navigation - flat text-based, dark overlay, hover glow */}
      <nav
        className="relative z-20 py-4 md:py-6 border-b-4"
        style={{ backgroundColor: "hsl(var(--creative-bg-alt))", borderColor: "hsl(var(--creative-accent))" }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-row flex-nowrap justify-center items-stretch gap-1.5 sm:gap-3 md:gap-4">
            <Button
              onClick={onGoHome}
              className="flex-1 min-w-0 border-4 px-2 py-2 sm:px-6 sm:py-3 font-comic text-[calc(0.75rem*1.25)] sm:text-lg font-bold leading-tight text-center transition-[box-shadow,filter] duration-200 ease-out hover:brightness-110 shadow-[0_0_16px_hsl(var(--creative-accent)/0.3),4px_4px_0_hsl(var(--creative-accent)/0.4)] hover:shadow-[0_0_28px_hsl(var(--creative-accent)/0.55),0_0_52px_hsl(var(--creative-accent)/0.2),6px_6px_0_hsl(var(--creative-accent)/0.45)]"
              style={{
                backgroundColor: "hsl(var(--creative-bg-alt))",
                color: "hsl(var(--creative-fg))",
                borderColor: "hsl(var(--creative-accent))",
              }}
            >
              HOME
            </Button>
            <Button
              onClick={onSwitchToThink}
              className="flex-1 min-w-0 border-4 px-2 py-2 sm:px-6 sm:py-3 font-comic text-[calc(0.75rem*1.25)] sm:text-lg font-bold leading-tight text-center transition-[box-shadow,filter] duration-200 ease-out hover:brightness-110 shadow-[0_0_16px_hsl(var(--primary)/0.5),4px_4px_0_hsl(var(--primary)/0.5)] hover:shadow-[0_0_28px_hsl(var(--primary)/0.65),0_0_52px_hsl(var(--primary)/0.25),6px_6px_0_hsl(var(--primary)/0.55)]"
              style={{
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                borderColor: "hsl(var(--primary))",
              }}
            >
              VIEW THINK.
            </Button>
            <Button
              onClick={onNavigateToContact}
              className="flex-1 min-w-0 border-4 px-2 py-2 sm:px-6 sm:py-3 font-comic text-[calc(0.75rem*1.25)] sm:text-lg font-bold leading-tight text-center transition-[box-shadow,filter] duration-200 ease-out hover:brightness-110 shadow-[0_0_16px_hsl(var(--accent)/0.5),4px_4px_0_hsl(var(--accent)/0.5)] hover:shadow-[0_0_28px_hsl(var(--accent)/0.65),0_0_52px_hsl(var(--accent)/0.25),6px_6px_0_hsl(var(--accent)/0.55)]"
              style={{
                backgroundColor: "hsl(var(--accent))",
                color: "hsl(var(--accent-foreground))",
                borderColor: "hsl(var(--accent))",
              }}
            >
              CONTACT
            </Button>
          </div>
        </div>
      </nav>

      {/* Header Panel */}
      <header
        className="relative z-10 py-8 md:py-12 text-center border-b-4"
        style={{ backgroundColor: "hsl(var(--creative-bg-alt))", borderColor: "hsl(var(--creative-accent))" }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-comic font-bold mb-4" style={{ color: "hsl(var(--creative-fg))" }}>
            I Create <span style={{ color: "hsl(var(--creative-accent))" }}>Cinematic</span> PROJECTS
          </h1>
        </div>
      </header>

      {/* Filter + Grid */}
      <main className="relative z-10">
        <section className="container mx-auto px-4 md:px-6 py-8 md:py-10">
          {/* FILTER BAR */}
          <div className="flex flex-col gap-4">
            {/* FILTER HEADER LAYOUT (I WORKED AS/IN + selected title) */}
            <div className="flex items-center justify-center gap-4">
              <p className="text-base md:text-2xl font-comic-secondary font-bold" style={{ color: "hsl(var(--creative-fg))" }}>
                I WORKED AS/IN
              </p>
              {selectedFilterToken !== null && (
                <h2
                  className="text-lg md:text-xl px-5 py-3 inline-block border-4 font-bold"
                  style={{
                    backgroundColor: "hsl(var(--creative-accent))",
                    color: "hsl(var(--creative-bg))",
                    borderColor: "hsl(var(--creative-glow))",
                    boxShadow:
                      "0 0 20px hsl(var(--creative-accent) / 0.4), 12px 12px 0 hsl(var(--creative-accent) / 0.25)",
                  }}
                >
                  {selectedFilterLabel}
                </h2>
              )}
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-wrap justify-center gap-2">
                {FILTER_BAR.map((f) => {
                  const isActive = selectedFilterToken === f.token;
                  return (
                    <button
                      key={f.token}
                      type="button"
                      onClick={() => setSelectedFilterToken(f.token)}
                      className="border-4 font-comic text-sm md:text-base font-bold px-4 py-2 touch-manipulation transition-transform duration-200 hover:scale-[1.06] hover:brightness-110 active:scale-[1.06] active:brightness-110"
                      style={{
                        backgroundColor: isActive ? "hsl(var(--creative-accent))" : "hsl(var(--creative-bg-alt))",
                        color: isActive ? "hsl(var(--creative-bg))" : "hsl(var(--creative-fg-muted))",
                        borderColor: isActive ? "hsl(var(--creative-glow))" : "hsl(var(--creative-accent))",
                        boxShadow: isActive
                          ? "0 0 16px hsl(var(--creative-accent) / 0.45), 4px 4px 0 hsl(var(--creative-accent) / 0.25)"
                          : "0 0 12px hsl(var(--creative-accent) / 0.15), 2px 2px 0 hsl(var(--creative-accent) / 0.2)",
                      }}
                      aria-pressed={isActive}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>

              <Button
                type="button"
                onClick={() => setSelectedFilterToken(null)}
                className="border-4 font-comic text-sm md:text-base font-bold px-4 py-2"
                style={{
                  backgroundColor: "hsl(var(--accent))",
                  color: "hsl(var(--accent-foreground))",
                  borderColor: "hsl(var(--accent))",
                  boxShadow: "0 0 16px hsl(var(--accent) / 0.5), 4px 4px 0 hsl(var(--accent) / 0.5)",
                }}
              >
                CLEAR
              </Button>
            </div>
          </div>

          {/* YouTube-style Grid Layout for Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 auto-rows-fr mt-8">
            {filteredProjects.map((project) => {
              const images = projectImages[project.title] ?? DEFAULT_IMAGES;

              return (
                <div key={project.title} className="h-full">
                  {/* Clicking a card opens full-screen popup */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleOpenPopup(project)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleOpenPopup(project);
                    }}
                    aria-label={`Open ${project.title}`}
                    className="h-full"
                  >
                    {/* Card wrapper - always highlighted */}
                    <div
                      className="relative h-full border-4 flex flex-col scale-100 opacity-100 touch-manipulation transition-transform duration-200 hover:scale-[1.02] hover:brightness-110 active:scale-[1.02] active:brightness-110"
                      style={{
                        backgroundColor: "hsl(var(--creative-bg-alt))",
                        borderColor: "hsl(var(--creative-accent))",
                        boxShadow:
                          "0 0 20px hsl(var(--creative-accent) / 0.4), 12px 12px 0 hsl(var(--creative-accent) / 0.3)",
                      }}
                    >
                      <div className="flex flex-col h-full">
                        {/* Poster carousel */}
                        <div style={{ borderColor: "hsl(var(--creative-accent))" }} className="border-b-4">
                          <PosterCarousel
                            images={images}
                            runtime={project.runtime}
                            paused={isPopupOpen}
                            onIndexChange={(idx) => {
                              setCardCarouselIndices((prev) => ({ ...prev, [project.title]: idx }));
                            }}
                            onDotClickStopPropagation={(e) => {
                              e.stopPropagation();
                            }}
                          />
                        </div>

                        {/* Title + Type pill (same line) */}
                        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-end">
                          <div className="flex items-center gap-3">
                            <h3
                              className="flex-1 min-w-0 truncate whitespace-nowrap text-lg md:text-2xl font-comic font-bold"
                              style={{ color: "hsl(var(--creative-fg))" }}
                            >
                              {project.title}
                            </h3>
                            <span
                              className="ml-auto px-4 py-2 border-4 font-comic text-sm font-bold whitespace-nowrap"
                              style={{
                                backgroundColor: "hsl(var(--creative-accent))",
                                color: "hsl(var(--creative-bg))",
                                borderColor: "hsl(var(--creative-glow))",
                              }}
                            >
                              {project.genre === "Short film"
                                ? "short film"
                                : project.genre === "AD"
                                  ? "Advertisement"
                                  : project.genre}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 py-6 border-t-4 text-center"
        style={{ backgroundColor: "hsl(var(--creative-bg-alt))", borderColor: "hsl(var(--creative-accent))" }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-sm md:text-base font-content font-content-medium" style={{ color: "hsl(var(--creative-fg-muted))" }}>
            &copy; 2026 PRAVEEN ELANCHEZHIAN
          </p>
        </div>
      </footer>

      {/* Full-Screen Popup — DialogContent must stay mounted while open; close is fixed + explicit so Radix Close / scroll stacking cannot swallow taps */}
      <Dialog open={isPopupOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          showClose={false}
          className="fixed inset-0 z-[100] flex h-screen max-h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden border-0 bg-transparent p-0 shadow-none sm:rounded-none"
          style={{ backgroundColor: "hsl(var(--creative-bg-alt))" }}
        >
          {popupProject ? (
            <>
            <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
              <DotGrid variant="create" />
            </div>
            <button
              type="button"
              className={cn(POPUP_CLOSE_BTN, "fixed z-[250] text-xl md:text-2xl")}
              style={{
                top: "max(0.75rem, env(safe-area-inset-top, 0px))",
                right: "max(1rem, env(safe-area-inset-right, 0px))",
              }}
              aria-label="Close"
              onClick={() => handleOpenChange(false)}
            >
              ×
            </button>

            <div
              className="fixed top-1/2 z-[250] -translate-y-1/2"
              style={{ left: "max(0.75rem, env(safe-area-inset-left, 0px))" }}
            >
              <button
                type="button"
                disabled={!canPopupProjectNavigate}
                className={cn(
                  "flex min-h-[44px] min-w-[44px] items-center justify-center border-0 bg-transparent p-2 font-comic text-2xl font-bold leading-none text-[hsl(var(--creative-accent))] shadow-none transition-opacity duration-150 md:text-3xl",
                  canPopupProjectNavigate
                    ? "touch-manipulation hover:opacity-80 active:opacity-70"
                    : "cursor-not-allowed opacity-35",
                )}
                aria-label="Previous project"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handlePopupProjectPrev();
                }}
              >
                {"<<"}
              </button>
            </div>

            <div
              className="fixed top-1/2 z-[250] -translate-y-1/2"
              style={{ right: "max(0.75rem, env(safe-area-inset-right, 0px))" }}
            >
              <button
                type="button"
                disabled={!canPopupProjectNavigate}
                className={cn(
                  "flex min-h-[44px] min-w-[44px] items-center justify-center border-0 bg-transparent p-2 font-comic text-2xl font-bold leading-none text-[hsl(var(--creative-accent))] shadow-none transition-opacity duration-150 md:text-3xl",
                  canPopupProjectNavigate
                    ? "touch-manipulation hover:opacity-80 active:opacity-70"
                    : "cursor-not-allowed opacity-35",
                )}
                aria-label="Next project"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handlePopupProjectNext();
                }}
              >
                {">>"}
              </button>
            </div>

            <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={popupProject.title}
                  className="flex min-h-[100dvh] w-full flex-col pt-14 md:pt-16"
                  initial={{ opacity: 0, scale: 0.92, filter: "blur(14px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >

              {/* Title + synopsis + WATCH NOW */}
              <div className="flex-none px-4 md:px-6 pt-4 md:pt-6">
                <div
                  className="border-4 p-3 md:p-4"
                  style={{
                    borderColor: "hsl(var(--creative-accent))",
                    backgroundColor: "hsl(var(--creative-bg-alt))",
                    boxShadow: "0 0 16px hsl(var(--creative-accent) / 0.25)",
                  }}
                >
                  <div className="flex flex-wrap items-start gap-4">
                    <h2 className="font-comic font-bold text-3xl md:text-4xl text-[hsl(var(--creative-fg))] break-words leading-tight">
                      {popupProject.title}
                    </h2>

                    {popupProject.link !== "#" && (
                      <Button
                        type="button"
                        className="border-4 font-comic text-sm md:text-base font-bold px-5 py-2"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(popupProject.link, "_blank", "noopener,noreferrer");
                        }}
                        style={{
                          backgroundColor: "hsl(var(--creative-accent))",
                          color: "hsl(var(--creative-bg))",
                          borderColor: "hsl(var(--creative-glow))",
                          boxShadow: "0 0 16px hsl(var(--creative-accent) / 0.45), 4px 4px 0 hsl(var(--creative-accent) / 0.25)",
                        }}
                      >
                        WATCH NOW
                      </Button>
                    )}
                  </div>

                  <p className="mt-3 text-base md:text-lg leading-relaxed font-content font-content-medium whitespace-pre-line" style={{ color: "hsl(var(--creative-fg-muted))" }}>
                    {popupProject.description}
                  </p>
                </div>
              </div>

              {/* Image carousel — dots only; « » are fixed like close (outside this block) */}
              <div className="flex-none px-4 md:px-6 pt-5 md:pt-6 pb-4">
                <div
                  className="mx-auto border-4 max-h-[52vh] md:max-h-[58vh] w-[min(100%,calc(52vh*var(--pc-ar-w)/var(--pc-ar-h)))] md:w-[min(100%,calc(58vh*var(--pc-ar-w)/var(--pc-ar-h)))]"
                  style={{
                    borderColor: "hsl(var(--creative-accent))",
                    aspectRatio: popupCarouselLayout.ar,
                    ["--pc-ar-w" as string]: popupCarouselLayout.aw,
                    ["--pc-ar-h" as string]: popupCarouselLayout.ah,
                  }}
                >
                  <PopupImageCarousel
                    key={popupProject.title}
                    images={popupImages}
                    initialIndex={popupInitialIndex}
                  />
                </div>
              </div>

              {/* Info blocks + XP + Accolades */}
              <div className="flex-none px-4 md:px-6 pb-6 md:pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  <div
                    className="border-4 p-3 md:p-4"
                    style={{
                      borderColor: "hsl(var(--creative-accent))",
                      backgroundColor: "hsl(var(--creative-bg-alt))",
                      boxShadow: "0 0 16px hsl(var(--creative-accent) / 0.25)",
                    }}
                  >
                    <div className="text-2xl font-comic font-bold text-[hsl(var(--creative-fg-muted))]">TYPE</div>
                    <div className="text-base md:text-lg font-content font-content-medium mt-2" style={{ color: "hsl(var(--creative-fg))" }}>
                      {popupProject.genre === "AD" ? "Advertisement" : popupProject.genre === "Short film" ? "short film" : popupProject.genre}
                    </div>
                  </div>

                  <div
                    className="border-4 p-3 md:p-4"
                    style={{
                      borderColor: "hsl(var(--creative-accent))",
                      backgroundColor: "hsl(var(--creative-bg-alt))",
                      boxShadow: "0 0 16px hsl(var(--creative-accent) / 0.25)",
                    }}
                  >
                    <div className="text-2xl font-comic font-bold text-[hsl(var(--creative-fg-muted))]">ROLE</div>
                    <div className="text-base md:text-lg font-content font-content-medium mt-2" style={{ color: "hsl(var(--creative-fg))" }}>
                      {popupProject.role}
                    </div>
                  </div>

                  <div
                    className="border-4 p-3 md:p-4"
                    style={{
                      borderColor: "hsl(var(--creative-accent))",
                      backgroundColor: "hsl(var(--creative-bg-alt))",
                      boxShadow: "0 0 16px hsl(var(--creative-accent) / 0.25)",
                    }}
                  >
                    <div className="text-2xl font-comic font-bold text-[hsl(var(--creative-fg-muted))]">YEAR</div>
                    <div className="text-base md:text-lg font-content font-content-medium mt-2" style={{ color: "hsl(var(--creative-fg))" }}>
                      {popupProject.year}
                    </div>
                  </div>
                </div>

                <div
                  className={
                    popupProject.awards.length > 0
                      ? "grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-5 items-start"
                      : "grid grid-cols-1 gap-3 md:gap-4 mt-4 md:mt-5"
                  }
                >
                  <div
                    className="border-4 p-3 md:p-4"
                    style={{
                      borderColor: "hsl(var(--creative-accent))",
                      backgroundColor: "hsl(var(--creative-bg-alt))",
                      boxShadow: "0 0 16px hsl(var(--creative-accent) / 0.25)",
                    }}
                  >
                    <div className="text-2xl font-comic font-bold text-[hsl(var(--creative-fg-muted))]">XP</div>
                    <p className="text-base md:text-lg leading-snug md:leading-relaxed font-content font-content-medium whitespace-pre-line mt-2" style={{ color: "hsl(var(--creative-fg))" }}>
                      {popupXp}
                    </p>
                  </div>

                  {popupProject.awards.length > 0 && (
                    <div
                      className="border-4 p-3 md:p-4"
                      style={{
                        borderColor: "hsl(var(--creative-accent))",
                        backgroundColor: "hsl(var(--creative-bg-alt))",
                        boxShadow: "0 0 16px hsl(var(--creative-accent) / 0.25)",
                      }}
                    >
                      <div className="text-2xl font-comic font-bold text-[hsl(var(--creative-fg-muted))]">Accolades</div>
                      <ul className="text-base md:text-lg leading-snug md:leading-relaxed font-content font-content-medium mt-2 space-y-1" style={{ color: "hsl(var(--creative-fg-muted))" }}>
                        {popupProject.awards.map((a, idx) => (
                          <li key={idx} className="list-disc ml-6">
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <footer
                className="relative z-10 mt-auto py-6 border-t-4 text-center flex-none"
                style={{ backgroundColor: "hsl(var(--creative-bg-alt))", borderColor: "hsl(var(--creative-accent))" }}
              >
                <div className="container mx-auto px-4 md:px-6">
                  <p className="text-sm md:text-base font-content font-content-medium" style={{ color: "hsl(var(--creative-fg-muted))" }}>
                    &copy; 2026 PRAVEEN ELANCHEZHIAN
                  </p>
                </div>
              </footer>
                </motion.div>
              </AnimatePresence>
            </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreativePage;

