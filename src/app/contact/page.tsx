import type { Metadata } from 'next';

import { PageStub } from '@/components/sections/PageStub';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <PageStub
      index="07"
      label="Contact"
      title="CONTACT"
      lead="Tell us what you are trying to build, or which school you would like us to visit."
    />
  );
}
