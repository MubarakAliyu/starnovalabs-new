'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface StickerPopProps {
  /** Seconds after the headline it belongs to. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/** Pops a Sticker into place (Master §5) — scale and rotation, never opacity alone. */
export function StickerPop({ delay = 0.35, className, children }: StickerPopProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { motion } = useMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const sticker = root.querySelector<HTMLElement>('[data-sticker]') ?? root;
      const rotate =
        parseFloat(getComputedStyle(sticker).getPropertyValue('--sticker-rotate')) || 0;

      if (motion === 'reduced') {
        gsap.fromTo(
          sticker,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.2,
            delay,
            scrollTrigger: { trigger: root, start: 'top 90%', once: true },
          },
        );
        return;
      }

      gsap.fromTo(
        sticker,
        { scale: 0.6, rotate: rotate - 12, autoAlpha: 0 },
        {
          scale: 1,
          rotate,
          autoAlpha: 1,
          duration: 0.6,
          ease: 'back.out(2)',
          delay,
          scrollTrigger: { trigger: root, start: 'top 90%', once: true },
        },
      );
    },
    { scope: ref, dependencies: [motion, delay] },
  );

  return (
    <span ref={ref} className={cn('inline-block', className)}>
      {children}
    </span>
  );
}
