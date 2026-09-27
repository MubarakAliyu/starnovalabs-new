import type { Status } from '@/lib/content';

export interface SocialLink {
  /** Platform name as it should be read aloud. */
  label: string;
  /** A real URL. Entries without one are never rendered — no '#' placeholders. */
  url: string;
}

export const site = {
  name: 'StarNova Labs',
  legalName: 'StarNova Labs Ltd',
  tagline: 'Architecting Human Agency',
  description:
    'StarNova Labs is a Nigerian technology company building education technology — proven in real classrooms through Kids in Tech.',
  email: 'info@starnovalabs.com',
  phones: ['+234 906 098 5201', '+234 706 783 4186'],
  location: { value: 'Sokoto, Nigeria', status: 'pending' as Status },
  hours: { value: 'Mon–Fri, 9:00–17:00 WAT', status: 'pending' as Status },
  founded: 2025,
  /** Empty until real profile URLs are supplied. */
  socials: [] as SocialLink[],
} as const;

/** tel: needs the number without spaces. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, '')}`;
}
