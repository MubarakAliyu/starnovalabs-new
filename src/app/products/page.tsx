import type { Metadata } from 'next';

import { PageStub } from '@/components/sections/PageStub';

export const metadata: Metadata = {
  title: 'Products',
};

export default function ProductsPage() {
  return (
    <PageStub
      index="02"
      label="Products"
      title="PRODUCTS"
      lead="The platforms we build so that what works in one classroom can work in a thousand."
    />
  );
}
