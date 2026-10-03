'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, useGSAP } from '@/lib/gsap';

interface PathwayDiagramProps {
  /** Describes the whole pathway for anyone who cannot see it. */
  label: string;
  /** The same information as an ordered list, visually hidden. */
  steps: readonly string[];
}

/**
 * Scratch branches into Web Development or Robotics, and both lead to mastery.
 * The strokes draw themselves as the section scrolls past; with reduced motion
 * they are simply there.
 */
export function PathwayDiagram({ label, steps }: PathwayDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { motion } = useMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const paths = gsap.utils.toArray<SVGPathElement>('[data-draw]', root);
      if (paths.length === 0) return;

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: motion === 'reduced' ? 0 : length });
      });

      if (motion === 'reduced') return;

      gsap.to(paths, {
        strokeDashoffset: 0,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom 70%', scrub: 0.6 },
      });
    },
    { scope: ref, dependencies: [motion] },
  );

  return (
    <div ref={ref} className="w-full">
      {/* The list carries the meaning; the drawing is decoration over it. */}
      <ol className="sr-only">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <svg
        role="img"
        aria-label={label}
        viewBox="0 0 900 260"
        className="hidden h-auto w-full md:block"
        fill="none"
      >
        <path
          data-draw
          d="M150 130 H330"
          stroke="var(--color-blue)"
          strokeWidth="2"
          strokeLinecap="square"
        />
        <path
          data-draw
          d="M330 130 C400 130 400 60 470 60"
          stroke="var(--color-blue)"
          strokeWidth="2"
        />
        <path
          data-draw
          d="M330 130 C400 130 400 200 470 200"
          stroke="var(--color-blue)"
          strokeWidth="2"
        />
        <path data-draw d="M680 60 C750 60 750 130 790 130" stroke="var(--color-blue)" strokeWidth="2" />
        <path
          data-draw
          d="M680 200 C750 200 750 130 790 130"
          stroke="var(--color-blue)"
          strokeWidth="2"
        />

        <g className="t-label" fill="currentColor">
          <text x="10" y="135" fontSize="15">
            SCRATCH
          </text>
          <text x="478" y="65" fontSize="15">
            WEB DEVELOPMENT
          </text>
          <text x="478" y="205" fontSize="15">
            ROBOTICS
          </text>
          <text x="798" y="135" fontSize="15">
            MASTERY
          </text>
        </g>
      </svg>

      {/* Below 768px the same path reads better stacked. */}
      <ol aria-hidden="true" className="flex flex-col gap-4 md:hidden">
        {steps.map((step, index) => (
          <li key={step} className="flex items-start gap-4 border-l-2 border-blue pl-5">
            <span className="t-label text-blue">{String(index + 1).padStart(2, '0')}</span>
            <span className="t-body">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
