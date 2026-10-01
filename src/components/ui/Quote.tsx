import { PendingBadge } from '@/components/ui/PendingBadge';
import type { Testimonial } from '@/content/testimonials';
import { cn } from '@/lib/utils';

interface QuoteProps {
  testimonial: Testimonial;
  theme?: 'light' | 'dark';
  className?: string;
}

/** A testimonial, marked up as a real figure so the attribution is linked. */
export function Quote({ testimonial, theme = 'dark', className }: QuoteProps) {
  return (
    <figure className={cn('flex max-w-[52ch] flex-col gap-5', className)}>
      <blockquote className="t-lead">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className={cn('t-label', theme === 'dark' ? 'text-paper/60' : 'text-body')}>
        {testimonial.attribution}
        <PendingBadge item={testimonial} />
      </figcaption>
    </figure>
  );
}
