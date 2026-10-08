import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { RevealText } from '@/components/motion/RevealText';
import { Button } from '@/components/ui/Button';
import { DRAFT_NOTICE, UNREVIEWED_NOTICE, type LegalPage } from '@/content/legal';
import { site } from '@/content/site';
import { isProduction } from '@/lib/content';

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Long-form layout for the legal and safeguarding pages.
 *
 * An unreviewed page shows its draft in development, clearly marked, and a
 * short holding notice in production — draft text presented as settled policy
 * would be worse than saying it is not ready.
 */
export function LegalPageLayout({ page }: { page: LegalPage }) {
  const showDraft = !page.reviewed && !isProduction;
  const showHolding = !page.reviewed && isProduction;

  return (
    <Chapter theme="paper" className="pt-[calc(var(--header-h)+clamp(56px,8vw,112px))]">
      <Container>
        <div className="grid-page">
          <header className="col-span-4 sm:col-span-8 lg:col-span-8">
            <RevealText as="h1" variant="hero" className="t-display-l">
              {page.title}
            </RevealText>
            <p className="t-label mt-6 text-muted">Last updated {formatDate(page.lastUpdated)}</p>

            {showDraft ? (
              <p className="t-label mt-8 inline-flex rounded-[4px] bg-error px-3 py-2 text-white">
                {DRAFT_NOTICE}
              </p>
            ) : null}
          </header>
        </div>

        {showHolding ? (
          <div className="grid-page mt-16">
            <div className="col-span-4 sm:col-span-8 lg:col-span-7">
              <p className="t-lead text-body">{UNREVIEWED_NOTICE}</p>
              <div className="mt-10">
                <Button href={`mailto:${site.email}`} variant="primary" size="lg" arrow>
                  Email us
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid-page mt-16">
            {/* Contents follows on a wide screen, where there is room beside
                the prose; on a phone it would just push the page down. */}
            <nav
              aria-label="On this page"
              className="col-span-4 hidden sm:col-span-8 lg:col-span-3 lg:block"
            >
              <div className="sticky top-[calc(var(--header-h)+32px)]">
                <h2 className="t-label mb-5 text-muted">On this page</h2>
                <ul className="flex flex-col gap-3">
                  {page.sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="t-small link-underline text-body">
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="col-span-4 sm:col-span-8 lg:col-span-7 lg:col-start-5">
              <p className="t-lead text-body">{page.intro}</p>

              {page.sections.map((section) => (
                <section key={section.id} id={section.id} className="mt-16 scroll-mt-32">
                  <h2 className="t-h3 mb-6">{section.heading}</h2>
                  {section.body.map((block, index) =>
                    typeof block === 'string' ? (
                      <p key={index} className="t-body mb-5 text-body">
                        {block}
                      </p>
                    ) : (
                      <ul key={index} className="mb-5 flex list-disc flex-col gap-2 pl-6">
                        {block.list.map((item) => (
                          <li key={item} className="t-body text-body">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </section>
              ))}

              <p className="t-small mt-16 text-muted">
                Questions about this page? Email{' '}
                <a href={`mailto:${site.email}`} className="link-underline">
                  {site.email}
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </Container>
    </Chapter>
  );
}
