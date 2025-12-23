import { useState } from "react";
import HeroSlider from "@/components/HeroSlider";
import CreativePage from "@/components/CreativePage";
import ThinkPage from "@/components/ThinkPage";
import ContactPage from "@/components/ContactPage";
import PageTransition from "@/components/PageTransition";
import ComicParticles from "@/components/ComicParticles";
import ComicCursor from "@/components/ComicCursor";

/**
 * ============================================
 * MAIN INDEX PAGE - GRAPHIC NOVEL PORTFOLIO
 * ============================================
 * 
 * This is a LIVING COMIC BOOK, not a standard website.
 * 
 * Features:
 * - Dynamic halftone/ink particles on all pages
 * - Custom comic cursor with ink effects
 * - Panel-based transitions
 * - Think vs Creative visual contrast
 */

type PageView = "home" | "creative" | "think" | "contact";

const Index = () => {
  const [currentView, setCurrentView] = useState<PageView>("home");

  const handleNavigateCreative = () => {
    setCurrentView("creative");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateThink = () => {
    setCurrentView("think");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoHome = () => {
    setCurrentView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToContact = () => {
    setCurrentView("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get particle variant based on current view
  const getParticleVariant = () => {
    switch (currentView) {
      case "think":
        return "think";
      case "creative":
        return "creative";
      default:
        return "fusion";
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Custom Comic Cursor */}
      <ComicCursor />
      
      {/* Dynamic Comic Particles - Always active */}
      <ComicParticles variant={getParticleVariant()} />

      {/* Home Page - Split Screen Slider */}
      <PageTransition type="home" isVisible={currentView === "home"}>
        <HeroSlider
          onNavigateCreative={handleNavigateCreative}
          onNavigateThink={handleNavigateThink}
        />
      </PageTransition>

      {/* Creative Page - Film Projects */}
      <PageTransition type="creative" isVisible={currentView === "creative"}>
        <CreativePage
          onGoHome={handleGoHome}
          onSwitchToThink={handleNavigateThink}
          onNavigateToContact={handleNavigateToContact}
        />
      </PageTransition>

      {/* Think Page - Academic/Professional */}
      <PageTransition type="think" isVisible={currentView === "think"}>
        <ThinkPage
          onGoHome={handleGoHome}
          onSwitchToCreative={handleNavigateCreative}
          onNavigateToContact={handleNavigateToContact}
        />
      </PageTransition>

      {/* Contact Page - Fusion Zone */}
      <PageTransition type="fusion" isVisible={currentView === "contact"}>
        <ContactPage onGoHome={handleGoHome} />
      </PageTransition>
    </main>
  );
};

export default Index;
