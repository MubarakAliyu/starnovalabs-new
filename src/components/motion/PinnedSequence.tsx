'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/**
 * Pins a section and steps three panels through it (Master §5): pin +=200%,
 * panels rise from yPercent 20 with a fade, scrub .8 and snap to thirds.
 *
 * Below 1024px, and whenever motion is reduced, nothing is pinned and the
 * panels simply stack. The markup is identical either way, so the panels stay
 * in DOM order and remain readable regardless of scroll position.
 */
export function PinnedSequence({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { motion } = useMotion();

  useGSAP(
    () => {
      if (motion === 'reduced') return;
      const root = ref.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add('(min-width: 1024px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', root);
        if (panels.length === 0) return;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 0.8,
            snap: { snapTo: 1 / (panels.length - 1), duration: 0.3, ease: 'power1.inOut' },
          },
        });

        panels.forEach((panel, index) => {
          if (index === 0) {
            gsap.set(panel, { yPercent: 0, opacity: 1 });
            return;
          }
          // Plain opacity, never autoAlpha: a panel waiting its turn must stay
          // in the accessibility tree.
          timeline.fromTo(
            panel,
            { yPercent: 20, opacity: 0 },
            { yPercent: 0, opacity: 1, ease: 'none' },
            index - 1,
          );
        });

        // Pinned heights depend on the display face, so re-measure once it lands.
        void document.fonts?.ready.then(() => ScrollTrigger.refresh());
      });

      return () => media.revert();
    },
    { scope: ref, dependencies: [motion] },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
