'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  /** -1 … 1. Positive trails the scroll, negative leads it. */
  speed?: number;
  /** Below this width the effect is off (touch keeps native scrolling honest). */
  disabledBelow?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Scrubbed vertical offset (Master §5). Type drifts at .1, an overlapping
 * image at -.15, a sticker at .3.
 */
export function Parallax({ speed = 0.1, disabledBelow = 768, className, children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { motion } = useMotion();

  useGSAP(
    () => {
      if (motion === 'reduced') return;
      const element = ref.current;
      if (!element) return;

      const media = gsap.matchMedia();
      media.add(`(min-width: ${disabledBelow}px)`, () => {
        gsap.fromTo(
          element,
          { yPercent: -speed * 15 },
          {
            yPercent: speed * 15,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });

      return () => media.revert();
    },
    { scope: ref, dependencies: [motion, speed, disabledBelow] },
  );

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
}
