import type { Metadata } from 'next';

import { PageStub } from '@/components/sections/PageStub';

export const metadata: Metadata = {
  title: 'Kids in Tech',
};

export default function KidsInTechPage() {
  return (
    <PageStub
      index="01"
      label="Programme"
      title="KIDS IN TECH"
      lead="Project-based STEM bootcamps for children, delivered through partner schools across Scratch programming, web development and robotics."
    />
  );
}
