import { cacheLife } from "next/cache";
import { site } from "@/content/site";
import { CanadaFlag } from "./canada-flag";
import { Lockup } from "./lockup";
import { PageLink } from "./page-link";
import { Container } from "./ui";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  const links = [...site.nav, ...site.legalLinks];

  return (
    <footer className="on-dark bg-night text-night-text">
      <Container className="py-14 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <PageLink href="/" aria-label="Strobe home" className="inline-block rounded-sm">
              <Lockup tone="white" className="h-8 w-auto" label="" />
            </PageLink>
            <p className="mt-4 flex items-start gap-2.5 text-[15px] text-night-muted">
              <CanadaFlag decorative className="mt-[5px] h-3 w-6" />
              <span>
                <strong className="font-semibold text-night-text">{site.location.lead}</strong> {site.location.rest}
              </span>
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 inline-block text-[15px] font-medium text-white underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-[15px] sm:grid-cols-3">
              {links.map((link) => (
                <li key={link.href}>
                  <PageLink href={link.href} className="text-night-text underline-offset-4 hover:text-white hover:underline">
                    {link.label}
                  </PageLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-night-line pt-6 text-sm text-night-muted">
          <p className="max-w-3xl">{site.nonAffiliation}</p>
          <p className="mt-3">
            © <CopyrightYear /> Strobe
          </p>
        </div>
      </Container>
    </footer>
  );
}
