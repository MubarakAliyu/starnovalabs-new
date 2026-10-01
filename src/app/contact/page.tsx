import type { Metadata } from 'next';

import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { ContactForm } from '@/components/sections/contact/ContactForm';
import { ContactSuccess } from '@/components/sections/contact/ContactSuccess';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StarGlyph } from '@/components/ui/StarGlyph';
import { contact, isContactTopic } from '@/content/contact';
import { site, telHref } from '@/content/site';
import { requestTimeMs } from '@/lib/clock';
import { isPublishable } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact',
  description: contact.hero.lead,
};

/**
 * This route reads searchParams on the server, which makes it the one dynamic
 * page on the site. That is deliberate: the no-JavaScript flow posts the form
 * to /api/contact, which redirects back here with ?sent=1 or ?error=, and the
 * matching state has to render without a client bundle.
 */
export default async function ContactPage({ searchParams }: PageProps<'/contact'>) {
  const params = await searchParams;
  // Served per request, so this is the real time the visitor received the form.
  const renderedAt = String(requestTimeMs());
  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const topicParam = first(params.topic);
  const defaultTopic = isContactTopic(topicParam) ? topicParam : 'other';
  const sent = first(params.sent) === '1';
  const errorParam = first(params.error);

  const initialError = errorParam
    ? errorParam === 'unavailable'
      ? contact.errors.unavailable
      : errorParam === 'invalid'
        ? contact.errors.summary
        : contact.errors.generic
    : undefined;

  const details: { label: string; value: string; href?: string }[] = [
    { label: 'Email', value: site.email, href: `mailto:${site.email}` },
    ...site.phones.map((phone) => ({
      label: 'Phone',
      value: phone,
      href: telHref(phone),
    })),
  ];

  if (isPublishable(site.location)) {
    details.push({ label: 'Where', value: site.location.value });
  }
  if (isPublishable(site.hours)) {
    details.push({ label: 'Hours', value: site.hours.value });
  }

  return (
    <Chapter theme="paper" className="pt-[calc(var(--header-h)+clamp(64px,10vw,140px))]">
      <Container>
        <div className="grid-page">
          <div className="col-span-4 sm:col-span-8 lg:col-span-5">
            <SectionLabel index="00" label={contact.hero.label} className="mb-12" />
            <RevealText as="h1" variant="hero" className="t-display-xl">
              {contact.hero.title}
            </RevealText>
            <RevealText as="p" variant="words" className="t-lead mt-10 text-body">
              {contact.hero.lead}
            </RevealText>

            <dl className="mt-14 flex flex-col gap-6">
              {details.map((detail) => (
                <div key={`${detail.label}-${detail.value}`} className="flex flex-col gap-1">
                  <dt className="t-label text-muted">{detail.label}</dt>
                  <dd className="t-body">
                    {detail.href ? (
                      <a href={detail.href} className="link-underline">
                        {detail.value}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2">
                        <StarGlyph className="text-gold" />
                        {detail.value}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            {site.socials.length > 0 ? (
              <ul className="mt-10 flex flex-wrap gap-5">
                {site.socials.map((social) => (
                  <li key={social.url}>
                    <a
                      href={social.url}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="t-label link-underline inline-flex min-h-11 items-center"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="col-span-4 mt-20 sm:col-span-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
            {sent ? (
              <ContactSuccess />
            ) : (
              <ContactForm
                defaultTopic={defaultTopic}
                initialError={initialError}
                renderedAt={renderedAt}
              />
            )}
          </div>
        </div>
      </Container>
    </Chapter>
  );
}
