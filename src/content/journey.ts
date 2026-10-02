import type { Status } from '@/lib/content';

export interface JourneyItem {
  title: string;
  state: 'achieved' | 'in-progress';
  status: Status;
  /** Public path of a thumbnail, where one fits the milestone. */
  thumbnail?: string;
}

/** No dates until they are supplied — the order carries the story. */
export const journey: JourneyItem[] = [
  {
    title: 'Kids in Tech established',
    state: 'achieved',
    status: 'confirmed',
    thumbnail: '/images/coding/mentor-at-laptop.jpg',
  },
  {
    title: 'Multiple cohorts delivered',
    state: 'achieved',
    status: 'confirmed',
    thumbnail: '/images/groups/cohort-kebbi-outdoor.jpg',
  },
  { title: 'kidsintech.school launched', state: 'achieved', status: 'confirmed' },
  {
    title: 'KITOS LMS built',
    state: 'achieved',
    status: 'confirmed',
    thumbnail: '/images/kitos/kitos-2.png',
  },
  {
    title: 'Team expanded beyond the founders',
    state: 'achieved',
    status: 'confirmed',
    thumbnail: '/images/classroom/instructors-together.jpg',
  },
  {
    title: 'Robotics track introduced (Bootcamp 4.0)',
    state: 'achieved',
    status: 'confirmed',
    thumbnail: '/images/projects/robotics-arduino.jpg',
  },
  { title: 'Company formalisation', state: 'in-progress', status: 'confirmed' },
  { title: 'Product portfolio expansion', state: 'in-progress', status: 'confirmed' },
];
