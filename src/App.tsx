import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, useRef, useMemo, useCallback, lazy, Suspense, type FormEvent } from 'react';
import Lenis from 'lenis';
import { BootSequence } from './components/BootSequence';
import { SlideButton } from './components/ui/slide-button';
import { ShowcaseHover } from './components/ui/showcase-hover';
import { TextHoverEffect, FooterBackgroundGradient } from './components/ui/hover-footer';
import { TextScramble } from './components/ui/text-scramble';
import type { NavigationItem } from './components/ui/animated-navigation-tabs';
import MacOSMenuBar from './components/ui/mac-os-menu-bar';
import { Skiper19 } from './components/ui/svg-follow-scroll';
import { SiGithub } from 'react-icons/si';
import { Mail, Globe } from 'lucide-react';
import handsImage from './assets/hands.webp';
import handsDarkImage from './assets/hands_black.webp';
import handsHackImage from './assets/hands_hack.webp';
import handsAmnaImage from './assets/hands_amna.webp';
import {
  SiC,
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiFlutter,
  SiDjango,
  SiDotnet,
  SiElectron,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiHeroku,
  SiUnity,
  SiUnrealengine,
  SiBlender,
  SiFigma,
  SiFramer,
  SiOpencv,
  SiPhp,
  SiGnubash,
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { DiPhotoshop, DiIllustrator } from 'react-icons/di';
import { FaAws } from 'react-icons/fa6';
import { VscAzure } from 'react-icons/vsc';
import platformerVideo from './assets/platformer.mp4';

const AsciiCpuCanvas = lazy(() =>
  import('./components/AsciiCpuCanvas').then((m) => ({ default: m.AsciiCpuCanvas }))
);

const DottedSurface = lazy(() =>
  import('./components/ui/dotted-surface').then((m) => ({ default: m.DottedSurface }))
);

import { GooeyText } from './components/ui/gooey-text-morphing';
import { HoverBorderGradient } from './components/ui/hover-border-gradient';
import { AnimatedThemeToggle } from './components/ui/animated-theme-toggle';
import { ValentineSnakeGame } from './components/ValentineSnakeGame';
import { LiquidButton } from './components/ui/liquid-glass-button';

const HERO_PHRASES = ['MOHIB KHAN', 'CS STUDENT', 'AI + WEB DEV', 'GAME DEVELOPER'];
const WEBSITE_VERSION = __APP_BUILD_INFO__;

type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  summary: string;
};

const CHANGELOG_ENTRIES: ChangelogEntry[] = __APP_CHANGELOG__;

type ThemeKey =
  | 'light'
  | 'dark'
  | 'ivory'
  | 'amoled'
  | 'hack'
  | 'decolumb'
  | 'gunmetal'
  | 'dubai'
  | 'luxury'
  | 'power'
  | 'forest'
  | 'matcha'
  | 'amna'
  | 'halftone';


type ProjectLedger = {
  title: string;
  note: string;
  year: string;
  repo?: string;
  inDev?: boolean;
  showcase?:
  | {
    type: 'video';
    src: string;
    title: string;
  }
  | {
    type: 'youtube';
    src: string;
    title: string;
  };
};

const skillSets = [
  {
    label: 'PROGRAMMING_LANGUAGES',
    items: ['C', 'C++', 'C#', 'Python', 'JavaScript', 'PHP', 'Bash', 'HTML5', 'CSS3'],
  },
  {
    label: 'FRAMEWORKS_AND_RUNTIME',
    items: ['React', 'React Native', 'Next.js', 'Node.js', 'Express', 'Flutter', 'Django', '.NET', 'Electron'],
  },
  {
    label: 'DATA_AND_DEPLOYMENT',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Azure', 'Heroku'],
  },
  {
    label: 'GAME_AND_DESIGN',
    items: ['Unity', 'Unreal Engine', 'Blender', 'Photoshop', 'Illustrator', 'Figma', 'Framer', 'OpenCV'],
  },
];
const stackIconColor = (item: string) => {
  const key = item.toLowerCase();
  switch (key) {
    case 'c': return '#2a6af0';
    case 'c++': return '#6699ff';
    case 'c#': return '#8a4fff';
    case 'python': return '#ffd43b';
    case 'javascript': return '#f7df1e';
    case 'php': return '#8892bf';
    case 'bash': return '#4dbf5a';
    case 'html5': return '#e34f26';
    case 'css3': return '#1572b6';
    case 'react':
    case 'react native': return '#61dafb';
    case 'next.js': return '#ffffff';
    case 'node.js': return '#539e43';
    case 'express': return '#d8d8d8';
    case 'flutter': return '#42a5f5';
    case 'django': return '#0c7b46';
    case '.net': return '#512bd4';
    case 'electron': return '#7ec8e3';
    case 'mysql': return '#4479a1';
    case 'postgresql': return '#336791';
    case 'mongodb': return '#4db33d';
    case 'redis': return '#dc382d';
    case 'aws': return '#ff9900';
    case 'azure': return '#0078d4';
    case 'heroku': return '#79589f';
    case 'unity': return '#ffffff';
    case 'unreal engine': return '#fefefe';
    case 'blender': return '#f5792a';
    case 'photoshop': return '#31a8ff';
    case 'illustrator': return '#ff9a00';
    case 'figma': return '#f24e1e';
    case 'framer': return '#0055ff';
    case 'opencv': return '#5c3ee8';
    default: return 'currentColor';
  }
};

