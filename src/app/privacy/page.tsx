import type { Metadata } from 'next';

import { PageStub } from '@/components/sections/PageStub';

export const metadata: Metadata = {
  title: 'Privacy',
};

export default function PrivacyPage() {
  return (
    <PageStub
      index="09"
      label="Legal"
      title="PRIVACY"
      lead="What we collect, why we collect it, and how long we keep it."
    />
  );
}
