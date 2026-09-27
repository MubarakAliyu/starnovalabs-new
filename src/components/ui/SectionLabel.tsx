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
      <span className={cn('t-label whitespace-nowrap', theme === 'dark' ? 'text-white/70' : 'text-body')}>
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
