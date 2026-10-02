import NextImage from 'next/image';

import { Marquee } from '@/components/motion/Marquee';
import type { ImageAsset } from '@/content/images';
import { cn } from '@/lib/utils';

interface PhotoBandProps {
  images: ImageAsset[];
  /** Read out once in place of the strip. */
  ariaLabel: string;
  className?: string;
}

/**
 * A full-bleed strip of photographs that drifts with the scroll. The Marquee
 * underneath already handles pausing, the duplicate track and the reduced
 * variant, so this only has to supply the tiles.
 */
export function PhotoBand({ images, ariaLabel, className }: PhotoBandProps) {
  return (
    <Marquee
      ariaLabel={ariaLabel}
      speed={60}
      pausable
      className={cn('full-bleed', className)}
      items={images.map((image) => (
        <span
          key={image.file}
          className="mr-2 block aspect-4/5 h-[clamp(220px,28vw,420px)] shrink-0 overflow-hidden bg-paper-2"
        >
          <NextImage
            src={image.file}
            // The band is labelled as a whole; each tile would repeat it.
            alt=""
            width={image.width}
            height={image.height}
            sizes="(min-width: 1024px) 24vw, 45vw"
            loading="lazy"
            placeholder={image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={image.blurDataURL ?? undefined}
            className="h-full w-full object-cover"
          />
        </span>
      ))}
    />
  );
}
