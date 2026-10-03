'use client';

import { useRef, useState } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { Sticker } from '@/components/ui/Sticker';
import { gsap, useGSAP } from '@/lib/gsap';
import { EASE } from '@/lib/motion';

/**
 * A services category that opens on click or Enter.
 *
 * Built on <details>/<summary> so it is keyboard-operable and fully usable
 * with JavaScript switched off; the height animation only enhances it.
 */
export function ServiceRow({ title, items }: { title: string; items: readonly string[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { motion } = useMotion();

  useGSAP(
    () => {
      const body = bodyRef.current;
      if (!body) return;

      if (motion === 'reduced') {
        gsap.set(body, { height: open ? 'auto' : 0 });
        return;
      }

      gsap.to(body, {
        height: open ? 'auto' : 0,
        duration: 0.6,
        ease: EASE.inOut,
      });
    },
    { scope: ref, dependencies: [open, motion] },
  );

  return (
    <details
      ref={ref}
      open={open}
      onToggle={(event) => setOpen((event.currentTarget as HTMLDetailsElement).open)}
      className="group border-t border-line last:border-b"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-8 [&::-webkit-details-marker]:hidden">
        <h3 className="t-h3">{title}</h3>
        {/* A plus that becomes a minus; the open state is on the element. */}
        <span aria-hidden="true" className="relative block h-4 w-4 shrink-0">
          <span className="absolute top-1/2 left-0 block h-px w-full bg-current" />
          <span className="absolute top-1/2 left-0 block h-px w-full rotate-90 bg-current transition-transform duration-300 ease-out group-open:rotate-0" />
        </span>
      </summary>

      <div ref={bodyRef} className="overflow-hidden">
        <ul className="flex flex-wrap items-center gap-4 pb-10">
          {items.map((item, index) => (
            <li key={item}>
              <Sticker fill={index % 2 === 0 ? 'white' : 'blue'} rotate={index % 2 ? 2 : -2}>
                {item}
              </Sticker>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
