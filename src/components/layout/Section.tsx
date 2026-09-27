import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';

interface SectionProps {
  tight?: boolean;
  /** Skip the page container, for full-bleed content. */
  bleed?: boolean;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

/** Vertical rhythm inside a Chapter. */
export function Section({ tight, bleed, id, className, children }: SectionProps) {
  const content = bleed ? children : <Container>{children}</Container>;
  return (
    <div id={id} className={cn(tight ? 'section-pad-tight' : undefined, className)}>
      {content}
    </div>
  );
}
