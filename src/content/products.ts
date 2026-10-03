import type { Status } from '@/lib/content';

export type ProductStage = 'live' | 'in-testing' | 'building' | 'in-scoping' | 'planned';

/** The label shown on the stage sticker. */
export const STAGE_LABEL: Record<ProductStage, string> = {
  live: 'Live',
  'in-testing': 'In final testing',
  building: 'In development · demo live',
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
  /** A public demo anyone can walk through. */
  demoUrl?: string;
  /** Secondary call to action, rendered only when its href is set. */
  secondaryCta?: { label: string; href: string };
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
    stage: 'building',
    href: '/products/edustack',
    demoUrl: 'https://edustack-rho.vercel.app/',
    secondaryCta: { label: 'View the demo', href: 'https://edustack-rho.vercel.app/' },
    status: 'confirmed',
    visible: true,
  },
  {
    slug: 'nurala-learning',
    name: 'NurAla Learning',
    summary:
      'Quranic Arabic and Islamic learning platform with guided lessons, assessments and progress tracking.',
    stage: 'live',
    href: '/products/nurala-learning',
    // TODO: no production URL found in ../../NurAla, NurAla Academy or
    // NurAla Learning. The call to action stays hidden until one is supplied.
    url: undefined,
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
];

export const productSlugs = ['kitos', 'edustack', 'skillstack'] as const;
export type ProductSlug = (typeof productSlugs)[number];
