import type { Status } from '@/lib/content';

export const about = {
  hero: {
    label: 'About',
    title: 'FROM BOOTCAMPS TO A COMPANY.',
    lead: "StarNova Labs began as a series of Kids in Tech bootcamps. Today it's a team with a documented curriculum, a delivered learning platform and a product pipeline built to take practical technology education far beyond one classroom.",
  },

  story: {
    quote: 'Understanding matters more than finishing the syllabus.',
    attribution: 'Aliyu Mubarak, Founder & CEO',
    body: [
      'We started with a simple observation in our own classrooms: a child who understands why something works will keep building long after the session ends, and a child who was marched through a syllabus will not. So we built the programme around understanding, and we measure ourselves on what students can make.',
      'What began as bootcamps is now a company. We have a documented curriculum, a team beyond the founders, a learning platform our students already use, and a pipeline of products that extend the same idea to schools and to older learners.',
    ],
  },

  /**
   * Vision and mission are marked pending because the Company Profile carries
   * alternative wording that has not been reconciled. These are the
   * approved-by-default versions and they do render in production.
   *
   * TODO: reconcile against the Company Profile 2026 wording and confirm which
   * version is canonical, then set status to 'confirmed'.
   */
  missionVision: {
    status: 'pending' as Status,
    vision: {
      title: 'Vision',
      body: "To build Africa's leading school-powered STEM education ecosystem — moving millions of young people from technology consumers to technology creators.",
    },
    mission: {
      title: 'Mission',
      body: 'To equip the next generation with the knowledge, skills and confidence to understand technology, build with it and use it to solve meaningful problems.',
    },
  },

  valuesSection: {
    label: 'How we work',
    heading: 'Five things we hold to.',
  },

  leadershipSection: {
    label: 'Team',
    heading: 'The people accountable for it.',
    programmeHeading: 'Programme team',
  },

  journeySection: {
    label: 'Journey',
    heading: 'What we have built so far.',
  },

  cta: {
    headline: 'Build it with us.',
    actions: [
      { label: 'Partner with us', href: '/partner', variant: 'solid-blue' as const },
      { label: 'Contact us', href: '/contact', variant: 'outline' as const },
    ],
  },
} as const;
