import NextImage from 'next/image';

import { Parallax } from '@/components/motion/Parallax';
import { RevealImage } from '@/components/motion/RevealImage';
import type { ImageAsset } from '@/content/images';
import { cn } from '@/lib/utils';

interface PhotoProps {
  image: ImageAsset;
  /** Required: a wrong `sizes` is the usual cause of an oversized download. */
  sizes: string;
  priority?: boolean;
  fit?: 'cover' | 'contain';
  position?: string;
  /** Generic only — never a child's name, school or class. */
  caption?: string;
  /** Clip-and-scale reveal. On by default. */
  reveal?: boolean | 'up' | 'left' | 'center';
  /** Scrubbed drift, as a Parallax speed. */
  parallax?: number;
  /** Minimal browser chrome, for product screenshots. */
  frame?: 'browser';
  /** Applied to the image box, so pass the aspect ratio here. */
  className?: string;
  /** Applied to the outermost element. */
  wrapperClassName?: string;
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden border border-line-dark bg-ink">
      <div aria-hidden="true" className="flex items-center gap-2 px-4 py-3">
        <span className="block h-2 w-2 rounded-full bg-white/25" />
        <span className="block h-2 w-2 rounded-full bg-white/25" />
        <span className="block h-2 w-2 rounded-full bg-white/25" />
      </div>
      {children}
    </div>
  );
}

/**
 * The one way a photograph enters a page. Alt text, dimensions and the blur
 * placeholder all come from the manifest, so no call site can ship an image
 * without them.
 */
export function Photo({
  image,
  sizes,
  priority = false,
  fit = 'cover',
  position,
  caption,
  reveal = true,
  parallax,
  frame,
  className,
  wrapperClassName,
}: PhotoProps) {
  const picture = (
    <NextImage
      src={image.file}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      placeholder={image.blurDataURL ? 'blur' : 'empty'}
      blurDataURL={image.blurDataURL ?? undefined}
      style={{ objectFit: fit, objectPosition: position }}
      className="h-full w-full"
    />
  );

  // paper-2 behind the image so a slow load is never bare page background.
  let box = (
    <div className={cn('relative overflow-hidden bg-paper-2', className)}>{picture}</div>
  );

  if (frame === 'browser') box = <BrowserFrame>{box}</BrowserFrame>;

  if (reveal) {
    const variant = typeof reveal === 'string' ? reveal : 'up';
    box = <RevealImage variant={variant}>{box}</RevealImage>;
  }

  const content = caption ? (
    <figure className="flex flex-col gap-3">
      {box}
      <figcaption className="t-label text-muted">{caption}</figcaption>
    </figure>
  ) : (
    box
  );

  if (typeof parallax === 'number') {
    return (
      <Parallax speed={parallax} className={wrapperClassName}>
        {content}
      </Parallax>
    );
  }

  return wrapperClassName ? <div className={wrapperClassName}>{content}</div> : content;
}
