import NextImage from 'next/image';

import { PendingBadge } from '@/components/ui/PendingBadge';
import { TeamSocials } from '@/components/ui/TeamSocials';
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
export function TeamPortrait({ member, sizes }: { member: TeamMember; sizes: string }) {
  if (!member.photo) return <PortraitTile name={member.name} />;
  const image = img(member.photo);

  return (
    <div className="group/portrait relative aspect-4/5 w-full overflow-hidden bg-navy">
      <NextImage
        src={image.file}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
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

export function TeamCard({
  member,
  sizes,
  /** Programme members sit under their own label, so their names are h4s. */
  as: NameTag = 'h3',
  className,
}: {
  member: TeamMember;
  sizes: string;
  as?: 'h3' | 'h4';
  className?: string;
}) {
  return (
    <article className={cn('flex flex-col gap-5', className)}>
      <TeamPortrait member={member} sizes={sizes} />
      <div className="flex flex-col gap-2">
        {/*
          The row sits under the name, left-aligned, until there is genuinely
          room for it beside one. At lg the leadership grid is three across and
          a card is about 295px, which a name plus four marks (roughly 330px)
          does not fit — Aliyu's row wrapped while the other two stayed inline,
          so the roles fell out of line with each other. xl is the first width
          where all three fit, so they all switch together. No flex-wrap here:
          the breakpoint decides, which is what stops a row half-wrapping.
        */}
        <div className="flex flex-col items-start gap-1 xl:flex-row xl:items-center xl:gap-x-4">
          <NameTag className="t-h3">
            {member.name}
            <PendingBadge item={member} />
          </NameTag>
          {/*
            The 10px pull puts the end glyph flush with the portrait's edge —
            left edge when stacked, right edge when inline. Inline, the row is
            also lifted onto the cap height, since items-center would otherwise
            centre it on a line box that includes the descender space.
          */}
          <TeamSocials
            name={member.name}
            socials={member.socials}
            className="-ml-[10px] xl:-mr-[10px] xl:ml-auto xl:-translate-y-[0.06em]"
          />
        </div>
        <p className="t-label text-body">{member.role}</p>
        {member.bio ? <p className="t-body mt-2 text-body">{member.bio}</p> : null}
      </div>
    </article>
  );
}
