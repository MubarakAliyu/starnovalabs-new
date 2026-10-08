import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/seo';

import { CTASection } from '@/components/sections/CTASection';
import { HomeConnects } from '@/components/sections/home/HomeConnects';
import { HomeHero } from '@/components/sections/home/HomeHero';
import { HomeInside } from '@/components/sections/home/HomeInside';
import { HomeKitos } from '@/components/sections/home/HomeKitos';
import { HomeManifesto } from '@/components/sections/home/HomeManifesto';
import { HomeMarquee } from '@/components/sections/home/HomeMarquee';
import { HomePartners } from '@/components/sections/home/HomePartners';
import { HomePortfolio } from '@/components/sections/home/HomePortfolio';
import { HomeProof } from '@/components/sections/home/HomeProof';
import { HomeStudio } from '@/components/sections/home/HomeStudio';
import { home } from '@/content/home';

export const metadata: Metadata = buildMetadata({
  title: 'StarNova Labs — Architecting Human Agency',
  description:
    'A Nigerian technology company building education technology — proven in real classrooms through Kids in Tech.',
  path: '/',
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeMarquee />
      <HomeManifesto />
      <HomeProof />
      <HomeConnects />
      <HomeKitos />
      <HomePortfolio />
      <HomeStudio />
      <HomePartners />
      <HomeInside />
      <CTASection
        headline={home.closing.headline}
        actions={home.closing.actions}
        backgroundImage="/images/groups/parents-and-team.jpg"
      />
    </>
  );
}
