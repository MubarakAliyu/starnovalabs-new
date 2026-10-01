import { Counter } from '@/components/motion/Counter';
import { PendingBadge } from '@/components/ui/PendingBadge';
import type { Stat as StatData } from '@/content/stats';
import { cn } from '@/lib/utils';

interface StatProps {
  stat: StatData;
  /** One figure per section gets the gold underline. */
  underline?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
}

/**
 * A single traction figure. The final value is in the server HTML, so it is
 * correct without JavaScript and screen readers never hear it counting.
 */
export function Stat({ stat, underline = false, theme = 'dark', className }: StatProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <span className={cn('t-counter', underline && 'pb-2')}>
        <Counter value={stat.value} suffix={stat.suffix} />
      </span>
      {underline ? (
        <span aria-hidden="true" className="-mt-2 block h-[3px] w-16 bg-gold-lit" />
      ) : null}
      <span className={cn('t-label', theme === 'dark' ? 'text-paper/70' : 'text-body')}>
        {stat.label}
        <PendingBadge item={stat} />
      </span>
    </div>
  );
}
