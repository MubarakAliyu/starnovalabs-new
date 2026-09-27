import { STAR_BLADES, STAR_VIEWBOX } from '@/lib/star';
import { cn } from '@/lib/utils';

interface StarGlyphProps {
  className?: string;
  /** Give it a label when it carries meaning rather than decoration. */
  title?: string;
}

/**
 * One star from the logomark, drawn small — a bullet, a separator, the marker
 * on the active nav item. Always an SVG, never a character (Master §4).
 */
export function StarGlyph({ className, title }: StarGlyphProps) {
  return (
    <svg
      viewBox={STAR_VIEWBOX}
      className={cn('inline-block h-[0.5em] w-[0.5em] shrink-0', className)}
      fill="none"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : 'true'}
    >
      {title ? <title>{title}</title> : null}
      {STAR_BLADES.map((d) => (
        <path key={d} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}
