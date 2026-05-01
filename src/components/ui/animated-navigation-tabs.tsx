import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from '../../lib/utils';
import { Moon, Sun } from "lucide-react";

export type NavigationItem = {
  id: number;
  tile: string;
  href?: string;
  onClick?: () => void;
};

export function AnimatedNavigationTabs({
  items,
  onThemeToggle,
  isDark,
}: {
  items: NavigationItem[];
  onThemeToggle: () => void;
  isDark: boolean;
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
                "py-2 relative duration-300 transition-colors hover:!text-primary",
                active.id === item.id ? "text-primary" : "text-muted-foreground"
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
                    className="absolute bottom-0 left-0 right-0 w-full h-full bg-primary/10"
                    style={{
                      borderRadius: 6,
                    }}
                  />
                )}
              </div>
              {active.id === item.id && (
                <motion.div
                  layoutId="active"
                  className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
                />
              )}
              {isHover?.id === item.id && (
                <motion.div
                  layoutId="hover"
                  className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
                />
              )}
            </motion.button>
          ))}
        </ul>
      </div>

      {/* Dark Mode Toggle */}
      <motion.button
        className="ml-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
        onClick={onThemeToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <Sun size={18} className="text-primary" />
        ) : (
          <Moon size={18} className="text-primary" />
        )}
      </motion.button>
    </div>
  );
}
