'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { useTransition } from '@/components/motion/TransitionProvider';
import { gsap, useGSAP } from '@/lib/gsap';
import { EASE, INTRO_STORAGE_KEY, LOADER } from '@/lib/motion';
import { STAR_BLADE_ORIGINS } from '@/lib/star';

declare global {
  interface Window {
    /** Set by pages that own a hero image, so readiness means something real. */
    __snlHeroReady?: Promise<unknown>;
  }
}

function introAlreadyPlayed() {
  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) === 'done';
  } catch {
    return false;
  }
}

function markIntroPlayed() {
  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, 'done');
  } catch {
    /* Private mode: the intro simply plays again next time. */
  }
}

function fontsReady(): Promise<unknown> {
  return typeof document !== 'undefined' && 'fonts' in document
    ? document.fonts.ready
    : Promise.resolve();
}

/**
 * Drives the Ignition timeline, or takes the overlay away at once when it
 * should not play. Kept apart from the server-rendered markup so this file is
 * the only JavaScript the loader costs.
 */
export function LoaderController() {
  const { motion } = useMotion();
  const { signalReveal, claimFirstReveal } = useTransition();
  const ranRef = useRef(false);

  useGSAP(
    () => {
      if (ranRef.current) return;
      ranRef.current = true;

      const overlay = document.getElementById('snl-loader');
      const root = document.documentElement;

      const finish = () => {
        root.dataset.intro = 'done';
        if (overlay) overlay.style.display = 'none';
      };

      // Reduced motion, or a view we have already greeted this session.
      if (motion === 'reduced' || introAlreadyPlayed() || !overlay) {
        markIntroPlayed();
        finish();
        signalReveal();
        return;
      }

      claimFirstReveal();
      markIntroPlayed();

      const q = gsap.utils.selector(overlay);
      const blades = q('[data-loader-blade]');
      const tracks = q('[data-loader-track]');
      const rows = overlay.querySelector<HTMLElement>('[data-loader-rows]');
      const star = overlay.querySelector<HTMLElement>('[data-loader-star]');
      const counter = overlay.querySelector<HTMLElement>('[data-loader-counter]');
      const progress = overlay.querySelector<HTMLElement>('[data-loader-progress]');
      const wipe = overlay.querySelector<HTMLElement>('[data-loader-wipe]');

      // Scroll stays locked for as long as the overlay is up.
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const startedAt = performance.now();
      const real = { fonts: 0, hero: 0 };
      const creepState = { value: 0 };
      let shown = 0;

      const render = () => {
        const measured = real.fonts * 50 + real.hero * 50;
        // Monotonic, and it never quite arrives before we are actually ready.
        shown = Math.max(shown, Math.min(99, Math.max(creepState.value, measured)));
        if (counter) counter.textContent = String(Math.round(shown)).padStart(3, '0');
        if (progress) gsap.set(progress, { scaleX: shown / 100 });
      };

      // Readiness is real: fonts are half of it, the hero image the other half.
      const heroReady = window.__snlHeroReady;
      if (!heroReady) real.hero = 1;

      void fontsReady().then(() => {
        real.fonts = 1;
        render();
      });
      void heroReady
        ?.then(() => {
          real.hero = 1;
          render();
        })
        .catch(() => {
          real.hero = 1;
          render();
        });

      // Creep forward while we wait, so the counter always feels alive.
      const creep = gsap.to(creepState, {
        value: 92,
        duration: LOADER.target / 1000,
        ease: 'power1.out',
        onUpdate: render,
      });

      const intro = gsap.timeline();
      intro.to(rows, { autoAlpha: 0.12, duration: 0.3, ease: 'none' }, 0).fromTo(
        blades,
        {
          x: (i: number) => (STAR_BLADE_ORIGINS[i % 4].x / 100) * window.innerWidth,
          y: (i: number) => (STAR_BLADE_ORIGINS[i % 4].y / 100) * window.innerHeight,
          rotate: (i: number) => STAR_BLADE_ORIGINS[i % 4].rotate,
          autoAlpha: 0,
          transformOrigin: '50% 50%',
        },
        {
          x: 0,
          y: 0,
          rotate: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: EASE.out,
          stagger: 0.07,
        },
        0.1,
      );

      // The roll-call rows drift in alternate directions, 60s a loop.
      const marquees = tracks.map((track, index) => {
        const forward = index % 2 === 0;
        gsap.set(track, { xPercent: forward ? 0 : -50 });
        return gsap.to(track, {
          xPercent: forward ? -50 : 0,
          duration: 60,
          ease: 'none',
          repeat: -1,
        });
      });

      let exited = false;
      const exit = () => {
        if (exited) return;
        exited = true;

        creep.kill();
        shown = 100;
        if (counter) counter.textContent = '100';
        if (progress) gsap.set(progress, { scaleX: 1 });

        const out = gsap.timeline({
          onComplete: () => {
            marquees.forEach((tween) => tween.kill());
            document.body.style.overflow = previousOverflow;
            finish();
          },
        });

        out
          .to(star, { rotate: 45, duration: 0.4, ease: EASE.snappy }, 0)
          .fromTo(
            wipe,
            { scaleY: 0, transformOrigin: 'bottom center' },
            { scaleY: 1, duration: 0.5, ease: EASE.inOut },
            0.4,
          )
          .to([wipe, overlay], { yPercent: -100, duration: 0.6, ease: EASE.inOut }, 0.7)
          // The hero entrance starts 200ms before the overlay has finished leaving.
          .add(() => signalReveal(), 1.1);
      };

      // Leave once everything is ready, never before the floor, never after the cap.
      void Promise.all([fontsReady(), heroReady?.catch(() => undefined)]).then(() => {
        const elapsed = performance.now() - startedAt;
        gsap.delayedCall(Math.max(0, LOADER.min - elapsed) / 1000, exit);
      });
      const cap = gsap.delayedCall(LOADER.cap / 1000, exit);

      return () => {
        cap.kill();
        creep.kill();
        intro.kill();
        marquees.forEach((tween) => tween.kill());
        document.body.style.overflow = previousOverflow;
      };
    },
    { dependencies: [] },
  );

  return null;
}
