import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface PageStubProps {
  index: string;
  label: string;
  title: string;
  lead: string;
}

/**
 * The placeholder hero every route ships with until its real page lands in a
 * later batch. It is a designed page, not a blank one.
 */
export function PageStub({ index, label, title, lead }: PageStubProps) {
  return (
    <Chapter theme="paper" className="pt-[calc(var(--header-h)+clamp(64px,10vw,140px))]">
      <Container>
        <SectionLabel index={index} label={label} className="mb-12 max-w-2xl" />
        <RevealText as="h1" variant="hero" className="t-display-xl max-w-[12ch]">
          {title}
        </RevealText>
        <div className="grid-page mt-12">
          <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-7">
            <RevealText as="p" variant="words" className="t-lead text-body">
              {lead}
            </RevealText>
            <div className="mt-10">
              <Button href="/" variant="text-arrow" arrow>
                Back to home
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Chapter>
  );
}
