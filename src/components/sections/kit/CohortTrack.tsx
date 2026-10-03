'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

/**
 * The cohort steps, as a horizontal track that the page scroll drives on a
 * wide screen and a plain vertical list below 1024px.
 *
 * The whole section pins — heading included — and only the track moves, so the
 * steps are never half off the top of the viewport. The track is translated
 * rather than scrolled, so nothing is taken away from a screen reader: the
 * steps stay in DOM order and a skip link jumps past the lot.
 */
export function CohortTrack({
  heading,
  children,
  skipHref,
}: {
  heading: React.ReactNode;
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
        const viewport = root.querySelector<HTMLElement>('[data-viewport]');
        const track = root.querySelector<HTMLElement>('[data-track]');
        if (!viewport || !track) return;

        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
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
        window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });

        return () => tween.kill();
      });

      return () => media.revert();
    },
    { scope: ref, dependencies: [motion] },
  );

  return (
    <div ref={ref} className="lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-10">
      {heading}

      <a
        href={skipHref}
        className="sr-only focus-visible:not-sr-only focus-visible:mb-6 focus-visible:block"
      >
        Skip past the cohort steps
      </a>

      <div data-viewport className="mt-10 lg:overflow-hidden">
        <div
          data-track
          className="flex flex-col gap-12 lg:w-max lg:flex-row lg:items-start lg:gap-10"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
