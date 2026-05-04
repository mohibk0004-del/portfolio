import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const BINARY_CHARS = "01";

export function useDecodedText(text: string, duration: number = 800) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: "some" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView) {
      setDisplayText(text.replace(/./g, () => BINARY_CHARS[Math.floor(Math.random() * BINARY_CHARS.length)]));
      hasAnimated.current = false;
      return;
    }

    if (hasAnimated.current) return;

    let start = Date.now();
    let animationFrame: number;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);

      if (progress === 1) {
        setDisplayText(text);
        hasAnimated.current = true;
        return;
      }

      setDisplayText(
        text.split("").map((char, index) => {
          if (char === " ") return " ";
          // Calculate when this character should settle based on its position in the string
          const settleThreshold = index / text.length;
          // As progress grows, more characters settle
          if (progress > settleThreshold) {
            return char;
          }
          return BINARY_CHARS[Math.floor(Math.random() * BINARY_CHARS.length)];
        }).join("")
      );

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [text, duration, isInView]);

  return { ref, displayText };
}
