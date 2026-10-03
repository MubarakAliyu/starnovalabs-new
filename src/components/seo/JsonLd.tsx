import { site, telHref } from '@/content/site';
import { absoluteUrl } from '@/lib/seo';

/**
 * Structured data. These are server components, so none of this reaches the
 * client bundle — it is only ever markup in the document.
 */
function Script({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is our own content, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${absoluteUrl('/')}#organization`,
        name: site.name,
        legalName: site.legalName,
        url: absoluteUrl('/'),
        logo: absoluteUrl('/brand/lockup-horizontal.svg'),
        description: site.description,
        email: site.email,
        telephone: site.phones.map((phone) => telHref(phone).replace('tel:', '')),
        foundingDate: String(site.founded),
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Sokoto',
          addressCountry: 'NG',
        },
        sameAs: site.socials.map((social) => social.url),
      }}
    />
  );
}

export function EducationalOrganizationJsonLd({
  courses,
}: {
  courses: readonly { name: string; description: string }[];
}) {
  return (
    <>
      <Script
        data={{
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'Kids in Tech',
          parentOrganization: { '@id': `${absoluteUrl('/')}#organization` },
          url: absoluteUrl('/kids-in-tech'),
          sameAs: ['https://www.kidsintech.school'],
        }}
      />
      {courses.map((course) => (
        <Script
          key={course.name}
          data={{
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: course.name,
            description: course.description,
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Kids in Tech',
              sameAs: 'https://www.kidsintech.school',
            },
          }}
        />
      ))}
    </>
  );
}

export function SoftwareApplicationJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name,
        description,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        url: absoluteUrl(url),
        publisher: { '@id': `${absoluteUrl('/')}#organization` },
      }}
    />
  );
}

export function BreadcrumbJsonLd({ trail }: { trail: readonly { name: string; path: string }[] }) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((step, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: step.name,
          item: absoluteUrl(step.path),
        })),
      }}
    />
  );
}
