export interface Partner {
  name: string;
  /** Monochrome SVG in public/brand/partners, or null until supplied. */
  logo: string | null;
  url?: string;
  /** No partner appears in production without written permission. */
  permission: boolean;
}

/** Filled in Batch 2 from the old site, all with permission: false. */
export const partners: Partner[] = [];
