import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Chapter, type ChapterTheme } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { Counter } from '@/components/motion/Counter';
import { Marquee } from '@/components/motion/Marquee';
import { Parallax } from '@/components/motion/Parallax';
import { RevealImage } from '@/components/motion/RevealImage';
import { RevealText } from '@/components/motion/RevealText';
import { StickerPop } from '@/components/motion/StickerPop';
import { Arrow } from '@/components/ui/Arrow';
import { BrandGraphic } from '@/components/ui/BrandGraphic';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';
import { Lockup, Logo, Logomark } from '@/components/ui/Logo';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StarGlyph } from '@/components/ui/StarGlyph';
import { Sticker } from '@/components/ui/Sticker';

export const metadata: Metadata = {
  title: 'Lab',
  robots: { index: false, follow: false },
};

const GLYPH_TEST = 'Ɓɓ Ɗɗ Ƙƙ Ƴƴ ₦ 0123456789 “quotes” — dash';

const SWATCHES = [
  { name: 'ink', hex: '#0A0D12', note: '18.4:1 on paper — body and display' },
  { name: 'navy', hex: '#0B1B2E', note: 'dark section base' },
  { name: 'navy-2', hex: '#102A45', note: 'raised surfaces on navy' },
  { name: 'navy-3', hex: '#16385C', note: 'borders and hover on navy' },
  { name: 'paper', hex: '#F5F9FC', note: 'default light background' },
  { name: 'paper-2', hex: '#EAF2F8', note: 'alternate light band' },
  { name: 'white', hex: '#FFFFFF', note: 'cards on paper' },
  { name: 'blue', hex: '#0074A9', note: '5.2:1 on white — links, chapters, curtain' },
  { name: 'blue-press', hex: '#005F8A', note: 'pressed state' },
  { name: 'blue-lit', hex: '#2C9BD1', note: '5.6:1 on navy — blue ON DARK only' },
  { name: 'blue-soft', hex: '#E4F1F8', note: 'tints and ::selection' },
  { name: 'gold', hex: '#C7972F', note: 'sticker fill only — never text on paper (2.5:1)' },
  { name: 'gold-lit', hex: '#DDB253', note: '8.7:1 on navy' },
  { name: 'body', hex: '#41566B', note: '7.2:1 on paper — secondary text' },
  { name: 'muted', hex: '#77909F', note: '3.2:1 — large text or decoration only' },
  { name: 'line', hex: '#DBE6EE', note: 'hairlines on paper' },
  { name: 'error', hex: '#C8321E', note: 'form errors' },
];

const TYPE_SCALE = [
  { className: 't-display-xxl', label: 't-display-xxl · Mango 600' },
  { className: 't-display-xl', label: 't-display-xl · Mango 600' },
  { className: 't-display-l', label: 't-display-l · Mango 600' },
  { className: 't-h2', label: 't-h2 · Archivo 800 wdth 75' },
  { className: 't-h3', label: 't-h3 · Archivo 700 wdth 85' },
  { className: 't-lead', label: 't-lead · Inter 500' },
  { className: 't-body', label: 't-body · Inter 400' },
  { className: 't-small', label: 't-small · Inter 400' },
  { className: 't-label', label: 't-label · JetBrains Mono 600' },
];

const FONTS = [
  { name: 'Mango Grotesque (display)', className: 'font-display text-4xl' },
  { name: 'Archivo (heading)', className: 'font-heading text-2xl' },
  { name: 'Inter (text)', className: 'font-text text-xl' },
  { name: 'JetBrains Mono (mono)', className: 'font-mono text-lg' },
];

const CHAPTER_THEMES: ChapterTheme[] = ['paper', 'paper-2', 'navy', 'blue', 'ink'];

function LabSection({
  index,
  title,
  dark,
  children,
}: {
  index: string;
  title: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="py-16">
      <SectionLabel index={index} label={title} theme={dark ? 'dark' : 'light'} className="mb-8" />
      {children}
    </div>
  );
}

/**
 * Development-only gallery of every primitive. It 404s in production builds
 * and is marked noindex, so it can never leak into the live site.
 */
