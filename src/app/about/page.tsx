import type { Metadata } from 'next';

import { PageStub } from '@/components/sections/PageStub';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <PageStub
      index="05"
      label="About"
      title="ABOUT"
      lead="A Nigerian technology company, founded in 2025 in Sokoto, building education technology and proving it in real classrooms."
    />
  );
}
