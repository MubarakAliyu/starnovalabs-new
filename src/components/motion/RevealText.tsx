'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { useTransitionReveal } from '@/components/motion/TransitionProvider';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { DUR, EASE, STAGGER } from '@/lib/motion';
import { cn } from '@/lib/utils';

type RevealVariant = 'lines' | 'words' | 'hero';

interface RevealTextProps {
  /** Element to render. Pages own their single h1. */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';
  variant?: RevealVariant;
  /** Extra delay in seconds, on top of the variant's own timing. */
  delay?: number;
  /**
   * Hide this fragment from screen readers. Use it when an ancestor already
   * carries the whole sentence — a multi-line h1, for instance.
   */
  srHidden?: boolean;
  className?: string;
  /** Plain text only — it is split, and kept whole in aria-label. */
  children: string;
}

/**
 * Line-mask reveal (Master §5). The text is in the server HTML and readable
 * without JavaScript; the split only happens once motion has been resolved.
 *
 * Screen readers get the sentence once, from aria-label — the split lines are
 * hidden from them.
 */
export function RevealText({
  as: Tag = 'div',
  variant = 'lines',
  delay = 0,
  srHidden = false,
  className,
  children,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const { motion } = useMotion();
  const { revealed } = useTransitionReveal();
  const isHero = variant === 'hero';

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      // The hero runs off the loader/curtain, not off scroll.
      if (isHero && !revealed) return;

      if (motion === 'reduced') {
        gsap.fromTo(
          element,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: DUR.sm,
            delay,
            ...(isHero
              ? {}
              : { scrollTrigger: { trigger: element, start: 'top 90%', once: true } }),
          },
        );
        return;
      }

      const split = SplitText.create(element, {
        type: variant === 'words' ? 'words' : 'lines',
        mask: variant === 'words' ? 'words' : 'lines',
        autoSplit: true,
        aria: 'hidden',
        linesClass: 'line-mask-pad',
        onSplit(self) {
          const targets = variant === 'words' ? self.words : self.lines;

          if (variant === 'words') {
            return gsap.fromTo(
              targets,
              { yPercent: 100, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: DUR.lg,
                ease: EASE.out,
                stagger: STAGGER.words,
                delay,
                scrollTrigger: { trigger: element, start: 'top 88%', once: true },
              },
            );
          }

          if (isHero) {
            return gsap.fromTo(
              targets,
              { yPercent: 110, rotate: 1.5, transformOrigin: '0% 100%' },
              {
                yPercent: 0,
                rotate: 0,
                duration: DUR.xl,
                ease: EASE.out,
                stagger: 0.1,
                delay,
              },
            );
          }

          return gsap.fromTo(
            targets,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 1,
              ease: EASE.out,
              stagger: STAGGER.lines,
              delay,
              scrollTrigger: { trigger: element, start: 'top 85%', once: true },
            },
          );
        },
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [motion, revealed, variant, delay] },
  );

  return (
    <Tag
      // A single ref type covers every tag this renders.
      ref={ref as React.Ref<never>}
      aria-hidden={srHidden ? 'true' : undefined}
      aria-label={srHidden ? undefined : children}
      className={cn(isHero || variant === 'lines' ? 'line-mask-pad' : undefined, className)}
    >
      {children}
    </Tag>
  );
}