const mappedIcon = (item: string) => {
  switch (item.toLowerCase()) {
    case 'c': return <SiC />;
    case 'c++': return <SiCplusplus />;
    case 'c#': return <TbBrandCSharp />;
    case 'python': return <SiPython />;
    case 'javascript': return <SiJavascript />;
    case 'php': return <SiPhp />;
    case 'bash': return <SiGnubash />;
    case 'html5': return <SiHtml5 />;
    case 'css3': return <SiCss />;
    case 'react':
    case 'react native': return <SiReact />;
    case 'next.js': return <SiNextdotjs />;
    case 'node.js': return <SiNodedotjs />;
    case 'express': return <SiExpress />;
    case 'flutter': return <SiFlutter />;
    case 'django': return <SiDjango />;
    case '.net': return <SiDotnet />;
    case 'electron': return <SiElectron />;
    case 'mysql': return <SiMysql />;
    case 'postgresql': return <SiPostgresql />;
    case 'mongodb': return <SiMongodb />;
    case 'redis': return <SiRedis />;
    case 'aws': return <FaAws />;
    case 'azure': return <VscAzure />;
    case 'heroku': return <SiHeroku />;
    case 'unity': return <SiUnity />;
    case 'unreal engine': return <SiUnrealengine />;
    case 'blender': return <SiBlender />;
    case 'photoshop': return <DiPhotoshop />;
    case 'illustrator': return <DiIllustrator />;
    case 'figma': return <SiFigma />;
    case 'framer': return <SiFramer />;
    case 'opencv': return <SiOpencv />;
    default: return null;
  }
};

const projectLedger: ProjectLedger[] = [
  {
    title: 'Sideline',
    note: 'A second-screen match companion with live sentiment, prediction loops, and branded match moments.',
    year: 'COMPLETED',
    repo: 'https://github.com/amna0x/sideline',
  },
  {
    title: 'Spotify Album Finder',
    note:
      'A modern, full-stack web application for discovering and saving your favorite Spotify albums. Built with React, Node.js, Express, and PostgreSQL.',
    year: 'COMPLETED',
    repo: 'https://github.com/mohibk0004-del/spotify-album-finder',
  },
  {
    title: '3D Platformer',
    note: 'A stylized game prototype focused on controls, playful pacing, and environmental readability.',
    year: 'IN DEVELOPMENT',
    repo: 'https://github.com/mohibk0004-del/HamsterGame',
    inDev: true,
    showcase: {
      type: 'video',
      src: platformerVideo,
      title: '3D platformer gameplay showcase',
    },
  },
];

const featuredShowcases = [
  {
    title: 'Valorant Edit on AE',
    note: 'Highly edited VALORANT gameplay with advanced effects and speed ramping, edited on after effects and premiere pro.',
    media: {
      type: 'youtube' as const,
      src: 'https://www.youtube.com/watch?v=e6k2tYyHop4',
      title: 'Valorant Edit on AE showcase',
    },
  },
  {
    title: 'Lethal Company Edit w/ Subtitles',
    note: 'Advanced edited lethal company gaming video with subtitles and comedic timing cuts, funny sound effects and viral editing style to attract viewership.',
    media: {
      type: 'youtube' as const,
      src: 'https://www.youtube.com/watch?v=JVrj3tlU-m8',
      title: 'Lethal Company Edit w/ Subtitles showcase',
    },
  },
];

