import { useState } from "react";
import HeroSlider from "@/components/HeroSlider";
import CreativePage from "@/components/CreativePage";
import ThinkPage from "@/components/ThinkPage";
import ContactPage from "@/components/ContactPage";
import PageTransition from "@/components/PageTransition";

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
