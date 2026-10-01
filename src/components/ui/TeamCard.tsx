import { PendingBadge } from '@/components/ui/PendingBadge';
import { initialsOf, type TeamMember } from '@/content/team';
import { STAR_BLADES, STAR_VIEWBOX } from '@/lib/star';
import { cn } from '@/lib/utils';

/**
 * Stands in for a portrait until a real, consented photograph exists. It is a
 * designed tile with the person's initials, not a grey placeholder.
 */
function PortraitTile({ name }: { name: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-navy"
    >
      <svg
        viewBox={STAR_VIEWBOX}
        fill="none"
        className="absolute -right-[18%] -bottom-[22%] h-[85%] w-auto opacity-30"
      >
        {STAR_BLADES.map((d) => (
          <path key={d} d={d} fill="var(--color-blue-lit)" />
        ))}
      </svg>
      <span className="t-display-l relative text-paper/90">{initialsOf(name)}</span>
    </div>
  );
}

export function TeamCard({ member, className }: { member: TeamMember; className?: string }) {
  return (
    <article className={cn('flex flex-col gap-5', className)}>
      <PortraitTile name={member.name} />
      <div className="flex flex-col gap-2">
        <h3 className="t-h3">
          {member.name}
          <PendingBadge item={member} />
        </h3>
        <p className="t-label text-body">{member.role}</p>
        {member.bio ? <p className="t-body mt-2 text-body">{member.bio}</p> : null}
      </div>
    </article>
  );
}
