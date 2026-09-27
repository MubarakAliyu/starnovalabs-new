'use client';

import type Lenis from 'lenis';
import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Lenis smooth scroll, driven by the GSAP ticker so scroll-linked animations
 * and the scroll position never disagree. Off entirely in reduced motion, and
 * off on touch (syncTouch:false keeps native momentum scrolling).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { motion } = useMotion();

  // ReactLenis with root renders no wrapper element, so switching it off
  // changes no DOM — the server HTML and the hydrated tree still match.
  if (motion === 'reduced') return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, smoothWheel: true, syncTouch: false, autoRaf: false }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}

/** Hands Lenis's rAF to GSAP's ticker and keeps ScrollTrigger in step. */
function LenisGsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on('scroll', onScroll);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [lenis]);

  return null;
}

/**
 * Lenis or null — safe to call from components that also render when smooth
 * scrolling is switched off.
 */
export function useLenisSafe(): Lenis | null {
  return useLenis() ?? null;
}

/**
 * Locks page scrolling while an overlay is open. Stops Lenis when it is
 * running and pins the body either way, so touch devices are covered too.
 */
export function useScrollLock(locked: boolean) {
  const lenis = useLenisSafe();
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    scrollYRef.current = window.scrollY;

    lenis?.stop();

    const previous = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      lenis?.start();
    };
  }, [locked, lenis]);
}
