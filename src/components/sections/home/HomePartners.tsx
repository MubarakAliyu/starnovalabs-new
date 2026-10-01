import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { Marquee } from '@/components/motion/Marquee';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { partners } from '@/content/partners';
import { publishable } from '@/lib/content';

/**
 * Only appears once at least three partners have confirmed in writing. Until
 * then the section is omitted rather than filled with placeholders.
 */
export function HomePartners() {
  const visible = publishable(partners);
  if (visible.length < 3) return null;

  return (
    <Chapter theme="paper" tight>
      <Container>
        <SectionLabel index="04" label="Who we work with" className="mb-12" />
      </Container>
      <Marquee
        ariaLabel={`Partners: ${visible.map((partner) => partner.name).join(', ')}`}
        speed={60}
        pausable
        className="full-bleed"
        items={visible.map((partner) => (
          <span key={partner.name} className="t-h3 flex items-center pr-16 text-body">
            {partner.name}
          </span>
        ))}
      />
    </Chapter>
  );
}
