/** Topics the form offers, and the ?topic= values that preselect them. */
export const CONTACT_TOPICS = [
  { value: 'school', label: 'School partnership' },
  { value: 'parent', label: 'Parent enquiry' },
  { value: 'sponsor', label: 'Sponsorship' },
  { value: 'investor', label: 'Investment' },
  { value: 'product', label: 'Product collaboration' },
  { value: 'client', label: 'Studio project' },
  { value: 'other', label: 'Other' },
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number]['value'];

export const CONTACT_TOPIC_VALUES = CONTACT_TOPICS.map((topic) => topic.value);

export function isContactTopic(value: unknown): value is ContactTopic {
  return typeof value === 'string' && CONTACT_TOPIC_VALUES.includes(value as ContactTopic);
}

export function topicLabel(value: string) {
  return CONTACT_TOPICS.find((topic) => topic.value === value)?.label ?? 'Other';
}

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 2000;
/** A genuine visitor takes longer than this to fill the form in. */
export const MIN_FILL_SECONDS = 3;
/** The field a person never sees, and a bot usually fills. */
export const HONEYPOT_FIELD = 'company_website';
export const TIMESTAMP_FIELD = 'rendered_at';

export const contact = {
  hero: {
    label: 'Contact',
    title: "LET'S TALK.",
    lead: 'Tell us about your school, your idea or your project. We reply within two working days.',
  },
  form: {
    heading: 'Send us a message',
    submit: 'Send message',
    submitting: 'SENDING…',
  },
  success: {
    title: 'RECEIVED.',
    body: "We'll be in touch within two working days.",
  },
  errors: {
    generic: 'Something went wrong sending your message. Please email us directly.',
    unavailable:
      'Our message form is temporarily unavailable. Please email us directly and we will reply just as quickly.',
    summary: 'Please correct the following before sending:',
  },
  fields: {
    name: { label: 'Your name', required: 'Enter your name.' },
    email: {
      label: 'Email address',
      required: 'Enter your email address.',
      invalid: 'Enter a valid email address.',
    },
    organisation: { label: 'School or organisation' },
    topic: { label: 'What is this about', required: 'Choose what this is about.' },
    message: {
      label: 'Message',
      required: `Write at least ${MESSAGE_MIN} characters so we can help properly.`,
      tooLong: `Keep your message under ${MESSAGE_MAX} characters.`,
    },
  },
} as const;
