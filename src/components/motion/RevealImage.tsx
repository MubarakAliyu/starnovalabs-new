'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, useGSAP } from '@/lib/gsap';
import { DUR, EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';

type RevealImageVariant = 'up' | 'left' | 'center';

const CLIP_FROM: Record<RevealImageVariant, string> = {
  up: 'inset(100% 0 0 0)',
  left: 'inset(0 100% 0 0)',
  center: 'inset(50%)',
};

interface RevealImageProps {
  variant?: RevealImageVariant;
  className?: string;
  /** An next/image, an img, or any composed graphic. */
  children: React.ReactNode;
}

/**
 * Clip-and-scale reveal (Master §5). The clip is only applied by JavaScript
 * once motion is resolved, so the image is visible without it.
 */
export function RevealImage({ variant = 'up', className, children }: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { motion } = useMotion();

  useGSAP(
    () => {
      const wrapper = ref.current;
      if (!wrapper) return;
      const inner = wrapper.firstElementChild;

      if (motion === 'reduced') {
        gsap.fromTo(
          wrapper,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: DUR.sm,
            scrollTrigger: { trigger: wrapper, start: 'top 85%', once: true },
          },
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapper, start: 'top 80%', once: true },
      });

      tl.fromTo(
        wrapper,
        { clipPath: CLIP_FROM[variant] },
        { clipPath: 'inset(0%)', duration: DUR.xl, ease: EASE.inOut },
      );

      if (inner) {
        tl.fromTo(inner, { scale: 1.25 }, { scale: 1, duration: DUR.xl, ease: EASE.out }, 0);
      }
    },
    { scope: ref, dependencies: [motion, variant] },
  );

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      {children}
    </div>
  );
}
