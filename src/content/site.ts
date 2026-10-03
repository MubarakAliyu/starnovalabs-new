import type { Status } from '@/lib/content';

/** Which account an profile belongs to — they are not all StarNova's. */
export type SocialOwner = 'starnova' | 'kids-in-tech';

export type SocialPlatform = 'linkedin' | 'x' | 'instagram' | 'youtube';

export interface SocialLink {
  /** Platform name as it should be read aloud. */
  label: string;
  platform: SocialPlatform;
  /** A real URL. Entries without one are never rendered — no '#' placeholders. */
  url: string;
  owner: SocialOwner;
}

export const site = {
  name: 'StarNova Labs',
  legalName: 'StarNova Labs Ltd',
  tagline: 'Architecting Human Agency',
  description:
    'StarNova Labs is a Nigerian technology company building education technology — proven in real classrooms through Kids in Tech.',
  email: 'info@starnovalabs.com',
  phones: ['+234 906 098 5201', '+234 706 783 4186'],
  location: { value: 'Sokoto, Nigeria', status: 'confirmed' as Status },
  hours: { value: 'Mon–Fri, 9:00–17:00 WAT', status: 'pending' as Status },
  founded: 2025,
  socials: [
    {
      label: 'LinkedIn',
      platform: 'linkedin',
      url: 'https://www.linkedin.com/company/starnova-labs/',
      owner: 'starnova',
    },
    {
      label: 'X',
      platform: 'x',
      url: 'https://x.com/kidsintechkb',
      owner: 'kids-in-tech',
    },
    {
      label: 'Instagram',
      platform: 'instagram',
      url: 'https://www.instagram.com/kidsintechkb',
      owner: 'kids-in-tech',
    },
    {
      label: 'YouTube',
      platform: 'youtube',
      url: 'https://www.youtube.com/@kidsintech.school',
      owner: 'kids-in-tech',
    },
  ] as SocialLink[],
} as const;

/** The display name of whichever account a profile belongs to. */
export const SOCIAL_OWNER_NAME: Record<SocialOwner, string> = {
  starnova: 'StarNova Labs',
  'kids-in-tech': 'Kids in Tech',
};

export function socialsFor(owner: SocialOwner) {
  return site.socials.filter((social) => social.owner === owner);
}

/** tel: needs the number without spaces. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, '')}`;
}
