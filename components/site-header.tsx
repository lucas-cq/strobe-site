import { site } from "@/content/site";
import { EarlyAccessLink } from "./early-access-link";
import { Lockup } from "./lockup";
import { PageLink } from "./page-link";
import { MobileMenu } from "./mobile-menu";
import { Container, buttonClasses } from "./ui";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <Container className="flex h-16 items-center justify-between gap-6">
        <PageLink href="/" aria-label="Strobe home" className="shrink-0 rounded-sm">
          <Lockup className="h-7 w-auto" label="" />
        </PageLink>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((link) => (
              <li key={link.href}>
                <PageLink
                  href={link.href}
                  className="rounded-button px-3 py-2 text-[15px] font-medium text-ink-2 transition-colors hover:text-ink"
                >
                  {link.label}
                </PageLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <EarlyAccessLink className={buttonClasses("primary")}>{site.cta.primary}</EarlyAccessLink>
          </div>
          {/* Phones get a compact button so there's a way to act without opening the menu */}
          <div className="md:hidden">
            <EarlyAccessLink className={buttonClasses("primary", "sm")}>{site.cta.primaryShort}</EarlyAccessLink>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
