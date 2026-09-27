import { STAR_BLADES, STAR_TILE_PATH, STAR_VIEWBOX } from '@/lib/star';
import { cn } from '@/lib/utils';

type BrandGraphicVariant = 'star-crop' | 'blade-field' | 'tile';
type BrandGraphicTheme = 'navy' | 'blue' | 'paper';

const THEMES: Record<BrandGraphicTheme, { bg: string; mark: string }> = {
  navy: { bg: 'bg-navy', mark: 'var(--color-blue-lit)' },
  blue: { bg: 'bg-blue', mark: 'var(--color-white)' },
  paper: { bg: 'bg-paper-2', mark: 'var(--color-blue)' },
};

interface BrandGraphicProps {
  variant?: BrandGraphicVariant;
  theme?: BrandGraphicTheme;
  className?: string;
}

/**
 * What goes where a photograph would, until a real one exists (Master §6).
 * These are designed compositions built from the logomark — never a grey box,
 * and never stock imagery.
 */
export function BrandGraphic({
  variant = 'star-crop',
  theme = 'navy',
  className,
}: BrandGraphicProps) {
  const { bg, mark } = THEMES[theme];

  return (
    <div
      aria-hidden="true"
      className={cn('relative aspect-4/3 w-full overflow-hidden', bg, className)}
    >
      {variant === 'star-crop' ? (
        <svg
          viewBox={STAR_VIEWBOX}
          fill="none"
          className="absolute -top-[18%] -right-[22%] h-[150%] w-auto"
        >
          {STAR_BLADES.map((d) => (
            <path key={d} d={d} fill={mark} />
          ))}
        </svg>
      ) : null}

      {variant === 'blade-field' ? (
        <div className="absolute inset-0 grid grid-cols-4 gap-px opacity-80 sm:grid-cols-6">
          {Array.from({ length: 24 }).map((_, index) => (
            <svg
              key={index}
              viewBox={STAR_VIEWBOX}
              fill="none"
              className="h-full w-full"
              style={{ rotate: `${(index % 4) * 90}deg`, opacity: 0.25 + (index % 5) * 0.15 }}
            >
              <path d={STAR_BLADES[index % 4]} fill={mark} />
            </svg>
          ))}
        </div>
      ) : null}

      {variant === 'tile' ? (
        <svg
          viewBox={STAR_VIEWBOX}
          fill="none"
          className="absolute top-1/2 left-1/2 h-[55%] w-auto -translate-x-1/2 -translate-y-1/2"
        >
          <path d={STAR_TILE_PATH} fill={mark} />
        </svg>
      ) : null}
    </div>
  );
}
