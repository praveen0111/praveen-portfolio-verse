import { useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/components/HeroSection";
import CreativePage from "@/components/CreativePage";
import DigitalPage from "@/components/DigitalPage";
import ContactPage from "@/components/ContactPage";
import MobileMenu from "@/components/MobileMenu";

type PageView = "home" | "creative" | "digital" | "contact";

const Index = () => {
  const [currentView, setCurrentView] = useState<PageView>("home");

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <main className="min-h-screen bg-background relative">
      {/* Particle Background - only on home */}
      {currentView === "home" && <ParticleBackground />}
      
      {/* Mobile Menu */}
      <MobileMenu onNavigate={handleNavigate} currentView={currentView} />

      {currentView === "home" && (
        <HeroSection
          onNavigateCreative={() => handleNavigate("creative")}
          onNavigateDigital={() => handleNavigate("digital")}
        />
      )}

      {currentView === "creative" && (
        <CreativePage
          onGoHome={() => handleNavigate("home")}
          onSwitchToDigital={() => handleNavigate("digital")}
        />
      )}

      {currentView === "digital" && (
        <DigitalPage
          onGoHome={() => handleNavigate("home")}
          onSwitchToCreative={() => handleNavigate("creative")}
        />
      )}

      {currentView === "contact" && (
        <ContactPage onGoHome={() => handleNavigate("home")} />
      )}
    </main>
  );
};

export default Index;
