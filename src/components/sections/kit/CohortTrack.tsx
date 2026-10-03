'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

/**
 * The four cohort steps, as a horizontal track that the page scroll drives on a
 * wide screen and a plain vertical list below 1024px.
 *
 * The track is pinned and translated rather than scrolled, so nothing is
 * scroll-jacked away from a screen reader: the steps stay in DOM order and a
 * skip link jumps past the whole thing.
 */
export function CohortTrack({
  children,
  skipHref,
}: {
  children: React.ReactNode;
  skipHref: string;
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
        const track = root.querySelector<HTMLElement>('[data-track]');
        if (!track) return;

        const distance = () => Math.max(0, track.scrollWidth - root.clientWidth);
        if (distance() === 0) return;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        void document.fonts?.ready.then(() => ScrollTrigger.refresh());
        return () => tween.kill();
      });

      return () => media.revert();
    },
    { scope: ref, dependencies: [motion] },
  );

  return (
    <div ref={ref} className="lg:h-screen lg:overflow-hidden">
      <a href={skipHref} className="sr-only focus-visible:not-sr-only focus-visible:block">
        Skip past the cohort steps
      </a>
      <div
        data-track
        className="flex flex-col gap-12 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-10"
      >
        {children}
      </div>
    </div>
  );
}
