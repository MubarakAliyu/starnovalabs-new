'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { type CurtainHandle, useTransition } from '@/components/motion/TransitionProvider';
import { gsap } from '@/lib/gsap';
import { EASE } from '@/lib/motion';
import { STAR_BLADES, STAR_VIEWBOX } from '@/lib/star';

/**
 * The blue page-transition panel (Master §5). Blue is the colour of moving
 * between places, so the curtain, the loader wipe and the links all share it.
 *
 * It is inert and invisible until the TransitionProvider drives it.
 */
export function Curtain() {
  const panelRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<SVGSVGElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [waiting, setWaiting] = useState(false);
  const { registerCurtain } = useTransition();
  const { motion } = useMotion();
  const motionRef = useRef(motion);
  useEffect(() => {
    motionRef.current = motion;
  }, [motion]);

  const cover = useCallback(
    () =>
      new Promise<void>((resolve) => {
        const root = rootRef.current;
        const panel = panelRef.current;
        const star = starRef.current;
        if (!root || !panel || !star) return resolve();

        root.style.pointerEvents = 'auto';
        root.setAttribute('aria-hidden', 'true');

        if (motionRef.current === 'reduced') {
          gsap.set(panel, { scaleY: 1, transformOrigin: 'bottom center' });
          gsap.fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15, onComplete: resolve });
          gsap.set(star, { autoAlpha: 0 });
          return;
        }

        gsap.set(root, { autoAlpha: 1 });
        const tl = gsap.timeline({ onComplete: resolve });
        tl.fromTo(
          panel,
          { scaleY: 0, transformOrigin: 'bottom center' },
          { scaleY: 1, duration: 0.55, ease: EASE.inOut },
        ).fromTo(
          star,
          { rotate: -45, autoAlpha: 0 },
          { rotate: 0, autoAlpha: 1, duration: 0.3, ease: EASE.snappy },
          0.25,
        );
      }),
    [],
  );

  const reveal = useCallback(
    () =>
      new Promise<void>((resolve) => {
        const root = rootRef.current;
        const panel = panelRef.current;
        const star = starRef.current;

        const done = () => {
          if (root) {
            root.style.pointerEvents = 'none';
            gsap.set(root, { autoAlpha: 0 });
          }
          resolve();
        };

        if (!root || !panel || !star) return done();

        if (motionRef.current === 'reduced') {
          gsap.to(root, { autoAlpha: 0, duration: 0.15, onComplete: done });
          return;
        }

        const tl = gsap.timeline({ onComplete: done });
        tl.to(star, { rotate: 45, autoAlpha: 0, duration: 0.3, ease: EASE.snappy }, 0).to(
          panel,
          { scaleY: 0, transformOrigin: 'top center', duration: 0.6, ease: EASE.inOut },
          0.05,
        );
      }),
    [],
  );

  const showWaiting = useCallback((next: boolean) => setWaiting(next), []);

  useEffect(() => {
    const handle: CurtainHandle = { cover, reveal, showWaiting };
    registerCurtain(handle);
    return () => registerCurtain(null);
  }, [cover, reveal, registerCurtain, showWaiting]);

  useEffect(() => {
    if (!waiting) return;
    // Only shown while a route is genuinely slow.
    const start = performance.now();
    let frame = 0;
    const node = rootRef.current?.querySelector<HTMLElement>('[data-curtain-counter]');
    const tick = () => {
      if (!node) return;
      const elapsed = Math.min(99, Math.round((performance.now() - start) / 40));
      node.textContent = String(elapsed).padStart(3, '0');
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [waiting]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none invisible fixed inset-0 z-[90] opacity-0"
    >
      <div ref={panelRef} className="absolute inset-0 origin-bottom scale-y-0 bg-blue" />
      <div className="absolute inset-0 grid place-items-center">
        <svg
          ref={starRef}
          viewBox={STAR_VIEWBOX}
          className="h-16 w-16 opacity-0 md:h-24 md:w-24"
          fill="none"
          role="presentation"
        >
          {STAR_BLADES.map((d) => (
            <path key={d} d={d} fill="var(--color-white)" />
          ))}
        </svg>
      </div>
      {waiting ? (
        <div className="absolute bottom-6 left-6 t-label text-white/70">
          <span data-curtain-counter>000</span>
        </div>
      ) : null}
    </div>
  );
}
