import { cn } from '@/lib/utils';

type ArrowDirection = 'right' | 'up-right' | 'down' | 'left';

const ROTATION: Record<ArrowDirection, string> = {
  right: 'rotate-0',
  'up-right': '-rotate-45',
  down: 'rotate-90',
  left: 'rotate-180',
};

interface ArrowProps {
  direction?: ArrowDirection;
  className?: string;
}

/**
 * The house arrow, drawn to Archivo's stroke weight. On hover it turns to the
 * star's 45° diagonal — the rotation lives on the parent, via group-hover.
 */
export function Arrow({ direction = 'right', className }: ArrowProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn(
        'h-[1em] w-[1em] shrink-0 transition-transform duration-300 ease-out',
        ROTATION[direction],
        className,
      )}
    >
      <path
        d="M4 12h15M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
