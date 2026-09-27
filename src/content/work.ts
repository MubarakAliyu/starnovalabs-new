import type { Status } from '@/lib/content';

export interface WorkItem {
  slug: string;
  client: string;
  title: string;
  services: string[];
  year?: number;
  /** A client must agree before their name or mark appears. */
  permission: boolean;
  status: Status;
}

/** Filled in Batch 3. */
export const work: WorkItem[] = [];
