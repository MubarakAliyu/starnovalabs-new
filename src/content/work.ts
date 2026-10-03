export interface CaseStudy {
  slug: string;
  client: string;
  sector?: string;
  year?: number;
  services: string[];
  summary?: string;
  challenge?: string;
  approach?: string;
  outcome?: string;
  images: string[];
  /** No case study is published without the client's written permission. */
  permission: boolean;
  featured: boolean;
}

/**
 * No approved case studies yet. The example exists only so the template can be
 * built and viewed in development; permission: false keeps it out of
 * production, which is also what makes /work show its empty state.
 */
export const work: CaseStudy[] = [
  {
    slug: 'example',
    client: 'Example client',
    sector: 'Education',
    year: 2026,
    services: ['Product strategy', 'UI/UX', 'Web development'],
    summary: 'A placeholder entry used to build and review the case-study template.',
    challenge: 'This text stands in for the problem a real client brought to us.',
    approach: 'This text stands in for how we approached it.',
    outcome: 'This text stands in for what changed as a result.',
    images: [],
    permission: false,
    featured: false,
  },
];

export const workIndex = {
  title: 'WORK',
  lead: 'Selected projects from the studio. Case studies appear here once the client has agreed to them.',
  empty: {
    heading: 'Case studies are on the way — ask us for examples.',
    cta: { label: 'Start a project', href: '/contact?topic=client' },
  },
} as const;
