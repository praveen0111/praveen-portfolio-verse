import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { publicUrl } from "@/lib/publicUrl";
import HeroSlider from "@/components/HeroSlider";
import PageTransition from "@/components/PageTransition";
import ClickSpark from "@/components/ClickSpark";
import Noise from "@/components/Noise";

const CreativePage = lazy(() => import("@/components/CreativePage"));
const ThinkPage = lazy(() => import("@/components/ThinkPage"));
const ContactPage = lazy(() => import("@/components/ContactPage"));

type PageView = "home" | "creative" | "think" | "contact";

const PAGE_ORDER: PageView[] = ["home", "creative", "think", "contact"];

const HERO_PRELOAD_IMAGES = [
  publicUrl("/images/think-background.webp"),
  publicUrl("/images/creative-background.webp"),
] as const;

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Minimum duration for “Entering…” — always runs; also waits for hero image preload */
const HOME_LOADING_MS = 1000;

/** After loading + reveal: 0.5s zoom+blur transition, then slider intro plays */
const HOME_REVEAL_MS = 500;

type HomeEntryPhase = "loading" | "reveal" | "ready";

const Index = () => {
  const [currentView, setCurrentView] = useState<PageView>("home");
  const [homeEntryPhase, setHomeEntryPhase] = useState<HomeEntryPhase>("loading");
  const [revealAnimate, setRevealAnimate] = useState(false);
  const [homeIntroComplete, setHomeIntroComplete] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await Promise.all([
        Promise.all(HERO_PRELOAD_IMAGES.map(preloadImage)),
        sleep(HOME_LOADING_MS),
      ]);
      if (!cancelled) setHomeEntryPhase("reveal");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (homeEntryPhase !== "reveal") return;
    setRevealAnimate(false);
    let innerRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => setRevealAnimate(true));
    });
    const t = setTimeout(() => setHomeEntryPhase("ready"), HOME_REVEAL_MS);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(outerRaf);
      cancelAnimationFrame(innerRaf);
    };
  }, [homeEntryPhase]);

  const isHomeContentFocused =
    homeEntryPhase === "ready" || (homeEntryPhase === "reveal" && revealAnimate);

  const handleHomeIntroComplete = useCallback(() => {
    setHomeIntroComplete(true);
  }, []);

  const getPageIndex = (view: PageView): number => {
    return PAGE_ORDER.indexOf(view);
  };

  const getCurrentPageIndex = (): number => {
    return getPageIndex(currentView);
  };

  const canGoNext = (): boolean => {
    return getCurrentPageIndex() < PAGE_ORDER.length - 1;
  };

  const canGoPrevious = (): boolean => {
    return getCurrentPageIndex() > 0;
  };

  const handleNext = () => {
    if (!canGoNext()) return;
    const nextView = PAGE_ORDER[getCurrentPageIndex() + 1];
    setCurrentView(nextView);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handlePrevious = () => {
    if (!canGoPrevious()) return;
    const prevView = PAGE_ORDER[getCurrentPageIndex() - 1];
    setCurrentView(prevView);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const navigateTo = (view: PageView) => {
    if (currentView === view) return;
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleNavigateCreative = () => navigateTo("creative");
  const handleNavigateThink = () => navigateTo("think");

  const handleGoHome = () => {
    if (currentView === "home") return;
    setCurrentView("home");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleNavigateToContact = () => {
    if (currentView === "contact") return;
    setCurrentView("contact");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const isHome = currentView === "home";

  /** Until reveal + intro sweep finish: block THINK / CREATE / divider */
  const homeNavigationLocked = homeEntryPhase !== "ready" || !homeIntroComplete;

  useEffect(() => {
    if (!isHome) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isHome]);

  return (
    <main
      className={cn(
        "overflow-x-hidden relative",
        isHome
          ? "h-[100dvh] max-h-[100dvh] min-h-0 overflow-hidden overscroll-none"
          : "min-h-screen min-h-screen-mobile",
      )}
      style={{
        perspective: "2000px",
        perspectiveOrigin: "center center",
        backgroundColor: "hsl(var(--creative-bg))",
      }}
    >
      <div
        className={cn("absolute inset-0 w-full", isHome ? "h-full min-h-0 overflow-hidden" : "min-h-screen")}
      >
        <ClickSpark
          sparkColor="#fff"
          sparkSize={29}
          sparkRadius={70}
          sparkCount={8}
          duration={400}
        >
        <div
          className={cn(
            "relative z-10 w-full",
            isHome ? "flex h-full min-h-0 flex-col overflow-hidden" : "min-h-screen min-h-screen-mobile",
          )}
        >
      <PageTransition type="home" isVisible={currentView === "home"} fitViewport>
        {homeEntryPhase === "loading" && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
            role="status"
            aria-live="polite"
            aria-label="Loading"
          >
            <p className="font-comic text-xl sm:text-2xl md:text-3xl text-white px-4 text-center">
              Entering
              <span className="home-loading-dots" aria-hidden>
                {".".repeat(5).split("").map((_, i) => (
                  <span key={i} className="home-loading-dot">
                    .
                  </span>
                ))}
              </span>
            </p>
          </div>
        )}
        <div
          className={cn(
            "relative w-full min-h-0 flex-1 flex flex-col overflow-hidden transition-[filter,transform] duration-500 ease-out will-change-[filter,transform]",
            isHomeContentFocused
              ? "blur-0 scale-100"
              : "blur-[14px] scale-[1.06] [transform-origin:center_center]",
          )}
        >
          <HeroSlider
            onNavigateCreative={handleNavigateCreative}
            onNavigateThink={handleNavigateThink}
            playIntro={homeEntryPhase === "ready" && !homeIntroComplete}
            onIntroComplete={handleHomeIntroComplete}
            navigationLocked={homeNavigationLocked}
          />
          {currentView === "home" && (
            <div className="pointer-events-none absolute inset-0 z-[19]" aria-hidden>
              <Noise
                patternSize={190}
                patternScaleX={0.9}
                patternScaleY={1}
                patternRefreshInterval={10}
                patternAlpha={20}
              />
            </div>
          )}
        </div>
      </PageTransition>

      <Suspense fallback={null}>
        <PageTransition type="creative" isVisible={currentView === "creative"}>
          <CreativePage
            onGoHome={handleGoHome}
            onSwitchToThink={handleNavigateThink}
            onNavigateToContact={handleNavigateToContact}
          />
        </PageTransition>

        <PageTransition type="think" isVisible={currentView === "think"}>
          <ThinkPage
            onGoHome={handleGoHome}
            onSwitchToCreative={handleNavigateCreative}
            onNavigateToContact={handleNavigateToContact}
          />
        </PageTransition>

        <PageTransition type="fusion" isVisible={currentView === "contact"}>
          <ContactPage
            onGoHome={handleGoHome}
            onSwitchToCreative={handleNavigateCreative}
            onSwitchToThink={handleNavigateThink}
          />
        </PageTransition>
      </Suspense>
        </div>
        </ClickSpark>
      </div>
    </main>
  );
};

export default Index;
