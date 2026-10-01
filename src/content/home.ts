type StickerFill = 'gold' | 'blue' | 'white' | 'ink';

interface HeroSticker {
  text: string;
  fill: StickerFill;
  rotate: number;
}

export const home = {
  hero: {
    /** Three lines, set as one h1. */
    lines: ['BUILD', "WHAT'S", 'NEXT.'] as const,
    lead: 'A Nigerian technology company building education technology — proven in real classrooms through Kids in Tech.',
    stickers: [
      { text: '<est. 2025/>', fill: 'gold', rotate: -3 },
      { text: 'Sokoto · Kebbi', fill: 'white', rotate: 2 },
    ] as HeroSticker[],
  },

  marquee: ['Kids in Tech', 'KITOS', 'EduStack', 'SkillStack', 'Studio'] as const,

  manifesto: {
    label: 'Why we exist',
    headline:
      'We are producing technology users faster than we are developing technology creators.',
    body: 'Children across Northern Nigeria grow up surrounded by technology with little chance to learn how it works — or how to build with it. Schools want practical STEM but rarely have the specialist people, curriculum or equipment to deliver it. StarNova Labs builds that missing layer: programmes that spark capability, and platforms that keep it growing.',
    /** Two rows that scrub in opposite directions. Arrows are SVG, not characters. */
    strip: {
      rowA: ['Exposure', 'Understanding', 'Building'],
      rowB: ['Problem solving', 'Creation'],
    },
  },

  proof: {
    label: 'Proof of execution',
    heading: 'Kids in Tech is where it starts.',
    lead: 'Our flagship programme teaches children to build games, websites and working robots through intensive, project-based bootcamps delivered with partner schools.',
    tracks: ['Scratch', 'Web Development', 'Robotics'] as const,
    cta: { label: 'Explore Kids in Tech', href: '/kids-in-tech' },
  },

  connects: {
    heading: 'Bootcamps spark it. KITOS sustains it.',
    panels: [
      {
        index: '01',
        title: 'Bootcamps',
        body: 'Intensive, in-person, hands-on. Students build from day one.',
      },
      {
        index: '02',
        title: 'KITOS',
        body: 'Students continue online after a cohort: revisit what they built and progress at their own pace.',
      },
      {
        index: '03',
        title: 'Progression',
        body: 'Returning students move forward, never repeat. Every cohort takes them further.',
      },
    ],
  },

  kitos: {
    title: 'KITOS',
    sticker: '[ Kids in Tech OS ]',
    lead: 'The learning platform that takes Kids in Tech beyond the classroom — and keeps students moving between cohorts.',
    features: [
      'Learning pathways',
      'Project portfolios',
      'Innovation challenges',
      'Parent dashboard',
      'School leaderboards',
    ] as const,
    cta: { label: 'See KITOS', href: '/products/kitos' },
  },

  portfolio: {
    label: "What we're building",
    heading: 'One company. A growing portfolio.',
  },

  studio: {
    heading: 'We build for others too.',
    columns: [
      {
        title: 'Product & software',
        body: 'We design and build web and mobile products, from first scope to launch.',
      },
      {
        title: 'Brand & identity',
        body: 'Naming, visual identity and the collateral that carries it into the world.',
      },
      {
        title: 'Web & learning platforms',
        body: 'Sites and learning systems for organisations that need to teach at scale.',
      },
    ],
    cta: { label: 'Visit the Studio', href: '/studio' },
  },

  closing: {
    headline: 'GOT A SCHOOL, A SPONSOR OR A PRODUCT IN MIND?',
    actions: [
      { label: 'Enrol a school', href: '/partner#schools', variant: 'solid-blue' as const },
      { label: 'Partner or invest', href: '/partner#investors', variant: 'outline' as const },
      { label: 'Start a project', href: '/contact?topic=client', variant: 'outline' as const },
    ],
  },
} as const;
