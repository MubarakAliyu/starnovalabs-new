import type { Status } from '@/lib/content';

export type TeamGroup = 'leadership' | 'programme';

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  group: TeamGroup;
  /** Real photography only; null until a consented photo exists. */
  photo: string | null;
  status: Status;
}

/** Filled in Batch 2. */
export const team: TeamMember[] = [];
