import type { Status } from '@/lib/content';

export type ProductStage = 'live' | 'in-testing' | 'in-scoping' | 'planned';

/** The label shown on the stage sticker. */
export const STAGE_LABEL: Record<ProductStage, string> = {
  live: 'Live',
  'in-testing': 'In final testing',
  'in-scoping': 'Pipeline',
  planned: 'Pipeline',
};

export interface Product {
  slug: string;
  name: string;
  /** One line, plain and specific. */
  summary: string;
  stage: ProductStage;
  /** Where the row links. */
  href: string;
  /** External site, when the product has one of its own. */
  url?: string;
  status: Status;
  /** Pipeline work we are not announcing yet stays invisible. */
  visible: boolean;
}

/** Batch 3 fills these out; the Home product list reads them today. */
export const products: Product[] = [
  {
    slug: 'kids-in-tech',
    name: 'Kids in Tech',
    summary: 'Project-based STEM bootcamps for children, delivered with partner schools.',
    stage: 'live',
    href: '/kids-in-tech',
    url: 'https://www.kidsintech.school',
    status: 'confirmed',
    visible: true,
  },
  {
    slug: 'kitos',
    name: 'KITOS',
    summary: 'The learning platform that carries students on between cohorts.',
    stage: 'in-testing',
    href: '/products/kitos',
    status: 'pending',
    visible: true,
  },
  {
    slug: 'edustack',
    name: 'EduStack',
    summary: 'School management software for the institutions that host our programmes.',
    stage: 'in-scoping',
    href: '/products/edustack',
    status: 'confirmed',
    visible: true,
  },
  {
    slug: 'skillstack',
    name: 'SkillStack',
    summary: 'A future-skills platform for learners who have outgrown the classroom.',
    stage: 'in-scoping',
    href: '/products/skillstack',
    status: 'confirmed',
    visible: true,
  },
  {
    slug: 'noah',
    name: 'NOAH',
    summary: 'Scope to be confirmed.',
    stage: 'planned',
    href: '/products/noah',
    status: 'pending',
    visible: false,
  },
];

export const productSlugs = ['kitos', 'edustack', 'skillstack'] as const;
export type ProductSlug = (typeof productSlugs)[number];
