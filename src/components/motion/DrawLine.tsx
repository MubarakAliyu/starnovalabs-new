'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/**
 * A vertical rule that draws itself as the section scrolls past. Decorative,
 * so it is hidden from screen readers and simply shows at full height when
 * motion is reduced.
 */
export function DrawLine({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { motion } = useMotion();

  useGSAP(
    () => {
      const line = ref.current;
      if (!line) return;
      if (motion === 'reduced') {
        gsap.set(line, { scaleY: 1 });
        return;
      }

      const container = line.parentElement ?? line;
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
            end: 'bottom 70%',
            scrub: true,
          },
        },
      );
    },
    { dependencies: [motion] },
  );

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn('block w-px origin-top bg-line', className)}
      style={{ transform: 'scaleY(0)' }}
    />
  );
}
