import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import ComicParticles from "./ComicParticles";
import DotGrid from "./DotGrid";

/**
 * ============================================
 * THINK PAGE - COMIC BOOK LAYOUT
 * ============================================
 * 
 * Academic/Professional profile as comic panels:
 * - THINK side: neon palette (deep violet + electric magenta, acid yellow for CTAs)
 * - Thick black comic panel borders
 * - Bold comic typography (Bangers for headings)
 * - Panel-based structure, not cards
 * - Reading like a comic book
 */

interface ThinkPageProps {
  onGoHome: () => void;
  onSwitchToCreative: () => void;
  onNavigateToContact: () => void;
}

const ThinkPage = ({ onGoHome, onSwitchToCreative, onNavigateToContact }: ThinkPageProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    education: true,
    tools: true,
    skills: true,
    projects: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const education = [
    {
      id: 1,
      degree: "Master of Business Administration (MBA)",
      institution: "NIT, Trichy",
      period: "2024-2026",
      focus: "Product Management & Marketing Strategy",
      description: "Specializing in the intersection of technology, marketing, and product design.",
    },
    {
      id: 2,
      degree: "B.E. Electronics and Communication Engineering",
      institution: "Loyola ICAM College of Engineering and Technology, Chennai",
      period: "2020-2024",
      focus: "Technical Foundation",
      description: "Strong foundation in engineering principles and technical systems.",
    },
  ];

  const tools = [
    { name: "Figma", category: "Design", level: 90 },
    { name: "Adobe XD", category: "Design", level: 85 },
    { name: "Notion", category: "Productivity", level: 95 },
    { name: "Jira", category: "Project Management", level: 80 },
    { name: "Google Analytics", category: "Analytics", level: 85 },
    { name: "Miro", category: "Collaboration", level: 88 },
    { name: "Canva", category: "Design", level: 92 },
    { name: "Excel", category: "Analytics", level: 90 },
  ];

  const skills = [
    {
      category: "Product & Strategy",
      items: ["Product Management", "Go-to-Market Strategy", "User Research", "Competitive Analysis"],
    },
    {
      category: "Design & UX",
      items: ["UI/UX Design", "Wireframing", "Prototyping", "Design Systems"],
    },
    {
      category: "Marketing",
      items: ["Brand Strategy", "Content Marketing", "Social Media", "Campaign Management"],
    },
    {
      category: "Technical",
      items: ["Data Analysis", "SQL Basics", "A/B Testing", "Agile Methodologies"],
    },
  ];

  const projects = [
    {
      id: 1,
      title: "Product Design Engineer & Consultant - AR Smart Glass",
      company: "Tamizh",
      period: "Jul 2024 - Present",
      description: "Designing UI/UX for AR Smart Glasses with hand gesture and voice control. Collaborating on display and interaction systems.",
      tools: ["Figma", "Unity", "Blender"],
      link: "#",
    },
    {
      id: 2,
      title: "Summer Intern: Brand-Aligned Marketing Strategies",
      company: "Madarth",
      period: "May 2025 - Jul 2025",
      description: "Developed social media calendars, copywriting, and video scripting for TAFE and DahNAY. Experimented with 3D modelling and AI-based design.",
      tools: ["Notion", "Canva", "Adobe Suite"],
      link: "#",
    },
  ];

  return (
    <div
      className="relative min-h-screen min-h-screen-mobile overflow-x-hidden bg-energy-think"
      style={{ backgroundColor: "hsl(var(--think-bg))" }}
    >
      <DotGrid variant="think" />
      {/* Comic Particles */}
      <ComicParticles mode="think" />
      
      {/* Navigation - flat text-based, dark overlay, hover color shift + glow */}
      <nav className="relative z-10 py-4 md:py-6 border-b-4" style={{ backgroundColor: "hsl(var(--think-bg-alt))", borderColor: "hsl(var(--think-accent))" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-row flex-nowrap justify-center items-stretch gap-1.5 sm:gap-3 md:gap-4">
            <Button
              onClick={onGoHome}
              className="flex-1 min-w-0 border-4 px-2 py-2 sm:px-6 sm:py-3 font-comic text-[calc(0.75rem*1.25)] sm:text-lg font-bold leading-tight text-center transition-[box-shadow,filter] duration-200 ease-out hover:brightness-110 shadow-[0_0_16px_hsl(var(--think-accent)/0.4),4px_4px_0_hsl(var(--think-accent)/0.6)] hover:shadow-[0_0_28px_hsl(var(--think-accent)/0.65),0_0_52px_hsl(var(--think-accent)/0.22),6px_6px_0_hsl(var(--think-accent)/0.5)]"
              style={{
                backgroundColor: "hsl(var(--think-bg))",
                color: "hsl(var(--think-fg))",
                borderColor: "hsl(var(--think-accent))",
              }}
            >
              HOME
            </Button>
            <Button
              onClick={onSwitchToCreative}
              className="flex-1 min-w-0 border-4 px-2 py-2 sm:px-6 sm:py-3 font-comic text-[calc(0.75rem*1.25)] sm:text-lg font-bold leading-tight text-center transition-[box-shadow,filter] duration-200 ease-out hover:brightness-110 shadow-[0_0_16px_hsl(var(--neon-red)/0.55),4px_4px_0_hsl(var(--neon-red)/0.5)] hover:shadow-[0_0_28px_hsl(var(--neon-red)/0.75),0_0_52px_hsl(var(--neon-red)/0.28),6px_6px_0_hsl(var(--neon-red)/0.55)]"
              style={{
                backgroundColor: "hsl(var(--neon-red))",
                color: "hsl(var(--primary-foreground))",
                borderColor: "hsl(var(--neon-red))",
              }}
            >
              VIEW CREATE.
            </Button>
            <Button
              onClick={onNavigateToContact}
              className="flex-1 min-w-0 border-4 px-2 py-2 sm:px-6 sm:py-3 font-comic text-[calc(0.75rem*1.25)] sm:text-lg font-bold leading-tight text-center transition-[box-shadow,filter] duration-200 ease-out hover:brightness-110 shadow-[0_0_16px_hsl(var(--accent)/0.55),4px_4px_0_hsl(var(--accent)/0.5)] hover:shadow-[0_0_28px_hsl(var(--accent)/0.65),0_0_52px_hsl(var(--accent)/0.25),6px_6px_0_hsl(var(--accent)/0.55)]"
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

      {/* Main Content - Comic Panel Layout */}
      <main className="relative z-10 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          {/* Profile Header Panel - high-contrast frame */}
          <div
            className="mb-8 md:mb-12 p-6 md:p-10 border-4"
            style={{
              backgroundColor: "hsl(var(--think-bg-alt))",
              borderColor: "hsl(var(--think-accent))",
              boxShadow: "0 0 20px hsl(var(--think-accent) / 0.2), 8px 8px 0 hsl(var(--think-accent) / 0.3)",
            }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              <div
                className="w-32 h-32 md:w-40 md:h-40 border-4 flex-shrink-0"
                style={{ backgroundColor: "hsl(var(--think-bg))", borderColor: "hsl(var(--think-accent))" }}
              >
                <img
                  src="/images/PE.webp"
                  alt="Praveen Elanchezhian"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-comic font-bold mb-2" style={{ color: "hsl(var(--think-fg))" }}>
                  PRAVEEN ELANCHEZHIAN
                </h1>
                <p className="text-xl md:text-2xl font-comic-secondary font-bold mb-3" style={{ color: "hsl(var(--think-accent))" }}>
                  MBA CANDIDATE | PRODUCT & MARKETING STRATEGIST
                </p>
                <p className="text-base md:text-lg font-content font-content-medium leading-relaxed" style={{ color: "hsl(var(--think-fg-muted))" }}>
                  Passionate about building products at the intersection of technology, design, and business strategy.
                </p>
              </div>
            </div>
          </div>

          {/* Education Panel */}
          <div className="mb-8 md:mb-12">
            <button
              onClick={() => toggleSection("education")}
              className="w-full flex items-center justify-between p-4 min-h-[44px] border-4 font-comic text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-left touch-manipulation transition-[transform,filter] duration-150 active:scale-[0.995] active:brightness-95"
              style={{
                backgroundColor: "hsl(var(--think-accent))",
                color: "hsl(var(--think-fg))",
                borderColor: "hsl(var(--think-glow))",
                boxShadow: "0 0 16px hsl(var(--think-accent) / 0.4), 6px 6px 0 hsl(var(--think-accent) / 0.5)",
              }}
            >
              <span>EDUCATION</span>
              {expandedSections.education ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
            </button>
            
            {expandedSections.education && (
              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-6 md:p-8 border-4"
                    style={{ 
                      backgroundColor: "hsl(var(--think-bg))",
                      boxShadow: "0 0 12px hsl(var(--think-accent) / 0.2), 6px 6px 0 hsl(var(--think-accent) / 0.25)"
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                      <h3 className="text-xl md:text-2xl font-comic font-bold" style={{ color: "hsl(var(--think-fg))" }}>
                        {edu.degree}
                      </h3>
                      <span className="text-base font-content font-content-medium whitespace-nowrap" style={{ color: "hsl(var(--think-fg-muted))" }}>
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-lg md:text-xl font-content font-content-bold mb-2" style={{ color: "hsl(var(--think-accent))" }}>
                      {edu.institution}
                    </p>
                    <p className="text-base font-content font-content-medium" style={{ color: "hsl(var(--think-fg-muted))" }}>
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tools & Technologies Panel */}
          <div className="mb-8 md:mb-12">
            <button
              onClick={() => toggleSection("tools")}
              className="w-full flex items-center justify-between p-4 min-h-[44px] border-4 font-comic text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-left touch-manipulation transition-[transform,filter] duration-150 active:scale-[0.995] active:brightness-95"
              style={{ 
                backgroundColor: "hsl(var(--think-accent))",
                color: "hsl(var(--think-fg))",
                boxShadow: "0 0 16px hsl(var(--think-accent) / 0.4), 6px 6px 0 hsl(var(--think-accent) / 0.5)"
              }}
            >
              <span>TOOLS & TECHNOLOGIES</span>
              {expandedSections.tools ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
            </button>
            
            {expandedSections.tools && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="p-4 border-4"
                    style={{ 
                      backgroundColor: "hsl(var(--think-bg-alt))",
                      boxShadow: "0 0 10px hsl(var(--think-accent) / 0.15), 4px 4px 0 hsl(var(--think-accent) / 0.2)"
                    }}
                  >
                    <p className="font-comic text-lg font-bold mb-1" style={{ color: "hsl(var(--think-fg))" }}>
                      {tool.name}
                    </p>
                    <p className="text-xs font-content font-content-light mb-3" style={{ color: "hsl(var(--think-fg-muted))" }}>
                      {tool.category}
                    </p>
                    {/* Proficiency bar */}
                    <div className="h-2 border-2" style={{ backgroundColor: "hsl(var(--think-bg))", borderColor: "hsl(var(--think-accent))" }}>
                      <div
                        className="h-full"
                        style={{ 
                          width: `${tool.level}%`,
                          backgroundColor: "hsl(var(--think-accent))"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Skills Panel */}
          <div className="mb-8 md:mb-12">
            <button
              onClick={() => toggleSection("skills")}
              className="w-full flex items-center justify-between p-4 min-h-[44px] border-4 font-comic text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-left touch-manipulation transition-[transform,filter] duration-150 active:scale-[0.995] active:brightness-95"
              style={{ 
                backgroundColor: "hsl(var(--think-accent))",
                color: "hsl(var(--think-fg))",
                boxShadow: "0 0 16px hsl(var(--think-accent) / 0.4), 6px 6px 0 hsl(var(--think-accent) / 0.5)"
              }}
            >
              <span>SKILLS</span>
              {expandedSections.skills ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
            </button>
            
            {expandedSections.skills && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skillGroup) => (
                  <div
                    key={skillGroup.category}
                    className="p-6 border-4"
                    style={{ 
                      backgroundColor: "hsl(var(--think-bg))",
                      boxShadow: "0 0 12px hsl(var(--think-accent) / 0.2), 6px 6px 0 hsl(var(--think-accent) / 0.25)"
                    }}
                  >
                    <h4 className="font-comic text-2xl font-bold mb-4" style={{ color: "hsl(var(--think-accent))" }}>
                      {skillGroup.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-2 border-2 font-content text-sm font-content-medium"
                          style={{ 
                            backgroundColor: "hsl(var(--think-bg-alt))",
                            color: "hsl(var(--think-fg))"
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Projects Panel */}
          <div className="mb-8 md:mb-12">
            <button
              onClick={() => toggleSection("projects")}
              className="w-full flex items-center justify-between p-4 min-h-[44px] border-4 font-comic text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-left touch-manipulation transition-[transform,filter] duration-150 active:scale-[0.995] active:brightness-95"
              style={{ 
                backgroundColor: "hsl(var(--think-accent))",
                color: "hsl(var(--think-fg))",
                boxShadow: "0 0 16px hsl(var(--think-accent) / 0.4), 6px 6px 0 hsl(var(--think-accent) / 0.5)"
              }}
            >
              <span>EXPERIENCE & PROJECTS</span>
              {expandedSections.projects ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
            </button>
            
            {expandedSections.projects && (
              <div className="space-y-4">
                {projects.map((project) => (
                  <a
                    key={project.id}
                    href={project.link}
                    className="block"
                    aria-label={`View ${project.title}`}
                  >
                    <div
                      className="p-6 md:p-8 border-4"
                      style={{
                        backgroundColor: "hsl(var(--think-bg))",
                        borderColor: "hsl(var(--think-accent))",
                        boxShadow: "0 0 12px hsl(var(--think-accent) / 0.2), 6px 6px 0 hsl(var(--think-accent) / 0.25)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 20px hsl(var(--think-accent) / 0.4), 8px 8px 0 hsl(var(--think-accent) / 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 12px hsl(var(--think-accent) / 0.2), 6px 6px 0 hsl(var(--think-accent) / 0.25)";
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                        <h3 className="text-xl md:text-2xl font-comic font-bold flex items-center gap-2" style={{ color: "hsl(var(--think-fg))" }}>
                          {project.title}
                          <ExternalLink className="w-5 h-5" />
                        </h3>
<span className="text-base font-content font-content-medium whitespace-nowrap" style={{ color: "hsl(var(--think-fg-muted))" }}>
                        {project.period}
                      </span>
                      </div>
                      
                      <p className="text-lg md:text-xl font-content font-content-bold mb-3" style={{ color: "hsl(var(--think-accent))" }}>
                        {project.company}
                      </p>
                      
                      <p className="text-base font-content font-content-medium mb-4" style={{ color: "hsl(var(--think-fg-muted))" }}>
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1 border-2 font-content text-sm font-content-medium"
                            style={{ 
                              backgroundColor: "hsl(var(--think-bg-alt))",
                              color: "hsl(var(--think-fg))"
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer 
        className="relative z-10 py-6 border-t-4 text-center"
        style={{ backgroundColor: "hsl(var(--think-bg))", borderColor: "hsl(var(--think-accent))" }}
      >
        <div className="container mx-auto px-4 md:px-6">
<p className="text-sm md:text-base font-content font-content-medium" style={{ color: "hsl(var(--think-fg-muted))" }}>
          &copy; 2026 PRAVEEN ELANCHEZHIAN. ALL RIGHTS RESERVED.
        </p>
        </div>
      </footer>
    </div>
  );
};

export default ThinkPage;
