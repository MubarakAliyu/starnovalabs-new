import type { Status } from '@/lib/content';

export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  /** Where the number came from, so it can be checked later. */
  source: string;
  asOf?: string;
  status: Status;
}

/**
 * Traction figures, taken from the owner's Pitch Deck v3 (2026) and confirmed.
 * Revenue, valuation and round terms are deliberately absent and must never
 * appear on the site.
 */
export const stats: Stat[] = [
  {
    id: 'paying-students',
    value: 158,
    label: 'Paying students',
    source: 'Pitch deck v3 (2026)',
    asOf: '2026',
    status: 'confirmed',
  },
  {
    id: 'cohorts',
    value: 4,
    label: 'Bootcamp cohorts',
    source: 'Pitch deck v3 (2026)',
    asOf: '2026',
    status: 'confirmed',
  },
  {
    id: 'returning',
    value: 17,
    label: 'Returning students',
    source: 'Pitch deck v3 (2026)',
    asOf: '2026',
    status: 'confirmed',
  },
  {
    id: 'projects',
    value: 40,
    suffix: '+',
    label: 'Student projects built',
    source: 'Pitch deck v3 (2026)',
    asOf: '2026',
    status: 'confirmed',
  },
  {
    id: 'tracks',
    value: 3,
    label: 'Learning tracks',
    source: 'Pitch deck v3 (2026)',
    asOf: '2026',
    status: 'confirmed',
  },
];
