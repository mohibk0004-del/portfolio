import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, useRef, useMemo, useCallback, lazy, Suspense, type FormEvent } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { BootSequence } from './components/BootSequence';
import { SlideButton } from './components/ui/slide-button';
import { ShowcaseHover } from './components/ui/showcase-hover';
import { TextHoverEffect, FooterBackgroundGradient } from './components/ui/hover-footer';
import { TextScramble } from './components/ui/text-scramble';
import { AnimatedNavigationTabs, type NavigationItem } from './components/ui/animated-navigation-tabs';
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

const MatrixRain = lazy(() =>
  import('./components/MatrixRain').then((m) => ({ default: m.MatrixRain }))
);

const DottedSurface = lazy(() =>
  import('./components/ui/dotted-surface').then((m) => ({ default: m.DottedSurface }))
);

const Waves = lazy(() =>
  import('./components/ui/wave-background').then((m) => ({ default: m.Waves }))
);

import { GooeyText } from './components/ui/gooey-text-morphing';
import { HoverBorderGradient } from './components/ui/hover-border-gradient';
import { AnimatedThemeToggle } from './components/ui/animated-theme-toggle';

const BACKGROUND_SURFACE: 'waves' | 'dotted' = 'waves';
const HERO_PHRASES = ['MOHIB KHAN', 'CS STUDENT', 'AI + WEB DEV', 'GAME DEVELOPER'];

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

const InteractiveCharacter = () => {
  return (
    <div className="amna-character-card">
      <div className="amna-character-stage" aria-hidden="true">
        <div className="amna-character-orb" />
        <div className="amna-character-head" />
        <div className="amna-character-torso" />
        <div className="amna-character-shadow" />
      </div>
      <div className="amna-character-copy">
        <span className="amna-character-copy__eyebrow">AMNA MODE</span>
        <p>
          3D character sequence restored for love mode with the same terminal-brutalist mood.
        </p>
      </div>
    </div>
  );
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
const marqueeSkills = [
  'C',
  'C++',
  'C#',
  'Python',
  'JavaScript',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'Flutter',
  'Django',
  '.NET',
  'MySQL',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'AWS',
  'Azure',
  'Unity',
  'Unreal',
  'Blender',
  'OpenCV',
  'Figma',
  'Framer',
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
    year: 'IN DEVELOPMENT',
    repo: 'https://github.com/amna0x/sideline',
    inDev: true,
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
  'halftone',
]);

