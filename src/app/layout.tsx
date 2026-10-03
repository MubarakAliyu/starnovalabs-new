import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SkipLink } from '@/components/layout/SkipLink';
import { Curtain } from '@/components/motion/Curtain';
import { Loader } from '@/components/motion/Loader';
import {
  MotionProvider,
  loaderCriticalCss,
  motionBootstrapScript,
} from '@/components/motion/MotionProvider';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';
import { TransitionProvider } from '@/components/motion/TransitionProvider';
import { fontVariables } from '@/app/fonts';
import { site } from '@/content/site';

import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.starnovalabs.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'StarNova Labs — Architecting Human Agency',
    template: '%s — StarNova Labs',
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: 'StarNova Labs — Architecting Human Agency',
    description: site.description,
    url: siteUrl,
    locale: 'en_NG',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B1B2E',
  colorScheme: 'light',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // The bootstrap script rewrites data-motion before hydration, which is the
    // whole point of it — so this one element's attributes are expected to
    // differ from the server HTML.
    <html lang="en" className={fontVariables} data-motion="full" suppressHydrationWarning>
      <head>
        {/* Styles the overlay before the stylesheet arrives, so the first
            paint of a fresh session is the loader and never the page. */}
        <style dangerouslySetInnerHTML={{ __html: loaderCriticalCss }} />
        {/* Resolves motion and the intro decision before the first paint. */}
        <script dangerouslySetInnerHTML={{ __html: motionBootstrapScript }} />
        <noscript>
          {/* Without JavaScript the loader would never leave. */}
          <style>{`[data-loader]{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>
          <SmoothScroll>
            <TransitionProvider>
              <SkipLink />
              <SiteHeader />
              <main id="main" tabIndex={-1}>
                {children}
              </main>
              <SiteFooter />
              <Curtain />
              <Loader />
            </TransitionProvider>
          </SmoothScroll>
        </MotionProvider>
        <OrganizationJsonLd />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
