import { Photo } from '@/components/ui/Photo';
import type { ImageAsset } from '@/content/images';
import { cn } from '@/lib/utils';

/**
 * Nine slots on a twelve-column grid, deliberately uneven: spans of 7/5, 4/4/4
 * and 5/7 with varying aspect ratios, so the grid reads as an edit rather than
 * a contact sheet.
 */
const SLOTS = [
  'lg:col-span-7 aspect-16/10',
  'lg:col-span-5 aspect-4/5',
  'lg:col-span-4 aspect-square',
  'lg:col-span-4 aspect-4/5',
  'lg:col-span-4 aspect-square',
  'lg:col-span-5 aspect-4/5',
  'lg:col-span-7 aspect-16/10',
  'lg:col-span-6 aspect-4/3',
  'lg:col-span-6 aspect-4/3',
];

export function Gallery({ images, className }: { images: ImageAsset[]; className?: string }) {
  return (
    <ul
      className={cn(
        // Snap-scrolls as a row on a phone, becomes a grid from 768.
        'flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4',
        'md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-12',
        className,
      )}
    >
      {images.map((image, index) => (
        <li
          key={image.file}
          className={cn(
            'w-[78vw] shrink-0 snap-start md:w-auto md:shrink',
            SLOTS[index % SLOTS.length],
          )}
        >
          <Photo
            image={image}
            sizes="(min-width: 1024px) 40vw, (min-width: 768px) 48vw, 78vw"
            className="group h-full"
          />
        </li>
      ))}
    </ul>
  );
}