function App() {
  const [booting, setBooting] = useState(true);
  const [theme, setTheme] = useState<ThemeKey>('light');
  const [themesUnlocked] = useState(true);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [themeMenuRendered, setThemeMenuRendered] = useState(false);
  const [bitmapMode, setBitmapMode] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [glitchVariant, setGlitchVariant] = useState(0);
  const [heartsActive, setHeartsActive] = useState(false);
  const [heartsKey, setHeartsKey] = useState(0);
  const [terminalUnlocked, setTerminalUnlocked] = useState(false);
  const [renderPipelineVisible, setRenderPipelineVisible] = useState(false);
  const [selectedActive, setSelectedActive] = useState(true);
  const [projectTitleScrambleTick, setProjectTitleScrambleTick] = useState<Record<string, number>>({});
  const [, setHeroPhraseIndex] = useState(0);
  const [terminalCommand, setTerminalCommand] = useState('ACCESS PORTFOLIO');
  const [terminalMessage, setTerminalMessage] = useState('TYPE ACCESS PORTFOLIO AND PRESS ENTER.');
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const themesButtonRef = useRef<HTMLButtonElement>(null);
  const themeMenuListRef = useRef<HTMLUListElement>(null);
  const themeMenuTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const hackThemeActive = theme === 'hack';
  const amnaThemeActive = theme === 'amna';
  const [backgroundSurfaceMode, setBackgroundSurfaceMode] = useState<'waves' | 'dotted'>(BACKGROUND_SURFACE);
  const showDottedSurface = backgroundSurfaceMode === 'dotted' && !hackThemeActive && !booting;
  const showWaveSurface = backgroundSurfaceMode === 'waves' && !hackThemeActive && !booting;

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
    if (booting) {
      document.body.style.overflow = 'hidden';
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const lenis = new Lenis({
      duration: 0.95,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
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
      setTheme(saved as ThemeKey);
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
    if (!themeMenuOpen) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedInsideMenu = !!themeMenuRef.current?.contains(target);
      const clickedThemesButton = !!themesButtonRef.current?.contains(target);

      if (!clickedInsideMenu && !clickedThemesButton) {
        setThemeMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setThemeMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [themeMenuOpen]);

  useEffect(() => {
    if (themeMenuOpen) {
      setThemeMenuRendered(true);
    }
  }, [themeMenuOpen]);

  useEffect(() => {
    const list = themeMenuListRef.current;
    if (!list || !themeMenuRendered) return;

    const items = Array.from(list.querySelectorAll('.theme-menu__item'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    themeMenuTimelineRef.current?.kill();

    if (themeMenuOpen) {
      if (reduceMotion) {
        gsap.set(list, { autoAlpha: 1, y: 0, scale: 1 });
        gsap.set(items, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(list, { transformOrigin: 'top right' });
      gsap.set(items, { autoAlpha: 0, y: -6 });

      themeMenuTimelineRef.current = gsap.timeline({ defaults: { ease: 'power2.out' } });
      themeMenuTimelineRef.current
        .fromTo(
          list,
          { autoAlpha: 0, y: -10, scale: 0.985 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.24 }
        )
        .to(items, { autoAlpha: 1, y: 0, stagger: 0.018, duration: 0.18 }, '-=0.14');

      return;
    }

    if (reduceMotion) {
      gsap.set(list, { autoAlpha: 0 });
      setThemeMenuRendered(false);
      return;
    }

    themeMenuTimelineRef.current = gsap.timeline({
      defaults: { ease: 'power2.in' },
      onComplete: () => setThemeMenuRendered(false),
    });

    themeMenuTimelineRef.current
      .to(items, { autoAlpha: 0, y: -4, stagger: { each: 0.012, from: 'end' }, duration: 0.12 })
      .to(list, { autoAlpha: 0, y: -8, scale: 0.985, duration: 0.18 }, '-=0.06');

    return () => {
      themeMenuTimelineRef.current?.kill();
    };
  }, [themeMenuOpen, themeMenuRendered]);

  useEffect(() => {
    return () => {
      themeMenuTimelineRef.current?.kill();
    };
  }, []);

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

  const smoothScrollTo = useCallback((targetId: string, delay = 80) => {
    window.setTimeout(() => {
      const target = document.getElementById(targetId);
      if (!target) return;

      const offset = 76;
      const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion) {
        window.scrollTo({ top: targetY });
        return;
      }

      const scrollState = { y: window.scrollY };
      gsap.to(scrollState, {
        y: targetY,
        duration: 1.35,
        ease: 'power2.inOut',
        onUpdate: () => window.scrollTo(0, scrollState.y),
      });
    }, delay);
  }, []);

  const handleTerminalSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const raw = terminalCommand.trim();
    const normalized = raw.toUpperCase();

    if (normalized === 'ACCESS PORTFOLIO') {
      setTerminalUnlocked(true);
      setTerminalMessage('ACCESS GRANTED. TRY RENDER, THEME, OR BITMAP.');
      smoothScrollTo('workflow');
      terminalInputRef.current?.focus();
      return;
    }

    if (normalized === 'RENDER') {
      setTerminalUnlocked(true);
      setRenderPipelineVisible(true);
      setTerminalMessage('RENDER PIPELINE ACTIVE. SCROLL TO THE PIPELINE LANE.');
      smoothScrollTo('pipeline', 100);
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
      { id: 1, tile: 'Home', href: '#hero', onClick: () => window.location.hash = '#hero' },
      { id: 2, tile: 'About', href: '#about', onClick: () => window.location.hash = '#about' },
      { id: 3, tile: 'Stacks', href: '#stack', onClick: () => window.location.hash = '#stack' },
      { id: 4, tile: 'Projects', href: '#projects', onClick: () => window.location.hash = '#projects' },
      { id: 5, tile: 'Contact', href: '#contact', onClick: () => window.location.hash = '#contact' },
    ];
  }, []);

  const [activeNavId, setActiveNavId] = useState<number>(1);

  // observe page sections and update active nav on scroll
  useEffect(() => {
    const idMap = new Map<string, number>();
    navigationItems.forEach((it) => {
      if (it.href) idMap.set(it.href.replace('#', ''), it.id);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id && idMap.has(id)) {
              setActiveNavId(idMap.get(id)!);
            }
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.5 }
    );

    navigationItems.forEach((it) => {
      if (!it.href) return;
      const el = document.getElementById(it.href.replace('#', ''));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navigationItems]);

  const bumpProjectTitleScramble = useCallback((title: string) => {
    setProjectTitleScrambleTick((prev) => ({
      ...prev,
      [title]: (prev[title] ?? 0) + 1,
    }));
  }, []);

  return (
    <div className={`page-shell${glitching ? ` glitching glitch-v${glitchVariant}` : ''}${bitmapMode ? ' bitmap-mode' : ''}`}>
      <AnimatePresence>
        {booting && <BootSequence onComplete={() => setBooting(false)} />}
      </AnimatePresence>

      <div className="page-noise" aria-hidden="true" />

      {hackThemeActive && (
        <Suspense fallback={null}>
          <MatrixRain />
        </Suspense>
      )}

      <AnimatePresence mode="wait">
        {showWaveSurface && (
          <motion.div
            key="wave-surface"
            className="background-surface"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Suspense fallback={null}>
              <Waves
                className="page-waves"
                strokeColor="var(--wave-stroke)"
                backgroundColor="var(--wave-bg)"
                pointerSize={0.3}
              />
            </Suspense>
          </motion.div>
        )}

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

      <header className="topbar">
        <div className="topbar__brand">MOHIB KHAN</div>
        <div className="topbar__menu" aria-label="Primary navigation">
          <AnimatedNavigationTabs
            items={navigationItems}
            themesUnlocked={themesUnlocked}
            isThemesOpen={themeMenuOpen}
            onThemesToggle={() => setThemeMenuOpen((v) => !v)}
            activeId={activeNavId}
            themesButtonRef={themesButtonRef}
          />

          {themesUnlocked && (
            <div
              className={`theme-menu theme-menu--anchored${themeMenuOpen ? ' theme-menu--open' : ''}`}
              ref={themeMenuRef}
            >
              {themeMenuRendered && (
                <ul
                  role="menu"
                  className="theme-menu__list"
                  ref={themeMenuListRef}
                >
                    {THEME_OPTIONS.map((opt) => (
                      <li key={opt.key} role="none">
                        <button
                          role="menuitemradio"
                          aria-checked={theme === opt.key}
                          className={`theme-menu__item${theme === opt.key ? ' theme-menu__item--active' : ''}`}
                          type="button"
                          onClick={() => pickTheme(opt.key)}
                        >
                          <span className={`theme-menu__swatch theme-menu__swatch--${opt.key}`} aria-hidden="true" />
                          {opt.label}
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2" style={{ gridColumn: 3, justifySelf: 'end' }}>
          <HoverBorderGradient
            onClick={() => setBackgroundSurfaceMode(backgroundSurfaceMode === 'waves' ? 'dotted' : 'waves')}
            containerClassName="h-10 transition-all duration-200 active:scale-90 hover:scale-110"
            className="px-3 py-1.5 text-xs font-semibold"
          >
            {backgroundSurfaceMode === 'waves' ? 'DOT' : 'WAVE'}
          </HoverBorderGradient>
          <AnimatedThemeToggle isDark={theme === 'dark'} onToggle={toggleLightDark} />
        </div>
      </header>

      <main className="portfolio-main">
        <section className={`hero${hackThemeActive ? ' hero--hack' : ''}${amnaThemeActive ? ' hero--amna' : ''}`} id="hero" style={{ ['--hero-image' as string]: `url(${heroImage})` }}>
          {theme === 'matcha' && (
            <>
              <div className="hero__jp-left" aria-hidden="true">モヒブ・カーン</div>
              <div className="hero__jp-right" aria-hidden="true">マッチャ</div>
            </>
          )}
          <span className="hero__coord hero__coord--left">[X:0001.Y:0001]</span>
          <span className="hero__coord hero__coord--right">[X:0001.Y:0001]</span>

          <motion.div className={`hero__copy${hackThemeActive ? ' hack-draggable' : ''}`} {...hackDrag}>
            <GooeyText texts={HERO_PHRASES} className="w-full py-8 px-4" textClassName="font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.9]" />

            <form className="terminal-box" onSubmit={handleTerminalSubmit}>
              <div className="terminal-box__bar">
                <span className="terminal-box__window-controls" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>ROOT@MOHIB:~</span>
              </div>
              <label className="terminal-box__prompt">
                <span className="terminal-box__symbol">ROOT@MOHIB:/$</span>
                <input
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
            </form>

            <div className="skills-marquee" aria-label="Live stack marquee">
              <div className="skills-marquee__fade skills-marquee__fade--left" aria-hidden="true" />
              <div className="skills-marquee__fade skills-marquee__fade--right" aria-hidden="true" />
              <div className="skills-marquee__track skills-marquee__track--rtl" aria-hidden="true">
                {[...marqueeSkills, ...marqueeSkills].map((skill, idx) => (
                  <span key={`rtl-${skill}-${idx}`} className="skills-marquee__item">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="skills-marquee__track skills-marquee__track--ltr" aria-hidden="true">
                {[...marqueeSkills, ...marqueeSkills].map((skill, idx) => (
                  <span key={`ltr-${skill}-${idx}`} className="skills-marquee__item">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <AnimatePresence>
          {!amnaThemeActive && terminalUnlocked && (
            <motion.div
              key="content-grid"
              id="workflow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
              className={hackThemeActive ? 'hack-draggable' : ''}
              {...hackDrag}
            >
              <Skiper19
                className="scroll-journey"
                title={null}
                subtitle="A compact overview of my engineering stack and selected builds, arranged in a brutalist scroll workflow."
              >
                <div className="scroll-journey-shell">
                  <div className="scroll-journey-shell__left">
                    <h2 className="workflow-column-title">STACKS</h2>

                    <section className="scroll-section scroll-section--about" id="about">
                      <article className="status-report">
                        <TextScramble as="span" className="status-report__title">about me</TextScramble>
                        <p className="status-report__longform">
                          I&apos;m a Computer Science student with a strong passion for Artificial Intelligence,
                          Cybersecurity, and Game Development. When I&apos;m not writing code or building 3D environments,
                          I&apos;m also a photographer capturing moments with my Nikon D3500.
                        </p>
                      </article>
                    </section>

                    <section className="scroll-section scroll-section--stack" id="stack">
                      <div className="scroll-section__header">
                        <TextScramble as="h2" className="section-label">// TOOL_MATRIX</TextScramble>
                        <p className="scroll-section__lede">
                          Languages, frameworks, data stores, and creative tooling arranged as the first lane after unlock.
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

                    </section>
                  </div>

                  <div className="scroll-journey-shell__right">
                    <h2 className="workflow-column-title workflow-column-title--projects">PROJECTS</h2>

                    <section className="scroll-section scroll-section--projects" id="projects">
                      <div
                        className={`selected-output ${selectedActive ? 'selected-output--active' : ''}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedActive((v) => !v)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') setSelectedActive((v) => !v);
                        }}
                      >
                        <div className="selected-output__title">
                          <TextScramble as="em">Selected_Projects</TextScramble>
                        </div>
                        <TextScramble as="div" className="selected-output__drive">DRIVE:/PROJECTS/*</TextScramble>
                      </div>

                      <section className="project-ledger">
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
                            <div className="ledger-row__index">[/&gt; {String(index + 1).padStart(2, '0')}]</div>
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
                        {featuredShowcases.map((item, index) => (
                          <article className="project-showcase-card" key={item.title}>
                            <div className="project-showcase-card__header">
                              <TextScramble as="h4" duration={1.1} speed={0.03} trigger>
                                {item.title}
                              </TextScramble>
                              <span className="project-showcase-card__index">0{index + 1}</span>
                            </div>
                            <p className="project-showcase-card__copy">{item.note}</p>
                            <div className="project-showcase-card__actions">
                              <ShowcaseHover media={item.media} className="project-showcase-card__trigger" label="showcase" align="right" />
                              <SlideButton href={item.media.src} ariaLabel={`Watch ${item.title}`} />
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>



                {renderPipelineVisible && (
                  <section className="render-pipeline render-pipeline--active scroll-section scroll-section--pipeline" id="pipeline">
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
      </main>

      <AnimatePresence>
        {!amnaThemeActive && terminalUnlocked && (
          <motion.footer
            key="hover-footer"
            className={`hover-footer${hackThemeActive ? ' hack-draggable' : ''}`}
            id="contact"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
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
                    CS student building things in AI, cybersecurity, and game dev. Available for collaboration.
                  </p>
                </div>

                <div className="hover-footer__col">
                  <TextScramble as="h4">Navigate</TextScramble>
                  <ul>
                    <li><a href="#hero">Top</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#stack">Stack</a></li>
                  </ul>
                </div>

                <div className="hover-footer__col">
                  <TextScramble as="h4">Connect</TextScramble>
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
                  <TextScramble as="h4">Contact</TextScramble>
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
          <InteractiveCharacter />
        </div>
      )}
    </div>
  );
}

export default App;
