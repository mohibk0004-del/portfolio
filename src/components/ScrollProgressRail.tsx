import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

export function ScrollProgressRail() {
  const markerRef = useRef<HTMLDivElement>(null);
  const [progressPct, setProgressPct] = useState(0);

  useEffect(() => {
    // Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', (e: any) => {
      const pct = Math.max(0, Math.min(100, e.progress * 100));
      setProgressPct(pct);
      if (markerRef.current) {
        markerRef.current.style.top = `${pct}%`;
      }
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="fixed right-0 top-0 bottom-0 w-5 border-l border-[#333333] bg-[#141313] z-50 hidden md:block">
      <div 
        ref={markerRef} 
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-code-sm text-[14px] leading-none select-none"
        style={{ top: '0%' }}
      >
        █
      </div>
      <div className="absolute right-[2px] bottom-2 text-[9px] font-status-bar text-surface-tint">
        {Math.round(progressPct)}%
      </div>
    </div>
  );
}