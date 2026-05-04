"use client";

import { type ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { cn } from '../../lib/utils';

type Skiper19Props = {
    className?: string;
    title?: ReactNode;
    subtitle?: ReactNode;
    children?: ReactNode;
};

const DEFAULT_TITLE = (
    <>
        The Stroke <br />
        That follows the <br />
        Scroll Progress
    </>
);

const DEFAULT_SUBTITLE = 'Scroll down to see the effect';

const DefaultShowcase = () => {
    return (
        <div className="flex min-h-[70vh] w-full flex-col justify-end rounded-[2rem] bg-[color:var(--bg-soft)] px-4 pb-10 pt-12 text-[color:var(--text)] sm:px-6 lg:pb-12">
            <h2 className="text-center text-[14vw] font-bold leading-[0.88] tracking-tighter sm:text-[12vw] lg:text-[8rem]">
                skiperui.com
            </h2>
            <div className="mt-12 flex flex-col gap-6 font-medium uppercase lg:mt-16 lg:flex-row lg:justify-between">
                <div className="flex w-full items-center justify-between gap-10 lg:w-fit lg:justify-center">
                    <p className="text-sm">
                        punjab, india <br />
                        and online
                    </p>
                    <p className="text-right text-sm lg:text-left">
                        sep 1, 2025 <br /> the Moosa pind
                    </p>
                </div>
                <div className="flex w-full flex-wrap items-center justify-between gap-10 lg:w-fit lg:justify-center">
                    <p className="text-sm">
                        online <br /> free
                    </p>
                    <p className="text-right text-sm lg:text-left">
                        in person tickets <br /> $600
                    </p>
                </div>
            </div>
        </div>
    );
};

export const Skiper19 = ({ className, title = DEFAULT_TITLE, subtitle = DEFAULT_SUBTITLE, children }: Skiper19Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

    return (
        <section
            ref={ref}
            className={cn('portfolio-scroll relative w-full overflow-x-clip overflow-y-visible px-4 py-10 text-[color:var(--text)] sm:px-6', className)}
            style={{ color: 'var(--text)' }}
        >
            <div className="mx-auto relative w-full max-w-[1600px]">
                <aside className="pointer-events-none absolute -bottom-80 top-0 right-0 hidden w-[54%] lg:block">
                    <div className="h-full">
                        <LinePath
                            className="h-full w-full text-[color:var(--text)] opacity-55"
                            scrollYProgress={scrollYProgress}
                        />
                    </div>
                </aside>

                <div className="relative z-[1] flex min-w-0 flex-col gap-8">
                    <header className="scroll-journey__intro flex max-w-4xl flex-col items-center gap-3 px-1 text-center lg:items-start lg:px-0 lg:text-left">
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--muted)]">
                            ADMIN_WORKFLOW
                        </p>
                        <p className="max-w-2xl text-base font-medium text-[color:var(--muted)] sm:text-lg">
                            {subtitle}
                        </p>
                        {title && (
                            <h1 className="max-w-[10ch] font-serif text-[clamp(3.25rem,7vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.08em]">
                                {title}
                            </h1>
                        )}
                    </header>

                    <div className="flex flex-col gap-8">
                        {children ?? <DefaultShowcase />}
                    </div>
                </div>
            </div>
        </section>
    );
};

const LinePath = ({
    className,
    scrollYProgress,
}: {
    className: string;
    scrollYProgress: MotionValue<number>;
}) => {
    const pathLength = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

    return (
        <svg
            width="720"
            height="2380"
            viewBox="0 0 720 2380"
            fill="none"
            overflow="visible"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <motion.path
                d="M680 40 C680 170 660 270 590 330 C522 389 488 474 488 610 L488 980 C488 1125 562 1195 676 1238 C736 1261 758 1328 716 1390 C670 1458 596 1484 490 1508 C330 1544 214 1634 214 1812 L214 2320"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="butt"
                style={{
                    pathLength,
                    strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
                }}
            />
        </svg>
    );
};
