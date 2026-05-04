import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export type MacMenuItem = {
  id: number;
  label: string;
  onClick?: () => void;
};

export type MacThemeOption = {
  key: string;
  label: string;
};

type MacOSMenuBarProps = {
  name: string;
  items: MacMenuItem[];
  activeId?: number;
  isThemesOpen: boolean;
  onThemesToggle: () => void;
  onThemesClose: () => void;
  activeTheme: string;
  themeOptions: MacThemeOption[];
  onThemeSelect: (theme: string) => void;
  rightSlot?: React.ReactNode;
};

export default function MacOSMenuBar({
  name,
  items,
  activeId,
  isThemesOpen,
  onThemesToggle,
  onThemesClose,
  activeTheme,
  themeOptions,
  onThemeSelect,
  rightSlot,
}: MacOSMenuBarProps) {
  const [currentTime, setCurrentTime] = useState('');
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 60000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isThemesOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!barRef.current?.contains(event.target as Node)) {
        onThemesClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onThemesClose();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isThemesOpen, onThemesClose]);

  return (
    <div className="mac-menu-bar" ref={barRef}>
      <div className="mac-menu-bar__menus">
        <div className="mac-menu-bar__left">
          <span className="mac-menu-bar__mark" aria-hidden="true">M</span>
          <span className="mac-menu-bar__name">{name}</span>
        </div>

        <nav className="mac-menu-bar__nav" aria-label="Primary navigation">
          {items.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              className={`mac-menu-bar__item${activeId === item.id ? ' mac-menu-bar__item--active' : ''}`}
              onClick={item.onClick}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              aria-current={activeId === item.id ? 'page' : undefined}
            >
              {item.label}
            </motion.button>
          ))}

          <div className="mac-menu-bar__theme-wrap">
            <motion.button
              type="button"
              className={`mac-menu-bar__item mac-menu-bar__item--themes${isThemesOpen ? ' mac-menu-bar__item--active' : ''}`}
              onClick={onThemesToggle}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Toggle themes menu"
              aria-expanded={isThemesOpen}
            >
              themes
            </motion.button>

            {isThemesOpen && (
              <motion.div
                className="mac-menu-dropdown"
                role="menu"
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
              >
                {themeOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    role="menuitemradio"
                    aria-checked={activeTheme === option.key}
                    className={`mac-menu-dropdown__item${activeTheme === option.key ? ' mac-menu-dropdown__item--active' : ''}`}
                    onClick={() => onThemeSelect(option.key)}
                  >
                    <span className={`theme-menu__swatch theme-menu__swatch--${option.key}`} aria-hidden="true" />
                    <span>{option.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </nav>
      </div>

      <div className="mac-menu-bar__right">
        {rightSlot}
        <span className="mac-menu-bar__clock">{currentTime}</span>
      </div>
    </div>
  );
}
