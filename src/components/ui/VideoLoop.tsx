'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface VideoLoopProps {
  src: string;
  poster: string;
  /** Describes the clip, the way alt text describes a still. */
  label: string;
  className?: string;
}

/**
 * A short, silent loop that plays only while it is on screen and only when
 * motion is full. With reduced motion it never plays and the poster stands in
 * — so it is a still image to anyone who asked for less movement.
 */
export function VideoLoop({ src, poster, label, className }: VideoLoopProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { motion } = useMotion();
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  const reduced = motion === 'reduced';

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video || reduced) return;

      // Plays once it is meaningfully in view, and stops the moment it is not.
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            if (pausedRef.current) return;
            void video.play().then(
              () => gsap.to(video, { autoAlpha: 1, duration: 0.45 }),
              () => {
                /* Autoplay can be refused; the poster stays. */
              },
            );
          } else {
            video.pause();
          }
        },
        { threshold: [0, 0.4, 1] },
      );

      observer.observe(video);
      return () => observer.disconnect();
    },
    { scope: ref, dependencies: [reduced] },
  );

  const toggle = useCallback(() => {
    const video = videoRef.current;
    setPaused((current) => {
      const next = !current;
      if (!video) return next;
      if (next) video.pause();
      else void video.play().catch(() => undefined);
      return next;
    });
  }, []);

  return (
    <div ref={ref} className={cn('relative overflow-hidden bg-paper-2', className)}>
      <video
        ref={videoRef}
        src={reduced ? undefined : src}
        poster={poster}
        aria-label={label}
        muted
        playsInline
        loop
        preload="none"
        controls={false}
        className="h-full w-full object-cover"
      />

      {!reduced ? (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          className="t-label absolute right-3 bottom-3 flex h-11 w-11 cursor-pointer items-center justify-center bg-ink/70 text-white backdrop-blur-none"
        >
          <span className="sr-only">{paused ? 'Play' : 'Pause'} this clip</span>
          <span aria-hidden="true">{paused ? '▶' : '❚❚'}</span>
        </button>
      ) : null}
    </div>
  );
}
