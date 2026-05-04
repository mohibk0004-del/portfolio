import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export type NavigationItem = {
  id: number;
  tile: string;
  href?: string;
  onClick?: () => void;
};

export function AnimatedNavigationTabs({
  items,
  themesUnlocked,
  isThemesOpen,
  onThemesToggle,
  activeId,
  themesButtonRef,
}: {
  items: NavigationItem[];
  themesUnlocked: boolean;
  isThemesOpen: boolean;
  onThemesToggle: () => void;
  activeId?: number;
  themesButtonRef?: React.Ref<HTMLButtonElement>;
}) {
  const [active, setActive] = useState<NavigationItem>(items[0]);
  // sync with external activeId (e.g. scroll observer in App)
  React.useEffect(() => {
    if (typeof activeId === 'number') {
      const found = items.find((it) => it.id === activeId);
      if (found) setActive(found);
    }
  }, [activeId, items]);
  const [isHover, setIsHover] = useState<NavigationItem | null>(null);

  const handleItemClick = (item: NavigationItem) => {
    setActive(item);
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div className="nav-tabs relative flex items-center justify-center gap-2">
      <div className="relative">
        <ul className="nav-tabs__list flex items-center justify-center">
          {items.map((item) => (
            <motion.button
              key={item.id}
              className={cn(
                'nav-tabs__item relative duration-300 transition-colors',
                active.id === item.id && 'nav-tabs__item--active'
              )}
              type="button"
              aria-current={active.id === item.id ? 'page' : undefined}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => setIsHover(item)}
              onMouseLeave={() => setIsHover(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {active.id === item.id && (
                <motion.div
                  layoutId="active-tab-outline"
                  className="nav-tabs__outline nav-tabs__outline--active"
                />
              )}
              {isHover?.id === item.id && (
                <motion.div
                  layoutId="hover-tab-outline"
                  className="nav-tabs__outline nav-tabs__outline--hover"
                />
              )}
              <span className="nav-tabs__label">{item.tile}</span>
            </motion.button>
          ))}

          {themesUnlocked && (
            <motion.button
              ref={themesButtonRef}
              className={cn(
                'nav-tabs__item relative duration-300 transition-colors',
                isThemesOpen && 'nav-tabs__item--active'
              )}
              type="button"
              onClick={onThemesToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle themes menu"
              aria-expanded={isThemesOpen}
            >
              {isThemesOpen && (
                <motion.div
                  layoutId="themes-active-outline"
                  className="nav-tabs__outline nav-tabs__outline--active"
                />
              )}
              <span className="nav-tabs__label">Themes</span>
            </motion.button>
          )}
        </ul>
      </div>
    </div>
  );
}
