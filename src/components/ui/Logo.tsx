import Image from 'next/image';

import { STAR_TILE_PATH, STAR_VIEWBOX } from '@/lib/star';
import { cn } from '@/lib/utils';

interface LogoProps {
  /** onLight uses the ink wordmark, onDark the white one. */
  variant?: 'onLight' | 'onDark';
  priority?: boolean;
  className?: string;
}

/**
 * The horizontal lockup — the blue star tile beside the two-line wordmark.
 * Always the supplied SVG: never re-typeset, never recoloured beyond the two
 * provided variants (Master §6). Set 34px tall on mobile and 40px on desktop,
 * which keeps the mark above its 120px minimum width and preserves the clear
 * space built into the artwork.
 */
export function Logo({ variant = 'onLight', priority = false, className }: LogoProps) {
  const src =
    variant === 'onDark'
      ? '/brand/lockup-horizontal-light.svg'
      : '/brand/lockup-horizontal.svg';
  return (
    <Image
      src={src}
      alt="StarNova Labs"
      width={519}
      height={103}
      priority={priority}
      className={cn('h-[34px] w-auto md:h-10', className)}
    />
  );
}

interface LogomarkProps {
  /** Tile colour. The star itself is the negative space. */
  color?: 'blue' | 'ink' | 'white';
  className?: string;
  title?: string;
}

const TILE_FILL: Record<NonNullable<LogomarkProps['color']>, string> = {
  blue: 'var(--color-blue)',
  ink: 'var(--color-ink)',
  white: 'var(--color-white)',
};

/**
 * The tile mark, inlined so it can sit inside a headline as a typographic
 * glyph and take its size from the type around it. Minimum width 24px.
 */
export function Logomark({ color = 'blue', className, title }: LogomarkProps) {
  return (
    <svg
      viewBox={STAR_VIEWBOX}
      className={cn('inline-block h-[1em] w-[1em] shrink-0 align-baseline', className)}
      fill="none"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : 'true'}
    >
      {title ? <title>{title}</title> : null}
      <path d={STAR_TILE_PATH} fill={TILE_FILL[color]} />
    </svg>
  );
}

interface LockupProps {
  variant?: 'onLight' | 'onDark';
  orientation?: 'horizontal' | 'stacked';
  className?: string;
}

/** The full lockup, used in the footer. */
export function Lockup({
  variant = 'onLight',
  orientation = 'horizontal',
  className,
}: LockupProps) {
  const horizontal = orientation === 'horizontal';
  const src = horizontal
    ? variant === 'onDark'
      ? '/brand/lockup-horizontal-light.svg'
      : '/brand/lockup-horizontal.svg'
    : variant === 'onDark'
      ? '/brand/lockup-stacked-light.svg'
      : '/brand/lockup-stacked.svg';

  return (
    <Image
      src={src}
      alt="StarNova Labs"
      width={horizontal ? 519 : 390}
      height={horizontal ? 103 : 283}
      className={cn('h-auto', horizontal ? 'w-[180px]' : 'w-[140px]', className)}
    />
  );
}
