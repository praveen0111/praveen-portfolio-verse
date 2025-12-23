import { useState } from "react";
import HeroSlider from "@/components/HeroSlider";
import CreativePageEnhanced from "@/components/CreativePageEnhanced";
import DigitalPageEnhanced from "@/components/DigitalPageEnhanced";
import ContactPage from "@/components/ContactPage";

type PageView = "home" | "creative" | "digital" | "contact";

const Index = () => {
  const [currentView, setCurrentView] = useState<PageView>("home");

  const handleNavigateCreative = () => {
    setCurrentView("creative");
    window.scrollTo(0, 0);
  };

  const handleNavigateDigital = () => {
    setCurrentView("digital");
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setCurrentView("home");
    window.scrollTo(0, 0);
  };

  const handleNavigateToContact = () => {
    setCurrentView("contact");
    window.scrollTo(0, 0);
  };

  return (
    <main className="min-h-screen">
      {currentView === "home" && (
        <HeroSlider 
          onNavigateCreative={handleNavigateCreative}
          onNavigateDigital={handleNavigateDigital}
        />
      )}
      
      {currentView === "creative" && (
        <CreativePageEnhanced 
          onGoHome={handleGoHome}
          onSwitchToDigital={handleNavigateDigital}
          onNavigateToContact={handleNavigateToContact}
        />
      )}
      
      {currentView === "digital" && (
        <DigitalPageEnhanced 
          onGoHome={handleGoHome}
          onSwitchToCreative={handleNavigateCreative}
          onNavigateToContact={handleNavigateToContact}
        />
      )}

      {currentView === "contact" && (
        <ContactPage 
          onGoHome={handleGoHome}
        />
      )}
    </main>
  );
};

export default Index;