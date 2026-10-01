'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { Button } from '@/components/ui/Button';
import { contact } from '@/content/contact';
import { gsap, useGSAP } from '@/lib/gsap';
import { EASE } from '@/lib/motion';

/** Replaces the form once a message is through. */
export function ContactSuccess() {
  const ref = useRef<HTMLDivElement>(null);
  const { motion } = useMotion();

  useGSAP(
    () => {
      const panel = ref.current;
      if (!panel) return;

      if (motion === 'reduced') {
        gsap.fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 });
        return;
      }

      gsap.fromTo(
        panel,
        { clipPath: 'inset(50%)' },
        { clipPath: 'inset(0%)', duration: 0.8, ease: EASE.inOut },
      );
    },
    { scope: ref, dependencies: [motion] },
  );

  return (
    <div
      ref={ref}
      data-theme="navy"
      role="status"
      className="flex flex-col items-start gap-8 bg-navy p-10 text-paper md:p-14"
    >
      <h2 className="t-display-l">{contact.success.title}</h2>
      <p className="t-lead max-w-[32ch] text-paper/80">{contact.success.body}</p>
      <Button href="/" variant="outline" size="md" arrow>
        Back to home
      </Button>
    </div>
  );
}
