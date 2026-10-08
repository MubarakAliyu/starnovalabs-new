import type { Status } from '@/lib/content';

export type TeamGroup = 'leadership' | 'programme';

/** Personal accounts. A member shows only the ones they have. */
export type TeamSocialType = 'linkedin' | 'instagram' | 'x' | 'website';

export interface TeamSocial {
  type: TeamSocialType;
  url: string;
}

/** The order the marks are always drawn in, whichever ones a member has. */
export const TEAM_SOCIAL_ORDER: TeamSocialType[] = ['linkedin', 'instagram', 'x', 'website'];

export const TEAM_SOCIAL_LABEL: Record<TeamSocialType, string> = {
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  x: 'X',
  website: 'Website',
};

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  group: TeamGroup;
  /** Real photography only; null until a consented photo exists. */
  photo: string | null;
  /** Owner-supplied personal accounts. Omitted where there are none. */
  socials?: TeamSocial[];
  status: Status;
}

/**
 * Photographs are mapped from the owner's confirmed list. Murtala Ishaq, Amina
 * Hassan and Abdulmalik M. Yahaya have none yet and keep their initials tile.
 *
 * Social accounts are the people's own, supplied by the owner. Anyone without
 * them simply renders no icon row.
 */
export const team: TeamMember[] = [
  {
    name: 'Aliyu Mubarak',
    role: 'Founder & CEO',
    bio: 'Company direction, strategy, product and curriculum design. Leads the weekly company review and owns the roadmap.',
    group: 'leadership',
    photo: '/images/team/aliyu-mubarak.jpg',
    socials: [
      { type: 'linkedin', url: 'https://www.linkedin.com/in/aliyu-mubarak-a080b0196/' },
      { type: 'instagram', url: 'https://www.instagram.com/aliyumubarak.ui' },
      { type: 'x', url: 'https://x.com/aliyumubarak_ui' },
      { type: 'website', url: 'https://www.aliyumubarak.me/' },
    ],
    status: 'confirmed',
  },
  {
    name: 'Murtala Ishaq',
    role: 'Co-Founder & COO',
    bio: 'Operations, partnerships, logistics and programme coordination. Leads external business development and bootcamp delivery.',
    group: 'leadership',
    photo: null,
    socials: [
      { type: 'linkedin', url: 'https://www.linkedin.com/in/murtala-ishaq-24a550246/' },
      { type: 'instagram', url: 'https://www.instagram.com/murtala_legitcoolcat/' },
      { type: 'x', url: 'https://x.com/Thelegitcoolcat' },
    ],
    status: 'confirmed',
  },
  {
    name: 'Mustapher M. Lawal',
    role: 'Co-Founder & CTO',
    bio: 'Technology direction, product development and technical education. Leads KITOS and the robotics programme.',
    group: 'leadership',
    photo: '/images/team/mustapher.jpg',
    socials: [
      { type: 'linkedin', url: 'https://www.linkedin.com/in/mustapha-muhammad-lawal-a229312a4/' },
      { type: 'instagram', url: 'https://www.instagram.com/themustaphalawal/' },
    ],
    status: 'confirmed',
  },
  {
    name: 'Faruk Yusuf',
    role: 'Educator, Web Development',
    group: 'programme',
    photo: '/images/team/faruk.jpg',
    status: 'confirmed',
  },
  {
    name: 'Amina Hassan',
    role: 'Coordinator, Scratch programme',
    group: 'programme',
    photo: null,
    status: 'confirmed',
  },
  {
    name: 'Abdulmalik M. Yahaya',
    role: 'Coordinator, Scratch programme',
    group: 'programme',
    photo: null,
    status: 'confirmed',
  },
  {
    name: 'Aisha Zakari',
    role: 'Media & Content',
    group: 'programme',
    photo: '/images/team/aisha.jpg',
    status: 'confirmed',
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
