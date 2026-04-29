import { useEffect, useRef, useState } from "react";
import { DecodedText } from "./DecodedText";
import { playBeep } from "../lib/audio";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  asciiArt: string;
  colorName: "primary" | "outline";
  topPosition: string;
  leftPosition: string;
  zIndex: number;
}

export function ProjectCard({
  title,
  description,
  tags,
  asciiArt,
  colorName,
  topPosition,
  leftPosition,
  zIndex,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [decodeCycle, setDecodeCycle] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setDecodeCycle((prev) => prev + 1);
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    playBeep();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const containerBorder = colorName === "primary" ? "border-primary" : "border-outline";
  const headerBg = colorName === "primary" ? "bg-primary" : "bg-surface-container-high";
  const headerText = colorName === "primary" ? "text-background" : "text-header-window";

  return (
    <motion.div
      ref={cardRef}
      className={`absolute w-[90%] md:w-[60%] border ${containerBorder}`}
      style={{
        top: topPosition,
        left: leftPosition,
        zIndex,
        boxShadow: `4px 4px 0px ${isHovered ? "#ffffff" : (colorName === "primary" ? "#333333" : "#111111")}`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        backgroundColor: isHovered ? "#ffffff" : "#141313",
        color: isHovered ? "#000000" : "#e5e2e1",
      }}
      transition={{ duration: 0.1 }}
    >
      <div className={`border-b ${containerBorder} px-2 py-1 font-header-window text-header-window flex justify-between items-center transition-colors duration-100 ${isHovered ? "bg-black text-white" : headerBg + " " + headerText}`}>
        <span>{title}</span>
        <span className="text-[10px]">[-] [o] [x]</span>
      </div>
      <div className="p-4">
        <div className={`border border-dashed ${isHovered ? 'border-black bg-surface-container-high text-on-surface' : 'border-outline bg-surface-container-low text-surface-tint'} h-32 mb-4 flex items-center justify-center text-xs ascii-art transition-colors duration-100`}>
          {asciiArt}
        </div>
        <h3 className="font-bold mb-2">
          <DecodedText key={`${title}-${decodeCycle}`} text={title} duration={600} />
        </h3>
        <p className={`text-code-sm mb-2 transition-colors duration-100 ${isHovered ? "text-gray-800" : "text-on-surface-variant"}`}>
          <DecodedText key={`${title}-desc-${decodeCycle}`} text={description} duration={800} />
        </p>
        <div className="flex gap-2 text-xs">
          {tags.map((tag) => (
            <span key={tag} className={`border px-1 transition-colors duration-100 ${isHovered ? "border-black text-black" : "border-outline text-surface-tint"}`}>
              &lt;{tag}&gt;
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}