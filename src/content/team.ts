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

/**
 * Photographs are mapped from the owner's confirmed list. Murtala Ishaq, Amina
 * and Abdul Malik have none yet and keep their initials tile. The unused
 * candidate-*.jpg files in the manifest are deliberately not referenced here.
 */
export const team: TeamMember[] = [
  {
    name: 'Aliyu Mubarak',
    role: 'Founder & CEO',
    bio: 'Company direction, strategy, product and curriculum design. Leads the weekly company review and owns the roadmap.',
    group: 'leadership',
    photo: '/images/team/founder-handbook.jpg',
    status: 'confirmed',
  },
  {
    name: 'Murtala Ishaq',
    role: 'Co-Founder & COO',
    bio: 'Operations, partnerships, logistics and programme coordination. Leads external business development and bootcamp delivery.',
    group: 'leadership',
    photo: null,
    status: 'confirmed',
  },
  {
    name: 'Mustapher M. Lawal',
    role: 'Co-Founder & CTO',
    bio: 'Technology direction, product development and technical education. Leads KITOS and the robotics programme.',
    group: 'leadership',
    photo: '/images/team/mustapher.jpg',
    status: 'confirmed',
  },
  // TODO: confirm the spelling of this name before publishing.
  {
    name: 'Faruk Yusuf',
    role: 'Educator, Web Development',
    group: 'programme',
    photo: '/images/team/faruk.jpg',
    status: 'pending',
  },
  // TODO: full names needed for the programme team.
  {
    name: 'Amina',
    role: 'Coordinator, Scratch programme',
    group: 'programme',
    photo: null,
    status: 'pending',
  },
  {
    name: 'Abdul Malik',
    role: 'Coordinator, Scratch programme',
    group: 'programme',
    photo: null,
    status: 'pending',
  },
  {
    name: 'Aisha',
    role: 'Media & Content',
    group: 'programme',
    photo: '/images/team/aisha.jpg',
    status: 'pending',
  },
];

export const leadership = team.filter((member) => member.group === 'leadership');
export const programmeTeam = team.filter((member) => member.group === 'programme');

/** Initials for the BrandGraphic tile that stands in for a missing photo. */
export function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}
