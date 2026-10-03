import { Chapter } from '@/components/layout/Chapter';
import { Container } from '@/components/layout/Container';
import { MotionToggle } from '@/components/layout/MotionToggle';
import { RevealText } from '@/components/motion/RevealText';
import { TransitionLink } from '@/components/motion/TransitionLink';
import { Button } from '@/components/ui/Button';
import { Lockup } from '@/components/ui/Logo';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { footerNav } from '@/content/nav';
import { site, telHref } from '@/content/site';
import { isPublishable } from '@/lib/content';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <Chapter as="footer" theme="ink" tight flush className="pt-24 pb-8">
      <Container>
        <div className="border-line-dark flex flex-col gap-10 border-b pb-16 lg:flex-row lg:items-end lg:justify-between">
          <RevealText as="h2" variant="lines" className="t-display-xl max-w-[14ch]">
            {"BUILD WHAT'S NEXT"}
          </RevealText>
          <Button href="/contact" variant="solid-blue" size="lg" arrow>
            Start a conversation
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {footerNav.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="t-label text-paper/50 mb-5">{column.title}</h3>
              <ul className="flex flex-col gap-3">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <TransitionLink
                      href={item.href}
                      className="t-small link-underline text-paper/80 inline-flex min-h-11 items-center hover:text-white"
                    >
                      {item.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-line-dark flex flex-col gap-3 border-t py-10">
          <h3 className="t-label text-paper/50">Contact</h3>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-8">
            <a href={`mailto:${site.email}`} className="t-body link-underline w-fit">
              {site.email}
            </a>
            {site.phones.map((phone) => (
              <a key={phone} href={telHref(phone)} className="t-body link-underline w-fit">
                {phone}
              </a>
            ))}
            {isPublishable(site.location) ? (
              <span className="t-body text-paper/60">{site.location.value}</span>
            ) : null}
          </div>

          {site.socials.length > 0 ? (
            <SocialLinks links={site.socials} className="-ml-2 mt-4" />
          ) : null}
        </div>

        <div className="border-line-dark flex flex-col-reverse gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-label text-paper/50">
            © {year} {site.legalName}
          </p>
          <MotionToggle />
          <Lockup variant="onDark" orientation="horizontal" />
        </div>
      </Container>
    </Chapter>
  );
}
