import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { img } from '@/content/images';

interface CTAAction {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'accent' | 'solid-blue' | 'outline' | 'solid-ink';
}

interface CTASectionProps {
  headline: string;
  actions: readonly CTAAction[];
  /** Display scale for the closing line. */
  size?: 'xl' | 'l';
  /**
   * Public path of a photograph to sit behind the band. An ink veil at 0.82
   * goes over it, which keeps paper text above 7:1 across the frame.
   */
  backgroundImage?: string;
}

/**
 * The closing call to action — the one centred composition a page is allowed
 * (Master §4).
 */
export function CTASection({
  headline,
  actions,
  size = 'xl',
  backgroundImage,
}: CTASectionProps) {
  return (
    <Chapter theme="ink" className={backgroundImage ? 'relative overflow-hidden' : undefined}>
      {backgroundImage ? (
        <div aria-hidden="true" className="absolute inset-0">
          <Photo
            image={img(backgroundImage)}
            sizes="100vw"
            reveal={false}
            parallax={0.12}
            className="h-full"
            wrapperClassName="h-full"
          />
          <span className="absolute inset-0 bg-ink/[0.82]" />
        </div>
      ) : null}

      <Container className="relative flex flex-col items-center text-center">
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
