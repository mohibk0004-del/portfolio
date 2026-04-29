import { useEffect, useRef, useState } from 'react';
import { DecodedText } from './DecodedText';
import { playBeep } from '../lib/audio';

type BrutalistProjectCardProps = {
  fileName: string;
  dateRange: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  noise: string;
};

export function BrutalistProjectCard({
  fileName,
  dateRange,
  title,
  description,
  tags,
  imageUrl,
  imageAlt,
  noise,
}: BrutalistProjectCardProps) {
  const [decodeCycle, setDecodeCycle] = useState(0);
  const cardRef = useRef<HTMLElement>(null);

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
    playBeep();
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      className="border border-zinc-700 bg-[#101216] group hover:border-zinc-400 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 active:translate-x-0 active:translate-y-0 relative"
    >
      <div className="border-b border-zinc-700 px-4 py-2 flex items-center justify-between bg-[#101216]">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold tracking-wide text-zinc-200">{fileName}</span>
          <span className="text-[10px] font-mono text-zinc-500">{dateRange}</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 border border-zinc-500" />
          <div className="w-2.5 h-2.5 border border-zinc-500" />
          <div className="w-2.5 h-2.5 bg-zinc-300" />
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 border border-zinc-700 aspect-square flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 relative group/image">
            <div className="font-mono text-[6px] leading-[6px] text-zinc-400 opacity-15 absolute inset-0 break-all p-1 group-hover/image:opacity-25 transition-opacity duration-200">
              {noise}
            </div>
            <img alt={imageAlt} className="w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover/image:opacity-90 transition-opacity duration-300" src={imageUrl} />
          </div>

          <div className="col-span-2 flex flex-col">
            <h3 className="font-headline-md text-[42px] mb-3 leading-[0.9] text-zinc-100 tracking-[0.03em] group-hover:text-zinc-300 transition-colors duration-200">
              <DecodedText key={`${title}-${decodeCycle}`} text={title} duration={650} />
            </h3>
            <p className="text-sm text-zinc-400 mb-5 font-body-md leading-relaxed flex-grow max-w-[65ch]">
              <DecodedText key={`${title}-desc-${decodeCycle}`} text={description} duration={780} />
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="text-[10px] font-mono border border-zinc-600 text-zinc-300 px-2.5 py-1 hover:bg-zinc-100 hover:text-black hover:border-zinc-100 transition-all duration-200 cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
