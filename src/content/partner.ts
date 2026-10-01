import type { ChapterTheme } from '@/components/layout/Chapter';

export interface PartnerSection {
  id: string;
  index: string;
  label: string;
  heading: string;
  points: string[];
  cta: { label: string; href: string };
  theme: ChapterTheme;
}

export const partnerPage = {
  hero: {
    label: 'Partner with us',
    title: 'PARTNER WITH US.',
    lead: 'We work with schools, sponsors, investors and product collaborators who share one conviction: children should learn to create with technology, not only consume it.',
  },

  sections: [
    {
      id: 'schools',
      index: '01',
      label: 'Schools',
      heading: 'Bring Kids in Tech to your students.',
      points: [
        'We supply the curriculum, trained tutors and an equipment plan.',
        'Students build real projects, not worksheets.',
        'Parents see outcomes they can point at.',
        'Partner schools share in programme revenue.',
      ],
      cta: { label: 'Talk to us about your school', href: '/contact?topic=school' },
      theme: 'paper',
    },
    {
      id: 'sponsors',
      index: '02',
      label: 'Sponsors',
      heading: 'Sponsor a cohort or equipment.',
      points: [
        "Fund places for students who cannot pay.",
        'Equip a robotics lab that keeps working after the cohort ends.',
        'Your support is reported back with outcomes, not photographs.',
      ],
      cta: { label: 'Sponsor a cohort', href: '/contact?topic=sponsor' },
      theme: 'navy',
    },
    {
      id: 'investors',
      index: '03',
      label: 'Investors',
      heading: 'Invest in the infrastructure.',
      points: [
        'Validated demand, and families who already pay for the programme.',
        'School-powered distribution rather than paid acquisition.',
        'KITOS as the platform layer under every programme we run.',
      ],
      cta: { label: 'Request our briefing', href: '/contact?topic=investor' },
      theme: 'paper-2',
    },
    {
      id: 'product',
      index: '04',
      label: 'Product collaboration',
      heading: 'Build education technology with us.',
      points: [
        'Co-develop tools with a team that tests them in real classrooms.',
        'Bring curriculum or content into a platform students already use.',
        'Integrate with KITOS where it makes both products better.',
      ],
      cta: { label: 'Propose a collaboration', href: '/contact?topic=product' },
      theme: 'blue',
    },
  ] satisfies PartnerSection[],
} as const;
