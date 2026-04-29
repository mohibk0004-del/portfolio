import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ScrollHandAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  // Left hand: starts at -120px, moves right to center (0px) as you scroll
  const leftHandX = useTransform(scrollYProgress, [0, 0.6], [-120, 0]);

  // Right hand: starts at +120px, moves left to center (0px) as you scroll
  const rightHandX = useTransform(scrollYProgress, [0, 0.6], [120, 0]);

  // Calculate the gap between hands (distance in pixels)
  // At scroll 0: gap = 240px (120 + 120)
  // At scroll 0.6: gap = 0px (both at center)
  
  // Only descend when gap is small (after ~0.5 scroll progress)
  // Y motion: only moves down after scroll 0.5
  const handsY = useTransform(scrollYProgress, [0.5, 1], [0, 200]);

  const renderHand = (direction: 'left' | 'right') => (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
    >
      {direction === 'left' ? (
        // Left hand (palm facing right)
        <g transform="translate(32, 32)">
          {/* Wrist */}
          <rect x="-6" y="16" width="12" height="20" fill="black" stroke="black" strokeWidth="1" />
          {/* Palm */}
          <rect x="-14" y="-8" width="28" height="24" fill="black" stroke="black" strokeWidth="1" />
          {/* Thumb */}
          <rect x="-20" y="-4" width="8" height="10" fill="black" stroke="black" strokeWidth="1" />
          {/* Index finger */}
          <rect x="-10" y="-16" width="6" height="16" fill="black" stroke="black" strokeWidth="1" />
          {/* Middle finger */}
          <rect x="-2" y="-20" width="6" height="20" fill="black" stroke="black" strokeWidth="1" />
          {/* Ring finger */}
          <rect x="6" y="-18" width="6" height="18" fill="black" stroke="black" strokeWidth="1" />
          {/* Pinky */}
          <rect x="14" y="-14" width="6" height="14" fill="black" stroke="black" strokeWidth="1" />
        </g>
      ) : (
        // Right hand (palm facing left)
        <g transform="translate(32, 32) scale(-1, 1)">
          {/* Wrist */}
          <rect x="-6" y="16" width="12" height="20" fill="black" stroke="black" strokeWidth="1" />
          {/* Palm */}
          <rect x="-14" y="-8" width="28" height="24" fill="black" stroke="black" strokeWidth="1" />
          {/* Thumb */}
          <rect x="-20" y="-4" width="8" height="10" fill="black" stroke="black" strokeWidth="1" />
          {/* Index finger */}
          <rect x="-10" y="-16" width="6" height="16" fill="black" stroke="black" strokeWidth="1" />
          {/* Middle finger */}
          <rect x="-2" y="-20" width="6" height="20" fill="black" stroke="black" strokeWidth="1" />
          {/* Ring finger */}
          <rect x="6" y="-18" width="6" height="18" fill="black" stroke="black" strokeWidth="1" />
          {/* Pinky */}
          <rect x="14" y="-14" width="6" height="14" fill="black" stroke="black" strokeWidth="1" />
        </g>
      )}
    </svg>
  );

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Left Hand */}
      <motion.div
        style={{
          x: leftHandX,
          y: handsY,
        }}
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        {renderHand('left')}
      </motion.div>

      {/* Right Hand */}
      <motion.div
        style={{
          x: rightHandX,
          y: handsY,
        }}
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        {renderHand('right')}
      </motion.div>
    </div>
  );
}
