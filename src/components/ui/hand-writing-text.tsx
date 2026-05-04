"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { BlurFade } from "./blur-fade";

interface HandWrittenTitleProps {
  greeting?: string;
  title?: string;
  subtitle?: string;
  titleEmoji?: string;
}

export function HandWrittenTitle({
  greeting = "",
  title = "Hello World",
  subtitle = "Nice to meet you",
  titleEmoji = "👋",
}: HandWrittenTitleProps) {
  const drawRef = useRef<SVGPathElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const greetingWaveRef = useRef<HTMLSpanElement>(null);
  const titleWaveRef = useRef<HTMLSpanElement>(null);

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.5, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      },
    },
  } as const;

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
    const waveTarget = greetingWaveRef.current || titleWaveRef.current;

    if (greetingRef.current) {
      timeline.fromTo(
        greetingRef.current,
        { opacity: 0, y: -18, scale: 0.92, filter: "blur(12px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.82 },
        0,
      );
    }

    if (waveTarget) {
      timeline
        .fromTo(
          waveTarget,
          { opacity: 0, scale: 0.54, rotate: -22, y: 8 },
          { opacity: 1, scale: 1, rotate: 0, y: 0, duration: 0.58 },
          greeting ? 0.12 : 0.44,
        )
        .to(
          waveTarget,
          {
            rotate: 17,
            transformOrigin: "70% 70%",
            duration: 0.22,
            repeat: 5,
            yoyo: true,
            ease: "sine.inOut",
          },
          ">-0.04",
        )
        .to(waveTarget, { rotate: 0, duration: 0.24, ease: "power2.out" });
    }

    return () => {
      timeline.kill();
    };
  }, [greeting]);

  return (
    <div className="handwritten-title">
      {greeting && (
        <div ref={greetingRef} className="handwritten-title__greeting">
          <span>{greeting}</span>
          <span ref={greetingWaveRef} className="handwritten-title__wave" aria-hidden="true">
            👋
          </span>
        </div>
      )}

      <div className="handwritten-title__scribble" aria-hidden="true">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 600"
          initial="hidden"
          animate="visible"
          className="handwritten-title__svg"
          preserveAspectRatio="none"
        >
          <title>Hand Written Title</title>
          <motion.path
            ref={drawRef}
            d="M 950 90 C 1250 300, 1050 480, 600 520 C 250 520, 150 480, 150 300 C 150 120, 350 80, 600 80 C 850 80, 950 180, 950 180"
            fill="none"
            strokeWidth="12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
            className="handwritten-title__stroke"
          />
        </motion.svg>
      </div>

      <div className="handwritten-title__content">
        <BlurFade delay={0.25} duration={0.72} yOffset={12} blur="14px" className="handwritten-title__headline">
          <h1 className="handwritten-title__title">
            <span>{title}</span>
            {titleEmoji && (
              <span ref={titleWaveRef} className="handwritten-title__title-emoji" aria-hidden="true">
                {titleEmoji}
              </span>
            )}
          </h1>
        </BlurFade>

        {subtitle && (
          <BlurFade delay={0.5} duration={0.62} yOffset={8} blur="10px">
            <p className="handwritten-title__subtitle">{subtitle}</p>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
