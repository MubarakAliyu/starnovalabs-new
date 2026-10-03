export interface ServiceCategory {
  title: string;
  /** Rendered as stickers under the heading. */
  items: string[];
}

export const studio = {
  hero: {
    label: 'Studio',
    title: 'STUDIO',
    lead: "The team behind StarNova's products also designs and builds for clients: products, brands and learning platforms.",
  },

  servicesSection: {
    label: 'What we do',
    heading: 'Five things we are asked for.',
  },

  services: [
    {
      title: 'Product & software development',
      items: ['Web apps', 'Mobile apps', 'SaaS platforms', 'MVP development', 'Custom tools'],
    },
    {
      title: 'Design & branding',
      items: ['Logo & identity', 'Brand systems', 'UI/UX', 'Social & print design'],
    },
    {
      title: 'Web',
      items: ['Business websites', 'Landing pages', 'Portfolios', 'CMS'],
    },
    {
      title: 'Education technology',
      items: ['Learning platforms & LMS', 'Course portals', 'Student & teacher dashboards'],
    },
    {
      title: 'Strategy',
      items: ['Product discovery', 'MVP validation', 'UX audits'],
    },
  ] satisfies ServiceCategory[],

  process: {
    label: 'How we work',
    heading: 'Four steps, every project.',
    steps: [
      {
        index: '01',
        title: 'Discover',
        body: 'We learn the problem and agree what success looks like before anything is designed.',
      },
      {
        index: '02',
        title: 'Design',
        body: 'Flows, screens and the visual system, reviewed with you as they are made.',
      },
      {
        index: '03',
        title: 'Build',
        body: 'Built in the open, in working increments you can try rather than imagine.',
      },
      {
        index: '04',
        title: 'Launch & grow',
        body: 'Shipped, measured and improved — we stay on after the launch.',
      },
    ],
  },

  platforms: {
    label: 'Platforms we built',
    heading: 'Two we built for ourselves.',
    items: [
      {
        name: 'KITOS',
        body: 'The learning platform behind Kids in Tech.',
        image: '/images/kitos/kitos-27.png',
        href: '/products/kitos',
      },
      {
        name: 'EduStack',
        body: 'School management, with a public demo.',
        image: '/images/edustack/edustack-home.png',
        href: '/products/edustack',
      },
    ],
  },

  empty: {
    heading: 'Case studies are on the way — ask us for examples.',
    cta: { label: 'Start a project', href: '/contact?topic=client' },
  },

  cta: {
    headline: 'START A PROJECT.',
    actions: [
      { label: 'Start a project', href: '/contact?topic=client', variant: 'accent' as const },
      { label: 'See our products', href: '/products', variant: 'secondary' as const },
    ],
  },
} as const;
