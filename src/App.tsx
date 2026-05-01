import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, useRef, useMemo, useCallback, lazy, Suspense, type FormEvent } from 'react';
import Lenis from 'lenis';
import { BootSequence } from './components/BootSequence';
import { SlideButton } from './components/ui/slide-button';
import { TextHoverEffect, FooterBackgroundGradient } from './components/ui/hover-footer';
import { TextScramble } from './components/ui/text-scramble';
import { AnimatedNavigationTabs, type NavigationItem } from './components/ui/animated-navigation-tabs';
import { SiGithub } from 'react-icons/si';
import { Mail, Globe, Sun, Moon, Palette } from 'lucide-react';
import handsImage from './assets/hands.webp';
import handsDarkImage from './assets/hands_black.webp';
import handsHackImage from './assets/hands_hack.webp';
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

const AsciiCpuCanvas = lazy(() =>
  import('./components/AsciiCpuCanvas').then((m) => ({ default: m.AsciiCpuCanvas }))
);

const MatrixRain = lazy(() =>
  import('./components/MatrixRain').then((m) => ({ default: m.MatrixRain }))
);

const DottedSurface = lazy(() =>
  import('./components/ui/dotted-surface').then((m) => ({ default: m.DottedSurface }))
);

type ThemeKey = 'light' | 'dark' | 'hack' | 'decolumb' | 'gunmetal' | 'dubai' | 'luxury';

type ProjectLedger = {
  title: string;
  note: string;
  year: string;
  repo?: string;
  inDev?: boolean;
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
  { key: 'dark', label: 'DARK' },
  { key: 'decolumb', label: 'DECOLUMB' },
  { key: 'gunmetal', label: 'GUNMETAL' },
  { key: 'dubai', label: 'DUBAI' },
  { key: 'luxury', label: 'LUXURY' },
];

const ALL_THEME_KEYS = new Set<ThemeKey>(['light', 'dark', 'hack', 'decolumb', 'gunmetal', 'dubai', 'luxury']);

function Icon({ kind }: { kind: 'about' | 'projects' | 'stack' | 'dark' | 'web' | 'mail' | 'home' | 'contact' | 'theme' | 'chevron' }) {
  switch (kind) {
    case 'about':
      return (
        <svg viewBox="0 0 18 18" aria-hidden="true">
          <rect x="2" y="2" width="5" height="5" />
          <rect x="11" y="2" width="5" height="5" />
          <rect x="2" y="11" width="5" height="5" />
          <rect x="11" y="11" width="5" height="5" />
        </svg>
      );
    case 'projects':
      return (
        <svg viewBox="0 0 18 18" aria-hidden="true">
          <path d="M3 4.5h12M3 9h12M3 13.5h8" />
          <path d="M12.5 12.5l2.5-2.5-2.5-2.5" />
        </svg>
      );
    case 'stack':
      return (
        <svg viewBox="0 0 18 18" aria-hidden="true">
          <path d="M3 4.5h12M3 9h12M3 13.5h12" />
        </svg>
      );
    case 'dark':
      return (
        <svg viewBox="0 0 18 18" aria-hidden="true">
          <path d="M9 2.5v13" />
          <path d="M4 4.5h10" />
          <path d="M4 13.5h10" />
        </svg>
      );
    case 'web':
      return (
        <svg viewBox="0 0 18 18" aria-hidden="true">
          <circle cx="9" cy="9" r="6.5" />
          <path d="M2.5 9h13M9 2.5c2 2.1 3 4.3 3 6.5s-1 4.4-3 6.5c-2-2.1-3-4.3-3-6.5s1-4.4 3-6.5Z" />
        </svg>
      );
    case 'mail':
      return (
        <svg viewBox="0 0 18 18" aria-hidden="true">
          <rect x="2.5" y="4" width="13" height="10" rx="1" />
          <path d="m3.5 5.5 5.5 4 5.5-4" />
        </svg>
      );
    case 'home':
      return (
        <svg viewBox="0 0 18 18" aria-hidden="true">
          <path d="M2.5 8.8 9 3l6.5 5.8" />
          <path d="M4.5 7.8V15h9V7.8" />
        </svg>
      );
    case 'contact':
      return (
        <svg viewBox="0 0 18 18" aria-hidden="true">
          <circle cx="9" cy="6.2" r="2.2" />
          <path d="M4.5 14c.8-2.6 2.5-4 4.5-4s3.7 1.4 4.5 4" />
        </svg>
      );
    case 'theme':
      return (
        <svg viewBox="0 0 18 18" aria-hidden="true">
          <circle cx="9" cy="9" r="6.5" />
          <path d="M9 2.5v13" />
          <path d="M2.5 9c3 0 5-2 6.5-6.5 1.5 4.5 3.5 6.5 6.5 6.5-3 0-5 2-6.5 6.5-1.5-4.5-3.5-6.5-6.5-6.5Z" />
        </svg>
      );
    case 'chevron':
      return (
        <svg viewBox="0 0 18 18" aria-hidden="true">
          <path d="m4.5 7 4.5 4 4.5-4" />
        </svg>
      );
  }
}

