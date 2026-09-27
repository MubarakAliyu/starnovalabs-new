import type { Metadata } from 'next';

import { PageStub } from '@/components/sections/PageStub';

export const metadata: Metadata = {
  title: 'Partner with us',
};

export default function PartnerPage() {
  return (
    <PageStub
      index="06"
      label="Partnership"
      title="PARTNER WITH US"
      lead="For schools, institutions and organisations who want to bring StarNova programmes to their students."
    />
  );
}
