'use client';

import { useRef } from 'react';

import { useMotion } from '@/components/motion/MotionProvider';
import { TransitionLink } from '@/components/motion/TransitionLink';
// Type-only, so the whole product catalogue does not follow this client
// component into the browser bundle. The labels are tiny and live here.
import type { Product, ProductStage } from '@/content/products';
import { gsap, useGSAP } from '@/lib/gsap';
import { STAGGER } from '@/lib/motion';

const STAGE_ORDER: ProductStage[] = ['live', 'testing', 'building', 'scoping', 'pipeline'];

const STAGE_COLUMN: Record<ProductStage, string> = {
  live: 'Live',
  testing: 'Testing',
  building: 'Building',
  scoping: 'Scoping',
  pipeline: 'Pipeline',
};

/**
 * Where each product stands, as columns from Live to Pipeline. Columns on a
 * wide screen, a plain stacked list below 768px.
 */
export function MaturityStrip({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { motion } = useMotion();

  useGSAP(
    () => {
      if (motion === 'reduced') return;
      const root = ref.current;
      if (!root) return;
      const chips = gsap.utils.toArray<HTMLElement>('[data-chip]', root);
      if (chips.length === 0) return;

      // Each chip drops in from the top of its own column.
      gsap.fromTo(
        chips,
        { y: -24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: STAGGER.items,
          scrollTrigger: { trigger: root, start: 'top 85%', once: true },
        },
      );
    },
    { scope: ref, dependencies: [motion] },
  );

  // Only columns that actually hold something.
  const columns = STAGE_ORDER.map((stage) => ({
    stage,
    label: STAGE_COLUMN[stage],
    items: products.filter((product) => product.stage === stage),
  })).filter((column) => column.items.length > 0);

  return (
    <div ref={ref} className="flex flex-col gap-10 md:grid md:gap-6" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
      {columns.map((column) => (
        <div key={column.stage} className="flex flex-col gap-5">
          <h3 className="t-label border-t border-line pt-4 text-body">{column.label}</h3>
          <ul className="flex flex-col gap-3">
            {column.items.map((product) => (
              <li key={product.slug} data-chip>
                <TransitionLink
                  href={product.href}
                  className="t-h3 link-underline inline-flex items-center text-[1.25rem] no-underline"
                >
                  {product.name}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
