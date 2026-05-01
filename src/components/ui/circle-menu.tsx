import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const CONSTANTS = {
  itemSize: 36,
  containerSize: 140,
  openStagger: 0.02,
  closeStagger: 0.07,
};

export type CircleMenuItem = {
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
};

const pointOnCircle = (i: number, n: number, r: number, cx = 0, cy = 0) => {
  const theta = (2 * Math.PI * i) / n - Math.PI / 2;
  const x = cx + r * Math.cos(theta);
  const y = cy + r * Math.sin(theta);
  return { x, y };
};

interface MenuItemProps {
  item: CircleMenuItem;
  index: number;
  totalItems: number;
  isOpen: boolean;
  onActivate: () => void;
}

const MenuItem = ({ item, index, totalItems, isOpen, onActivate }: MenuItemProps) => {
  const { x, y } = pointOnCircle(index, totalItems, CONSTANTS.containerSize / 2);
  const [hovering, setHovering] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (!isOpen) {
      e.preventDefault();
      return;
    }
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    }
    onActivate();
  };

  const sharedAnimate = {
    animate: { x: isOpen ? x : 0, y: isOpen ? y : 0, opacity: isOpen ? 1 : 0 },
    whileHover: { scale: 1.1, transition: { duration: 0.1, delay: 0 } },
    transition: {
      delay: isOpen ? index * CONSTANTS.openStagger : index * CONSTANTS.closeStagger,
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
    style: {
      height: CONSTANTS.itemSize - 2,
      width: CONSTANTS.itemSize - 2,
      pointerEvents: (isOpen ? 'auto' : 'none') as 'auto' | 'none',
    },
    className: 'circle-menu__item',
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
    onClick: handleClick,
    'aria-label': item.label,
    tabIndex: isOpen ? 0 : -1,
  };

  const inner = (
    <>
      {item.icon}
      <AnimatePresence>
        {hovering && isOpen && (
          <motion.span
            className="circle-menu__label"
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );

  if (item.href && !item.onClick) {
    return (
      <motion.a href={item.href} {...sharedAnimate}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" {...sharedAnimate}>
      {inner}
    </motion.button>
  );
};

interface MenuTriggerProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  itemsLength: number;
  closeAnimationCallback: () => void;
  openIcon?: ReactNode;
  closeIcon?: ReactNode;
}

const MenuTrigger = ({
  setIsOpen,
  isOpen,
  itemsLength,
  closeAnimationCallback,
  openIcon,
  closeIcon,
}: MenuTriggerProps) => {
  const animate = useAnimationControls();
  const shakeAnimation = useAnimationControls();

  const scaleTransition = Array.from({ length: itemsLength - 1 })
    .map((_, index) => index + 1)
    .reduce((acc, _, index) => {
      const increasedValue = index * 0.15;
      acc.push(1 + increasedValue);
      return acc;
    }, [] as number[]);

  const closeAnimation = async () => {
    shakeAnimation.start({
      translateX: [0, 2, -2, 0, 2, -2, 0],
      transition: {
        duration: CONSTANTS.closeStagger,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
    for (let i = 0; i < scaleTransition.length; i++) {
      await animate.start({
        height: Math.min(
          CONSTANTS.itemSize * scaleTransition[i],
          CONSTANTS.itemSize + CONSTANTS.itemSize / 2,
        ),
        width: Math.min(
          CONSTANTS.itemSize * scaleTransition[i],
          CONSTANTS.itemSize + CONSTANTS.itemSize / 2,
        ),
        backgroundColor: `color-mix(in srgb, var(--text) ${Math.max(
          100 - i * 10,
          40,
        )}%, var(--bg))`,
        transition: { duration: CONSTANTS.closeStagger / 2, ease: 'linear' },
      });
      if (i !== scaleTransition.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, CONSTANTS.closeStagger * 1000));
      }
    }

    shakeAnimation.stop();
    shakeAnimation.start({ translateX: 0, transition: { duration: 0 } });

    animate.start({
      height: CONSTANTS.itemSize,
      width: CONSTANTS.itemSize,
      backgroundColor: 'var(--text)',
      transition: { duration: 0.1, ease: 'backInOut' },
    });
  };

  return (
    <motion.div animate={shakeAnimation} className="circle-menu__trigger-wrap">
      <motion.button
        type="button"
        animate={animate}
        style={{ height: CONSTANTS.itemSize, width: CONSTANTS.itemSize }}
        className={cn('circle-menu__trigger', isOpen && 'circle-menu__trigger--active')}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
            closeAnimationCallback();
            closeAnimation();
          } else {
            setIsOpen(true);
          }
        }}
      >
        <AnimatePresence mode="popLayout">
          {isOpen ? (
            <motion.span
              key="menu-close"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.2 }}
              className="circle-menu__icon"
            >
              {closeIcon}
            </motion.span>
          ) : (
            <motion.span
              key="menu-open"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.2 }}
              className="circle-menu__icon"
            >
              {openIcon}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export const CircleMenu = ({
  items,
  openIcon = <Menu size={18} />,
  closeIcon = <X size={18} />,
  className,
}: {
  items: CircleMenuItem[];
  openIcon?: ReactNode;
  closeIcon?: ReactNode;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const animate = useAnimationControls();

  const closeAnimationCallback = async () => {
    await animate.start({
      rotate: -360,
      filter: 'blur(1px)',
      transition: {
        duration: CONSTANTS.closeStagger * (items.length + 2),
        ease: 'linear',
      },
    });
    await animate.start({
      rotate: 0,
      filter: 'blur(0px)',
      transition: { duration: 0 },
    });
  };

  return (
    <div
      style={{ width: CONSTANTS.containerSize, height: CONSTANTS.containerSize }}
      className={cn('circle-menu', className)}
    >
      <MenuTrigger
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        itemsLength={items.length}
        closeAnimationCallback={closeAnimationCallback}
        openIcon={openIcon}
        closeIcon={closeIcon}
      />
      <motion.div animate={animate} className="circle-menu__orbit">
        {items.map((item, index) => (
          <MenuItem
            key={`${item.label}-${index}`}
            item={item}
            index={index}
            totalItems={items.length}
            isOpen={isOpen}
            onActivate={() => {
              setIsOpen(false);
              closeAnimationCallback();
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
