import type { Metadata } from 'next';

import { CTASection } from '@/components/sections/CTASection';
import { HomeConnects } from '@/components/sections/home/HomeConnects';
import { HomeHero } from '@/components/sections/home/HomeHero';
import { HomeKitos } from '@/components/sections/home/HomeKitos';
import { HomeManifesto } from '@/components/sections/home/HomeManifesto';
import { HomeMarquee } from '@/components/sections/home/HomeMarquee';
import { HomePartners } from '@/components/sections/home/HomePartners';
import { HomePortfolio } from '@/components/sections/home/HomePortfolio';
import { HomeProof } from '@/components/sections/home/HomeProof';
import { HomeStudio } from '@/components/sections/home/HomeStudio';
import { home } from '@/content/home';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: { absolute: 'StarNova Labs — Architecting Human Agency' },
  description: site.description,
};

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
      <CTASection headline={home.closing.headline} actions={home.closing.actions} />
    </>
  );
}
