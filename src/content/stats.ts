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
 * Traction figures. Everything sourced from the pitch deck is still pending
 * reconciliation, so only the confirmed track count reaches production.
 */
export const stats: Stat[] = [
  {
    id: 'paying-students',
    value: 111,
    label: 'Paying students',
    source: 'Pitch deck v2',
    status: 'pending',
  },
  {
    id: 'cohorts',
    value: 4,
    label: 'Bootcamp cohorts',
    source: 'Company Profile 2026 (pitch says 3 — reconcile)',
    status: 'pending',
  },
  {
    id: 'returning',
    value: 17,
    label: 'Returning students',
    source: 'Pitch deck v2',
    status: 'pending',
  },
  {
    id: 'projects',
    value: 35,
    suffix: '+',
    label: 'Student projects built',
    source: 'Pitch deck v2',
    status: 'pending',
  },
  {
    id: 'tracks',
    value: 3,
    label: 'Learning tracks',
    source: 'Company Profile 2026',
    status: 'confirmed',
  },
];
