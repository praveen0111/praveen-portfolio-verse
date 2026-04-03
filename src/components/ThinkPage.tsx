import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { LayoutGroup } from "motion/react";
import { ExternalLink } from "lucide-react";
import ComicParticles from "./ComicParticles";
import DotGrid from "./DotGrid";
import RotatingText, { type RotatingTextRef } from "./RotatingText";
import { cn } from "@/lib/utils";
import {
  thinkMeta,
  thinkCV,
  thinkEducation,
  thinkExperience,
  thinkSkills,
  thinkTools,
  thinkCertifications,
} from "../../thinkPageData";

/** Shared layout spring for hero subtitle decrypt pills (LayoutGroup). */
const THINK_SUBTITLE_LAYOUT_SPRING = {
  layout: {
    type: "spring" as const,
    stiffness: 280,
    damping: 30,
    mass: 0.85,
  },
};

/** React Bits RotatingText: decrypt-in / encrypt-out scramble (no opacity-only dissolve). */
const THINK_ROTATING_TEXT_SHARED = {
  textEffect: "decrypt" as const,
  transition: {
    type: "tween" as const,
    duration: 0.6,
    ease: "easeInOut" as const,
  },
  /** Exit finishes encrypt-out before next phrase decrypts in (pairs well with `usePresence`). */
  animatePresenceMode: "wait" as const,
  pillLayoutTransition: THINK_SUBTITLE_LAYOUT_SPRING,
  /** Each tick picks a random phrase (not the same as current when possible). */
  randomizeOrder: true,
};

/**
 * ============================================
 * THINK PAGE - COMIC BOOK LAYOUT
 * ============================================
 * 
 * Academic/Professional profile as comic panels:
 * - THINK side: neon palette (deep violet + electric magenta, acid yellow for CTAs)
 * - Thick black comic panel borders
 * - Bold comic typography (Bangers for headings)
 * - Panel-based structure, not cards
 * - Reading like a comic book
 */

interface ThinkPageProps {
  onGoHome: () => void;
  onSwitchToCreative: () => void;
  onNavigateToContact: () => void;
}

