'use client';

import { useRouter } from 'next/navigation';
import { useId, useRef, useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';
import { CONTACT_TOPICS, HONEYPOT_FIELD, TIMESTAMP_FIELD, contact } from '@/content/contact';
import { site } from '@/content/site';
import {
  CONTACT_FIELD_ORDER,
  hasErrors,
  validateContact,
  type ContactErrors,
  type ContactInput,
} from '@/lib/contact-validation';

type FormState = 'idle' | 'submitting' | 'error';

interface ContactFormProps {
  /** Preselected from ?topic= on the server, so it is right without JavaScript. */
  defaultTopic: string;
  /** The server already decided we are showing an error from a no-JS round trip. */
  initialError?: string;
  /** Stamped when the page was served, so the elapsed-time check is honest. */
  renderedAt: string;
}

function mailtoFallback(input?: Partial<ContactInput>) {
  const subject = encodeURIComponent('Website enquiry');
  const body = encodeURIComponent(input?.message ?? '');
  return `mailto:${site.email}?subject=${subject}${body ? `&body=${body}` : ''}`;
}

export function ContactForm({ defaultTopic, initialError, renderedAt }: ContactFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<FormState>(initialError ? 'error' : 'idle');
  const [errors, setErrors] = useState<ContactErrors>({});
  const [message, setMessage] = useState(initialError ?? '');
  const [showMailto, setShowMailto] = useState(initialError === contact.errors.unavailable);
  const errorHeadingId = useId();
  const statusId = useId();

  const focusFirstInvalid = (found: ContactErrors) => {
    const first = CONTACT_FIELD_ORDER.find((field) => found[field]);
    if (!first) return;
    const node = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    node?.focus();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const input: ContactInput = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      organisation: String(data.get('organisation') ?? ''),
      topic: String(data.get('topic') ?? ''),
      message: String(data.get('message') ?? ''),
    };

    const found = validateContact(input);
    setErrors(found);

    if (hasErrors(found)) {
      setState('error');
      setMessage(contact.errors.summary);
      setShowMailto(false);
      focusFirstInvalid(found);
      return;
    }

    setState('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-requested-with': 'fetch' },
        body: JSON.stringify({
          ...input,
          [HONEYPOT_FIELD]: String(data.get(HONEYPOT_FIELD) ?? ''),
          [TIMESTAMP_FIELD]: String(data.get(TIMESTAMP_FIELD) ?? ''),
        }),
      });

      if (response.ok) {
        // The success panel is rendered by the page itself, keyed off ?sent.
        router.push('/contact?sent=1');
        return;
      }

      if (response.status === 503) {
        setState('error');
        setMessage(contact.errors.unavailable);
        setShowMailto(true);
        return;
      }

      if (response.status === 422) {
        const body: { errors?: ContactErrors } = await response.json().catch(() => ({}));
        const serverErrors = body.errors ?? {};
        setErrors(serverErrors);
        setState('error');
        setMessage(contact.errors.summary);
        focusFirstInvalid(serverErrors);
        return;
      }

      setState('error');
      setMessage(contact.errors.generic);
      setShowMailto(true);
    } catch {
      setState('error');
      setMessage(contact.errors.generic);
      setShowMailto(true);
    }
  };

  const submitting = state === 'submitting';

  return (
    <form
      ref={formRef}
      // Without JavaScript this posts straight to the route, which redirects
      // back here with ?sent=1 or ?error=.
      action="/api/contact"
      method="post"
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-10"
    >
      <h2 className="t-label text-body">{contact.form.heading}</h2>

      {state === 'error' && message ? (
        <div
          role="alert"
          id={errorHeadingId}
          className="border-l-2 border-error bg-white px-5 py-4"
        >
          <p className="t-small font-medium text-error">{message}</p>
          {hasErrors(errors) ? (
            <ul className="t-small mt-2 list-disc pl-5 text-body">
              {CONTACT_FIELD_ORDER.filter((field) => errors[field]).map((field) => (
                <li key={field}>{errors[field]}</li>
              ))}
            </ul>
          ) : null}
          {showMailto ? (
            <p className="t-small mt-3">
              <a href={mailtoFallback()} className="link-underline text-blue">
                Email {site.email} instead
              </a>
            </p>
          ) : null}
        </div>
      ) : null}

      <Field name="name" label={contact.fields.name.label} required autoComplete="name" error={errors.name} />
      <Field
        name="email"
        label={contact.fields.email.label}
        kind="email"
        required
        autoComplete="email"
        error={errors.email}
      />
      <Field
        name="organisation"
        label={contact.fields.organisation.label}
        autoComplete="organization"
      />
      <Field
        name="topic"
        label={contact.fields.topic.label}
        kind="select"
        required
        defaultValue={defaultTopic}
        options={CONTACT_TOPICS.map((topic) => ({ value: topic.value, label: topic.label }))}
        error={errors.topic}
      />
      <Field
        name="message"
        label={contact.fields.message.label}
        kind="textarea"
        required
        error={errors.message}
      />

      {/* Invisible to people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input
          id={HONEYPOT_FIELD}
          type="text"
          name={HONEYPOT_FIELD}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name={TIMESTAMP_FIELD} value={renderedAt} readOnly />

      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" variant="solid-ink" size="lg" arrow disabled={submitting}>
          {submitting ? contact.form.submitting : contact.form.submit}
        </Button>
        <p id={statusId} role="status" className="t-small text-body">
          {submitting ? 'Sending your message…' : ''}
        </p>
      </div>
    </form>
  );
}
