import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { PendingBadge } from '@/components/ui/PendingBadge';
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

        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {leads.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>

        {programme.length > 0 ? (
          <div className="mt-24">
            <h3 className="t-label mb-8 text-body">{about.leadershipSection.programmeHeading}</h3>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {programme.map((member) => (
                <li key={member.name} className="border-t border-line pt-4">
                  <p className="t-h3 text-[1.25rem]">
                    {member.name}
                    <PendingBadge item={member} />
                  </p>
                  <p className="t-small text-body">{member.role}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </Chapter>
  );
}