const ThinkPage = ({ onGoHome, onSwitchToCreative, onNavigateToContact }: ThinkPageProps) => {
  const nameLines = thinkMeta.name.map((s) => s.trim()).filter(Boolean);
  const captionLines = (thinkMeta.heroCaptionLines ?? []).map((s) => s.trim()).filter(Boolean);
  const subtitleRoles = (thinkMeta.subtitleRotatingRoles ?? []).map((s) => s.trim()).filter(Boolean);
  const subtitleIntersection = (thinkMeta.subtitleRotatingIntersection ?? [])
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const subtitleBetweenPhrases = (thinkMeta.subtitleRotatingBetween ?? [])
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  /** One phrase still loops visually by alternating the same string (re-triggers motion). */
  const rolesForRotator =
    subtitleRoles.length === 1 ? [subtitleRoles[0], subtitleRoles[0]] : subtitleRoles;
  const intersectionForRotator =
    subtitleIntersection.length === 1
      ? [subtitleIntersection[0], subtitleIntersection[0]]
      : subtitleIntersection;
  const betweenForRotator =
    subtitleBetweenPhrases.length === 1
      ? [subtitleBetweenPhrases[0], subtitleBetweenPhrases[0]]
      : subtitleBetweenPhrases;
  const betweenTextsForRotator = betweenForRotator.map((w) => w);
  const hasSubtitleBetween = subtitleBetweenPhrases.length > 0;
  const hasRotatingSubtitle =
    subtitleRoles.length > 0 && subtitleIntersection.length > 0 && hasSubtitleBetween;
  const hasIdentityText = nameLines.length > 0 || hasRotatingSubtitle || captionLines.length > 0;

  const subtitleRoleRotRef = useRef<RotatingTextRef>(null);
  const subtitleBetweenRotRef = useRef<RotatingTextRef>(null);
  const subtitleIntersectionRotRef = useRef<RotatingTextRef>(null);
  const subtitleRotationMs = thinkMeta.subtitleRotationMs ?? 3600;
  const subtitleShouldAutoRotate =
    hasRotatingSubtitle &&
    (rolesForRotator.length > 1 ||
      betweenForRotator.length > 1 ||
      intersectionForRotator.length > 1);

  useEffect(() => {
    if (!subtitleShouldAutoRotate) return;
    const id = window.setInterval(() => {
      subtitleRoleRotRef.current?.next();
      subtitleBetweenRotRef.current?.next();
      subtitleIntersectionRotRef.current?.next();
    }, subtitleRotationMs);
    return () => window.clearInterval(id);
  }, [
    subtitleShouldAutoRotate,
    subtitleRotationMs,
    rolesForRotator.length,
    betweenForRotator.length,
    intersectionForRotator.length,
  ]);

  return (
    <div
      className="relative min-h-screen min-h-screen-mobile overflow-x-hidden bg-energy-think"
      style={{ backgroundColor: "hsl(var(--think-bg))" }}
    >
      <DotGrid variant="think" />
      {/* Comic Particles */}
      <ComicParticles mode="think" />
      
      {/* Navigation - flat text-based, dark overlay, hover color shift + glow */}
      <nav className="relative z-10 py-4 md:py-6 border-b-4" style={{ backgroundColor: "hsl(var(--think-bg-alt))", borderColor: "hsl(var(--think-accent))" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-row flex-nowrap justify-center items-stretch gap-1.5 sm:gap-3 md:gap-4">
            <Button
              onClick={onGoHome}
              className="flex-1 min-w-0 border-4 px-2 py-2 sm:px-6 sm:py-3 font-comic text-[calc(0.75rem*1.25)] sm:text-lg font-bold leading-tight text-center transition-[box-shadow,filter] duration-200 ease-out hover:brightness-110 shadow-[0_0_16px_hsl(var(--think-accent)/0.4),4px_4px_0_hsl(var(--think-accent)/0.6)] hover:shadow-[0_0_28px_hsl(var(--think-accent)/0.65),0_0_52px_hsl(var(--think-accent)/0.22),6px_6px_0_hsl(var(--think-accent)/0.5)]"
              style={{
                backgroundColor: "hsl(var(--think-bg))",
                color: "hsl(var(--think-fg))",
                borderColor: "hsl(var(--think-accent))",
              }}
            >
              HOME
            </Button>
            <Button
              onClick={onSwitchToCreative}
              className="flex-1 min-w-0 border-4 px-2 py-2 sm:px-6 sm:py-3 font-comic text-[calc(0.75rem*1.25)] sm:text-lg font-bold leading-tight text-center transition-[box-shadow,filter] duration-200 ease-out hover:brightness-110 shadow-[0_0_16px_hsl(var(--neon-red)/0.55),4px_4px_0_hsl(var(--neon-red)/0.5)] hover:shadow-[0_0_28px_hsl(var(--neon-red)/0.75),0_0_52px_hsl(var(--neon-red)/0.28),6px_6px_0_hsl(var(--neon-red)/0.55)]"
              style={{
                backgroundColor: "hsl(var(--neon-red))",
                color: "hsl(var(--primary-foreground))",
                borderColor: "hsl(var(--neon-red))",
              }}
            >
              VIEW CREATE.
            </Button>
            <Button
              onClick={onNavigateToContact}
              className="flex-1 min-w-0 border-4 px-2 py-2 sm:px-6 sm:py-3 font-comic text-[calc(0.75rem*1.25)] sm:text-lg font-bold leading-tight text-center transition-[box-shadow,filter] duration-200 ease-out hover:brightness-110 shadow-[0_0_16px_hsl(var(--accent)/0.55),4px_4px_0_hsl(var(--accent)/0.5)] hover:shadow-[0_0_28px_hsl(var(--accent)/0.65),0_0_52px_hsl(var(--accent)/0.25),6px_6px_0_hsl(var(--accent)/0.55)]"
              style={{
                backgroundColor: "hsl(var(--accent))",
                color: "hsl(var(--accent-foreground))",
                borderColor: "hsl(var(--accent))",
              }}
            >
              CONTACT
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content - Long Scroll Academic Narrative */}
      <main className="relative z-10 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {/* Hero / Identity */}
          <div
            className="mb-8 md:mb-12 p-6 md:p-10 border-4"
            style={{
              backgroundColor: "hsl(var(--think-bg-alt))",
              borderColor: "hsl(var(--think-accent))",
              boxShadow: "0 0 20px hsl(var(--think-accent) / 0.2), 8px 8px 0 hsl(var(--think-accent) / 0.3)",
            }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-10">
              <div
                className="w-32 h-32 md:w-40 md:h-40 border-4 flex-shrink-0 self-center md:self-auto"
                style={{ backgroundColor: "hsl(var(--think-bg))", borderColor: "hsl(var(--think-accent))" }}
              >
                <img
                  src={thinkMeta.profileImage}
                  alt="Praveen Elanchezhian"
                  className="w-full h-full object-cover"
                />
              </div>
              {hasIdentityText && (
                <div className="flex min-h-0 min-w-0 w-full max-w-full flex-1 flex-col justify-center gap-3 text-center md:min-h-[10rem] md:text-left">
                  {nameLines.length > 0 && (
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-comic font-bold leading-[1.05] tracking-tight" style={{ color: "hsl(var(--think-fg))" }}>
                      {thinkMeta.name.map((raw, i) => {
                        const line = raw.trim();
                        if (!line) return null;
                        const outlined = i === thinkMeta.nameOutlineIndex;
                        return (
                          <span
                            key={i}
                            className={cn("block", outlined && "px-0.5")}
                            style={
                              outlined
                                ? {
                                    color: "hsl(var(--think-bg))",
                                    WebkitTextStroke: "2px hsl(var(--think-accent))",
                                    paintOrder: "stroke fill",
                                  }
                                : undefined
                            }
                          >
                            {line}
                          </span>
                        );
                      })}
                    </h1>
                  )}
                  {hasRotatingSubtitle && (
                    <LayoutGroup id="think-hero-subtitle">
                      {/*
                        overflow-x on the flex row breaks Motion layout projection; scroll lives on outer wrapper.
                      */}
                      {/*
                        Mobile: default one horizontal row (nowrap + overflow-x) so pills stay on one line when possible.
                        Very narrow (max-[360px]): two rows — role on row 1; between + intersection on row 2; all centered.
                        `display: contents` on wrappers from 361px to md so three pills stay one flex row without duplicating rotators.
                      */}
                      <div className="flex w-full max-w-full min-w-0 justify-center overflow-x-auto overflow-y-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-start">
                        <div
                          role="paragraph"
                          className={cn(
                            "m-0 mx-auto flex max-w-none items-center text-base font-content font-content-medium leading-normal md:mx-0 md:text-lg",
                            /* Very narrow: stack two rows, full width, centered */
                            "max-[360px]:w-full max-[360px]:min-w-0 max-[360px]:max-w-full max-[360px]:flex-col max-[360px]:justify-center max-[360px]:gap-y-2 max-[360px]:gap-x-0",
                            /* Wider mobile / tablet: one scrollable line, min width = content */
                            "min-[361px]:max-md:w-max min-[361px]:max-md:min-w-max min-[361px]:max-md:flex-row min-[361px]:max-md:flex-nowrap min-[361px]:max-md:justify-center min-[361px]:max-md:gap-x-[1ch]",
                            /* Desktop */
                            "md:w-max md:min-w-max md:flex-row md:flex-nowrap md:justify-start md:gap-x-[1ch]",
                            "whitespace-nowrap"
                          )}
                          style={{ color: "hsl(var(--think-fg-muted))" }}
                        >
                          <div
                            className={cn(
                              "max-[360px]:flex max-[360px]:w-full max-[360px]:min-w-0 max-[360px]:justify-center",
                              "min-[361px]:max-md:contents",
                              "md:contents"
                            )}
                          >
                            <RotatingText
                              ref={subtitleRoleRotRef}
                              texts={rolesForRotator}
                              {...THINK_ROTATING_TEXT_SHARED}
                              auto={false}
                              loop
                              mainClassName={thinkMeta.subtitleRotatingMainClassName}
                              splitLevelClassName={thinkMeta.subtitleRotatingSplitLevelClassName}
                              className="shrink-0 self-center"
                              elementLevelClassName="leading-normal"
                            />
                          </div>
                          <div
                            className={cn(
                              "flex max-[360px]:w-full max-[360px]:min-w-0 max-[360px]:flex-row max-[360px]:flex-nowrap max-[360px]:items-center max-[360px]:justify-center max-[360px]:gap-x-[1ch]",
                              "min-[361px]:max-md:contents",
                              "md:contents"
                            )}
                          >
                            {hasSubtitleBetween ? (
                              <RotatingText
                                ref={subtitleBetweenRotRef}
                                texts={betweenTextsForRotator}
                                {...THINK_ROTATING_TEXT_SHARED}
                                auto={false}
                                loop
                                mainClassName={thinkMeta.subtitleRotatingMainClassName}
                                splitLevelClassName={thinkMeta.subtitleRotatingSplitLevelClassName}
                                className="shrink-0 self-center whitespace-pre"
                                elementLevelClassName="leading-normal"
                              />
                            ) : null}
                            <RotatingText
                              ref={subtitleIntersectionRotRef}
                              texts={intersectionForRotator}
                              {...THINK_ROTATING_TEXT_SHARED}
                              auto={false}
                              loop
                              mainClassName={thinkMeta.subtitleRotatingMainClassName}
                              splitLevelClassName={thinkMeta.subtitleRotatingSplitLevelClassName}
                              className="shrink-0 self-center"
                              elementLevelClassName="leading-normal"
                            />
                          </div>
                        </div>
                      </div>
                    </LayoutGroup>
                  )}
                  {captionLines.length > 0 && (
                    <div className="border-l-4 pl-3 md:pl-4" style={{ borderColor: "hsl(var(--think-accent))" }}>
                      <div className="space-y-1">
                        {captionLines.map((line, i) => (
                          <p
                            key={i}
                            className="font-comic text-sm md:text-base font-bold tracking-wide"
                            style={{ color: "hsl(var(--think-accent))" }}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Education Timeline */}
          <section className="mb-8 md:mb-12">
            <h2 className="mb-4 p-4 border-4 font-comic text-2xl sm:text-3xl md:text-4xl font-bold" style={{ backgroundColor: "hsl(var(--think-accent))", color: "hsl(var(--think-fg))", borderColor: "hsl(var(--think-glow))", boxShadow: "0 0 16px hsl(var(--think-accent) / 0.4), 6px 6px 0 hsl(var(--think-accent) / 0.5)" }}>
              EDUCATION JOURNEY
            </h2>
            <div className="space-y-4">
              {thinkEducation.map((edu, idx) => (
                <article key={`${edu.institution}-${idx}`} className="p-6 md:p-8 border-4" style={{ backgroundColor: "hsl(var(--think-bg))", borderColor: "hsl(var(--think-accent))", boxShadow: "0 0 12px hsl(var(--think-accent) / 0.2), 6px 6px 0 hsl(var(--think-accent) / 0.25)" }}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                    <h3 className="text-xl md:text-2xl font-comic font-bold" style={{ color: "hsl(var(--think-fg))" }}>
                      {edu.degree}
                    </h3>
                    <span className="text-base font-content font-content-medium whitespace-nowrap" style={{ color: "hsl(var(--think-fg-muted))" }}>
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-lg md:text-xl font-content font-content-bold mb-2" style={{ color: "hsl(var(--think-accent))" }}>
                    {edu.institution}
                  </p>
                  <p className="text-sm md:text-base font-content font-content-medium mb-2" style={{ color: "hsl(var(--think-fg))" }}>
                    Focus: {edu.focus}
                  </p>
                  <p className="text-base font-content font-content-medium" style={{ color: "hsl(var(--think-fg-muted))" }}>
                    {edu.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Applied Academic Experience */}
          <section className="mb-8 md:mb-12">
            <h2 className="mb-4 p-4 border-4 font-comic text-2xl sm:text-3xl md:text-4xl font-bold" style={{ backgroundColor: "hsl(var(--think-accent))", color: "hsl(var(--think-fg))", borderColor: "hsl(var(--think-glow))", boxShadow: "0 0 16px hsl(var(--think-accent) / 0.4), 6px 6px 0 hsl(var(--think-accent) / 0.5)" }}>
              APPLIED LEARNING: EXPERIENCE & PROJECTS
            </h2>
            <div className="space-y-4">
              {thinkExperience.map((project, idx) => {
                const hasLink = project.link && project.link !== "#";
                const Wrapper = hasLink ? "a" : "div";
                return (
                  <Wrapper
                    key={`${project.role}-${idx}`}
                    {...(hasLink
                      ? {
                          href: project.link,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          "aria-label": `View ${project.role}`,
                        }
                      : {})}
                    className="block"
                  >
                    <article className="p-6 md:p-8 border-4" style={{ backgroundColor: "hsl(var(--think-bg))", borderColor: "hsl(var(--think-accent))", boxShadow: "0 0 12px hsl(var(--think-accent) / 0.2), 6px 6px 0 hsl(var(--think-accent) / 0.25)" }}>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                        <h3 className="text-xl md:text-2xl font-comic font-bold flex items-center gap-2" style={{ color: "hsl(var(--think-fg))" }}>
                          {project.role}
                          {hasLink && <ExternalLink className="w-5 h-5" />}
                        </h3>
                        <span className="text-base font-content font-content-medium whitespace-nowrap" style={{ color: "hsl(var(--think-fg-muted))" }}>
                          {project.period}
                        </span>
                      </div>
                      <p className="text-lg md:text-xl font-content font-content-bold mb-3" style={{ color: "hsl(var(--think-accent))" }}>
                        {project.company}
                      </p>
                      <p className="text-base font-content font-content-medium mb-4" style={{ color: "hsl(var(--think-fg-muted))" }}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <span key={tool} className="px-3 py-1 border-2 font-content text-sm font-content-medium" style={{ backgroundColor: "hsl(var(--think-bg-alt))", color: "hsl(var(--think-fg))", borderColor: "hsl(var(--think-accent))" }}>
                            {tool}
                          </span>
                        ))}
                      </div>
                    </article>
                  </Wrapper>
                );
              })}
            </div>
          </section>

          {/* Skill Domains */}
          <section className="mb-8 md:mb-12">
            <h2 className="mb-4 p-4 border-4 font-comic text-2xl sm:text-3xl md:text-4xl font-bold" style={{ backgroundColor: "hsl(var(--think-accent))", color: "hsl(var(--think-fg))", borderColor: "hsl(var(--think-glow))", boxShadow: "0 0 16px hsl(var(--think-accent) / 0.4), 6px 6px 0 hsl(var(--think-accent) / 0.5)" }}>
              SKILL DOMAINS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {thinkSkills.map((skillGroup) => (
                <article key={skillGroup.group} className="p-6 border-4" style={{ backgroundColor: "hsl(var(--think-bg))", borderColor: "hsl(var(--think-accent))", boxShadow: "0 0 12px hsl(var(--think-accent) / 0.2), 6px 6px 0 hsl(var(--think-accent) / 0.25)" }}>
                  <h3 className="font-comic text-2xl font-bold mb-4" style={{ color: "hsl(var(--think-accent))" }}>
                    {skillGroup.group}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span key={skill} className="px-3 py-2 border-2 font-content text-sm font-content-medium" style={{ backgroundColor: "hsl(var(--think-bg-alt))", color: "hsl(var(--think-fg))", borderColor: "hsl(var(--think-accent))" }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Tools and Methods */}
          <section className="mb-8 md:mb-12">
            <h2 className="mb-4 p-4 border-4 font-comic text-2xl sm:text-3xl md:text-4xl font-bold" style={{ backgroundColor: "hsl(var(--think-accent))", color: "hsl(var(--think-fg))", borderColor: "hsl(var(--think-glow))", boxShadow: "0 0 16px hsl(var(--think-accent) / 0.4), 6px 6px 0 hsl(var(--think-accent) / 0.5)" }}>
              TOOLS & METHODS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {thinkTools.map((tool) => (
                <article key={tool.name} className="p-4 border-4" style={{ backgroundColor: "hsl(var(--think-bg-alt))", borderColor: "hsl(var(--think-accent))", boxShadow: "0 0 10px hsl(var(--think-accent) / 0.15), 4px 4px 0 hsl(var(--think-accent) / 0.2)" }}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="font-comic text-lg font-bold" style={{ color: "hsl(var(--think-fg))" }}>
                      {tool.name}
                    </p>
                    <Badge variant="secondary">{tool.tier}</Badge>
                  </div>
                  <p className="text-xs font-content font-content-light mb-3" style={{ color: "hsl(var(--think-fg-muted))" }}>
                    {tool.category}
                  </p>
                  <div className="h-2 border-2" style={{ backgroundColor: "hsl(var(--think-bg))", borderColor: "hsl(var(--think-accent))" }}>
                    <div className="h-full" style={{ width: `${tool.level}%`, backgroundColor: "hsl(var(--think-accent))" }} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Certifications (optional) */}
          {thinkCertifications.length > 0 && (
            <section className="mb-8 md:mb-12">
              <h2 className="mb-4 p-4 border-4 font-comic text-2xl sm:text-3xl md:text-4xl font-bold" style={{ backgroundColor: "hsl(var(--think-accent))", color: "hsl(var(--think-fg))", borderColor: "hsl(var(--think-glow))", boxShadow: "0 0 16px hsl(var(--think-accent) / 0.4), 6px 6px 0 hsl(var(--think-accent) / 0.5)" }}>
                CERTIFICATIONS
              </h2>
              <div className="space-y-3">
                {thinkCertifications.map((cert, idx) => (
                  <a
                    key={`${cert.name}-${idx}`}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-5 border-4"
                    style={{ backgroundColor: "hsl(var(--think-bg))", borderColor: "hsl(var(--think-accent))", boxShadow: "0 0 10px hsl(var(--think-accent) / 0.2), 5px 5px 0 hsl(var(--think-accent) / 0.2)" }}
                  >
                    <p className="font-comic text-xl" style={{ color: "hsl(var(--think-fg))" }}>
                      {cert.name}
                    </p>
                    <p className="text-sm font-content font-content-medium" style={{ color: "hsl(var(--think-fg-muted))" }}>
                      {cert.issuer} | {cert.year}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* CV CTA */}
          <section className="mb-6 md:mb-8 p-6 md:p-8 border-4 text-center" style={{ backgroundColor: "hsl(var(--think-bg-alt))", borderColor: "hsl(var(--think-accent))", boxShadow: "0 0 14px hsl(var(--think-accent) / 0.25), 6px 6px 0 hsl(var(--think-accent) / 0.25)" }}>
            <h2 className="font-comic text-2xl md:text-3xl mb-3" style={{ color: "hsl(var(--think-accent))" }}>
              {thinkCV.label.toUpperCase()}
            </h2>
            <p className="text-sm md:text-base mb-5 font-content font-content-medium" style={{ color: "hsl(var(--think-fg-muted))" }}>
              Download the full academic and professional profile.
            </p>
            <a
              href={thinkCV.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
              aria-label={thinkCV.buttonText}
            >
              <Button
                className="border-4 px-5 py-3 font-comic text-base md:text-lg font-bold"
                style={{
                  backgroundColor: "hsl(var(--think-accent))",
                  color: "hsl(var(--think-fg))",
                  borderColor: "hsl(var(--think-glow))",
                  boxShadow: "0 0 16px hsl(var(--think-accent) / 0.45), 4px 4px 0 hsl(var(--think-accent) / 0.25)",
                }}
              >
                {thinkCV.buttonText}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer 
        className="relative z-10 py-6 border-t-4 text-center"
        style={{ backgroundColor: "hsl(var(--think-bg))", borderColor: "hsl(var(--think-accent))" }}
      >
        <div className="container mx-auto px-4 md:px-6">
<p className="text-sm md:text-base font-content font-content-medium" style={{ color: "hsl(var(--think-fg-muted))" }}>
          &copy; 2026 PRAVEEN ELANCHEZHIAN. ALL RIGHTS RESERVED.
        </p>
        </div>
      </footer>
    </div>
  );
};

export default ThinkPage;