const heartStream = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${4 + ((index * 97) % 92)}%`,
  size: `${0.9 + (index % 4) * 0.22}rem`,
  duration: `${5.2 + (index % 6) * 0.65}s`,
  delay: `${(index % 7) * 0.55}s`,
}));

const THEME_OPTIONS: { key: ThemeKey; label: string }[] = [
  { key: 'light', label: 'LIGHT' },
  { key: 'ivory', label: 'IVORY' },
  { key: 'dark', label: 'DARK' },
  { key: 'amoled', label: 'AMOLED' },
  { key: 'power', label: 'POWER' },
  { key: 'forest', label: 'FOREST_MINT' },
  { key: 'matcha', label: 'TOKYO_MATCHA' },
  { key: 'halftone', label: 'HALFTONE' },
  { key: 'decolumb', label: 'DECOLUMB' },
  { key: 'gunmetal', label: 'GUNMETAL' },
  { key: 'dubai', label: 'DUBAI' },
  { key: 'luxury', label: 'LUXURY' },
];

const ALL_THEME_KEYS = new Set<ThemeKey>([
  'light',
  'ivory',
  'dark',
  'amoled',
  'hack',
  'decolumb',
  'gunmetal',
  'dubai',
  'luxury',
  'power',
  'forest',
  'matcha',
  'amna',
  'halftone'
]);

const workflowContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2
    }
  },
  exit: { opacity: 0, y: 12, transition: { duration: 0.3 } }
};

import type { Variants } from 'framer-motion';

const workflowItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

function App() {
  const [started, setStarted] = useState(false);
  const [booting, setBooting] = useState(true);
  const [theme, setTheme] = useState<ThemeKey>('light');
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [bitmapMode, setBitmapMode] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [glitchVariant, setGlitchVariant] = useState(0);
  const [heartsActive, setHeartsActive] = useState(false);
  const [heartsKey, setHeartsKey] = useState(0);
  const [terminalCommand, setTerminalCommand] = useState('ACCESS PORTFOLIO');
  const [terminalUnlocked, setTerminalUnlocked] = useState(false);
  const [renderPipelineVisible, setRenderPipelineVisible] = useState(false);
  const [selectedActive, setSelectedActive] = useState(true);
  const [projectTitleScrambleTick, setProjectTitleScrambleTick] = useState<Record<string, number>>({});
  const [, setHeroPhraseIndex] = useState(0);
  const [terminalMessage, setTerminalMessage] = useState('TYPE ACCESS PORTFOLIO AND PRESS ENTER.');
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const changelogRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const hackThemeActive = theme === 'hack';
  const amnaThemeActive = theme === 'amna';
  const showDottedSurface = !booting;

  const hackDrag = useMemo(
    () =>
      hackThemeActive
        ? {
          drag: true as const,
          dragMomentum: false,
          dragElastic: 0.18,
          whileDrag: { scale: 1.015, zIndex: 12 },
        }
        : {},
    [hackThemeActive]
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (booting) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    document.body.style.overflow = previousOverflow;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
    const lenis = new Lenis({
      duration: 0.95,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      document.body.style.overflow = previousOverflow;
    };
  }, [booting]);

  useEffect(() => {
    if (booting) return;

    const timer = window.setInterval(() => {
      setHeroPhraseIndex((index) => (index + 1) % HERO_PHRASES.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [booting]);

  useEffect(() => {
    // Read persisted theme from localStorage if available, otherwise default to light
    const saved = window.localStorage.getItem('portfolio-theme');
    if (saved && ALL_THEME_KEYS.has(saved as ThemeKey)) {
      const persisted = saved as ThemeKey;
      if (persisted === 'hack' || persisted === 'amna') {
        setTheme('light');
        window.localStorage.setItem('portfolio-theme', 'light');
      } else {
        setTheme(persisted);
      }
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    // Apply theme for current session and persist to localStorage
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem('portfolio-theme', theme);
    } catch (e) {
      // ignore quota errors
    }
  }, [theme]);

  useEffect(() => {
    if (theme !== 'amna') {
      setHeartsActive(false);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.bitmap = bitmapMode ? '1' : '0';
  }, [bitmapMode]);

  useEffect(() => {
    if (!changelogOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!changelogRef.current?.contains(event.target as Node)) {
        setChangelogOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setChangelogOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [changelogOpen]);


  useEffect(() => {
    if (!hackThemeActive) {
      setGlitching(false);
      return;
    }

    let cancelled = false;
    const timers = new Set<number>();

    const queuePulse = () => {
      const wait = 17000 + Math.random() * 6000;
      const loopTimer = window.setTimeout(() => {
        if (cancelled) return;

        setGlitchVariant((value) => (value + 1) % 3);
        setGlitching(true);

        const pulseTimer = window.setTimeout(() => {
          if (!cancelled) {
            setGlitching(false);
          }
          timers.delete(pulseTimer);
        }, 360 + Math.random() * 260);

        timers.add(pulseTimer);
        timers.delete(loopTimer);

        queuePulse();
      }, wait);

      timers.add(loopTimer);
    };

    queuePulse();

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, [hackThemeActive]);

  const heroImage = useMemo(() => {
    if (theme === 'amna') return handsAmnaImage;
    if (theme === 'hack') return handsHackImage;
    if (theme === 'dark' || theme === 'amoled') return handsDarkImage;
    return handsImage;
  }, [theme]);

  const toggleLightDark = useCallback(() => {
    setTheme((cur) => (cur === 'dark' ? 'light' : 'dark'));
  }, []);

  const pickTheme = useCallback((next: ThemeKey) => {
    setTheme(next);
    setThemeMenuOpen(false);
  }, []);

  const smoothScrollTo = useCallback((targetId: string, delay = 0) => {
    const runScroll = () => {
      const target = document.getElementById(targetId);
      if (!target) {
        window.setTimeout(runScroll, 50);
        return;
      }

      const offset = 76;
      const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion || !lenisRef.current) {
        window.scrollTo({ top: targetY, behavior: reduceMotion ? 'auto' : 'smooth' });
        return;
      }

      lenisRef.current.scrollTo(targetY, {
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lock: true,
      });
    };

    if (delay > 0) {
      window.setTimeout(() => window.requestAnimationFrame(runScroll), delay);
      return;
    }

    window.requestAnimationFrame(runScroll);
  }, []);

  const handleTerminalSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const raw = terminalCommand.trim();
    const normalized = raw.toUpperCase();

    if (normalized === 'ACCESS PORTFOLIO') {
      setTerminalUnlocked(true);
      setTerminalMessage('ACCESS GRANTED. TRY TYPING RENDER OR BITMAP.');
      window.setTimeout(() => smoothScrollTo('workflow'), 1000);
      terminalInputRef.current?.focus();
      return;
    }

    if (normalized === 'RENDER') {
      setTerminalUnlocked(true);
      setRenderPipelineVisible(true);
      setTerminalMessage('RENDER PIPELINE ACTIVE. SCROLL TO THE PIPELINE LANE.');
      window.setTimeout(() => smoothScrollTo('pipeline'), 120);
      return;
    }

    if (normalized === 'HACK') {
      setTheme('hack');
      setTerminalUnlocked(true);
      setTerminalMessage('MODE SWITCH COMPLETE.');
      return;
    }

    // Theme commands removed: themes are available by default in the UI.

    if (normalized === 'BITMAP') {
      setBitmapMode((v) => !v);
      setTerminalMessage('BITMAP MODE TOGGLED.');
      return;
    }

    if (normalized === 'AMNA' || normalized === "AMNA'") {
      setTheme('amna');
      setTerminalUnlocked(true);
      setHeartsActive(true);
      setHeartsKey((value) => value + 1);
      setTerminalMessage('AMNA MODE ENGAGED. LOVE STREAM ONLINE.');
      return;
    }

    setTerminalMessage('COMMAND NOT RECOGNIZED. TRY ACCESS PORTFOLIO.');
    terminalInputRef.current?.focus();
  };

  const navigationItems: NavigationItem[] = useMemo(() => {
    return [
      { id: 1, tile: 'home', href: '#hero', onClick: () => window.location.hash = '#hero' },
      { id: 2, tile: 'about', href: '#about', onClick: () => window.location.hash = '#about' },
      { id: 3, tile: 'stacks', href: '#stack', onClick: () => window.location.hash = '#stack' },
      { id: 4, tile: 'projects', href: '#projects', onClick: () => window.location.hash = '#projects' },
      { id: 5, tile: 'contact', href: '#contact', onClick: () => window.location.hash = '#contact' },
    ];
  }, []);

  const [activeNavId, setActiveNavId] = useState<number>(1);

  // Track the section closest to the top of the viewport.
  useEffect(() => {
    let rafId = 0;

    const updateActiveSection = () => {
      const probeY = window.scrollY + 110;
      let nextId = navigationItems[0]?.id ?? 1;
      let closestTop = Number.NEGATIVE_INFINITY;

      navigationItems.forEach((item) => {
        if (!item.href) return;
        const el = document.getElementById(item.href.replace('#', ''));
        if (!el) return;

        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= probeY && top > closestTop) {
          closestTop = top;
          nextId = item.id;
        }
      });

      setActiveNavId(nextId);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateActiveSection);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [navigationItems, terminalUnlocked]);

  const bumpProjectTitleScramble = useCallback((title: string) => {
    setProjectTitleScrambleTick((prev) => ({
      ...prev,
      [title]: (prev[title] ?? 0) + 1,
    }));
  }, []);

  return (
    <div className={`page-shell${glitching ? ` glitching glitch-v${glitchVariant}` : ''}${bitmapMode ? ' bitmap-mode' : ''}`}>
      <AnimatePresence>
        {!started && (
          <motion.div 
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[color:var(--bg)] text-[color:var(--text)] font-mono"
            initial={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05, transition: { duration: 0.5 } }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <LiquidButton 
                onClick={() => setStarted(true)}
                className="tracking-[0.2em] font-bold"
              >
                Start
              </LiquidButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {started && booting && <BootSequence onComplete={() => setBooting(false)} />}
      </AnimatePresence>

      <div className="page-noise" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {showDottedSurface && (
          <motion.div
            key="dotted-surface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Suspense fallback={null}>
              <DottedSurface />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {bitmapMode && (
        <svg className="bitmap-defs" aria-hidden="true" focusable="false">
          <defs>
            <filter id="bitmap-filter" x="0" y="0" width="100%" height="100%">
              <feColorMatrix type="saturate" values="0.55" />
              <feComponentTransfer>
                <feFuncR type="discrete" tableValues="0 0.33 0.66 1" />
                <feFuncG type="discrete" tableValues="0 0.33 0.66 1" />
                <feFuncB type="discrete" tableValues="0 0.33 0.66 1" />
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>
      )}

      {heartsActive && (
        <div className="amna-hearts" aria-hidden="true" key={heartsKey}>
          {heartStream.map((heart) => (
            <span
              key={heart.id}
              className="amna-heart"
              style={{
                ['--heart-left' as string]: heart.left,
                ['--heart-size' as string]: heart.size,
                ['--heart-duration' as string]: heart.duration,
                ['--heart-delay' as string]: heart.delay,
              }}
            >
              ♥
            </span>
          ))}
        </div>
      )}

      <motion.header
        className="topbar"
        initial={{ opacity: 0, y: -18, filter: "blur(10px)" }}
        animate={booting ? { opacity: 0, y: -18, filter: "blur(10px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ type: 'spring', stiffness: 240, damping: 28, mass: 0.9, delay: 0.15 }}
      >
        <MacOSMenuBar
          name="MOHIB KHAN"
          items={navigationItems.map((item) => ({ id: item.id, label: item.tile, onClick: item.onClick }))}
          isThemesOpen={themeMenuOpen}
          onThemesToggle={() => setThemeMenuOpen((v) => !v)}
          onThemesClose={() => setThemeMenuOpen(false)}
          activeTheme={theme}
          themeOptions={THEME_OPTIONS}
          onThemeSelect={(next) => pickTheme(next as ThemeKey)}
          activeId={activeNavId}
          rightSlot={
              <AnimatedThemeToggle
                isDark={theme === 'dark'}
                onToggle={toggleLightDark}
                className="mac-menu-bar__theme-toggle"
              />
          }
        />
      </motion.header>

      <motion.main 
        className="portfolio-main"
        initial={{ filter: "blur(20px)", scale: 0.92, opacity: 0 }}
        animate={booting ? { filter: "blur(20px)", scale: 0.92, opacity: 0 } : { filter: "blur(0px)", scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.8, delay: 0.1 }}
      >
        <section data-od-id="section-hero" className={`hero${hackThemeActive ? ' hero--hack' : ''}${amnaThemeActive ? ' hero--amna' : ''}`} id="hero" style={{ ['--hero-image' as string]: `url(${heroImage})` }}>
          <span className="hero__version" aria-label={`Website version ${WEBSITE_VERSION}`}>{WEBSITE_VERSION}</span>
          <div className="hero__changelog" ref={changelogRef}>
            <button
              type="button"
              className="hero__changelog-toggle"
              onClick={() => setChangelogOpen((value) => !value)}
              aria-expanded={changelogOpen}
              aria-haspopup="menu"
              aria-controls="hero-changelog-menu"
            >
              changelog
            </button>

            <AnimatePresence>
              {changelogOpen && (
                <motion.div
                  id="hero-changelog-menu"
                  className="hero__changelog-menu"
                  role="menu"
                  data-lenis-prevent-wheel="true"
                  data-lenis-prevent-touch="true"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.8 }}
                >
                  <p className="hero__changelog-title">Recent changes</p>
                  <ul className="hero__changelog-list">
                    {CHANGELOG_ENTRIES.map((entry) => (
                      <li key={`${entry.version}-${entry.title}`} className="hero__changelog-item">
                        <div className="hero__changelog-item-top">
                          <span className="hero__changelog-version">{entry.version}</span>
                          <span className="hero__changelog-headline">{entry.title}</span>
                        </div>
                        <span className="hero__changelog-date">{entry.date}</span>
                        <p className="hero__changelog-summary">{entry.summary}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div className={`hero__copy${hackThemeActive ? ' hack-draggable' : ''}`} {...hackDrag}>
            <GooeyText texts={HERO_PHRASES} className="w-full py-8 px-4" textClassName="font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.9]" />

            <motion.form
              className="terminal-box"
              onSubmit={handleTerminalSubmit}
              initial={{ opacity: 0, y: 14, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 240, damping: 26, mass: 0.9, delay: 0.12 }}
              whileHover={{ y: -2 }}
            >
              <LiquidGlassBackdrop />
              <span className="terminal-box__scan" aria-hidden="true" />
              <div className="terminal-box__bar">
                <span className="terminal-box__window-controls" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>ROOT@MOHIB:~</span>
              </div>
              <label className="terminal-box__prompt">
                <span className="terminal-box__symbol font-bold">ROOT@MOHIB:~$</span>
                <input
                  type="text"
                  ref={terminalInputRef}
                  value={terminalCommand}
                  onChange={(event) => setTerminalCommand(event.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal command"
                  placeholder="ACCESS PORTFOLIO"
                />
              </label>
              <div className="terminal-box__actions">
                <button type="submit" className="terminal-box__submit">RUN</button>
              </div>
              <p className="terminal-box__message">{terminalMessage}</p>
            </motion.form>
          </motion.div>
        </section>

        <AnimatePresence>
          {!amnaThemeActive && terminalUnlocked && (
            <motion.div
              key="content-grid"
              id="workflow"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={workflowContainerVariants}
              className={hackThemeActive ? 'hack-draggable' : ''}
              {...hackDrag}
            >
              <Skiper19
                className="scroll-journey"
                title={null}
                subtitle="A compact overview of my engineering stack and selected builds, arranged in a brutalist scroll workflow."
              >
                <div className="scroll-journey-shell relative z-20">
                  <div className="scroll-journey-shell__left">
                    <h2 className="workflow-column-title">STACKS</h2>

                    <motion.section data-od-id="section-about" variants={workflowItemVariants} className="scroll-section scroll-section--about" id="about">
                      <LiquidGlassBackdrop />
                      <article className="status-report">
                        <TextScramble as="span" className="status-report__title">[ USER_PROFILE ]</TextScramble>
                        <p className="status-report__longform">
                          I&apos;m a Computer Science student with a strong passion for Artificial Intelligence,
                          Cybersecurity, and Game Development. When I&apos;m not writing code or building 3D environments,
                          I&apos;m also a photographer capturing moments with my Nikon D3500.
                        </p>
                      </article>
                    </motion.section>

                    <motion.section data-od-id="section-stack" variants={workflowItemVariants} className="scroll-section scroll-section--stack" id="stack">
                      <LiquidGlassBackdrop />
                      <div className="scroll-section__header">
                        <TextScramble as="h2" className="section-label">// TOOL_MATRIX</TextScramble>
                        <p className="scroll-section__lede">
                          Core technical architecture and deployment tooling.
                        </p>
                      </div>

                      <div className="stack-matrix">
                        {skillSets.map((group) => (
                          <article className="stack-group" key={group.label}>
                            <TextScramble as="h3">{group.label}</TextScramble>
                            <div className="chip-row">
                              {group.items.map((item) => (
                                <span className="chip" key={item}>
                                  <span className="chip__icon" style={{ color: stackIconColor(item) }}>
                                    {mappedIcon(item)}
                                  </span>
                                  {item}
                                </span>
                              ))}
                            </div>
                          </article>
                        ))}
                      </div>

                    </motion.section>
                  </div>

                  <div className="scroll-journey-shell__right">
                    <h2 className="workflow-column-title workflow-column-title--projects">PROJECTS</h2>

                    <motion.section data-od-id="section-projects" variants={workflowItemVariants} className="scroll-section scroll-section--projects" id="projects">
                      <LiquidGlassBackdrop />
                      <div
                        className={`selected-output ${selectedActive ? 'selected-output--active' : ''}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedActive((v) => !v)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') setSelectedActive((v) => !v);
                        }}
                      >
                        <TextScramble as="div" className="selected-output__drive">DRIVE:/PROJECTS/*</TextScramble>
                      </div>

                      <section data-od-id="project-ledger" className="project-ledger">
                        {projectLedger.map((project, index) => (
                          <motion.article
                            className="ledger-row"
                            key={project.title}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.18 }}
                            transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1], delay: index * 0.05 }}
                            onViewportEnter={() => bumpProjectTitleScramble(project.title)}
                            onMouseEnter={() => bumpProjectTitleScramble(project.title)}
                            onFocusCapture={() => bumpProjectTitleScramble(project.title)}
                          >
                            <div className="ledger-row__index">[/&gt;]</div>
                            <div className="ledger-row__content">
                              <TextScramble
                                as="h4"
                                duration={1.55}
                                speed={0.03}
                                trigger={(projectTitleScrambleTick[project.title] ?? 0) > 0}
                                replayToken={projectTitleScrambleTick[project.title] ?? 0}
                              >
                                {project.title}
                              </TextScramble>
                              <TextScramble as="p" duration={1.2} speed={0.025}>{project.note}</TextScramble>
                              {project.repo && (
                                <SlideButton
                                  href={project.repo}
                                  inDev={project.inDev}
                                  ariaLabel={
                                    project.inDev
                                      ? `${project.title} in development — repository private`
                                      : `Visit ${project.title} repository`
                                  }
                                />
                              )}
                            </div>
                            <div className="ledger-row__meta">
                              <div className="ledger-row__year">{project.year}</div>
                              {project.showcase && (
                                <ShowcaseHover
                                  media={project.showcase}
                                  className="ledger-row__showcase"
                                  label="showcase"
                                  align="left"
                                />
                              )}
                            </div>
                          </motion.article>
                        ))}
                      </section>

                      <div className="project-showcase-lane">
                        {featuredShowcases.map((item) => (
                          <article className="project-showcase-card" key={item.title}>
                            <div className="project-showcase-card__header">
                              <TextScramble as="h4" duration={1.1} speed={0.03} trigger>
                                {item.title}
                              </TextScramble>
                              <span className="project-showcase-card__index">[//]</span>
                            </div>
                            <p className="project-showcase-card__copy">{item.note}</p>
                            <div className="project-showcase-card__actions">
                              <ShowcaseHover media={item.media} className="project-showcase-card__trigger" label="showcase" align="right" />
                              <SlideButton href={item.media.src} ariaLabel={`Watch ${item.title}`} />
                            </div>
                          </article>
                        ))}
                      </div>
                    </motion.section>
                  </div>
                </div>



                {renderPipelineVisible && (
                  <section data-od-id="section-pipeline" className="render-pipeline render-pipeline--active scroll-section scroll-section--pipeline" id="pipeline">
                    <LiquidGlassBackdrop />
                    <div className="render-pipeline__frame">
                      <div className="render-pipeline__header">
                        <span className="render-pipeline__label">[ ASCII_RENDER_PIPELINE ]</span>
                        <span className="render-pipeline__hint">/ unlocked</span>
                      </div>
                      <div className="render-pipeline__canvas">
                        <Suspense fallback={<div className="render-pipeline__placeholder">Loading pipeline...</div>}>
                          <AsciiCpuCanvas />
                        </Suspense>
                      </div>
                    </div>
                  </section>
                )}
              </Skiper19>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      <AnimatePresence>
        {!amnaThemeActive && terminalUnlocked && (
          <motion.footer
            data-od-id="section-contact"
            key="hover-footer"
            className={`hover-footer${hackThemeActive ? ' hack-draggable' : ''}`}
            id="contact"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20, delay: 0.8 } },
              exit: { opacity: 0, y: 12, transition: { duration: 0.3 } }
            }}
            {...hackDrag}
          >
            <div className="hover-footer__inner">
              <div className="hover-footer__grid">
                <div className="hover-footer__brand">
                  <div className="hover-footer__brand-row">
                    <span className="hover-footer__heart">&hearts;</span>
                    <TextScramble as="span" className="hover-footer__brand-name">MOHIB KHAN</TextScramble>
                  </div>
                  <p className="hover-footer__tagline">
                    CS student building things in AI, cybersecurity, and game dev. Collaboration, prototyping, and shipping.
                  </p>
                </div>

                <div className="hover-footer__col">
                  <TextScramble as="h4">Routes</TextScramble>
                  <ul>
                    <li><a href="#hero">Top</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#stack">Stack</a></li>
                  </ul>
                </div>

                <div className="hover-footer__col">
                  <TextScramble as="h4">Signals</TextScramble>
                  <ul>
                    <li>
                      <a href="https://github.com/mohibk0004-del" target="_blank" rel="noreferrer">GitHub</a>
                    </li>
                    <li>
                      <a href="mailto:mohibk0004@gmail.com">Email</a>
                    </li>
                    <li className="hover-footer__pulse-item">
                      <a href="#projects">Open to work</a>
                      <span className="hover-footer__pulse" aria-hidden="true" />
                    </li>
                  </ul>
                </div>

                <div className="hover-footer__col">
                  <TextScramble as="h4">Direct</TextScramble>
                  <ul className="hover-footer__contact">
                    <li>
                      <Mail size={16} className="hover-footer__icon" />
                      <a href="mailto:mohibk0004@gmail.com">mohibk0004@gmail.com</a>
                    </li>
                    <li>
                      <Globe size={16} className="hover-footer__icon" />
                      <span>Remote / GMT+5</span>
                    </li>
                  </ul>
                </div>
              </div>

              <hr className="hover-footer__rule" />

              <div className="hover-footer__bottom">
                <div className="hover-footer__socials">
                  <a
                    href="https://github.com/mohibk0004-del"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  >
                    <SiGithub size={18} />
                  </a>
                  <a href="mailto:mohibk0004@gmail.com" aria-label="Email">
                    <Mail size={18} />
                  </a>
                </div>
                <p className="hover-footer__copy">
                  &copy; {new Date().getFullYear()} Mohib Khan. All rights reserved.
                </p>
              </div>
            </div>

            <div className="hover-footer__hover-text" aria-hidden="true">
              <TextHoverEffect text="MOHIB" strokeColor="var(--text)" />
            </div>

            <FooterBackgroundGradient />
          </motion.footer>
        )}
      </AnimatePresence>

      {amnaThemeActive && (
        <div className="amna-character-wrap" style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
          <ValentineSnakeGame />
        </div>
      )}

      <GlassFilter />
    </div>
  );
}

export default App;

function LiquidGlassBackdrop() {
  return (
    <>
      <div className="liquid-glass-backdrop absolute top-0 left-0 z-0 h-full w-full rounded-lg 
          shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] 
          transition-all pointer-events-none
          dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]" />
      <div
        className="liquid-glass-backdrop absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-lg pointer-events-none"
        style={{ backdropFilter: 'url("#container-glass")' }}
      />
    </>
  );
}

function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          {/* Generate turbulent noise for distortion */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />

          {/* Blur the turbulence pattern slightly */}
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />

          {/* Displace the source graphic with the noise */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />

          {/* Apply overall blur on the final result */}
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />

          {/* Output the result */}
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
