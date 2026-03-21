import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ============================================
 * IMAGE LIGHTBOX COMPONENT
 * ============================================
 * 
 * Full-screen image modal with:
 * - Dark cinematic background
 * - Left/right navigation arrows
 * - Keyboard navigation (arrows, escape)
 * - Swipe support for mobile
 * - Cinematic open/close animations
 * 
 * HOW TO CUSTOMIZE:
 * 1. Adjust overlay opacity in bg-black/95
 * 2. Modify animation duration in animate-lightbox-open
 * 3. Change arrow styles and positioning
 * 4. Edit image max-width/height constraints
 */

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  projectTitle?: string;
}

const ImageLightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  projectTitle,
}: ImageLightboxProps) => {
  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center touch-none"
      style={{
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer for ${projectTitle || "project"}`}
    >
      {/* Dark overlay background */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white hover:scale-110 touch-manipulation transition-transform duration-150 active:bg-white/20 active:scale-110"
        style={{ top: "max(1rem, env(safe-area-inset-top))" }}
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-4 z-10 px-3 py-2 sm:px-4 rounded-full bg-white/10 text-white text-xs sm:text-sm font-content font-content-medium" style={{ left: "max(1rem, env(safe-area-inset-left))" }}>
        {currentIndex + 1} / {images.length}
      </div>

      {/* Project title */}
      {projectTitle && (
        <div className="absolute bottom-20 sm:bottom-16 left-1/2 -translate-x-1/2 z-10 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm sm:text-lg font-content font-content-bold text-center max-w-[90vw]">
          {projectTitle}
        </div>
      )}

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 sm:left-4 md:left-8 z-10 p-3 md:p-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-creative-accent text-white hover:scale-110 touch-manipulation transition-transform duration-150 hover:[&_svg]:text-creative-bg active:bg-creative-accent active:scale-110 active:[&_svg]:text-creative-bg"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 sm:right-4 md:right-8 z-10 p-3 md:p-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white/10 hover:bg-creative-accent text-white hover:scale-110 touch-manipulation transition-transform duration-150 hover:[&_svg]:text-creative-bg active:bg-creative-accent active:scale-110 active:[&_svg]:text-creative-bg"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      )}

      {/* Main image */}
      <div className="relative z-0 w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-16">
        <img
          src={images[currentIndex]}
          alt={`${projectTitle || "Project"} - Image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 items-center">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                const diff = index - currentIndex;
                if (diff > 0) {
                  for (let i = 0; i < diff; i++) onNext();
                } else {
                  for (let i = 0; i < Math.abs(diff); i++) onPrev();
                }
              }}
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full touch-manipulation transition-colors duration-150 ${
                index === currentIndex
                  ? "bg-creative-accent w-6"
                  : "bg-white/50 hover:bg-white/75 active:bg-white/75 w-2"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageLightbox;
