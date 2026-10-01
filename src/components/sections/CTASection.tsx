import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { Button } from '@/components/ui/Button';

interface CTAAction {
  label: string;
  href: string;
  variant: 'solid-blue' | 'outline' | 'solid-ink';
}

interface CTASectionProps {
  headline: string;
  actions: readonly CTAAction[];
  /** Display scale for the closing line. */
  size?: 'xl' | 'l';
}

/**
 * The closing call to action — the one centred composition a page is allowed
 * (Master §4).
 */
export function CTASection({ headline, actions, size = 'xl' }: CTASectionProps) {
  return (
    <Chapter theme="ink">
      <Container className="flex flex-col items-center text-center">
        <RevealText
          as="h2"
          variant="lines"
          className={`${size === 'xl' ? 't-display-xl' : 't-display-l'} max-w-[16ch]`}
        >
          {headline}
        </RevealText>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-5">
          {actions.map((action) => (
            <Button
              key={action.href}
              href={action.href}
              variant={action.variant}
              size="lg"
              arrow
            >
              {action.label}
            </Button>
          ))}
        </div>
      </Container>
    </Chapter>
  );
}
