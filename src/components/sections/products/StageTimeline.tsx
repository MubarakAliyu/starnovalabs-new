'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import type { RoadmapPhase } from '@/content/products';
import { gsap, useGSAP } from '@/lib/gsap';

const STATE_LABEL: Record<RoadmapPhase['state'], string> = {
  now: 'Now',
  next: 'Next',
  later: 'Later',
};

/**
 * The roadmap: columns on a wide screen with a line that fills up to the
 * current phase as it scrolls past, a plain list below 1024px.
 */
export function StageTimeline({ phases }: { phases: readonly RoadmapPhase[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { motion } = useMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const line = root.querySelector<HTMLElement>('[data-roadmap-line]');
      if (!line) return;

      // How far along the row the last "now" phase sits.
      const nowCount = phases.filter((phase) => phase.state === 'now').length;
      const target = Math.max(0.2, nowCount / phases.length);

      if (motion === 'reduced') {
        gsap.set(line, { scaleX: target });
        return;
      }

      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: target,
          ease: 'none',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: root, start: 'top 80%', end: 'bottom 70%', scrub: true },
        },
      );
    },
    { scope: ref, dependencies: [motion, phases] },
  );

  return (
    <div ref={ref}>
      {/* Decorative: the phase labels below carry the same information. */}
      <div aria-hidden="true" className="relative mb-10 hidden h-px w-full bg-line lg:block">
        <span
          data-roadmap-line
          className="absolute inset-y-0 left-0 block w-full origin-left scale-x-0 bg-blue"
        />
      </div>

      <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
        {phases.map((phase) => (
          <li key={phase.phase} className="flex flex-col gap-4 border-t border-line pt-6 lg:border-0 lg:pt-0">
            <div className="flex items-baseline gap-3">
              <span className="t-display-l text-blue">{phase.phase}</span>
              <span className="t-label text-muted">{STATE_LABEL[phase.state]}</span>
            </div>
            <h3 className="t-h3">{phase.label}</h3>
            <ul className="flex flex-col gap-2">
              {phase.items.map((item) => (
                <li key={item} className="t-small text-body">
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
