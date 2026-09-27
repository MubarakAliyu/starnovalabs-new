import type { Status } from '@/lib/content';

export type ProductStage = 'live' | 'in-testing' | 'in-scoping' | 'planned';

export interface Product {
  slug: string;
  name: string;
  /** One line, plain and specific. */
  summary: string;
  stage: ProductStage;
  /** External site, when the product has one of its own. */
  url?: string;
  status: Status;
  /** Pipeline items we are not announcing yet (NOAH) stay invisible. */
  visible: boolean;
}

/** Filled in Batches 2–3. Slugs are already routed by /products/[slug]. */
export const products: Product[] = [];

export const productSlugs = ['kitos', 'edustack', 'skillstack'] as const;
export type ProductSlug = (typeof productSlugs)[number];
