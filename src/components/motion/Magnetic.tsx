'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, useGSAP } from '@/lib/gsap';
import { EASE } from '@/lib/motion';

interface MagneticProps {
  /** Fraction of the pointer offset the element travels. */
  strength?: number;
  /** Maximum travel in pixels. */
  max?: number;
  /** The inner label trails at a smaller fraction. */
  labelStrength?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Leans a control toward the pointer (Master §5). Fine pointers with real
 * hover only — never on touch, never in reduced motion.
 */
export function Magnetic({
  strength = 0.35,
  max = 14,
  labelStrength = 0.15,
  className,
  children,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { motion } = useMotion();

  useGSAP(
    () => {
      if (motion === 'reduced') return;
      const element = ref.current;
      if (!element) return;

      const media = gsap.matchMedia();

      media.add('(hover: hover) and (pointer: fine)', () => {
        const target = element.firstElementChild as HTMLElement | null;
        if (!target) return;
        const label = target.querySelector<HTMLElement>('[data-magnetic-label]');

        const toX = gsap.quickTo(target, 'x', { duration: 0.45, ease: EASE.snappy });
        const toY = gsap.quickTo(target, 'y', { duration: 0.45, ease: EASE.snappy });
        const labelX = label
          ? gsap.quickTo(label, 'x', { duration: 0.45, ease: EASE.snappy })
          : null;
        const labelY = label
          ? gsap.quickTo(label, 'y', { duration: 0.45, ease: EASE.snappy })
          : null;

        const onMove = (event: PointerEvent) => {
          const bounds = target.getBoundingClientRect();
          const withinX = event.clientX >= bounds.left - 24 && event.clientX <= bounds.right + 24;
          const withinY = event.clientY >= bounds.top - 24 && event.clientY <= bounds.bottom + 24;
          if (!withinX || !withinY) return;

          const offsetX = event.clientX - (bounds.left + bounds.width / 2);
          const offsetY = event.clientY - (bounds.top + bounds.height / 2);
          const x = gsap.utils.clamp(-max, max, offsetX * strength);
          const y = gsap.utils.clamp(-max, max, offsetY * strength);

          toX(x);
          toY(y);
          labelX?.(offsetX * labelStrength);
          labelY?.(offsetY * labelStrength);
        };

        const onLeave = () => {
          gsap.to(target, { x: 0, y: 0, duration: 0.9, ease: EASE.spring });
          if (label) gsap.to(label, { x: 0, y: 0, duration: 0.9, ease: EASE.spring });
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        element.addEventListener('pointerleave', onLeave);

        return () => {
          window.removeEventListener('pointermove', onMove);
          element.removeEventListener('pointerleave', onLeave);
        };
      });

      return () => media.revert();
    },
    { scope: ref, dependencies: [motion, strength, max, labelStrength] },
  );

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
