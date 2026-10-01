import type { Status } from '@/lib/content';

export interface JourneyItem {
  title: string;
  state: 'achieved' | 'in-progress';
  status: Status;
}

/** No dates until they are supplied — the order carries the story. */
export const journey: JourneyItem[] = [
  { title: 'Kids in Tech established', state: 'achieved', status: 'confirmed' },
  { title: 'Multiple cohorts delivered', state: 'achieved', status: 'confirmed' },
  { title: 'kidsintech.school launched', state: 'achieved', status: 'confirmed' },
  { title: 'KITOS LMS built', state: 'achieved', status: 'confirmed' },
  { title: 'Team expanded beyond the founders', state: 'achieved', status: 'confirmed' },
  { title: 'Robotics track introduced (Bootcamp 4.0)', state: 'achieved', status: 'confirmed' },
  { title: 'Company formalisation', state: 'in-progress', status: 'confirmed' },
  { title: 'Product portfolio expansion', state: 'in-progress', status: 'confirmed' },
];
