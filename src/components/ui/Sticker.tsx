import { cn } from '@/lib/utils';

type StickerFill = 'gold' | 'blue' | 'white' | 'ink';

const FILLS: Record<StickerFill, string> = {
  // Gold carries ink text only — gold on paper fails contrast.
  gold: 'bg-gold text-ink',
  blue: 'bg-blue text-white',
  white: 'bg-white text-ink ring-1 ring-line',
  ink: 'bg-ink text-white',
};

interface StickerProps {
  fill?: StickerFill;
  /** Degrees, kept between -4 and 4. */
  rotate?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * The code-tag label (Master §4) — mono type, slightly rotated, rare and
 * loud. Copy uses the KIT idiom: <build/>, { learn }, [ live ], est. 2025.
 */
export function Sticker({ fill = 'gold', rotate = -3, className, children }: StickerProps) {
  const angle = Math.max(-4, Math.min(4, rotate));
  return (
    <span
      data-sticker
      style={{ '--sticker-rotate': `${angle}deg` } as React.CSSProperties}
      className={cn(
        't-label inline-flex items-center rounded-[4px] px-[10px] py-[6px]',
        FILLS[fill],
        className,
      )}
    >
      {children}
    </span>
  );
}
