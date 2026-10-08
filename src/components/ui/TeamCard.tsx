import NextImage from 'next/image';

import { PendingBadge } from '@/components/ui/PendingBadge';
import { img } from '@/content/images';
import { initialsOf, type TeamMember } from '@/content/team';
import { STAR_BLADES, STAR_VIEWBOX } from '@/lib/star';
import { cn } from '@/lib/utils';

/**
 * Stands in for a portrait where no photograph exists. It is a designed tile
 * with the person's initials, not a grey placeholder.
 */
function PortraitTile({ name }: { name: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-4/5 w-full items-center justify-center overflow-hidden bg-navy"
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
      {/*
        Not t-display-l: that sets line-height 0.88, and Mango's caps are taller
        than their line box, so the initials were cut off at the top. A normal
        line-height and a size tied to the tile keep them whole at every width.
      */}
      <span className="relative font-display text-[clamp(2.5rem,7vw,5rem)] leading-[1.2] font-semibold text-paper/90">
        {initialsOf(name)}
      </span>
    </div>
  );
}

/**
 * The photographs come from mixed sources, so a single treatment holds them
 * together: desaturated with a blue cast at rest, full colour on hover or
 * keyboard focus.
 */
export function TeamPortrait({ member }: { member: TeamMember }) {
  if (!member.photo) return <PortraitTile name={member.name} />;
  const image = img(member.photo);

  return (
    <div className="group/portrait relative aspect-4/5 w-full overflow-hidden bg-navy">
      <NextImage
        src={image.file}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 768px) 30vw, 100vw"
        loading="lazy"
        placeholder={image.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={image.blurDataURL ?? undefined}
        className={cn(
          'h-full w-full object-cover object-top',
          'grayscale transition-[filter] duration-[400ms] ease-out',
          'group-hover/portrait:grayscale-0 group-focus-within/portrait:grayscale-0',
        )}
      />
      {/* The blue cast, lifted with the grayscale on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-navy/25 mix-blend-color transition-opacity duration-[400ms] ease-out group-hover/portrait:opacity-0 group-focus-within/portrait:opacity-0"
      />
    </div>
  );
}

export function TeamCard({ member, className }: { member: TeamMember; className?: string }) {
  return (
    <article className={cn('flex flex-col gap-5', className)}>
      <TeamPortrait member={member} />
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
