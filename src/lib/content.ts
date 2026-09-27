/**
 * Content status flags (Master §7, Golden Rule 6).
 *
 * Anything in src/content that depends on a real-world fact carries a flag.
 * Production builds omit items that are not cleared; development renders them
 * with a "PENDING" badge so gaps stay visible while we work.
 */

export type Status = 'confirmed' | 'pending';

/** A claim about the world — a statistic, a date, a name. */
export interface WithStatus {
  status: Status;
}

/** Anything showing a real person, especially a child. */
export interface WithConsent {
  consent: boolean;
}

/** Anything using a third party's name or mark. */
export interface WithPermission {
  permission: boolean;
}

/** Anything we may want to build but not announce yet. */
export interface WithVisibility {
  visible: boolean;
}

export type Publishable = Partial<WithStatus & WithConsent & WithPermission & WithVisibility>;

export const isProduction = process.env.NODE_ENV === 'production';

/**
 * True when an item may appear in a production build. In development every
 * item passes, so we can see what is still unconfirmed.
 */
export function isPublishable(item: Publishable): boolean {
  if (!isProduction) return true;
  if (item.status === 'pending') return false;
  if (item.consent === false) return false;
  if (item.permission === false) return false;
  if (item.visible === false) return false;
  return true;
}

/** Filter a content list down to what this build may show. */
export function publishable<T extends Publishable>(items: readonly T[]): T[] {
  return items.filter(isPublishable);
}

/** True when the item is shown only because this is a development build. */
export function isPendingInDev(item: Publishable): boolean {
  if (isProduction) return false;
  return (
    item.status === 'pending' ||
    item.consent === false ||
    item.permission === false ||
    item.visible === false
  );
}
