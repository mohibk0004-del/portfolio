"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  // Set cooldown so total interval (morph + cooldown) ~= 5s for slower rotation
  cooldownTime = 4,
  className,
  textClassName,
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    let textIndex = texts.length - 1;
    let lastTime = Date.now();
    let morph = 0;
    let cooldown = cooldownTime;
    let rafId: number;

    const setMorph = (fraction: number) => {
      if (!text1Ref.current || !text2Ref.current) return;
      const blur2 = Math.min(8 / Math.max(fraction, 0.0001) - 8, 100);
      text2Ref.current.style.filter = `blur(${blur2}px)`;
      text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const inv = 1 - fraction;
      const blur1 = Math.min(8 / Math.max(inv, 0.0001) - 8, 100);
      text1Ref.current.style.filter = `blur(${blur1}px)`;
      text1Ref.current.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
    };

    const doCooldown = () => {
      morph = 0;
      if (!text1Ref.current || !text2Ref.current) return;
      text2Ref.current.style.filter = "";
      text2Ref.current.style.opacity = "0%";
      text1Ref.current.style.filter = "";
      text1Ref.current.style.opacity = "100%";
    };

    const animate = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      cooldown -= dt;

      if (cooldown <= 0) {
        morph += dt;
        const fraction = Math.min(morph / morphTime, 1);
        setMorph(fraction);

        if (fraction >= 1) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
          }
          morph = 0;
          cooldown = cooldownTime;
          doCooldown();
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    // initialize
    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[texts.length - 1];
      text2Ref.current.textContent = texts[0];
      text1Ref.current.style.opacity = "100%";
      text2Ref.current.style.opacity = "0%";
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={cn("relative flex w-full items-center justify-center", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div style={{ filter: "url(#threshold)" }} className="flex items-center justify-center w-full">
        <span
          ref={text1Ref}
          className={cn(
            "absolute select-none text-center",
            textClassName
          )}
        />

        <span
          ref={text2Ref}
          className={cn(
            "absolute select-none text-center",
            textClassName
          )}
        />
      </div>
    </div>
  );
}
