import type { Status } from '@/lib/content';

export type ProductKind = 'programme' | 'platform' | 'product';

export type ProductStage = 'live' | 'testing' | 'building' | 'scoping' | 'pipeline';

/** The columns of the maturity strip, in order. */
export const STAGE_ORDER: ProductStage[] = ['live', 'testing', 'building', 'scoping', 'pipeline'];

export const STAGE_COLUMN: Record<ProductStage, string> = {
  live: 'Live',
  testing: 'Testing',
  building: 'Building',
  scoping: 'Scoping',
  pipeline: 'Pipeline',
};

/** The sticker on a row. Gold for live, blue for work in motion, white ahead. */
export const STAGE_FILL: Record<ProductStage, 'gold' | 'blue' | 'white'> = {
  live: 'gold',
  testing: 'blue',
  building: 'blue',
  scoping: 'white',
  pipeline: 'white',
};

export interface ProductFeature {
  title: string;
  body: string;
  /** Features still to come are tagged rather than hidden. */
  roadmap?: 'now' | 'next' | 'later';
}

export interface RoadmapPhase {
  phase: string;
  label: string;
  items: string[];
  state: 'now' | 'next' | 'later';
}

export interface Product {
  slug: string;
  name: string;
  fullName?: string;
  kind: ProductKind;
  category: string;
  stage: ProductStage;
  stageLabel: string;
  stageStatus: Status;
  oneLiner: string;
  intro?: string;
  problem?: string;
  audiences?: string[];
  features?: ProductFeature[];
  roadmap?: RoadmapPhase[];
  /** A note under the roadmap, for work still being scoped. */
  roadmapNote?: string;
  /** Where the row and the index link. */
  href: string;
  /** The product's own public site, when it has one. */
  externalUrl?: string;
  demoUrl?: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** A mark that reads better than a screenshot, for row previews. */
  logo?: string;
  /** Screens, in order. Empty means the section is omitted in production. */
  images: string[];
  accent: 'blue' | 'navy' | 'ink';
  visible: boolean;
  indexable: boolean;
  status: Status;
}

