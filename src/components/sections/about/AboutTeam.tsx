import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TeamCard } from '@/components/ui/TeamCard';
import { about } from '@/content/about';
import { leadership, programmeTeam } from '@/content/team';
import { publishable } from '@/lib/content';

export function AboutTeam() {
  const leads = publishable(leadership);
  const programme = publishable(programmeTeam);

  return (
    <Chapter theme="paper-2">
      <Container>
        <SectionLabel index="04" label={about.leadershipSection.label} className="mb-14" />
        <RevealText as="h2" variant="lines" className="t-display-m mb-20 max-w-[16ch]">
          {about.leadershipSection.heading}
        </RevealText>

        {/* Three across from md. The programme grid below uses the same gaps
            and the same container, so the two line up edge to edge. */}
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
          {leads.map((member) => (
            <TeamCard
              key={member.name}
              member={member}
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          ))}
        </div>

        {programme.length > 0 ? (
          <div className="mt-24">
            <h3 className="t-label mb-8 text-body">{about.leadershipSection.programmeHeading}</h3>
            {/* The same card as the leadership, at the same width: one per row
                on mobile, two across on tablet, four on desktop. Nothing caps
                the portrait, so a card here is exactly as wide as a card above. */}
            <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
              {programme.map((member) => (
                <li key={member.name}>
                  <TeamCard
                    member={member}
                    as="h4"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </Chapter>
  );
}