export default function LabPage() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <>
      <Chapter theme="paper" className="pt-[calc(var(--header-h)+80px)] pb-0">
        <Container>
          <h1 className="t-display-l">Lab</h1>
          <p className="t-body text-body mt-6">
            Every primitive in Batch 1, in both motion modes. Toggle motion in the footer, or turn
            on the OS reduced-motion setting, and read this page again.
          </p>
        </Container>
      </Chapter>

      <Chapter theme="paper" flush>
        <Container>
          <LabSection index="01" title="Colour">
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {SWATCHES.map((swatch) => (
                <li key={swatch.name} className="flex flex-col gap-2">
                  <span
                    className="ring-line block h-20 w-full ring-1"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className="t-label">{swatch.name}</span>
                  <span className="t-small text-body font-mono">{swatch.hex}</span>
                  <span className="t-small text-body">{swatch.note}</span>
                </li>
              ))}
            </ul>
          </LabSection>

          <LabSection index="02" title="Type scale">
            <div className="flex flex-col gap-8">
              {TYPE_SCALE.map((item) => (
                <div key={item.className}>
                  <p className="t-label text-body mb-2">{item.label}</p>
                  <p className={item.className}>Architecting human agency</p>
                </div>
              ))}
            </div>
          </LabSection>

          <LabSection index="03" title="Glyph test">
            <p className="t-small text-body mb-6">
              Mango Grotesque has no Hausa hooked letters, no naira sign and no arrows — those fall
              back to Archivo. No box should appear in any row.
            </p>
            <div className="flex flex-col gap-6">
              {FONTS.map((font) => (
                <div key={font.name}>
                  <p className="t-label text-body mb-2">{font.name}</p>
                  <p className={font.className}>{GLYPH_TEST}</p>
                </div>
              ))}
            </div>
          </LabSection>

          <LabSection index="04" title="Buttons">
            <div className="flex flex-wrap items-center gap-6">
              <Button variant="solid-ink" size="md">
                Solid ink · md
              </Button>
              <Button variant="solid-ink" size="lg" arrow>
                Solid ink · lg
              </Button>
              <Button variant="solid-blue" size="md" arrow>
                Solid blue
              </Button>
              <Button variant="outline" size="md">
                Outline
              </Button>
              <Button variant="text-arrow">Text arrow</Button>
              <Button href="/about" variant="solid-ink" size="md" arrow>
                Internal link
              </Button>
              <Button href="https://www.kidsintech.school" variant="outline" size="md" arrow>
                External link
              </Button>
              <Button variant="solid-ink" size="md" disabled>
                Disabled
              </Button>
            </div>
          </LabSection>

          <LabSection index="05" title="Stickers">
            <div className="flex flex-wrap items-center gap-6">
              <Sticker fill="gold" rotate={-3}>
                &lt;est. 2025/&gt;
              </Sticker>
              <Sticker fill="blue" rotate={2}>
                &lt;build/&gt;
              </Sticker>
              <Sticker fill="white" rotate={-2}>
                {'{ learn }'}
              </Sticker>
              <Sticker fill="ink" rotate={4}>
                [ live ]
              </Sticker>
              <StickerPop delay={0}>
                <Sticker fill="gold" rotate={-4}>
                  &lt;ship/&gt; · pops on scroll
                </Sticker>
              </StickerPop>
            </div>
          </LabSection>

          <LabSection index="06" title="Glyphs and marks">
            <div className="flex flex-wrap items-center gap-10">
              <span className="flex items-center gap-3 text-2xl">
                <StarGlyph className="text-gold" /> StarGlyph
              </span>
              <span className="flex items-center gap-3 text-2xl">
                <Arrow /> <Arrow direction="up-right" /> <Arrow direction="down" /> Arrow
              </span>
              <span className="flex items-center gap-3 text-4xl">
                <Logomark color="blue" /> <Logomark color="ink" /> Logomark
              </span>
              <Logo variant="onLight" />
              <Lockup variant="onLight" />
              <Lockup variant="onLight" orientation="stacked" />
            </div>
          </LabSection>

          <LabSection index="07" title="Text reveals">
            <div className="flex flex-col gap-12">
              <RevealText as="h2" variant="lines" className="t-h2 max-w-[18ch]">
                Lines reveal from behind a mask, one after another.
              </RevealText>
              <RevealText as="p" variant="words" className="t-lead text-body max-w-[46ch]">
                Words rise and fade in, for leads and pull quotes.
              </RevealText>
            </div>
          </LabSection>

          <LabSection index="08" title="Counters">
            <div className="flex flex-wrap items-baseline gap-16">
              <span className="t-counter">
                <Counter value={111} />
              </span>
              <span className="t-counter">
                <Counter value={35} suffix="+" />
              </span>
              <span className="t-counter">
                <Counter value={4} />
              </span>
            </div>
            <p className="t-small text-body mt-4">
              Sample values only — real numbers arrive with their sources in Batch 2.
            </p>
          </LabSection>

          <LabSection index="09" title="Image reveal and brand graphics">
            <div className="grid gap-8 sm:grid-cols-3">
              <RevealImage variant="up">
                <BrandGraphic variant="star-crop" theme="navy" />
              </RevealImage>
              <RevealImage variant="left">
                <BrandGraphic variant="blade-field" theme="blue" />
              </RevealImage>
              <RevealImage variant="center">
                <BrandGraphic variant="tile" theme="paper" />
              </RevealImage>
            </div>
          </LabSection>

          <LabSection index="10" title="Parallax">
            <div className="relative grid gap-6 sm:grid-cols-3">
              <Parallax speed={0.1}>
                <BrandGraphic variant="tile" theme="navy" />
                <p className="t-label mt-3">speed 0.1 · type</p>
              </Parallax>
              <Parallax speed={-0.15}>
                <BrandGraphic variant="star-crop" theme="blue" />
                <p className="t-label mt-3">speed -0.15 · overlapping image</p>
              </Parallax>
              <Parallax speed={0.3}>
                <BrandGraphic variant="blade-field" theme="paper" />
                <p className="t-label mt-3">speed 0.3 · sticker</p>
              </Parallax>
            </div>
          </LabSection>

          <LabSection index="11" title="Fields">
            <form className="grid max-w-xl gap-10">
              <Field name="lab-name" label="Full name" required />
              <Field name="lab-email" label="Email" kind="email" />
              <Field
                name="lab-type"
                label="Enquiry"
                kind="select"
                options={[
                  { value: 'school', label: 'School partnership' },
                  { value: 'studio', label: 'Studio project' },
                ]}
              />
              <Field name="lab-message" label="Message" kind="textarea" />
              <Field name="lab-error" label="With an error" error="Enter a valid email address." />
            </form>
          </LabSection>
        </Container>
      </Chapter>

      <Chapter theme="paper-2" tight>
        <Container>
          <SectionLabel index="12" label="Marquee" className="mb-8" />
        </Container>
        <Marquee
          ariaLabel="Kids in Tech, KITOS, EduStack, SkillStack, Studio"
          speed={40}
          pausable
          className="full-bleed"
          items={['Kids in Tech', 'KITOS', 'EduStack', 'SkillStack', 'Studio'].map((word) => (
            <span key={word} className="t-display-l flex items-center gap-10 pr-10 uppercase">
              {word}
              <StarGlyph className="text-blue h-[0.3em] w-[0.3em]" />
            </span>
          ))}
        />
      </Chapter>

      {CHAPTER_THEMES.map((theme, index) => (
        <Chapter key={theme} theme={theme} tight>
          <Container>
            <SectionLabel
              index={String(13 + index)}
              label={`Chapter · ${theme}`}
              theme={theme === 'paper' || theme === 'paper-2' ? 'light' : 'dark'}
              className="mb-8"
            />
            <p className="t-h3">Chapter theme {theme}</p>
            <p className="t-body mt-4 opacity-80">
              The header inverts over this band, and the focus ring changes with it. Tab through the
              link below to check.
            </p>
            <div className="mt-8">
              <Button
                href="/"
                variant={theme === 'navy' || theme === 'ink' ? 'solid-blue' : 'solid-ink'}
                size="md"
                arrow
              >
                Home
              </Button>
            </div>
          </Container>
        </Chapter>
      ))}
    </>
  );
}
