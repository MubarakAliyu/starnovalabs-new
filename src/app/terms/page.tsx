import type { Metadata } from 'next';

import { PageStub } from '@/components/sections/PageStub';

export const metadata: Metadata = {
  title: 'Terms',
};

export default function TermsPage() {
  return (
    <PageStub
      index="10"
      label="Legal"
      title="TERMS"
      lead="The terms that apply to this website and to the services we provide through it."
    />
  );
}
