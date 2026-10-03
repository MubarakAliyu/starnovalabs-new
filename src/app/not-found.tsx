import type { Metadata } from 'next';

import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <Chapter theme="navy" className="pt-[calc(var(--header-h)+clamp(64px,10vw,140px))]">
      <Container>
        <SectionLabel index="404" label="Not found" theme="dark" className="mb-12 max-w-2xl" />
        <RevealText as="h1" variant="hero" className="t-display-xxl">
          404
        </RevealText>
        <div className="grid-page mt-12">
          <div className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-7">
            <RevealText as="p" variant="words" className="t-lead text-paper/80">
              This page drifted out of orbit.
            </RevealText>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button href="/" variant="accent" size="lg" arrow>
                Back to home
              </Button>
              <Button href="/kids-in-tech" variant="secondary" size="md" arrow>
                Kids in Tech
              </Button>
              <Button href="/products" variant="secondary" size="md" arrow>
                Products
              </Button>
              <Button href="/contact" variant="secondary" size="md" arrow>
                Contact
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Chapter>
  );
}
