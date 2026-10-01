export interface Partner {
  name: string;
  /** Monochrome SVG or PNG in public/partners, or null until supplied. */
  logo: string | null;
  url?: string;
  /** No partner appears in production without written permission. */
  permission: boolean;
}

/**
 * Carried over from the old site. Every entry stays hidden in production until
 * the organisation confirms in writing and a logo lands in public/partners/.
 * StarNova itself is deliberately not in this list.
 */
export const partners: Partner[] = [
  { name: 'Startup Kebbi', logo: null, permission: false },
  { name: 'GDG Kebbi', logo: null, permission: false },
  { name: 'Greenbox', logo: null, permission: false },
  { name: 'NurAla Learning', logo: null, permission: false },
];
