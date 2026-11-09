import { site } from "@/content/site";
import { EarlyAccessLink } from "./early-access-link";
import { Lockup } from "./lockup";
import { PageLink } from "./page-link";
import { MobileMenu } from "./mobile-menu";
import { NavDropdown, navItemClasses } from "./nav-dropdown";
import { Container, buttonClasses } from "./ui";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <Container className="flex h-16 items-center justify-between gap-3 lg:gap-6">
        <PageLink href="/" aria-label="Strobe home" className="shrink-0 rounded-sm">
          <Lockup className="h-7 w-auto" label="" />
        </PageLink>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center lg:gap-1">
            {site.nav.map((item) => (
              <li key={item.label}>
                {"children" in item ? (
                  <NavDropdown label={item.label} links={item.children} />
                ) : (
                  <PageLink href={item.href} className={navItemClasses}>
                    {item.label}
                  </PageLink>
                )}
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
