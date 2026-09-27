type StickerFill = 'gold' | 'blue' | 'white' | 'ink';

interface HeroSticker {
  text: string;
  fill: StickerFill;
  rotate: number;
}

/**
 * Temporary Home copy for Batch 1 — the full page arrives in Batch 2.
 */
export const home = {
  hero: {
    /** Three lines, set as one h1. */
    lines: ['BUILD', "WHAT'S", 'NEXT.'] as const,
    lead: 'A Nigerian technology company building education technology — proven in real classrooms through Kids in Tech.',
    stickers: [
      { text: '<est. 2025/>', fill: 'gold', rotate: -3 },
      { text: 'Sokoto · Kebbi', fill: 'white', rotate: 2 },
    ] as HeroSticker[],
  },
  marquee: ['Kids in Tech', 'KITOS', 'EduStack', 'SkillStack', 'Studio'] as const,
} as const;
