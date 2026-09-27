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

/** Filled in Batch 2 from the pitch deck and company profile. */
export const stats: Stat[] = [];
