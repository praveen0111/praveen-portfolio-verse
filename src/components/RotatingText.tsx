import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import {
  motion,
  AnimatePresence,
  usePresence,
  Transition,
  type VariantLabels,
  type Target,
  type TargetAndTransition
} from 'motion/react';
import { cn } from '@/lib/utils';

const DECRYPT_GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
const DECRYPT_SCRAMBLE_STEPS = 5;
const DECRYPT_TICK_MS = 32;

function randomDecryptGlyph(): string {
  return DECRYPT_GLYPHS[Math.floor(Math.random() * DECRYPT_GLYPHS.length)]!;
}

type DecryptingPhraseProps = {
  text: string;
  durationSec: number;
  splitIntoGraphemes: (s: string) => string[];
  className?: string;
};

/**
 * Scramble → resolve on enter; scramble → clear on exit. Calls `safeToRemove` after encrypt-out
 * so AnimatePresence `wait` can finish before the next phrase decrypts in.
 */
function DecryptingPhrase({ text, durationSec, splitIntoGraphemes, className }: DecryptingPhraseProps) {
  const [isPresent, safeToRemove] = usePresence();
  const graphemes = useMemo(() => splitIntoGraphemes(text), [text, splitIntoGraphemes]);
  const [displayChars, setDisplayChars] = useState<string[]>(() =>
    graphemes.map((g) => (g === ' ' ? ' ' : randomDecryptGlyph()))
  );

  /** Decrypt in (present). */
  useEffect(() => {
    if (!isPresent) return;
    const g = splitIntoGraphemes(text);
    const n = g.length;
    const timeouts: number[] = [];
    const intervals: number[] = [];

    g.forEach((target, i) => {
      if (target === ' ') {
        setDisplayChars((prev) => {
          const next = [...prev];
          if (i < next.length) next[i] = ' ';
          return next;
        });
        return;
      }
      const staggerMs = n <= 1 ? 0 : (i / Math.max(n - 1, 1)) * durationSec * 0.55 * 1000;
      const tid = window.setTimeout(() => {
        let step = 0;
        const iid = window.setInterval(() => {
          step += 1;
          if (step < DECRYPT_SCRAMBLE_STEPS) {
            setDisplayChars((prev) => {
              const next = [...prev];
              if (i < next.length) next[i] = randomDecryptGlyph();
              return next;
            });
          } else {
            window.clearInterval(iid);
            setDisplayChars((prev) => {
              const next = [...prev];
              if (i < next.length) next[i] = target;
              return next;
            });
          }
        }, DECRYPT_TICK_MS);
        intervals.push(iid);
      }, staggerMs);
      timeouts.push(tid);
    });

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
      intervals.forEach((id) => window.clearInterval(id));
    };
  }, [isPresent, text, durationSec, splitIntoGraphemes]);

  /** Encrypt out (!present); then safeToRemove. */
  useEffect(() => {
    if (isPresent || typeof safeToRemove !== 'function') return;
    let cancelled = false;
    const g = splitIntoGraphemes(text);
    const n = g.length;
    const timeouts: number[] = [];
    const intervals: number[] = [];

    let remaining = 0;
    g.forEach((target, i) => {
      if (target === ' ') return;
      remaining += 1;
    });

    if (remaining === 0) {
      safeToRemove();
      return;
    }

    const finishOne = () => {
      if (cancelled) return;
      remaining -= 1;
      if (remaining <= 0) safeToRemove();
    };

    g.forEach((target, i) => {
      if (target === ' ') return;
      const staggerMs = n <= 1 ? 0 : ((n - 1 - i) / Math.max(n - 1, 1)) * durationSec * 0.5 * 1000;
      const tid = window.setTimeout(() => {
        let step = 0;
        const iid = window.setInterval(() => {
          if (cancelled) {
            window.clearInterval(iid);
            return;
          }
          step += 1;
          if (step < DECRYPT_SCRAMBLE_STEPS) {
            setDisplayChars((prev) => {
              const next = [...prev];
              if (i < next.length) next[i] = randomDecryptGlyph();
              return next;
            });
          } else {
            window.clearInterval(iid);
            setDisplayChars((prev) => {
              const next = [...prev];
              if (i < next.length) next[i] = '';
              return next;
            });
            finishOne();
          }
        }, DECRYPT_TICK_MS);
        intervals.push(iid);
      }, staggerMs);
      timeouts.push(tid);
    });

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
      intervals.forEach((id) => window.clearInterval(id));
    };
  }, [isPresent, safeToRemove, text, durationSec, splitIntoGraphemes]);

  return (
    <span className={cn('inline-flex flex-nowrap whitespace-nowrap', className)} aria-hidden="true">
      {displayChars.map((ch, i) => (
        <span key={i} className="inline-block min-w-[0.45em] text-center">
          {ch}
        </span>
      ))}
    </span>
  );
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    'children' | 'transition' | 'initial' | 'animate' | 'exit'
  > {
  texts: string[];
  transition?: Transition;
  initial?: boolean | Target | VariantLabels;
  animate?: boolean | VariantLabels | TargetAndTransition;
  exit?: Target | VariantLabels;
  animatePresenceMode?: 'sync' | 'wait' | 'popLayout';
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: string;
  /** `decrypt` = scramble→text in / text→scramble out. `dissolve` = opacity crossfade. `scroll` = vertical roll. */
  textEffect?: 'characters' | 'scroll' | 'dissolve' | 'decrypt';
  onNext?: (index: number) => void;
  /** Pick a random phrase each tick (never the same as current, when possible). */
  randomizeOrder?: boolean;
  /** With `animatePresenceMode="popLayout"`, keeps siblings from snapping (default left). */
  presenceAnchorX?: 'left' | 'right';
  /** Outer pill `layout` transition (spring recommended when using `popLayout`). */
  pillLayoutTransition?: Transition;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: 'spring', damping: 25, stiffness: 300 },
      initial = { y: '100%', opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: '-120%', opacity: 0 },
      animatePresenceMode = 'wait',
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = 'first',
      loop = true,
      auto = true,
      splitBy = 'characters',
      textEffect = 'characters',
      onNext,
      randomizeOrder = false,
      presenceAnchorX = 'left',
      pillLayoutTransition: pillLayoutTransitionProp,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      className,
      ...rest
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

    const splitIntoGraphemes = useCallback((s: string): string[] => {
      if (typeof Intl !== 'undefined' && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
        return Array.from(segmenter.segment(s), segment => segment.segment);
      }
      return Array.from(s);
    }, []);

    const elements = useMemo(() => {
      if (textEffect === 'scroll' || textEffect === 'dissolve' || textEffect === 'decrypt') return [];
      const currentText: string = texts[currentTextIndex];
      if (splitBy === 'characters') {
        const words = currentText.split(' ');
        return words.map((word, i) => ({
          characters: splitIntoGraphemes(word),
          needsSpace: i !== words.length - 1
        }));
      }
      if (splitBy === 'words') {
        return currentText.split(' ').map((word, i, arr) => ({
          characters: [word],
          needsSpace: i !== arr.length - 1
        }));
      }
      if (splitBy === 'lines') {
        return currentText.split('\n').map((line, i, arr) => ({
          characters: [line],
          needsSpace: i !== arr.length - 1
        }));
      }

      return currentText.split(splitBy).map((part, i, arr) => ({
        characters: [part],
        needsSpace: i !== arr.length - 1
      }));
    }, [textEffect, texts, currentTextIndex, splitBy, splitIntoGraphemes]);

    const getStaggerDelay = useCallback(
      (index: number, totalChars: number): number => {
        const total = totalChars;
        if (staggerFrom === 'first') return index * staggerDuration;
        if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
        if (staggerFrom === 'center') {
          const center = Math.floor(total / 2);
          return Math.abs(center - index) * staggerDuration;
        }
        if (staggerFrom === 'random') {
          const randomIndex = Math.floor(Math.random() * total);
          return Math.abs(randomIndex - index) * staggerDuration;
        }
        return Math.abs((staggerFrom as number) - index) * staggerDuration;
      },
      [staggerFrom, staggerDuration]
    );

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex);
        if (onNext) onNext(newIndex);
      },
      [onNext]
    );

    const next = useCallback(() => {
      if (texts.length <= 1) return;
      let nextIndex: number;
      if (randomizeOrder) {
        const pool = texts.map((_, i) => i).filter((i) => i !== currentTextIndex);
        nextIndex = pool[Math.floor(Math.random() * pool.length)] ?? currentTextIndex;
      } else {
        nextIndex =
          currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
      }
      if (nextIndex !== currentTextIndex) {
        handleIndexChange(nextIndex);
      }
    }, [currentTextIndex, texts, loop, randomizeOrder, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) {
        handleIndexChange(prevIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) {
          handleIndexChange(validIndex);
        }
      },
      [texts.length, currentTextIndex, handleIndexChange]
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) {
        handleIndexChange(0);
      }
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        jumpTo,
        reset
      }),
      [next, previous, jumpTo, reset]
    );

    useEffect(() => {
      if (!auto) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto]);

    /** Default pill layout; Think page overrides with matching spring for middle text sync. */
    const defaultPillLayoutTransition: Transition = {
      layout: {
        type: "spring",
        stiffness: 280,
        damping: 30,
        mass: 0.85,
      },
    };

    const decryptDurationSec =
      transition &&
      typeof transition === 'object' &&
      transition !== null &&
      'duration' in transition &&
      typeof (transition as { duration?: unknown }).duration === 'number'
        ? (transition as { duration: number }).duration
        : 0.5;

    /**
     * Scroll/dissolve/decrypt: avoid interpolating pill width during text swaps (long → short lines).
     * Siblings in a LayoutGroup still reflow; use `layout="position"` only.
     */
    const pillLayoutProp =
      textEffect === 'scroll' || textEffect === 'dissolve' || textEffect === 'decrypt'
        ? ('position' as const)
        : true;

    return (
      <motion.span
        className={cn(
          'relative inline-flex min-h-[1.35em] max-w-none flex-nowrap items-center overflow-hidden whitespace-nowrap',
          mainClassName,
          className
        )}
        {...rest}
        layout={pillLayoutProp}
        transition={pillLayoutTransitionProp ?? defaultPillLayoutTransition}
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>
        {textEffect === 'decrypt' ? (
          <span
            className={cn(
              'relative inline-grid min-h-[1.5em] w-max max-w-none shrink-0 grid-cols-1 grid-rows-1 justify-items-center md:justify-items-start whitespace-nowrap',
              splitLevelClassName
            )}
            aria-hidden="true"
          >
            <AnimatePresence
              mode={animatePresenceMode}
              initial={animatePresenceInitial}
              anchorX={animatePresenceMode === 'popLayout' ? presenceAnchorX : undefined}
            >
              <DecryptingPhrase
                key={currentTextIndex}
                text={texts[currentTextIndex]}
                durationSec={decryptDurationSec}
                splitIntoGraphemes={splitIntoGraphemes}
                className={cn('col-start-1 row-start-1 w-max max-w-none shrink-0 whitespace-nowrap', elementLevelClassName)}
              />
            </AnimatePresence>
          </span>
        ) : textEffect === 'dissolve' ? (
          <span
            className={cn(
              'relative inline-grid min-h-[1.5em] grid-cols-1 grid-rows-1 justify-items-center md:justify-items-start',
              splitLevelClassName
            )}
            aria-hidden="true"
          >
            <AnimatePresence
              mode={animatePresenceMode}
              initial={animatePresenceInitial}
              anchorX={animatePresenceMode === 'popLayout' ? presenceAnchorX : undefined}
            >
              <motion.span
                key={currentTextIndex}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={transition}
                className={cn(
                  'col-start-1 row-start-1 w-max max-w-none whitespace-nowrap will-change-[opacity]',
                  elementLevelClassName
                )}
              >
                {texts[currentTextIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        ) : (
          <AnimatePresence
            mode={animatePresenceMode}
            initial={animatePresenceInitial}
            anchorX={animatePresenceMode === 'popLayout' ? presenceAnchorX : undefined}
          >
            {textEffect === 'scroll' ? (
              <motion.span
                key={currentTextIndex}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={transition}
                className={cn(
                  'relative flex min-h-[1.65em] w-max min-w-0 max-w-none items-center overflow-hidden whitespace-nowrap will-change-transform',
                  splitLevelClassName,
                  elementLevelClassName
                )}
                aria-hidden="true"
              >
                {texts[currentTextIndex]}
              </motion.span>
            ) : (
              <motion.span
                key={currentTextIndex}
                className={cn(
                  splitBy === 'lines'
                    ? 'flex flex-col w-full'
                    : 'relative flex flex-nowrap overflow-hidden whitespace-nowrap'
                )}
                aria-hidden="true"
              >
                {elements.map((wordObj, wordIndex, array) => {
                  const previousCharsCount = array
                    .slice(0, wordIndex)
                    .reduce((sum, word) => sum + word.characters.length, 0);
                  return (
                    <span key={wordIndex} className={cn('inline-flex', splitLevelClassName)}>
                      {wordObj.characters.map((char, charIndex) => (
                        <motion.span
                          key={`${currentTextIndex}-${wordIndex}-${charIndex}`}
                          initial={initial}
                          animate={animate}
                          exit={exit}
                          transition={{
                            ...transition,
                            delay: getStaggerDelay(
                              previousCharsCount + charIndex,
                              array.reduce((sum, word) => sum + word.characters.length, 0)
                            ),
                          }}
                          className={cn('inline-block', elementLevelClassName)}
                        >
                          {char}
                        </motion.span>
                      ))}
                      {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
                    </span>
                  );
                })}
              </motion.span>
            )}
          </AnimatePresence>
        )}
      </motion.span>
    );
  }
);

RotatingText.displayName = 'RotatingText';
export default RotatingText;
