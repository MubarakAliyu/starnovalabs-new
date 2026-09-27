import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge conditional class names, with later Tailwind utilities winning. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Constrain a number to a range. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * True for anything that must leave the app: other origins, protocol links and
 * protocol-relative URLs. Used to decide between TransitionLink and a plain <a>.
 */
export function isExternalHref(href: string) {
  if (!href) return false;
  if (href.startsWith('//')) return true;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) {
    return !/^https?:/i.test(href) || !href.startsWith('/');
  }
  return false;
}

/** True for links that only move within the current page. */
export function isHashHref(href: string) {
  return href.startsWith('#');
}
