import { ogImage, size, contentType } from '@/app/opengraph-image';
import { kit } from '@/content/kit';

export { size, contentType };
export const alt = 'Kids in Tech — a StarNova Labs programme';

export default async function Image() {
  return ogImage(kit.hero.title, 'Flagship programme');
}
