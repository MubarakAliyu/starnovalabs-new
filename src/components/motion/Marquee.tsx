'use client';

import { useEffect, useRef, useState } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { clamp, cn } from '@/lib/utils';

interface MarqueeProps {
  items: React.ReactNode[];
  /** Seconds per loop. Display type 40, logo walls 60. */
  speed?: number;
  /** Direction follows the scroll, and speed follows its velocity. */
  reactive?: boolean;
  /** Renders a visible Pause motion button. Required on the logo marquee. */
  pausable?: boolean;
  /** Read out once, in full, by screen readers. */
  ariaLabel: string;
  className?: string;
  itemClassName?: string;
}

/**
 * Two identical tracks looping on xPercent (Master §5). Pauses on hover, on
 * focus-within and when off screen; static and wrapping in reduced motion.
 */
export function Marquee({
  items,
  speed = 40,
  reactive = true,
  pausable = false,
  ariaLabel,
  className,
  itemClassName,
}: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const { motion } = useMotion();
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useGSAP(
    () => {
      if (motion === 'reduced') return;
      const root = ref.current;
      if (!root) return;
      const track = root.querySelector<HTMLElement>('[data-marquee-track]');
      if (!track) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });
      tweenRef.current = tween;

      const visibility = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          if (self.isActive && !pausedRef.current) tween.play();
          else tween.pause();
        },
      });

      let settle: gsap.core.Tween | null = null;
      const reactTo = reactive
        ? ScrollTrigger.create({
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
              if (pausedRef.current) return;
              const direction = self.direction === -1 ? -1 : 1;
              const velocity = Math.abs(self.getVelocity());
              tween.timeScale(direction * clamp(1 + velocity / 600, 1, 4));
              settle?.kill();
              settle = gsap.to(tween, {
                timeScale: direction,
                duration: 0.8,
                ease: 'power3.out',
                overwrite: true,
              });
            },
          })
        : null;

      const pause = () => tween.pause();
      const resume = () => {
        if (!pausedRef.current && visibility.isActive) tween.play();
      };

      root.addEventListener('pointerenter', pause);
      root.addEventListener('pointerleave', resume);
      root.addEventListener('focusin', pause);
      root.addEventListener('focusout', resume);

      return () => {
        root.removeEventListener('pointerenter', pause);
        root.removeEventListener('pointerleave', resume);
        root.removeEventListener('focusin', pause);
        root.removeEventListener('focusout', resume);
        settle?.kill();
        reactTo?.kill();
        visibility.kill();
        tween.kill();
        tweenRef.current = null;
      };
    },
    { scope: ref, dependencies: [motion, speed, reactive] },
  );

  const togglePaused = () => {
    setPaused((current) => {
      const next = !current;
      if (next) tweenRef.current?.pause();
      else tweenRef.current?.play();
      return next;
    });
  };

  const track = (
    <div className={cn('flex shrink-0 items-center', itemClassName)}>
      {items.map((item, index) => (
        <span key={index} className="flex shrink-0 items-center">
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn('relative', className)}>
      <div
        ref={ref}
        // Announced once from the label; the looping tracks stay silent.
        role="img"
        aria-label={ariaLabel}
        className={cn(
          'flex overflow-hidden',
          motion === 'reduced' ? 'flex-wrap' : 'flex-nowrap whitespace-nowrap',
        )}
      >
        <div className="flex shrink-0" data-marquee-track>
          {track}
          {/* The duplicate exists only to make the loop seamless. */}
          <div aria-hidden="true" className="flex shrink-0">
            {track}
          </div>
        </div>
      </div>

      {pausable && motion === 'full' ? (
        <button
          type="button"
          onClick={togglePaused}
          aria-pressed={paused}
          className="t-label text-body absolute right-0 bottom-0 min-h-11 cursor-pointer px-3 py-2 underline-offset-4 hover:underline"
        >
          {paused ? 'Play motion' : 'Pause motion'}
        </button>
      ) : null}
    </div>
  );
}
