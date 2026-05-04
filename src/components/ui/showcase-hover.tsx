"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { cn } from '../../lib/utils';

type ShowcaseMedia =
    | {
        type: 'video';
        src: string;
        title: string;
        poster?: string;
    }
    | {
        type: 'youtube';
        src: string;
        title: string;
    };

type ShowcaseHoverProps = {
    media: ShowcaseMedia;
    label?: string;
    className?: string;
    align?: 'left' | 'right';
};

const toYoutubeEmbedUrl = (src: string) => {
    try {
        const parsed = new URL(src);
        let videoId = '';

        if (parsed.hostname.includes('youtu.be')) {
            videoId = parsed.pathname.replace('/', '');
        } else {
            videoId = parsed.searchParams.get('v') ?? '';
        }

        if (!videoId) return src;

        return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1`;
    } catch {
        return src;
    }
};

export function ShowcaseHover({ media, label = 'showcase', className, align = 'right' }: ShowcaseHoverProps) {
    const previewRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const transformOrigin = useMemo(
        () => (align === 'left' ? '0% 50%' : '100% 50%'),
        [align]
    );

    useEffect(() => {
        if (previewRef.current) {
            gsap.set(previewRef.current, {
                opacity: 0,
                scale: 0.92,
                y: 14,
                transformOrigin,
            });
        }
    }, [transformOrigin]);

    const animatePreview = (nextOpen: boolean) => {
        if (!previewRef.current) return;

        gsap.killTweensOf(previewRef.current);
        setIsOpen(nextOpen);

        gsap.to(previewRef.current, {
            opacity: nextOpen ? 1 : 0,
            scale: nextOpen ? 1 : 0.92,
            y: nextOpen ? 0 : 14,
            duration: nextOpen ? 0.55 : 0.3,
            ease: nextOpen ? 'power3.out' : 'power2.inOut',
        });

        if (media.type === 'video' && videoRef.current) {
            if (nextOpen) {
                videoRef.current.play().catch(() => undefined);
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    };

    return (
        <div
            className={cn('showcase-hover', `showcase-hover--${align}`, className)}
            onMouseEnter={() => animatePreview(true)}
            onMouseLeave={() => animatePreview(false)}
            onFocus={() => animatePreview(true)}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                    animatePreview(false);
                }
            }}
        >
            <button type="button" className="showcase-hover__trigger" aria-label={`${label} for ${media.title}`}>
                {label}
            </button>

            <div ref={previewRef} className="showcase-hover__preview" aria-hidden={!isOpen}>
                <div className="showcase-hover__frame">
                    {media.type === 'video' ? (
                        <video
                            ref={videoRef}
                            className="showcase-hover__media"
                            src={media.src}
                            poster={media.poster}
                            muted
                            playsInline
                            loop
                            preload="metadata"
                        />
                    ) : (
                        <iframe
                            className="showcase-hover__media"
                            src={toYoutubeEmbedUrl(media.src)}
                            title={media.title}
                            loading="lazy"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                        />
                    )}
                </div>
            </div>
        </div>
    );
}