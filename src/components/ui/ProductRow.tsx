'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { TransitionLink } from '@/components/motion/TransitionLink';
import { Arrow } from '@/components/ui/Arrow';
import { BrandGraphic } from '@/components/ui/BrandGraphic';
import { PendingBadge } from '@/components/ui/PendingBadge';
import { Sticker } from '@/components/ui/Sticker';
import { STAGE_LABEL, type Product } from '@/content/products';
import { gsap, useGSAP } from '@/lib/gsap';
import { EASE } from '@/lib/motion';

/** Rotates the stand-in preview so the list does not look repetitive. */
const PREVIEW_THEMES = ['navy', 'blue', 'paper'] as const;
const PREVIEW_VARIANTS = ['star-crop', 'tile', 'blade-field'] as const;

interface ProductRowProps {
  product: Product;
  index: number;
}

/**
 * One row of the portfolio list (Master §5). The row floods blue, the name
 * slides right and the arrow turns to the star's diagonal. On a fine pointer a
 * preview follows the cursor; touch gets none of that and loses nothing.
 */
export function ProductRow({ product, index }: ProductRowProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { motion } = useMotion();

  useGSAP(
    () => {
      if (motion === 'reduced') return;
      const row = ref.current;
      if (!row) return;
      const preview = row.querySelector<HTMLElement>('[data-preview]');
      if (!preview) return;

      const media = gsap.matchMedia();

      media.add('(hover: hover) and (pointer: fine)', () => {
        const toX = gsap.quickTo(preview, 'x', { duration: 0.5, ease: EASE.snappy });
        const toY = gsap.quickTo(preview, 'y', { duration: 0.5, ease: EASE.snappy });

        const onMove = (event: PointerEvent) => {
          toX(event.clientX + 24);
          toY(event.clientY - 110);
        };

        const onEnter = (event: PointerEvent) => {
          gsap.set(preview, { x: event.clientX + 24, y: event.clientY - 110 });
          gsap.to(preview, { scale: 1, autoAlpha: 1, duration: 0.4, ease: EASE.snappy });
        };

        const onLeave = () => {
          gsap.to(preview, { scale: 0.6, autoAlpha: 0, duration: 0.3, ease: EASE.snappy });
        };

        row.addEventListener('pointerenter', onEnter);
        row.addEventListener('pointermove', onMove);
        row.addEventListener('pointerleave', onLeave);

        return () => {
          row.removeEventListener('pointerenter', onEnter);
          row.removeEventListener('pointermove', onMove);
          row.removeEventListener('pointerleave', onLeave);
        };
      });

      return () => media.revert();
    },
    { scope: ref, dependencies: [motion] },
  );

  return (
    <li ref={ref} className="group relative border-t border-line last:border-b">
      <TransitionLink
        href={product.href}
        className="flex flex-col gap-3 bg-paper-2 px-5 py-8 no-underline transition-colors duration-[400ms] ease-out group-hover:bg-blue group-hover:text-white md:grid md:grid-cols-[4rem_1fr_auto_auto] md:items-center md:gap-6 md:py-10"
      >
        <span className="t-label opacity-60">{String(index + 1).padStart(2, '0')}</span>

        <span className="t-h3 transition-transform duration-[400ms] ease-out md:group-hover:translate-x-6">
          {product.name}
          <PendingBadge item={product} />
        </span>

        <span className="t-body max-w-[42ch] opacity-80 md:max-w-[34ch] md:text-right">
          {product.summary}
        </span>

        <span className="flex items-center gap-5">
          <Sticker fill="white" rotate={index % 2 === 0 ? -3 : 3} className="group-hover:bg-white">
            {STAGE_LABEL[product.stage]}
          </Sticker>
          <Arrow className="text-xl group-hover:-rotate-45" />
        </span>
      </TransitionLink>

      {/* Stand-in preview until real product screenshots exist. */}
      <div
        data-preview
        aria-hidden="true"
        className="pointer-events-none invisible fixed top-0 left-0 z-40 hidden h-[220px] w-[320px] scale-[0.6] opacity-0 md:block"
      >
        <BrandGraphic
          variant={PREVIEW_VARIANTS[index % PREVIEW_VARIANTS.length]}
          theme={PREVIEW_THEMES[index % PREVIEW_THEMES.length]}
          className="h-full"
        />
      </div>
    </li>
  );
}
