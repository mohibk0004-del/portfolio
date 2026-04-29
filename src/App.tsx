import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, useRef, type FormEvent } from 'react';
import { BootSequence } from './components/BootSequence';
import { AsciiCpuCanvas } from './components/AsciiCpuCanvas';
import handsImage from './assets/hands.png';
import handsDarkImage from './assets/hands_black.png';
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

type ProjectLedger = {
  title: string;
  note: string;
  year: string;
  repo?: string;
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
    year: 'RELEASED',
    repo: 'https://github.com/mohibk0004-del/HamsterGame',
  },
];

const heartStream = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${4 + ((index * 97) % 92)}%`,
  size: `${0.9 + (index % 4) * 0.22}rem`,
  duration: `${5.2 + (index % 6) * 0.65}s`,
  delay: `${(index % 7) * 0.55}s`,
}));

function Icon({ kind }: { kind: 'about' | 'projects' | 'stack' | 'dark' | 'web' | 'mail' | 'home' | 'contact' }) {
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
  }
}

function App() {
  const [booting, setBooting] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hackThemeActive, setHackThemeActive] = useState(false);
  const [heartsActive, setHeartsActive] = useState(false);
  const [heartsKey, setHeartsKey] = useState(0);
  const [terminalUnlocked, setTerminalUnlocked] = useState(false);
  const [renderPipelineVisible, setRenderPipelineVisible] = useState(false);
  const [selectedActive, setSelectedActive] = useState(true);
  const [terminalCommand, setTerminalCommand] = useState('ACCESS PORTFOLIO');
  const [terminalMessage, setTerminalMessage] = useState('Type ACCESS PORTFOLIO and press Enter.');
  const terminalInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (booting) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'auto';
  }, [booting]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = hackThemeActive ? 'hack' : isDarkMode ? 'dark' : 'light';
    window.localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode, hackThemeActive]);

  const heroImage = hackThemeActive || isDarkMode ? handsDarkImage : handsImage;

  const handleTerminalSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalized = terminalCommand.trim().toUpperCase();
    if (normalized === 'ACCESS PORTFOLIO') {
      setTerminalUnlocked(true);
      setTerminalMessage('Access granted. Type RENDER to reveal the ascii pipeline.');
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
      setHackThemeActive(true);
      setTerminalUnlocked(true);
      setTerminalMessage('Mode switch complete.');
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

  return (
    <div className="page-shell">
      <AnimatePresence>
        {booting && <BootSequence onComplete={() => setBooting(false)} />}
      </AnimatePresence>

      <div className="page-noise" aria-hidden="true" />

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

        <nav className="topbar__nav" aria-label="Primary">
          <a className="nav-link" href="#about">
            <Icon kind="about" />
            <span>/ABOUT</span>
          </a>
          <a className="nav-link" href="#projects">
            <Icon kind="projects" />
            <span>/PROJECTS</span>
          </a>
          <a className="nav-link" href="#stack">
            <Icon kind="stack" />
            <span>/STACK</span>
          </a>
          <button className="nav-link nav-link--button" type="button" onClick={() => setIsDarkMode((value) => !value)}>
            <Icon kind="dark" />
            <span>{isDarkMode ? '/LIGHTMODE' : '/DARKMODE'}</span>
          </button>
        </nav>

        <div className="topbar__socials" aria-label="Quick links">
          <a className="mini-link" href="#hero" aria-label="Back to top">
            <Icon kind="web" />
          </a>
          <span className="divider">|</span>
          <a className="mini-link" href="mailto:mohibk0004@gmail.com" aria-label="Email Mohib">
            <Icon kind="mail" />
          </a>
          <span className="divider">|</span>
          <a className="mini-link" href="#contact" aria-label="Jump to contact section">
            <Icon kind="contact" />
          </a>
        </div>
      </header>

      <main className="portfolio-main">
        <section className="hero" id="hero" style={{ ['--hero-image' as string]: `url(${heroImage})` }}>
          <span className="hero__coord hero__coord--left">[X:0001.Y:0001]</span>
          <span className="hero__coord hero__coord--right">[X:0001.Y:0001]</span>

          <div className="hero__copy">
            <p className="hero__eyebrow">Personal Document</p>
            <h1 className="hero__title">MOHIB KHAN</h1>
            <p className="hero__subtitle">CS Student | AI &amp; Cybersecurity | Video Editor</p>

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
          </div>
        </section>

        <AnimatePresence>
        {terminalUnlocked && (
          <motion.section
            key="content-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.52, ease: [0.2, 0.8, 0.2, 1] }}
            className="content-grid"
            id="stack"
          >
            <aside className="panel panel--left" id="about">
              <article className="status-report">
                <span className="status-report__title">[ STATUS_REPORT ]</span>
                <p className="status-report__longform">
                  I&apos;m a Computer Science student with a strong passion for Artificial Intelligence,
                  Cybersecurity, and Game Development. When I&apos;m not writing code or building 3D environments,
                  I&apos;m a photographer capturing moments with my Nikon D3500.
                </p>
              </article>

            <section className="stack-matrix">
              <h2 className="section-label">// TOOL_MATRIX</h2>

              {skillSets.map((group) => (
                <article className="stack-group" key={group.label}>
                  <h3>{group.label}</h3>
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
                  <em>Selected_Projects</em>
                </div>
                <div className="selected-output__drive">DRIVE:/PROJECTS/*</div>
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
                      transition={{ duration: 0.44, ease: [0.2, 0.8, 0.2, 1], delay: index * 0.06 }}
                    >
                      <div className="ledger-row__index">[/&gt; {String(index + 1).padStart(2, '0')}]</div>
                      <div className="ledger-row__content">
                        <h4>{project.title}</h4>
                        <p>{project.note}</p>
                        {project.repo && (
                          <a
                            className="visit-link"
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Visit ${project.title} repository`}
                          >
                            VISIT &gt;
                          </a>
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
                transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="render-pipeline__frame">
                  <div className="render-pipeline__header">
                    <span className="render-pipeline__label">[ ASCII_RENDER_PIPELINE ]</span>
                    <span className="render-pipeline__hint">/ unlocks after render</span>
                  </div>
                  <div className="render-pipeline__canvas">
                    <AsciiCpuCanvas />
                  </div>
                </div>
              </motion.section>
            )}
          </motion.section>
        )}
        </AnimatePresence>
      </main>

      <footer className="system-footer" id="contact">
        <div className="system-footer__stats">
          <span>SYS_OS: V2.4.0-STABLE</span>
          <span>|</span>
          <span>CPU: 12%</span>
          <span>|</span>
          <span>RAM: 4.2GB/32GB</span>
          <span>|</span>
          <span>[READY]</span>
          <span>|</span>
          <span>NET_IO: 1.2MB/s</span>
          <span>|</span>
          <span>UPTIME: 14D 03H</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
