export interface Partner {
  name: string;
  /** Public path of the logo, or null until one is supplied. */
  logo: string | null;
  /** A light-background variant, where the mark needs one. */
  logoOnLight?: string;
  url?: string;
  /** No partner appears in production without written permission. */
  permission: boolean;
}

/**
 * Confirmed by the owner, who has given permission to show these marks.
 * NurAla Learning is not here: it is a StarNova product, listed in products.ts.
 */
export const partners: Partner[] = [
  {
    name: 'GDG Birnin-Kebbi',
    logo: '/logos/partners/gdg-birnin-kebbi.png',
    permission: true,
  },
  {
    name: 'Startup Kebbi',
    logo: '/logos/partners/startup-kebbi-onDark.png',
    logoOnLight: '/logos/partners/startup-kebbi-onLight.png',
    permission: true,
  },
  {
    name: 'HiB Greenbox',
    logo: '/logos/partners/hib-greenbox.png',
    permission: true,
  },
  {
    name: 'Starok Design School',
    logo: '/logos/partners/starok-design-school.png',
    permission: true,
  },
];
