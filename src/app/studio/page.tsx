import type { Metadata } from 'next';

import { PageStub } from '@/components/sections/PageStub';

export const metadata: Metadata = {
  title: 'Studio',
};

export default function StudioPage() {
  return (
    <PageStub
      index="03"
      label="Studio"
      title="STUDIO"
      lead="The same team builds products, brands and web platforms for clients."
    />
  );
}
