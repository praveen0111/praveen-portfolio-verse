import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookNavigationProps {
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const BookNavigation = ({ onNext, onPrevious, canGoNext, canGoPrevious }: BookNavigationProps) => {
  return (
    <>
      {canGoPrevious && (
        <button
          onClick={onPrevious}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-[200] p-3 md:p-4 min-h-[44px] min-w-[44px] flex items-center justify-center opacity-40 hover:opacity-70 active:opacity-90 disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft 
            className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]" 
            strokeWidth={3}
          />
        </button>
      )}

      {/* Next Button - Right Edge */}
      {canGoNext && (
        <button
          onClick={onNext}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-[200] p-3 md:p-4 min-h-[44px] min-w-[44px] flex items-center justify-center opacity-40 hover:opacity-70 active:opacity-90 disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight 
            className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]" 
            strokeWidth={3}
          />
        </button>
      )}
    </>
  );
};

export default BookNavigation;

