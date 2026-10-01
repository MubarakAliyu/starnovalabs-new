import type { Status } from '@/lib/content';

export interface Value {
  index: string;
  title: string;
  body: string;
  status: Status;
}

/**
 * The practices the Company Profile describes.
 *
 * They carry status 'pending' because the wording has not been formally
 * ratified, but the About page renders them anyway: they describe how we
 * already work rather than making a claim about the world. This is the one
 * deliberate exception to the production filter, and it is flagged in the
 * Batch 2 summary for confirmation.
 */
export const values: Value[] = [
  {
    index: '01',
    title: 'Understanding first',
    body: 'Students genuinely understanding a concept matters more than rushing through a curriculum.',
    status: 'pending',
  },
  {
    index: '02',
    title: 'Adaptability',
    body: "We adjust delivery to real conditions rather than defending a plan that isn't working.",
    status: 'pending',
  },
  {
    index: '03',
    title: 'Accountability',
    body: 'Commitments are reviewed weekly; roadblocks are surfaced early and solved together.',
    status: 'pending',
  },
  {
    index: '04',
    title: 'Practical learning',
    body: 'Project-based, hands-on instruction. Students build from the first session.',
    status: 'pending',
  },
  {
    index: '05',
    title: 'Growth of people',
    body: 'We develop our team into new responsibilities and support them to succeed.',
    status: 'pending',
  },
];
