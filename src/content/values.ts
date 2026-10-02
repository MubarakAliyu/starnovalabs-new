import type { Status } from '@/lib/content';

export interface Value {
  index: string;
  title: string;
  body: string;
  status: Status;
}

/** The practices the Company Profile describes, confirmed by the owner. */
export const values: Value[] = [
  {
    index: '01',
    title: 'Understanding first',
    body: 'Students genuinely understanding a concept matters more than rushing through a curriculum.',
    status: 'confirmed',
  },
  {
    index: '02',
    title: 'Adaptability',
    body: "We adjust delivery to real conditions rather than defending a plan that isn't working.",
    status: 'confirmed',
  },
  {
    index: '03',
    title: 'Accountability',
    body: 'Commitments are reviewed weekly; roadblocks are surfaced early and solved together.',
    status: 'confirmed',
  },
  {
    index: '04',
    title: 'Practical learning',
    body: 'Project-based, hands-on instruction. Students build from the first session.',
    status: 'confirmed',
  },
  {
    index: '05',
    title: 'Growth of people',
    body: 'We develop our team into new responsibilities and support them to succeed.',
    status: 'confirmed',
  },
];
