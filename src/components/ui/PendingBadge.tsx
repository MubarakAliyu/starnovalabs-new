import { isPendingInDev, type Publishable } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * Marks an item that only renders because this is a development build. It
 * returns nothing in production, where such items are filtered out entirely.
 */
export function PendingBadge({ item, className }: { item: Publishable; className?: string }) {
  if (!isPendingInDev(item)) return null;

  return (
    <span
      className={cn(
        't-label ml-2 inline-flex items-center rounded-[4px] bg-error px-[6px] py-[2px] text-[0.625rem] text-white',
        className,
      )}
    >
      Pending
    </span>
  );
}