export const products: Product[] = [
  {
    slug: 'kids-in-tech',
    name: 'Kids in Tech',
    kind: 'programme',
    category: 'Flagship programme',
    stage: 'live',
    stageLabel: 'Live · Bootcamp 4.0',
    // The cohort number still has to be reconciled against the profile.
    stageStatus: 'pending',
    oneLiner: 'Project-based STEM bootcamps where children build games, websites and robots.',
    // Its detail page is /kids-in-tech, not under /products.
    href: '/kids-in-tech',
    externalUrl: 'https://www.kidsintech.school',
    cta: { label: 'Explore Kids in Tech', href: '/kids-in-tech' },
    logo: '/logos/products/kids-in-tech.png',
    images: [],
    accent: 'navy',
    visible: true,
    indexable: true,
    status: 'confirmed',
  },

  {
    slug: 'kitos',
    name: 'KITOS',
    fullName: 'Kids in Tech OS',
    kind: 'platform',
    category: 'Learning platform',
    stage: 'testing',
    stageLabel: 'LMS v1 · final testing',
    // The Company Profile says "Delivered" — reconcile before confirming.
    stageStatus: 'pending',
    oneLiner: 'The platform that keeps Kids in Tech learning going between cohorts.',
    problem: 'Learning that stops when a bootcamp ends is learning half-finished.',
    intro:
      'KITOS carries a student from one cohort to the next: the work they built stays with them, the next step is already laid out, and a parent can see progress rather than attendance.',
    audiences: ['Students', 'Parents', 'Partner schools', 'Tutors'],
    features: [
      {
        title: 'Learning pathways',
        body: 'Structured next steps after every bootcamp, by track and level.',
        roadmap: 'now',
      },
      {
        title: 'Project portfolios',
        body: 'Every student keeps what they built, and can show it.',
        roadmap: 'next',
      },
      {
        title: 'Innovation challenges',
        body: 'Build-a-solution challenges that stretch students between cohorts.',
        roadmap: 'later',
      },
      {
        title: 'Student profiles',
        body: 'Progress, badges and certificates in one place.',
        roadmap: 'next',
      },
      {
        title: 'Parent dashboard',
        body: 'Parents see progress, not just attendance.',
        roadmap: 'later',
      },
      {
        title: 'School leaderboards',
        body: 'Friendly competition between partner schools.',
        roadmap: 'later',
      },
    ],
    roadmap: [
      {
        phase: 'V1',
        label: 'Core learning platform',
        items: [
          'Student access',
          'Lessons and recordings',
          'Payments',
          'Returning-student onboarding',
        ],
        state: 'now',
      },
      {
        phase: 'V2',
        label: 'Portfolios and progress',
        items: ['Student portfolios', 'Progress tracking', 'Live classes'],
        state: 'next',
      },
      {
        phase: 'V3',
        label: 'Ecosystem',
        items: ['Innovation challenges', 'Parent dashboard', 'School leaderboards'],
        state: 'later',
      },
      {
        phase: 'V4',
        label: 'Network',
        items: ['Talent discovery', 'National expansion'],
        state: 'later',
      },
    ],
    roadmapNote: 'KITOS OS — in scoping.',
    href: '/products/kitos',
    cta: { label: 'Partner as a school', href: '/partner#schools' },
    images: [
      '/images/kitos/kitos-2.png',
      '/images/kitos/kitos-27.png',
      '/images/kitos/kitos-31.png',
      '/images/kitos/kitos-7.png',
    ],
    accent: 'blue',
    visible: true,
    indexable: true,
    status: 'confirmed',
  },

  {
    slug: 'edustack',
    name: 'EduStack',
    kind: 'product',
    category: 'School management',
    stage: 'building',
    stageLabel: 'In development · demo live',
    stageStatus: 'confirmed',
    oneLiner: 'School management for the schools we already work with.',
    problem: 'Schools run on paper registers, scattered spreadsheets and memory.',
    intro:
      'EduStack brings admissions, academics, attendance, fees and reporting into one system built for Nigerian schools. A public demo is live; development continues alongside KITOS.',
    audiences: ['School administrators', 'Teachers', 'Parents', 'School owners'],
    features: [
      {
        title: 'Student information',
        body: 'The whole student record, from admission to graduation.',
      },
      { title: 'Attendance', body: 'Daily and per-subject, with alerts to parents.' },
      {
        title: 'Assessment and results',
        body: 'Grades computed, positions ranked, report cards generated.',
      },
      { title: 'Fees', body: 'Invoices, payments and balances, with receipts.' },
      { title: 'Timetables', body: 'A visual weekly timetable that catches clashes.' },
      { title: 'Parent portal', body: 'Attendance, results and fees, without a phone call.' },
    ],
    href: '/products/edustack',
    demoUrl: 'https://edustack-rho.vercel.app/',
    cta: { label: 'Register interest', href: '/contact?topic=product' },
    secondaryCta: { label: 'View the demo', href: 'https://edustack-rho.vercel.app/' },
    images: ['/images/edustack/edustack-home.png', '/images/edustack/edustack-mobile.png'],
    accent: 'navy',
    visible: true,
    indexable: true,
    status: 'confirmed',
  },

  {
    slug: 'nurala-learning',
    name: 'NurAla Learning',
    kind: 'product',
    category: 'EdTech platform',
    stage: 'live',
    stageLabel: 'Live',
    stageStatus: 'confirmed',
    oneLiner:
      'Quranic Arabic and Islamic learning platform with guided lessons, assessments and progress tracking.',
    intro:
      'NurAla Learning takes the approach we use in the classroom — structured progression, and work you can see — and applies it to Quranic Arabic and Islamic studies.',
    audiences: ['Learners', 'Parents', 'Teachers'],
    features: [
      {
        title: 'Guided lessons',
        body: 'Lessons laid out in order, so a learner always knows the next step.',
      },
      {
        title: 'Assessments',
        body: 'Checks along the way that show what has actually been understood.',
      },
      { title: 'Mobile-first design', body: 'Built for the phone most learners already have.' },
      {
        title: 'Progress insights',
        body: 'A clear record of what has been covered and what comes next.',
      },
    ],
    href: '/products/nurala-learning',
    // TODO: no production URL found in ../../NurAla, NurAla Academy or NurAla
    // Learning. An empty href hides the call to action until one is supplied.
    cta: { label: 'Visit website', href: '' },
    logo: '/logos/products/nurala-onLight.png',
    images: [],
    accent: 'ink',
    visible: true,
    indexable: true,
    status: 'confirmed',
  },

  {
    slug: 'skillstack',
    name: 'SkillStack',
    kind: 'product',
    category: 'Future skills',
    stage: 'pipeline',
    stageLabel: 'Pipeline',
    stageStatus: 'confirmed',
    oneLiner: 'A skills-and-careers platform for young people moving beyond school.',
    intro:
      'SkillStack will extend the Kids in Tech pathway into career-ready skills, projects and portfolios. It is in early scoping.',
    href: '/products/skillstack',
    cta: { label: 'Register interest', href: '/contact?topic=product' },
    images: [],
    accent: 'navy',
    visible: true,
    indexable: false,
    status: 'confirmed',
  },
];

/** Products with their own page under /products/. */
export const productSlugs = products
  .filter((product) => product.visible && product.slug !== 'kids-in-tech')
  .map((product) => product.slug);

export function productBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export const productsIndex = {
  title: 'PRODUCTS',
  lead: 'Programmes that prove it. Platforms that scale it.',
  cta: {
    heading: 'Have a product idea for education?',
    label: 'Talk to us',
    href: '/partner#product',
  },
} as const;
