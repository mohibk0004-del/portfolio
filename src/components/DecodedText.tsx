import { useDecodedText } from "../hooks/useDecodedText";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

interface DecodedTextProps extends HTMLMotionProps<"span"> {
  text: string;
  duration?: number;
  className?: string;
}

export function DecodedText({ text, duration = 800, className, ...props }: DecodedTextProps) {
  const { ref, displayText } = useDecodedText(text, duration);

  return (
    <motion.span ref={ref} className={className} {...props}>
      {displayText}
    </motion.span>
  );
}