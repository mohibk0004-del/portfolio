import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import { Check, Loader2, Lock, SendHorizontal, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const DRAG_CONSTRAINTS = { left: 0, right: 130 };
const DRAG_THRESHOLD = 0.9;

const ANIMATION_CONFIG = {
  spring: { type: 'spring' as const, stiffness: 400, damping: 40, mass: 0.8 },
};

type SlideButtonProps = {
  href?: string;
  inDev?: boolean;
  ariaLabel?: string;
  className?: string;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

const StatusIcon = ({ status }: { status: Status }) => {
  if (status === 'loading') return <Loader2 className="animate-spin" size={18} />;
  if (status === 'success') return <Check size={18} />;
  if (status === 'error') return <Lock size={18} />;
  return <X size={18} />;
};

export function SlideButton({ href, inDev = false, ariaLabel, className }: SlideButtonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const dragHandleRef = useRef<HTMLDivElement | null>(null);
  const timersRef = useRef<number[]>([]);

  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, ANIMATION_CONFIG.spring);
  const dragProgress = useTransform(springX, [0, DRAG_CONSTRAINTS.right], [0, 1]);
  const adjustedWidth = useTransform(springX, (x) => x + 36);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  const finalize = useCallback(() => {
    setCompleted(true);
    setStatus('loading');

    const t1 = window.setTimeout(() => {
      if (inDev) {
        setStatus('error');
      } else {
        setStatus('success');
        if (href) window.open(href, '_blank', 'noopener,noreferrer');
      }
    }, 600);

    const t2 = window.setTimeout(() => {
      dragX.set(0);
    }, 1500);

    const t3 = window.setTimeout(() => {
      setCompleted(false);
      setStatus('idle');
      setIsDragging(false);
    }, 1900);

    timersRef.current.push(t1, t2, t3);
  }, [inDev, href, dragX]);

  const handleDragStart = useCallback(() => {
    if (completed) return;
    setIsDragging(true);
  }, [completed]);

  const handleDragEnd = () => {
    if (completed) return;
    setIsDragging(false);
    if (dragProgress.get() >= DRAG_THRESHOLD) {
      finalize();
    } else {
      dragX.set(0);
    }
  };

  const handleDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (completed) return;
    const newX = Math.max(0, Math.min(info.offset.x, DRAG_CONSTRAINTS.right));
    dragX.set(newX);
  };

  const errorMode = completed && status === 'error';

  return (
    <motion.div
      animate={{ width: completed ? '7rem' : '11rem' }}
      transition={ANIMATION_CONFIG.spring}
      className={cn(
        'slide-btn relative flex h-9 select-none items-center justify-center rounded-full',
        errorMode && 'slide-btn--error',
        completed && status === 'success' && 'slide-btn--success',
        className,
      )}
      role="button"
      aria-label={ariaLabel ?? (inDev ? 'Project in development' : 'Visit project')}
    >
      {!completed && (
        <motion.div
          style={{ width: adjustedWidth }}
          className="slide-btn__fill absolute inset-y-0 left-0 z-0 rounded-full"
        />
      )}

      <span
        className={cn(
          'slide-btn__hint pointer-events-none absolute inset-0 flex items-center justify-center pr-2 pl-10 font-mono text-[0.62rem] uppercase tracking-[0.18em]',
          completed && 'opacity-0',
        )}
      >
        {inDev ? 'Locked / in dev' : 'Slide to visit'}
      </span>

      <AnimatePresence>
        {!completed && (
          <motion.div
            ref={dragHandleRef}
            drag="x"
            dragConstraints={DRAG_CONSTRAINTS}
            dragElastic={0.05}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrag={handleDrag}
            style={{ x: springX }}
            className="absolute -left-1 z-10 flex cursor-grab items-center justify-start active:cursor-grabbing"
          >
            <button
              type="button"
              tabIndex={-1}
              className={cn(
                'slide-btn__handle flex h-9 w-9 items-center justify-center rounded-full',
                isDragging && 'scale-105 transition-transform',
              )}
              aria-hidden="true"
            >
              <SendHorizontal size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {completed && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="slide-btn__result flex h-full w-full items-center justify-center rounded-full">
              <StatusIcon status={status} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
