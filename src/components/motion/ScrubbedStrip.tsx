'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface ScrubbedStripProps {
  /** Rendered rows. Row A drifts left, row B drifts right. */
  children: React.ReactNode;
  className?: string;
  /** Read out once in place of the two decorative rows. */
  ariaLabel: string;
}

/**
 * Two rows of display type that slide past each other as the section scrolls
 * (Master §5): row A from -5% to -25%, row B from -25% to -5%, scrub .6.
 * Reduced motion leaves them still.
 */
export function ScrubbedStrip({ children, className, ariaLabel }: ScrubbedStripProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { motion } = useMotion();

  useGSAP(
    () => {
      if (motion === 'reduced') return;
      const root = ref.current;
      if (!root) return;

      const rowA = root.querySelector<HTMLElement>('[data-strip-row="a"]');
      const rowB = root.querySelector<HTMLElement>('[data-strip-row="b"]');
      const trigger = { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 };

      if (rowA) gsap.fromTo(rowA, { xPercent: -5 }, { xPercent: -25, ease: 'none', scrollTrigger: trigger });
      if (rowB) gsap.fromTo(rowB, { xPercent: -25 }, { xPercent: -5, ease: 'none', scrollTrigger: trigger });
    },
    { scope: ref, dependencies: [motion] },
  );

  return (
    <div
      ref={ref}
      role="img"
      aria-label={ariaLabel}
      className={cn('full-bleed flex flex-col gap-2 overflow-hidden', className)}
    >
      {/* role="img" above names the strip once; each row is marked
          aria-hidden by its caller, since the words are decoration. */}
      {children}
    </div>
  );
}
