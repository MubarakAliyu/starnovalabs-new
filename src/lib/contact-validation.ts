import {
  HONEYPOT_FIELD,
  MESSAGE_MAX,
  MESSAGE_MIN,
  MIN_FILL_SECONDS,
  TIMESTAMP_FIELD,
  contact,
  isContactTopic,
} from '@/content/contact';

export interface ContactInput {
  name: string;
  email: string;
  organisation: string;
  topic: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

/** Order matters: the first invalid field is the one that takes focus. */
export const CONTACT_FIELD_ORDER: (keyof ContactInput)[] = [
  'name',
  'email',
  'topic',
  'message',
];

/**
 * Deliberately permissive. The only thing that proves an address works is
 * sending to it, so this rejects what is obviously not an address and no more.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The same rules run on the client and in the route handler. */
export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};

  if (input.name.trim().length === 0) {
    errors.name = contact.fields.name.required;
  }

  const email = input.email.trim();
  if (email.length === 0) {
    errors.email = contact.fields.email.required;
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = contact.fields.email.invalid;
  }

  if (!isContactTopic(input.topic)) {
    errors.topic = contact.fields.topic.required;
  }

  const message = input.message.trim();
  if (message.length < MESSAGE_MIN) {
    errors.message = contact.fields.message.required;
  } else if (message.length > MESSAGE_MAX) {
    errors.message = contact.fields.message.tooLong;
  }

  return errors;
}

export function hasErrors(errors: ContactErrors) {
  return Object.keys(errors).length > 0;
}

/**
 * Spam checks that never produce a visible error — a bot should not learn why
 * it was turned away.
 */
export function looksAutomated(values: {
  honeypot: unknown;
  renderedAt: unknown;
  now?: number;
}): boolean {
  // A field nobody can see should never arrive filled.
  if (typeof values.honeypot === 'string' && values.honeypot.trim().length > 0) return true;

  const renderedAt = Number(values.renderedAt);
  if (!Number.isFinite(renderedAt) || renderedAt <= 0) return true;

  const elapsed = ((values.now ?? Date.now()) - renderedAt) / 1000;
  // Submitted before a person could plausibly have typed the message.
  if (elapsed < MIN_FILL_SECONDS) return true;

  return false;
}

export const FIELD_NAMES = {
  honeypot: HONEYPOT_FIELD,
  timestamp: TIMESTAMP_FIELD,
} as const;
