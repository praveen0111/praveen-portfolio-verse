import { useState } from "react";
import HeroSlider from "@/components/HeroSlider";
import CreativePage from "@/components/CreativePage";
import ThinkPage from "@/components/ThinkPage";
import ContactPage from "@/components/ContactPage";
import PageTransition from "@/components/PageTransition";

/**
 * ============================================
 * MAIN INDEX PAGE - PAGE ROUTER
 * ============================================
 * 
 * Manages navigation between:
 * - Home (HeroSlider with Think/Creative split)
 * - Think (Academic/Professional profile)
 * - Creative (Film project showcase)
 * - Contact (Social links & contact info)
 * 
 * PAGE TRANSITIONS:
 * - Each page type has distinct animation style
 * - Think: Slower, calmer motion (0.6-0.7s)
 * - Creative: Faster, bolder motion (0.3-0.4s)
 * - Contact: Subtle slide-up
 * - Home: Scale-fade
 * 
 * HOW TO CUSTOMIZE:
 * 1. Edit transition types in PageTransition component
 * 2. Modify animation durations in tailwind.config.ts
 * 3. Add new pages by extending PageView type
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

  /**
   * Get transition type based on page
   * - think: Slower, calmer animation
   * - creative: Faster, bolder animation
   * - fusion: Contact page blend
   * - home: Default scale-fade
   */
  const getTransitionType = (view: PageView) => {
    switch (view) {
      case "think":
        return "think";
      case "creative":
        return "creative";
      case "contact":
        return "fusion";
      default:
        return "home";
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
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
