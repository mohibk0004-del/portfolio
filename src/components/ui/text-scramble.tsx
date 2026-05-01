import { useEffect, useMemo, useRef, useState, type ElementType, type JSX } from 'react';
import { motion, type MotionProps } from 'framer-motion';

type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: ElementType;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

const defaultChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Component = 'p',
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = useMemo(
    () => motion.create(Component as keyof JSX.IntrinsicElements),
    [Component],
  );
  const [displayText, setDisplayText] = useState(children);
  const isAnimatingRef = useRef(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const text = children;
    const steps = duration / speed;
    let step = 0;

    intervalRef.current = window.setInterval(() => {
      let scrambled = '';
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          scrambled += ' ';
          continue;
        }
        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps && intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayText(text);
        isAnimatingRef.current = false;
        onScrambleComplete?.();
      }
    }, speed * 1000);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      isAnimatingRef.current = false;
    };
  }, [trigger, children, duration, speed, characterSet, onScrambleComplete]);

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  );
}