function App() {
  const [booting, setBooting] = useState(true);
  const [theme, setTheme] = useState<ThemeKey>('light');
  const [themesUnlocked, setThemesUnlocked] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [bitmapMode, setBitmapMode] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [glitchVariant, setGlitchVariant] = useState(0);
  const [heartsActive, setHeartsActive] = useState(false);
  const [heartsKey, setHeartsKey] = useState(0);
  const [terminalUnlocked, setTerminalUnlocked] = useState(false);
  const [renderPipelineVisible, setRenderPipelineVisible] = useState(false);
  const [selectedActive, setSelectedActive] = useState(true);
  const [terminalCommand, setTerminalCommand] = useState('ACCESS PORTFOLIO');
  const [terminalMessage, setTerminalMessage] = useState('Type ACCESS PORTFOLIO and press Enter.');
  const [nameGlitch, setNameGlitch] = useState(false);
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  const hackThemeActive = theme === 'hack';

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
    document.body.style.overflow = 'auto';
  }, [booting]);

  useEffect(() => {
    if (booting) return;
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
    const saved = window.localStorage.getItem('portfolio-theme');
    if (saved && ALL_THEME_KEYS.has(saved as ThemeKey)) {
      setTheme(saved as ThemeKey);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.bitmap = bitmapMode ? '1' : '0';
  }, [bitmapMode]);


  useEffect(() => {
    if (!themeMenuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
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

  useEffect(() => {
    if (!hackThemeActive) {
      setNameGlitch(false);
      return;
    }
    let cancelled = false;
    const timers = new Set<number>();
    const queue = () => {
      const wait = 4800 + Math.random() * 2400;
      const t = window.setTimeout(() => {
        if (cancelled) return;
        setNameGlitch(true);
        const t2 = window.setTimeout(() => {
          if (!cancelled) setNameGlitch(false);
          timers.delete(t2);
        }, 280 + Math.random() * 220);
        timers.add(t2);
        timers.delete(t);
        queue();
      }, wait);
      timers.add(t);
    };
    queue();
    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, [hackThemeActive]);

  const heroImage = useMemo(() => {
    if (theme === 'hack') return handsHackImage;
    if (theme === 'dark') return handsDarkImage;
    return handsImage;
  }, [theme]);

  const toggleLightDark = useCallback(() => {
    setTheme((cur) => (cur === 'dark' ? 'light' : 'dark'));
  }, []);

  const pickTheme = useCallback((next: ThemeKey) => {
    setTheme(next);
    setThemeMenuOpen(false);
  }, []);

  const handleTerminalSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const raw = terminalCommand.trim();
    const normalized = raw.toUpperCase();

    if (normalized === 'ACCESS PORTFOLIO') {
      setTerminalUnlocked(true);
      setTerminalMessage('Access granted. Try RENDER, THEME, or BITMAP.');
      document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      terminalInputRef.current?.focus();
      return;
    }

    if (normalized === 'RENDER') {
      setTerminalUnlocked(true);
      setRenderPipelineVisible(true);
      setTerminalMessage('Render pipeline active. Scroll to the lower stack.');
      document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (normalized === 'HACK') {
      setTheme('hack');
      setTerminalUnlocked(true);
      setTerminalMessage('Mode switch complete.');
      return;
    }

    if (normalized === 'THEME' || normalized === 'THEMES') {
      setThemesUnlocked(true);
      setThemeMenuOpen(true);
      setTerminalMessage('Theme tab unlocked. Open /THEME on the top bar.');
      return;
    }

    if (normalized.startsWith('THEME ') || normalized.startsWith('THEMES ')) {
      const after = normalized.startsWith('THEMES ') ? normalized.slice(7) : normalized.slice(6);
      const name = after.trim().toLowerCase() as ThemeKey;
      if (ALL_THEME_KEYS.has(name)) {
        if (name !== 'hack') setThemesUnlocked(true);
        setTheme(name);
        setTerminalMessage(`Theme set: ${name.toUpperCase()}.`);
      } else {
        setTerminalMessage('Unknown theme. Try LIGHT, DARK, DECOLUMB, GUNMETAL, DUBAI, LUXURY.');
      }
      return;
    }

    if (normalized === 'BITMAP') {
      setBitmapMode((v) => !v);
      setTerminalMessage('Bitmap mode toggled.');
      return;
    }

    if (normalized === 'AMNA' || normalized === "AMNA'") {
      setHeartsActive(true);
      setHeartsKey((value) => value + 1);
      setTerminalMessage('Signal received.');
      return;
    }

    setTerminalMessage('Command not recognized. Try ACCESS PORTFOLIO.');
    terminalInputRef.current?.focus();
  };

  const navigationItems: NavigationItem[] = useMemo(() => {
    return [
      { id: 1, tile: 'Home', href: '#hero', onClick: () => window.location.hash = '#hero' },
      { id: 2, tile: 'About', href: '#about', onClick: () => window.location.hash = '#about' },
      { id: 3, tile: 'Projects', href: '#projects', onClick: () => window.location.hash = '#projects' },
      { id: 4, tile: 'Stack', href: '#stack', onClick: () => window.location.hash = '#stack' },
      { id: 5, tile: 'Contact', href: '#contact', onClick: () => window.location.hash = '#contact' },
    ];
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

      {!hackThemeActive && !booting && (
        <Suspense fallback={null}>
          <DottedSurface />
        </Suspense>
      )}

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
          <AnimatedNavigationTabs items={navigationItems} onThemeToggle={toggleLightDark} isDark={theme === 'dark'} />
        </div>
      </header>

      {themesUnlocked && (
        <div
          className={`theme-menu theme-menu--floating${themeMenuOpen ? ' theme-menu--open' : ''}`}
          ref={themeMenuRef}
        >
          <AnimatePresence>
            {themeMenuOpen && (
              <motion.ul
                role="menu"
                className="theme-menu__list"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
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
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}

      <main className="portfolio-main">
        <section className={`hero${hackThemeActive ? ' hero--hack' : ''}`} id="hero" style={{ ['--hero-image' as string]: `url(${heroImage})` }}>
          <span className="hero__coord hero__coord--left">[X:0001.Y:0001]</span>
          <span className="hero__coord hero__coord--right">[X:0001.Y:0001]</span>

          <motion.div className={`hero__copy${hackThemeActive ? ' hack-draggable' : ''}`} {...hackDrag}>
            <TextScramble as="p" className="hero__eyebrow">Personal Document</TextScramble>
            <h1 className={`hero__title${nameGlitch ? ' hero__title--err404' : ''}`}>
              {nameGlitch ? 'Error 404' : 'MOHIB KHAN'}
            </h1>
            <TextScramble as="p" className="hero__subtitle">{'CS Student | AI & Cybersecurity | Video Editor'}</TextScramble>

            <form className="terminal-box" onSubmit={handleTerminalSubmit}>
              <div className="terminal-box__bar">
                <span>terminal://access</span>
                <span>[ press enter / tap button ]</span>
              </div>
              <label className="terminal-box__prompt">
                <span className="terminal-box__symbol">$</span>
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
                <button type="submit" className="terminal-box__submit">ENTER</button>
              </div>
              <p className="terminal-box__message">{terminalMessage}</p>
            </form>
          </motion.div>
        </section>

        <AnimatePresence>
        {terminalUnlocked && (
          <motion.section
            key="content-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
            className={`content-grid${hackThemeActive ? ' hack-draggable' : ''}`}
            id="stack"
            {...hackDrag}
          >
            <aside className="panel panel--left" id="about">
              <article className="status-report">
                <TextScramble as="span" className="status-report__title">{'[ STATUS_REPORT ]'}</TextScramble>
                <p className="status-report__longform">
                  I&apos;m a Computer Science student with a strong passion for Artificial Intelligence,
                  Cybersecurity, and Game Development. When I&apos;m not writing code or building 3D environments,
                  I&apos;m a photographer capturing moments with my Nikon D3500.
                </p>
              </article>

            <section className="stack-matrix">
              <TextScramble as="h2" className="section-label">// TOOL_MATRIX</TextScramble>

              {skillSets.map((group) => (
                <article className="stack-group" key={group.label}>
                  <TextScramble as="h3">{group.label}</TextScramble>
                  <div className="chip-row">
                    {group.items.map((item) => (
                      <span className="chip" key={item}>
                        {mappedIcon(item)}
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </section>
            </aside>

            <div className="projects-column">
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

              <section className="panel panel--right" id="projects">
                <section className="project-ledger">
                  {projectLedger.map((project, index) => (
                    <motion.article
                      className="ledger-row"
                      key={project.title}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.18 }}
                      transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1], delay: index * 0.05 }}
                    >
                      <div className="ledger-row__index">[/&gt; {String(index + 1).padStart(2, '0')}]</div>
                      <div className="ledger-row__content">
                        <TextScramble as="h4">{project.title}</TextScramble>
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
                      <div className="ledger-row__year">{project.year}</div>
                    </motion.article>
                  ))}
                </section>
              </section>
            </div>

            {renderPipelineVisible && (
              <motion.section
                className="render-pipeline"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="render-pipeline__frame">
                  <div className="render-pipeline__header">
                    <span className="render-pipeline__label">[ ASCII_RENDER_PIPELINE ]</span>
                    <span className="render-pipeline__hint">/ unlocks after render</span>
                  </div>
                  <div className="render-pipeline__canvas">
                    <Suspense fallback={<div className="render-pipeline__placeholder">Loading pipeline...</div>}>
                      <AsciiCpuCanvas />
                    </Suspense>
                  </div>
                </div>
              </motion.section>
            )}
          </motion.section>
        )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
      {terminalUnlocked && (
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
    </div>
  );
}

export default App;
