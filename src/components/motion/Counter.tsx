'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface CounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

function format(value: number, decimals: number) {
  return value.toFixed(decimals);
}

/**
 * Count-up whose final value is already in the server HTML, so it is correct
 * without JavaScript and for screen readers. Mango has no tabular figures, so
 * every digit sits in its own fixed-width box and nothing jitters.
 */
export function Counter({ value, decimals = 0, prefix, suffix, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { motion } = useMotion();
  const final = format(value, decimals);

  useGSAP(
    () => {
      if (motion === 'reduced') return;
      const element = ref.current;
      if (!element) return;
      const digits = element.querySelector<HTMLElement>('[data-counter-digits]');
      if (!digits) return;

      const state = { value: 0 };
      const paint = () => {
        const text = format(state.value, decimals);
        digits.textContent = '';
        for (const character of text) {
          const box = document.createElement('span');
          if (/\d/.test(character)) box.setAttribute('data-digit', '');
          box.textContent = character;
          digits.append(box);
        }
      };

      paint();

      gsap.to(state, {
        value,
        duration: 1.6,
        ease: 'power2.out',
        snap: decimals === 0 ? { value: 1 } : undefined,
        onUpdate: paint,
        scrollTrigger: { trigger: element, start: 'top 90%', once: true },
      });
    },
    { scope: ref, dependencies: [motion, value, decimals] },
  );

  return (
    <span ref={ref} className={cn('inline-flex items-baseline', className)}>
      {prefix ? <span aria-hidden="true">{prefix}</span> : null}
      {/* The accessible value never animates. */}
      <span className="sr-only">
        {prefix}
        {final}
        {suffix}
      </span>
      <span aria-hidden="true" data-counter-digits>
        {[...final].map((character, index) => (
          <span key={index} {...(/\d/.test(character) ? { 'data-digit': '' } : {})}>
            {character}
          </span>
        ))}
      </span>
      {suffix ? <span aria-hidden="true">{suffix}</span> : null}
    </span>
  );
}
