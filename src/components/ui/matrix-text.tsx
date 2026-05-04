"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LetterState {
  char: string;
  isMatrix: boolean;
  isSpace: boolean;
}

interface MatrixTextProps {
  text?: string;
  className?: string;
  initialDelay?: number;
  letterAnimationDuration?: number;
  letterInterval?: number;
}

const createLetters = (text: string): LetterState[] =>
  text.split("").map((char) => ({
    char,
    isMatrix: false,
    isSpace: char === " ",
  }));

export const MatrixText = ({
  text = "HelloWorld!",
  className,
  initialDelay = 200,
  letterAnimationDuration = 500,
  letterInterval = 100,
}: MatrixTextProps) => {
  const [letters, setLetters] = useState<LetterState[]>(() => createLetters(text));
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomChar = useCallback(
    () => (Math.random() > 0.5 ? "1" : "0"),
    []
  );

  useEffect(() => {
    let cancelled = false;
    const timers = new Set<number>();
    const nextLetters = createLetters(text);

    const resetTimer = window.setTimeout(() => {
      if (cancelled) return;

      setLetters(nextLetters);
      setIsAnimating(true);

      const startTimer = window.setTimeout(() => {
        nextLetters.forEach((letter, index) => {
          const matrixTimer = window.setTimeout(() => {
            if (cancelled || letter.isSpace) return;

            setLetters((prev) => {
              const newLetters = [...prev];
              newLetters[index] = {
                ...newLetters[index],
                char: getRandomChar(),
                isMatrix: true,
              };
              return newLetters;
            });

            const restoreTimer = window.setTimeout(() => {
              if (cancelled) return;

              setLetters((prev) => {
                const newLetters = [...prev];
                newLetters[index] = {
                  ...newLetters[index],
                  char: text[index],
                  isMatrix: false,
                };
                return newLetters;
              });
            }, letterAnimationDuration);

            timers.add(restoreTimer);
          }, index * letterInterval);

          timers.add(matrixTimer);
        });

        const doneTimer = window.setTimeout(() => {
          if (!cancelled) {
            setIsAnimating(false);
          }
        }, text.length * letterInterval + letterAnimationDuration);

        timers.add(doneTimer);
      }, initialDelay);

      timers.add(startTimer);
    }, 0);

    timers.add(resetTimer);

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, [getRandomChar, text, initialDelay, letterAnimationDuration, letterInterval]);

  const motionVariants = useMemo(
    () => ({
      normal: {
        color: "currentColor",
        textShadow: "none",
      },
      matrix: {
        color: "var(--matrix-active, currentColor)",
        textShadow: "0 0 14px var(--matrix-glow, currentColor)",
      },
    }),
    []
  );

  return (
    <div
      className={cn(
        "matrix-text flex min-h-screen items-center justify-center text-black dark:text-white",
        className
      )}
      aria-label={text}
      data-animating={isAnimating}
    >
      <div className="matrix-text__stage h-24 flex items-center justify-center">
        <div className="matrix-text__line flex flex-wrap items-center justify-center">
          {letters.map((letter, index) => (
            <motion.div
              key={`${index}-${letter.char}`}
              className="matrix-text__letter font-mono text-4xl md:text-6xl w-[1ch] text-center overflow-hidden"
              initial="normal"
              animate={letter.isMatrix ? "matrix" : "normal"}
              variants={motionVariants}
              transition={{
                duration: 0.1,
                ease: "easeInOut",
              }}
              style={{
                display: "inline-block",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {letter.isSpace ? "\u00A0" : letter.char}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
