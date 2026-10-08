'use client';

import { useEffect } from 'react';

import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The digest is what ties this to a server log; the message may not be safe to show.
    console.error('[route error]', error.digest ?? error.message);
  }, [error]);

  return (
    <Chapter theme="ink" className="pt-[calc(var(--header-h)+clamp(64px,10vw,140px))]">
      <Container>
        <SectionLabel index="500" label="Error" theme="dark" className="mb-12 max-w-2xl" />
        <h1 className="t-display-l">Something went wrong.</h1>
        <p className="t-lead mt-10 max-w-[44ch] text-paper/80">
          The page could not be shown. Trying again often fixes it; if it does not, let us know.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-5">
          <Button onClick={reset} variant="primary" size="lg" arrow>
            Try again
          </Button>
          <Button href="/" variant="secondary" size="lg" arrow>
            Back to home
          </Button>
        </div>
      </Container>
    </Chapter>
  );
}
