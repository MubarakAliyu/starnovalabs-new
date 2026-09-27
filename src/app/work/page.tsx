import type { Metadata } from 'next';

import { PageStub } from '@/components/sections/PageStub';

export const metadata: Metadata = {
  title: 'Work',
};

export default function WorkPage() {
  return (
    <PageStub
      index="04"
      label="Work"
      title="WORK"
      lead="Selected projects from the studio. Case studies are published only with the client's permission."
    />
  );
}
