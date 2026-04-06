import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

function App() {
  useEffect(() => {
    const getClosestImg = (target: EventTarget | null) => {
      if (!target || !(target instanceof Element)) return null;
      return target.closest("img");
    };

    const onContextMenuCapture = (e: MouseEvent) => {
      const img = getClosestImg(e.target);
      if (!img) return;
      // Prevent “Save image as…” and other image-specific context actions.
      e.preventDefault();
      e.stopPropagation();
    };

    const onDragStartCapture = (e: DragEvent) => {
      const img = getClosestImg(e.target);
      if (!img) return;
      // Prevent dragging images out to save them.
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener("contextmenu", onContextMenuCapture, true);
    document.addEventListener("dragstart", onDragStartCapture, true);

    return () => {
      document.removeEventListener("contextmenu", onContextMenuCapture, true);
      document.removeEventListener("dragstart", onDragStartCapture, true);
    };
  }, []);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || undefined}>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;
