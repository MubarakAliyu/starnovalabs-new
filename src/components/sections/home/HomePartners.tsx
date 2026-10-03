import NextImage from 'next/image';

import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { Marquee } from '@/components/motion/Marquee';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { img } from '@/content/images';
import { partners } from '@/content/partners';
import { publishable } from '@/lib/content';

/**
 * The marks of the organisations we work with. It only appears once at least
 * three have confirmed in writing; until then the section is omitted rather
 * than padded out.
 */
export function HomePartners() {
  const visible = publishable(partners);
  if (visible.length < 3) return null;

  return (
    <Chapter theme="paper" tight>
      <Container>
        <SectionLabel index="05" label="Who we work with" className="mb-12" />
      </Container>

      <div className="relative">
        <Marquee
          ariaLabel={`Partners: ${visible.map((partner) => partner.name).join(', ')}`}
          speed={60}
          pausable
          className="full-bleed"
          items={visible.map((partner) => {
            // This section is paper, so prefer the light-background variant.
            const logo = img(partner.logoOnLight ?? partner.logo!);
            return (
              <span
                key={partner.name}
                className="mr-24 flex h-14 shrink-0 items-center md:h-14"
              >
                <NextImage
                  src={logo.file}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  sizes="220px"
                  loading="lazy"
                  className="h-10 w-auto object-contain opacity-70 grayscale transition-[filter,opacity] duration-300 ease-out hover:opacity-100 hover:grayscale-0 md:h-14"
                />
              </span>
            );
          })}
        />

        {/* The strip fades into the section colour rather than being cut off. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-paper to-transparent md:w-28"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-paper to-transparent md:w-28"
        />
      </div>
    </Chapter>
  );
}
