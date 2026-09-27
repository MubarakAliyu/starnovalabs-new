import type { Metadata } from 'next';

import { PageStub } from '@/components/sections/PageStub';

export const metadata: Metadata = {
  title: 'Safeguarding',
};

export default function SafeguardingPage() {
  return (
    <PageStub
      index="08"
      label="Legal"
      title="SAFEGUARDING"
      lead="How we protect the children in our programmes, and what we ask of the adults around them."
    />
  );
}
