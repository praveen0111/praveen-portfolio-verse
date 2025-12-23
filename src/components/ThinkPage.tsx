import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

/**
 * ============================================
 * THINK PAGE COMPONENT
 * ============================================
 * 
 * Academic/Professional profile page with:
 * - Warm daylight color palette
 * - Paper-like textures
 * - Clean, structured layout
 * - Precise, controlled motion
 * 
 * CONTENT ORDER (as specified):
 * 1. Education - Degrees, Institutions, Academic focus
 * 2. Tools & Technologies - Interactive cards
 * 3. Skills - Grouped logically
 * 4. Projects - Academic/Technical/Product work
 * 
 * HOW TO CUSTOMIZE:
 * 1. Edit education data in 'education' array
 * 2. Modify tools in 'tools' array
 * 3. Update skills in 'skills' array
 * 4. Add/remove projects in 'projects' array
 * 5. Replace placeholder links
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

  /**
   * EDUCATION DATA
   * HOW TO CUSTOMIZE: Add/edit entries in this array
   */
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

  /**
   * TOOLS & TECHNOLOGIES DATA
   * HOW TO CUSTOMIZE: Add/edit entries with name and proficiency level
   */
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

  /**
   * SKILLS DATA
   * HOW TO CUSTOMIZE: Add/edit skill groups and individual skills
   */
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

  /**
   * PROJECTS DATA
   * HOW TO CUSTOMIZE: Add projects with links to demos/repos
   */
  const projects = [
    {
      id: 1,
      title: "Product Design Engineer & Consultant - AR Smart Glass",
      company: "Tamizh",
      period: "Jul 2024 - Present",
      description: "Designing UI/UX for AR Smart Glasses with hand gesture and voice control. Collaborating on display and interaction systems.",
      tools: ["Figma", "Unity", "Blender"],
      link: "#", // <!-- INSERT PROJECT LINK HERE -->
    },
    {
      id: 2,
      title: "Summer Intern: Brand-Aligned Marketing Strategies",
      company: "Madarth",
      period: "May 2025 - Jul 2025",
      description: "Developed social media calendars, copywriting, and video scripting for TAFE and DahNAY. Experimented with 3D modelling and AI-based design.",
      tools: ["Notion", "Canva", "Adobe Suite"],
      link: "#", // <!-- INSERT PROJECT LINK HERE -->
    },
  ];

  return (
    <div className="min-h-screen bg-think-bg texture-paper animate-think-enter">
      {/* Warm daylight gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 10%, hsl(var(--think-glow) / 0.2) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 90%, hsl(var(--think-glow) / 0.15) 0%, transparent 30%)
          `
        }}
      />
      
      {/* Navigation */}
      <nav className="relative z-10 py-6 md:py-8 border-b border-think-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4">
            <Button
              onClick={onGoHome}
              variant="ghost"
              className="w-full sm:w-auto text-think-fg-muted hover:text-think-fg hover:bg-think-glow/50 transition-all font-semibold"
            >
              Home
            </Button>
            <Button
              onClick={onSwitchToCreative}
              className="w-full sm:w-auto bg-creative-accent text-creative-bg font-semibold px-6 py-3 rounded-lg hover:bg-creative-glow transition-all shadow-md hover:shadow-lg"
            >
              View Creative Work
            </Button>
            <Button
              onClick={onNavigateToContact}
              className="w-full sm:w-auto bg-think-accent text-white font-semibold px-6 py-3 rounded-lg hover:bg-think-accent-alt transition-all shadow-md hover:shadow-lg"
            >
              Contact
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            
            {/* Profile Header */}
            <header className="flex flex-col md:flex-row items-center text-center md:text-left gap-6 md:gap-8 mb-12 md:mb-16 animate-think-reveal">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-think-bg-alt flex-shrink-0 shadow-xl border-4 border-think-accent/30">
                <img
                  src="https://placehold.co/200x200/FAF8F4/1F1F1F?text=PE"
                  alt="Praveen Elanchezhian - Professional headshot"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-think-fg">
                  Praveen Elanchezhian
                </h1>
                <p className="text-lg md:text-xl text-think-accent mt-2 font-semibold">
                  MBA Candidate | Product & Marketing Strategist
                </p>
                <p className="mt-4 text-base md:text-lg text-think-fg-muted leading-relaxed max-w-xl">
                  Passionate about building products at the intersection of technology, design, and business strategy.
                </p>
              </div>
            </header>

            {/* SECTION 1: Education */}
            <section className="mb-12 animate-think-reveal [animation-delay:100ms]">
              <button
                onClick={() => toggleSection("education")}
                className="w-full flex items-center justify-between text-3xl md:text-4xl font-bold mb-6 text-think-accent hover:text-think-accent-alt transition-colors"
              >
                <span>Education</span>
                {expandedSections.education ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
              </button>
              
              {expandedSections.education && (
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="bg-white p-6 md:p-8 rounded-xl shadow-md border-2 border-think-border hover:border-think-accent/50 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                        <h3 className="text-lg md:text-xl font-bold text-think-fg">{edu.degree}</h3>
                        <span className="text-sm font-semibold text-think-fg-muted whitespace-nowrap">{edu.period}</span>
                      </div>
                      <p className="text-base md:text-lg font-semibold text-think-accent mb-2">{edu.institution}</p>
                      <p className="text-sm text-think-fg-muted">{edu.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* SECTION 2: Tools & Technologies */}
            <section className="mb-12 animate-think-reveal [animation-delay:200ms]">
              <button
                onClick={() => toggleSection("tools")}
                className="w-full flex items-center justify-between text-3xl md:text-4xl font-bold mb-6 text-think-accent hover:text-think-accent-alt transition-colors"
              >
                <span>Tools & Technologies</span>
                {expandedSections.tools ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
              </button>
              
              {expandedSections.tools && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="bg-white p-4 rounded-xl shadow-sm border-2 border-think-border hover:border-think-accent hover:shadow-md transition-all duration-300 group"
                    >
                      <p className="font-semibold text-think-fg group-hover:text-think-accent transition-colors">{tool.name}</p>
                      <p className="text-xs text-think-fg-muted mt-1">{tool.category}</p>
                      {/* Proficiency bar */}
                      <div className="mt-3 h-1.5 bg-think-bg-alt rounded-full overflow-hidden">
                        <div
                          className="h-full bg-think-accent rounded-full transition-all duration-500"
                          style={{ width: `${tool.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* SECTION 3: Skills */}
            <section className="mb-12 animate-think-reveal [animation-delay:300ms]">
              <button
                onClick={() => toggleSection("skills")}
                className="w-full flex items-center justify-between text-3xl md:text-4xl font-bold mb-6 text-think-accent hover:text-think-accent-alt transition-colors"
              >
                <span>Skills</span>
                {expandedSections.skills ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
              </button>
              
              {expandedSections.skills && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills.map((skillGroup) => (
                    <div
                      key={skillGroup.category}
                      className="bg-white p-6 rounded-xl shadow-sm border-2 border-think-border"
                    >
                      <h4 className="font-bold text-think-accent mb-4">{skillGroup.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 bg-think-bg-alt text-think-fg text-sm rounded-full border border-think-border hover:bg-think-glow hover:border-think-accent transition-all duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* SECTION 4: Projects */}
            <section className="mb-12 animate-think-reveal [animation-delay:400ms]">
              <button
                onClick={() => toggleSection("projects")}
                className="w-full flex items-center justify-between text-3xl md:text-4xl font-bold mb-6 text-think-accent hover:text-think-accent-alt transition-colors"
              >
                <span>Experience & Projects</span>
                {expandedSections.projects ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
              </button>
              
              {expandedSections.projects && (
                <div className="space-y-6">
                  {projects.map((project) => (
                    <a
                      key={project.id}
                      href={project.link}
                      className="group block"
                      aria-label={`View details for ${project.title}`}
                    >
                      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border-2 border-think-border hover:border-think-accent hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                          <h3 className="text-lg md:text-xl font-bold text-think-fg group-hover:text-think-accent transition-colors flex items-center gap-2">
                            {project.title}
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <span className="text-sm font-semibold text-think-fg-muted whitespace-nowrap">{project.period}</span>
                        </div>
                        
                        <p className="text-base md:text-lg font-semibold text-think-accent mb-4">{project.company}</p>
                        
                        <p className="text-sm md:text-base text-think-fg-muted mb-4">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool) => (
                            <span
                              key={tool}
                              className="px-2 py-1 bg-think-glow/50 text-think-fg text-xs rounded-full"
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
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-think-fg/5 backdrop-blur-sm py-6 border-t border-think-border">
        <div className="container mx-auto px-4 md:px-6 text-center text-think-fg-muted">
          <p className="text-sm md:text-base">&copy; 2025 Praveen Elanchezhian. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ThinkPage;
