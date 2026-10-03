import { GENERATED_IMAGES } from '@/content/images.generated';

/** Who appears in the frame. Children only ever come from the approved manifest. */
export type ImagePeople = 'children' | 'adults' | 'none';

export type ImageTag =
  | 'hero'
  | 'group'
  | 'classroom'
  | 'coding'
  | 'community'
  | 'project-scratch'
  | 'project-robotics'
  | 'project-web'
  | 'product'
  | 'kitos'
  | 'team'
  | 'video'
  | 'edustack'
  | 'nurala'
  | 'kit-site';

export interface ImageAsset {
  /** Public path, e.g. /images/groups/cohort-handbooks-wide.jpg */
  file: string;
  width: number;
  height: number;
  /** Comes from the manifest. Never written at the call site. */
  alt: string;
  people: ImagePeople;
  tag: ImageTag | string;
  kb: number;
  /** 16px base64 placeholder, null for video. */
  blurDataURL: string | null;
}

export const images: ImageAsset[] = GENERATED_IMAGES;

const byFile = new Map(images.map((image) => [image.file, image]));

/**
 * Look an image up by its public path.
 *
 * It throws when the path is unknown, which is deliberate: a typo should fail
 * the build rather than ship an empty slot or an image with no alt text.
 */
export function img(file: string): ImageAsset {
  const found = byFile.get(file);
  if (!found) {
    throw new Error(
      `Unknown image "${file}". Add it to docs/assets/image-manifest.json and run npm run build:images.`,
    );
  }
  return found;
}

/** Every image carrying a tag, in manifest order. */
export function imagesByTag(...tags: string[]): ImageAsset[] {
  const wanted = new Set(tags);
  return images.filter((image) => wanted.has(image.tag));
}

/** True when the asset is one of the video loops rather than a still. */
export function isVideo(image: ImageAsset) {
  return /\.(mp4|webm)$/i.test(image.file);
}
