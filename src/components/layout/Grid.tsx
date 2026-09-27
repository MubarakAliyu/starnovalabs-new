import { cn } from '@/lib/utils';

/** 4 / 8 / 12 columns with the page gutter (Master §4). */
export function Grid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn('grid-page', className)}>{children}</div>;
}
