import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * CREATIVE PAGE - ENHANCED WITH PROJECT TILES
 * 
 * Features:
 * - 6+ clickable project tiles in responsive grid
 * - Image carousel/slideshow within each tile
 * - Hover effects (scale, shadow, color transition)
 * - Mobile responsive layout
 * - Fully accessible with keyboard navigation
 * 
 * HOW TO CUSTOMIZE:
 * 1. Add/remove projects in the 'projects' array
 * 2. Replace placeholder image URLs with actual project images
 * 3. Update project links in href attributes
 * 4. Adjust grid layout by changing grid-cols-* classes
 * 5. Modify hover effects in tile className
 * 6. Change carousel timing in useEffect interval (currently 5000ms)
 */

interface CreativePageEnhancedProps {
  onGoHome: () => void;
  onSwitchToDigital: () => void;
  onNavigateToContact: () => void;
}

const CreativePageEnhanced = ({ onGoHome, onSwitchToDigital, onNavigateToContact }: CreativePageEnhancedProps) => {
  // Project data configuration
  // ADD/EDIT PROJECTS: Modify this array to add or change projects
  const projects = [
    {
      id: 1,
      title: "GR3Y",
      year: "2023",
      genre: "Thriller",
      description: "An archaeologist unearths a treasure box, which leads to a turn of unexpected events.",
      awards: "Best Direction & Best Film at Malda Int'l Film Festival",
      link: "#", // <!-- INSERT PROJECT LINK HERE -->
      images: [
        "https://placehold.co/800x600/1f2937/d1d5db?text=GR3Y+Poster",
        "https://placehold.co/800x600/374151/9ca3af?text=GR3Y+Scene+1",
        "https://placehold.co/800x600/4b5563/d1d5db?text=GR3Y+Scene+2"
      ]
    },
    {
      id: 2,
      title: "STRANGERS",
      year: "2023",
      genre: "Drama",
      description: "A conversation between a stranger and a bystander unfolds, past and present collide.",
      awards: "Best Film, Best Editing & Best Director at ENGENIA 2024",
      link: "#", // <!-- INSERT PROJECT LINK HERE -->
      images: [
        "https://placehold.co/800x600/1f2937/d1d5db?text=STRANGERS+Poster",
        "https://placehold.co/800x600/374151/9ca3af?text=STRANGERS+Scene+1",
        "https://placehold.co/800x600/4b5563/d1d5db?text=STRANGERS+Scene+2"
      ]
    },
    {
      id: 3,
      title: "Project Title 3",
      year: "2024",
      genre: "Documentary",
      description: "A compelling story about human connection and creativity in the modern world.",
      awards: "Official Selection at Multiple Film Festivals",
      link: "#", // <!-- INSERT PROJECT LINK HERE -->
      images: [
        "https://placehold.co/800x600/1f2937/d1d5db?text=Project+3+Image+1",
        "https://placehold.co/800x600/374151/9ca3af?text=Project+3+Image+2",
        "https://placehold.co/800x600/4b5563/d1d5db?text=Project+3+Image+3"
      ]
    },
    {
      id: 4,
      title: "Project Title 4",
      year: "2024",
      genre: "Short Film",
      description: "An experimental piece exploring the boundaries of visual storytelling.",
      awards: "Audience Choice Award",
      link: "#", // <!-- INSERT PROJECT LINK HERE -->
      images: [
        "https://placehold.co/800x600/1f2937/d1d5db?text=Project+4+Image+1",
        "https://placehold.co/800x600/374151/9ca3af?text=Project+4+Image+2",
        "https://placehold.co/800x600/4b5563/d1d5db?text=Project+4+Image+3"
      ]
    },
    {
      id: 5,
      title: "Project Title 5",
      year: "2025",
      genre: "Music Video",
      description: "A vibrant visual journey through sound and emotion.",
      awards: "Best Cinematography",
      link: "#", // <!-- INSERT PROJECT LINK HERE -->
      images: [
        "https://placehold.co/800x600/1f2937/d1d5db?text=Project+5+Image+1",
        "https://placehold.co/800x600/374151/9ca3af?text=Project+5+Image+2",
        "https://placehold.co/800x600/4b5563/d1d5db?text=Project+5+Image+3"
      ]
    },
    {
      id: 6,
      title: "Project Title 6",
      year: "2025",
      genre: "Commercial",
      description: "Creative commercial work showcasing brand storytelling excellence.",
      awards: "Industry Recognition Award",
      link: "#", // <!-- INSERT PROJECT LINK HERE -->
      images: [
        "https://placehold.co/800x600/1f2937/d1d5db?text=Project+6+Image+1",
        "https://placehold.co/800x600/374151/9ca3af?text=Project+6+Image+2",
        "https://placehold.co/800x600/4b5563/d1d5db?text=Project+6+Image+3"
      ]
    }
  ];

  // State to track current image index for each project's carousel
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<number, number>>(
    projects.reduce((acc, project) => ({ ...acc, [project.id]: 0 }), {})
  );

  // Navigate to next image in carousel
  const nextImage = (projectId: number, totalImages: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % totalImages
    }));
  };

  // Navigate to previous image in carousel
  const prevImage = (projectId: number, totalImages: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [projectId]: (prev[projectId] - 1 + totalImages) % totalImages
    }));
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--creative-bg))] text-[hsl(var(--creative-fg))] animate-[fadeIn_0.5s_ease-in-out]">
      {/* Navigation */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          {/* MOBILE RESPONSIVE: flex-col on mobile, flex-row on larger screens */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4">
            <Button 
              onClick={onGoHome}
              variant="ghost"
              className="w-full sm:w-auto text-[hsl(var(--creative-fg))] hover:text-white transition-colors font-semibold"
            >
              Home
            </Button>
            <Button 
              onClick={onSwitchToDigital}
              className="w-full sm:w-auto bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              View Digital Profile
            </Button>
            <Button
              onClick={onNavigateToContact}
              className="w-full sm:w-auto bg-[hsl(var(--creative-accent))] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[hsl(var(--tile-hover-bg))] transition-colors"
            >
              Contact
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-8 md:mb-12">
            Creative Film Projects
          </h1>

          {/* Project Grid */}
          {/* CUSTOMIZE GRID: Change grid-cols-* for different layouts */}
          {/* Current: 1 col mobile, 2 cols tablet, 3 cols desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {projects.map((project) => {
              const currentIndex = currentImageIndices[project.id] || 0;
              
              return (
                <a
                  key={project.id}
                  href={project.link}
                  className="group block"
                  aria-label={`View details for ${project.title}`}
                >
                  {/* Clickable Project Tile */}
                  {/* HOVER EFFECTS: Customize scale, shadow, and colors below */}
                  <div className="
                    bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden
                    border-2 border-transparent
                    transition-all duration-300 ease-in-out
                    hover:scale-105 
                    hover:border-[hsl(var(--creative-accent))]
                    hover:shadow-2xl hover:shadow-[hsl(var(--tile-hover-shadow))]/50
                    cursor-pointer
                    h-full flex flex-col
                  ">
                    {/* Image Carousel Section */}
                    <div className="relative h-48 md:h-56 lg:h-64 bg-gray-900 overflow-hidden">
                      {/* Carousel Images */}
                      {project.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          className={`
                            absolute inset-0 w-full h-full object-cover
                            transition-opacity duration-500
                            ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
                          `}
                        />
                      ))}

                      {/* Carousel Navigation Buttons */}
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              prevImage(project.id, project.images.length);
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all z-10"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              nextImage(project.id, project.images.length);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all z-10"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>

                          {/* Carousel Indicators */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {project.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentImageIndices(prev => ({
                                    ...prev,
                                    [project.id]: index
                                  }));
                                }}
                                className={`
                                  w-2 h-2 rounded-full transition-all
                                  ${index === currentIndex 
                                    ? 'bg-white w-6' 
                                    : 'bg-white/50 hover:bg-white/75'}
                                `}
                                aria-label={`Go to image ${index + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Project Info Section */}
                    <div className="p-5 md:p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[hsl(var(--creative-accent))] transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-sm font-semibold text-gray-400 whitespace-nowrap ml-2">
                          {project.year}
                        </span>
                      </div>
                      
                      <p className="text-sm font-semibold text-[hsl(var(--creative-accent))] mb-3">
                        {project.genre}
                      </p>
                      
                      <p className="text-sm md:text-base text-gray-300 mb-4 flex-1">
                        {project.description}
                      </p>
                      
                      {project.awards && (
                        <div className="pt-3 border-t border-gray-700">
                          <p className="text-xs md:text-sm text-gray-400">
                            <strong className="text-[hsl(var(--creative-accent))]">Awards:</strong> {project.awards}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-sm py-6 mt-12">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-400">
          <p className="text-sm md:text-base">&copy; 2025 Praveen Elanchezhian. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CreativePageEnhanced;
