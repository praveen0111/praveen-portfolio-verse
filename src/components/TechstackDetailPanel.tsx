import { AnimatePresence, motion } from "motion/react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ThinkTechstackXpStars } from "../../thinkPageData";

function XpStars({ value, centered }: { value: ThinkTechstackXpStars; centered?: boolean }) {
  return (
    <div
      className={cn(
        "flex min-h-[2.25rem] flex-wrap items-center gap-1 border-b-2 border-black/25 pb-3",
        centered && "justify-center",
      )}
      aria-label={`My XP: ${value} out of 5 stars`}
    >
      <span
        className="shrink-0 font-content text-sm font-bold sm:text-base"
        style={{ color: "hsl(var(--think-fg))" }}
      >
        My XP:{" "}
      </span>
      <div className="flex items-center justify-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn(
              "h-5 w-5 sm:h-6 sm:w-6",
              i < value
                ? "fill-[hsl(var(--think-accent))] stroke-black text-[hsl(var(--think-accent))]"
                : "fill-transparent stroke-[hsl(var(--think-fg-muted))] opacity-50",
            )}
            strokeWidth={2}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}

export function TechstackDetailPanel({
  selectedIndex,
  labels,
  xp,
  usage,
  imageUrls,
}: {
  selectedIndex: number | null;
  labels: string[];
  xp: ThinkTechstackXpStars[];
  usage: string[];
  imageUrls: string[];
}) {
  const active =
    selectedIndex !== null &&
    Boolean(labels[selectedIndex]) &&
    xp[selectedIndex] !== undefined &&
    usage[selectedIndex] !== undefined &&
    Boolean(imageUrls[selectedIndex]);

  return (
    <div className="flex h-full min-h-[240px] flex-col">
      {/* Logo centered in upper “stage” */}
      <div className="relative flex min-h-[min(160px,22vw)] flex-1 flex-col items-center justify-center px-2 py-4 sm:min-h-[176px]">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="flex items-center justify-center"
            >
              <img
                src={imageUrls[selectedIndex!]}
                alt={labels[selectedIndex!]}
                className="max-h-28 w-auto max-w-[min(160px,44vw)] object-contain sm:max-h-32 sm:max-w-[176px]"
                style={{ filter: "drop-shadow(0 3px 10px hsl(var(--think-accent) / 0.25))" }}
              />
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="m-0 max-w-[16rem] text-center font-content text-sm font-medium leading-relaxed sm:text-base"
              style={{ color: "hsl(var(--think-fg-muted))" }}
            >
              Click a logo
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div
        className="mt-auto flex flex-col gap-2 border-t-2 pt-3 text-center sm:pt-4"
        style={{ borderColor: "hsl(var(--think-accent) / 0.45)" }}
      >
        <h3
          className="font-comic text-xl font-bold leading-tight sm:text-2xl md:text-3xl"
          style={{ color: "hsl(var(--think-fg))" }}
        >
          {active ? labels[selectedIndex!] : "\u00a0"}
        </h3>

        <div className="mx-auto w-full max-w-md">
          {active ? (
            <XpStars value={xp[selectedIndex!]} centered />
          ) : (
            <div className="min-h-[2.25rem] border-b-2 border-black/10 pb-3" aria-hidden />
          )}
        </div>

        <div className="min-h-[4.75rem]">
          {active ? (
            <p
              className="mx-auto max-w-prose text-center font-content text-sm font-medium leading-relaxed sm:text-base"
              style={{ color: "hsl(var(--think-fg))" }}
            >
              {usage[selectedIndex!]}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
