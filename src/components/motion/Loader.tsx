import { LoaderController } from '@/components/motion/LoaderController';
import { site } from '@/content/site';
import { STAR_BLADES, STAR_VIEWBOX } from '@/lib/star';

/** The roll-call that marquees behind the star — our products and tracks. */
const ROLL_CALL = [
  'KIDS IN TECH',
  'KITOS',
  'SCRATCH',
  'ROBOTICS',
  'WEB',
  'EDUSTACK',
  'SKILLSTACK',
] as const;

function RollCallRow({ reverse }: { reverse?: boolean }) {
  const track = (
    <span className="flex shrink-0 items-center gap-8 pr-8">
      {ROLL_CALL.map((word) => (
        <span key={word} className="flex items-center gap-8">
          {word}
          <svg viewBox={STAR_VIEWBOX} className="h-[0.4em] w-[0.4em]" fill="none">
            {STAR_BLADES.map((d) => (
              <path key={d} d={d} fill="currentColor" />
            ))}
          </svg>
        </span>
      ))}
    </span>
  );

  return (
    <div className="flex overflow-hidden whitespace-nowrap" data-loader-row={reverse ? 'b' : 'a'}>
      <div className="flex" data-loader-track>
        {track}
        {track}
      </div>
    </div>
  );
}

/**
 * "Ignition" (Master §5) — first view of a session only.
 *
 * The overlay is server-rendered so there is never a flash of the page before
 * it appears, and it is aria-hidden and unfocusable so it never stands between
 * a screen reader and the content underneath.
 */
export function Loader() {
  return (
    <div
      id="snl-loader"
      aria-hidden="true"
      data-loader
      className="pointer-events-none fixed inset-0 z-[100] bg-navy text-white"
    >
      <div className="absolute inset-0 flex flex-col justify-center gap-[2vh] overflow-hidden opacity-0 select-none" data-loader-rows>
        <RollCallRow />
        <RollCallRow reverse />
        <RollCallRow />
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <svg
          viewBox={STAR_VIEWBOX}
          className="h-24 w-24 md:h-36 md:w-36"
          fill="none"
          data-loader-star
        >
          {STAR_BLADES.map((d, index) => (
            <path key={d} d={d} fill="var(--color-white)" data-loader-blade={index} />
          ))}
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-10">
        <span className="t-label text-3xl tabular-nums md:text-5xl" data-loader-counter>
          000
        </span>
        <span className="t-label text-right text-white/60">{site.tagline}</span>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-blue-lit"
        data-loader-progress
      />

      <div className="absolute inset-0 origin-bottom scale-y-0 bg-blue" data-loader-wipe />

      <LoaderController />
    </div>
  );
}
