import { cn } from '@/lib/utils';

interface SectionLabelProps {
  /** Two digits, e.g. "01". */
  index?: string;
  label: string;
  theme?: 'light' | 'dark';
  className?: string;
}

/** "01 — Label" in mono, with a hairline running to the edge (Master §4). */
export function SectionLabel({ index, label, theme = 'light', className }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <span
        className={cn(
          't-label whitespace-nowrap',
          // white/70 is only 3.33:1 on the blue chapter; /95 clears AA there
          // and is still clearly a label against navy and ink.
          theme === 'dark' ? 'text-white/95' : 'text-body',
        )}
      >
        {index ? `${index} — ` : null}
        {label}
      </span>
      <span
        aria-hidden="true"
        className={cn('h-px flex-1', theme === 'dark' ? 'bg-line-dark' : 'bg-line')}
      />
    </div>
  );
}
