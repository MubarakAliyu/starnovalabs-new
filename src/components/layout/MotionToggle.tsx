'use client';

import { useMotion } from '@/components/motion/MotionProvider';
import { cn } from '@/lib/utils';

/**
 * The footer switch. It overrides the OS setting in both directions and is
 * remembered in localStorage (Master §5).
 */
export function MotionToggle({ className }: { className?: string }) {
  const { motion, toggleMotion } = useMotion();
  const full = motion === 'full';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={full}
      onClick={toggleMotion}
      className={cn(
        't-label text-paper/70 flex min-h-11 cursor-pointer items-center gap-3 hover:text-white',
        className,
      )}
    >
      <span>Motion: {full ? 'On' : 'Reduced'}</span>
      <span
        aria-hidden="true"
        className={cn(
          'relative block h-5 w-9 rounded-full border transition-colors duration-200',
          full ? 'border-blue-lit bg-blue-lit/30' : 'border-paper/40 bg-transparent',
        )}
      >
        <span
          className={cn(
            'absolute top-1/2 block h-3 w-3 -translate-y-1/2 rounded-full transition-all duration-200',
            full ? 'bg-blue-lit left-[calc(100%-0.875rem)]' : 'bg-paper/60 left-1',
          )}
        />
      </span>
    </button>
  );
}
