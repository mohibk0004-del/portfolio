import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function AnimatedTerminalMessage({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      
      // Animate from slightly scaled down and faded, springing up
      // using Apple/Emil's philosophy of strong ease-out/springs
      gsap.from('.char', {
        opacity: 0,
        y: 8,
        scale: 0.9,
        duration: 0.4,
        stagger: {
          each: 0.015,
          from: 'start',
        },
        ease: 'power3.out', // iOS-like snappy, responsive ease
      });
    },
    { dependencies: [text], scope: containerRef }
  );

  return (
    <p ref={containerRef} className={className} aria-label={text}>
      {text.split('').map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="char inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </p>
  );
}
