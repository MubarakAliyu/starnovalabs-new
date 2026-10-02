'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/**
 * Pins a section and steps panels through it, one at a time.
 *
 * Each step gets a viewport of scroll. The outgoing panel leaves in the first
 * half of a step and the incoming one arrives in the second, so the two never
 * occupy the slot together — the earlier version faded panels in without ever
 * fading them out, which stacked all three on top of each other.
 *
 * Below 1024px, and whenever motion is reduced, nothing is pinned and the
 * panels simply stack. The markup is identical either way, so the panels stay
 * in DOM order and remain readable regardless of scroll.
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
        const steps = gsap.utils.toArray<HTMLElement>('[data-step]', root);
        if (panels.length === 0) return;

        const last = panels.length - 1;

        const setActiveStep = (index: number) => {
          steps.forEach((step, i) => {
            step.dataset.active = String(i === index);
          });
        };

        gsap.set(panels, { opacity: 0, yPercent: 12 });
        gsap.set(panels[0]!, { opacity: 1, yPercent: 0 });
        setActiveStep(0);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            // A viewport of scroll per step, and pinSpacing keeps whatever
            // follows from riding up over the pin.
            end: `+=${last * 100 + 100}%`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            snap: { snapTo: 1 / last, duration: 0.3, ease: 'power1.inOut' },
            onUpdate: (self) => {
              setActiveStep(Math.round(self.progress * last));
            },
          },
        });

        panels.forEach((panel, index) => {
          if (index === 0) return;
          const at = index - 1;
          // Out, then in — never both at once.
          timeline
            .to(panels[index - 1]!, { opacity: 0, yPercent: -12, ease: 'none' }, at)
            .fromTo(
              panel,
              { opacity: 0, yPercent: 12 },
              { opacity: 1, yPercent: 0, ease: 'none' },
              at + 0.5,
            );
        });

        const progress = root.querySelector<HTMLElement>('[data-sequence-progress]');
        if (progress) {
          timeline.fromTo(
            progress,
            { width: '0%' },
            { width: '100%', ease: 'none', duration: last },
            0,
          );
        }

        // Pinned heights depend on the display face and the media, so
        // re-measure once both have landed.
        void document.fonts?.ready.then(() => ScrollTrigger.refresh());
        window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
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
