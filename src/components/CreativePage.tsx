import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Play, Award } from "lucide-react";
import ImageLightbox from "./ImageLightbox";

/**
 * ============================================
 * CREATIVE PAGE COMPONENT
 * ============================================
 * 
 * Cinematic project showcase with:
 * - Dark, moody, high-contrast theme
 * - Scroll-driven project reveal
 * - Image carousel with lightbox
 * - Comic-inspired motion and framing
 * 
 * HOW TO CUSTOMIZE:
 * 1. Edit projects in 'projects' array
 * 2. Replace placeholder image URLs
 * 3. Update streaming/project links
 */

interface CreativePageProps {
  onGoHome: () => void;
  onSwitchToThink: () => void;
  onNavigateToContact: () => void;
}

const CreativePage = ({ onGoHome, onSwitchToThink, onNavigateToContact }: CreativePageProps) => {
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<number, number>>({});
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    projectId: number;
    imageIndex: number;
  }>({ isOpen: false, projectId: 0, imageIndex: 0 });

  const projects = [
    {
      id: 1,
      title: "GR3Y",
      year: "2023",
      genre: "Thriller",
      role: "Director & Editor",
      description: "An archaeologist unearths a treasure box, which leads to a turn of unexpected events.",
      awards: ["Best Direction - Malda Int'l Film Festival", "Best Film - Malda Int'l Film Festival"],
      link: "#",
      images: [
        "https://placehold.co/1200x800/0E0E11/9EFF00?text=GR3Y+Poster",
        "https://placehold.co/1200x800/17181C/9EFF00?text=GR3Y+Scene+1",
        "https://placehold.co/1200x800/0E0E11/FF8C1A?text=GR3Y+Scene+2",
      ],
    },
    {
      id: 2,
      title: "STRANGERS",
      year: "2023",
      genre: "Drama",
      role: "Writer & Director",
      description: "A conversation between a stranger and a bystander unfolds as past and present collide.",
      awards: ["Best Film - ENGENIA 2024", "Best Editing - ENGENIA 2024", "Best Director - ENGENIA 2024"],
      link: "#",
      images: [
        "https://placehold.co/1200x800/0E0E11/9EFF00?text=STRANGERS+Poster",
        "https://placehold.co/1200x800/17181C/FF8C1A?text=STRANGERS+Scene+1",
        "https://placehold.co/1200x800/0E0E11/9EFF00?text=STRANGERS+Scene+2",
      ],
    },
    {
      id: 3,
      title: "Project Three",
      year: "2024",
      genre: "Documentary",
      role: "Director of Photography",
      description: "A compelling exploration of human connection and creativity in the modern world.",
      awards: ["Official Selection - Multiple Film Festivals"],
      link: "#",
      images: [
        "https://placehold.co/1200x800/0E0E11/9EFF00?text=Project+3+Image+1",
        "https://placehold.co/1200x800/17181C/FF8C1A?text=Project+3+Image+2",
        "https://placehold.co/1200x800/0E0E11/9EFF00?text=Project+3+Image+3",
      ],
    },
    {
      id: 4,
      title: "Project Four",
      year: "2024",
      genre: "Short Film",
      role: "Editor",
      description: "An experimental piece exploring the boundaries of visual storytelling.",
      awards: ["Audience Choice Award"],
      link: "#",
      images: [
        "https://placehold.co/1200x800/0E0E11/FF8C1A?text=Project+4+Image+1",
        "https://placehold.co/1200x800/17181C/9EFF00?text=Project+4+Image+2",
        "https://placehold.co/1200x800/0E0E11/FF8C1A?text=Project+4+Image+3",
      ],
    },
    {
      id: 5,
      title: "Project Five",
      year: "2025",
      genre: "Music Video",
      role: "Director & Colorist",
      description: "A vibrant visual journey through sound and emotion.",
      awards: ["Best Cinematography"],
      link: "#",
      images: [
        "https://placehold.co/1200x800/0E0E11/9EFF00?text=Project+5+Image+1",
        "https://placehold.co/1200x800/17181C/FF8C1A?text=Project+5+Image+2",
        "https://placehold.co/1200x800/0E0E11/9EFF00?text=Project+5+Image+3",
      ],
    },
    {
      id: 6,
      title: "Project Six",
      year: "2025",
      genre: "Commercial",
      role: "Creative Director",
      description: "Creative commercial work showcasing brand storytelling excellence.",
      awards: ["Industry Recognition Award"],
      link: "#",
      images: [
        "https://placehold.co/1200x800/0E0E11/FF8C1A?text=Project+6+Image+1",
        "https://placehold.co/1200x800/17181C/9EFF00?text=Project+6+Image+2",
        "https://placehold.co/1200x800/0E0E11/FF8C1A?text=Project+6+Image+3",
      ],
    },
  ];

  const getCurrentIndex = (projectId: number) => currentImageIndices[projectId] || 0;

  const nextImage = (projectId: number, totalImages: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentImageIndices((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (projectId: number, totalImages: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentImageIndices((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  const openLightbox = (projectId: number, imageIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLightbox({ isOpen: true, projectId, imageIndex });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, projectId: 0, imageIndex: 0 });
  };

  const currentProject = projects.find((p) => p.id === lightbox.projectId);

  return (
    <div className="min-h-screen bg-creative-bg texture-grain animate-creative-enter">
      {/* Moody night gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse at 80% 20%, hsl(var(--creative-glow) / 0.08) 0%, transparent 40%),
            radial-gradient(ellipse at 20% 80%, hsl(var(--creative-glow-warm) / 0.06) 0%, transparent 30%)
          `,
        }}
      />

      {/* Navigation */}
      <nav className="relative z-20 py-6 md:py-8 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4">
            <Button
              onClick={onGoHome}
              variant="ghost"
              className="w-full sm:w-auto text-creative-fg-muted hover:text-creative-fg hover:bg-white/10 transition-all font-semibold"
            >
              Home
            </Button>
            <Button
              onClick={onSwitchToThink}
              className="w-full sm:w-auto bg-think-accent text-white font-semibold px-6 py-3 rounded-lg hover:bg-think-accent-alt transition-all shadow-md hover:shadow-lg"
            >
              View Think Profile
            </Button>
            <Button
              onClick={onNavigateToContact}
              className="w-full sm:w-auto bg-creative-accent text-creative-bg font-semibold px-6 py-3 rounded-lg hover:bg-creative-glow transition-all shadow-md hover:shadow-lg"
            >
              Contact
            </Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="relative z-10 py-12 md:py-16 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-creative-fg animate-creative-reveal">
            Creative <span className="text-creative-accent">Film</span> Projects
          </h1>
          <p className="mt-4 text-lg text-creative-fg-muted max-w-2xl mx-auto">
            Visual storytelling through film, editing, and post-production excellence
          </p>
        </div>
      </header>

      {/* Project Grid */}
      <main className="relative z-10 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => {
              const currentIndex = getCurrentIndex(project.id);

              return (
                <a
                  key={project.id}
                  href={project.link}
                  className="group block animate-creative-reveal"
                  style={{ animationDelay: `${index * 100}ms` }}
                  aria-label={`View ${project.title} project`}
                >
                  <div
                    className="
                      bg-creative-bg-alt rounded-xl overflow-hidden
                      border-2 border-white/10
                      transition-all duration-300 ease-out
                      hover:scale-[1.03] hover:border-creative-accent
                      hover:shadow-2xl hover:shadow-creative-accent/30
                      cursor-pointer h-full flex flex-col
                    "
                  >
                    {/* Image Carousel */}
                    <div className="relative h-56 md:h-64 bg-creative-bg overflow-hidden">
                      {project.images.map((image, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={image}
                          alt={`${project.title} - Image ${imgIndex + 1}`}
                          onClick={(e) => openLightbox(project.id, imgIndex, e)}
                          className={`
                            absolute inset-0 w-full h-full object-cover cursor-zoom-in
                            transition-all duration-500
                            ${imgIndex === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"}
                          `}
                        />
                      ))}

                      {/* Play overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-creative-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-creative-accent/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <Play className="w-8 h-8 text-creative-bg ml-1" fill="currentColor" />
                        </div>
                      </div>

                      {/* Carousel Navigation */}
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => prevImage(project.id, project.images.length, e)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-creative-accent text-white transition-all z-10 opacity-0 group-hover:opacity-100"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => nextImage(project.id, project.images.length, e)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-creative-accent text-white transition-all z-10 opacity-0 group-hover:opacity-100"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>

                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {project.images.map((_, imgIndex) => (
                              <button
                                key={imgIndex}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setCurrentImageIndices((prev) => ({ ...prev, [project.id]: imgIndex }));
                                }}
                                className={`h-1.5 rounded-full transition-all ${
                                  imgIndex === currentIndex ? "w-6 bg-creative-accent" : "w-1.5 bg-white/50"
                                }`}
                                aria-label={`Go to image ${imgIndex + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-5 md:p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-creative-fg group-hover:text-creative-accent transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-sm font-mono text-creative-fg-muted">{project.year}</span>
                      </div>

                      <div className="flex gap-2 mb-3">
                        <span className="px-2 py-1 bg-creative-accent/20 text-creative-accent text-xs font-semibold rounded">
                          {project.genre}
                        </span>
                        <span className="px-2 py-1 bg-creative-accent-alt/20 text-creative-accent-alt text-xs font-semibold rounded">
                          {project.role}
                        </span>
                      </div>

                      <p className="text-sm text-creative-fg-muted mb-4 flex-1 line-clamp-2">{project.description}</p>

                      {project.awards.length > 0 && (
                        <div className="pt-3 border-t border-white/10">
                          <div className="flex items-start gap-2">
                            <Award className="w-4 h-4 text-creative-accent mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-creative-fg-muted line-clamp-2">{project.awards.join(" • ")}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/30 backdrop-blur-sm py-6 mt-12 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 text-center text-creative-fg-muted">
          <p className="text-sm md:text-base">&copy; 2025 Praveen Elanchezhian. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {currentProject && (
        <ImageLightbox
          images={currentProject.images}
          currentIndex={lightbox.imageIndex}
          isOpen={lightbox.isOpen}
          onClose={closeLightbox}
          onNext={() =>
            setLightbox((prev) => ({
              ...prev,
              imageIndex: (prev.imageIndex + 1) % currentProject.images.length,
            }))
          }
          onPrev={() =>
            setLightbox((prev) => ({
              ...prev,
              imageIndex: (prev.imageIndex - 1 + currentProject.images.length) % currentProject.images.length,
            }))
          }
          projectTitle={currentProject.title}
        />
      )}
    </div>
  );
};

export default CreativePage;
