import { motion } from 'framer-motion';
import { useState } from 'react';
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
}: {
  items: NavigationItem[];
  themesUnlocked: boolean;
  isThemesOpen: boolean;
  onThemesToggle: () => void;
}) {
  const [active, setActive] = useState<NavigationItem>(items[0]);
  const [isHover, setIsHover] = useState<NavigationItem | null>(null);

  const handleItemClick = (item: NavigationItem) => {
    setActive(item);
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div className="relative flex items-center justify-center gap-2">
      <div className="relative">
        <ul className="flex items-center justify-center">
          {items.map((item) => (
            <motion.button
              key={item.id}
              className={cn(
                'py-2 relative duration-300 transition-colors hover:text-foreground',
                active.id === item.id ? 'text-foreground' : 'text-muted'
              )}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => setIsHover(item)}
              onMouseLeave={() => setIsHover(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="px-5 py-2 relative">
                {item.tile}
                {isHover?.id === item.id && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute bottom-0 left-0 right-0 h-full w-full bg-[color-mix(in_srgb,var(--text)_10%,transparent)]"
                    style={{
                      borderRadius: 6,
                    }}
                  />
                )}
              </div>
              {active.id === item.id && (
                <motion.div
                  layoutId="active"
                  className="absolute bottom-0 left-0 right-0 h-0.5 w-full bg-foreground"
                />
              )}
              {isHover?.id === item.id && (
                <motion.div
                  layoutId="hover"
                  className="absolute bottom-0 left-0 right-0 h-0.5 w-full bg-foreground"
                />
              )}
            </motion.button>
          ))}

          {themesUnlocked && (
            <motion.button
              className={cn(
                'py-2 relative duration-300 transition-colors hover:text-foreground',
                isThemesOpen ? 'text-foreground' : 'text-muted'
              )}
              onClick={onThemesToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle themes menu"
              aria-expanded={isThemesOpen}
            >
              <div className="px-5 py-2 relative">Themes</div>
              {isThemesOpen && (
                <motion.div
                  layoutId="themes-active"
                  className="absolute bottom-0 left-0 right-0 h-0.5 w-full bg-foreground"
                />
              )}
            </motion.button>
          )}
        </ul>
      </div>
    </div>
  );
}
