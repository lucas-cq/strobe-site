import Link from "next/link";
import { site } from "@/content/site";
import { EarlyAccessLink } from "./early-access-link";
import { Lockup } from "./lockup";
import { MobileMenu } from "./mobile-menu";
import { Container, buttonClasses } from "./ui";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="Strobe home" className="shrink-0 rounded-sm">
          <Lockup className="h-7 w-auto" label="" />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-button px-3 py-2 text-[15px] font-medium text-ink-2 transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <EarlyAccessLink className={buttonClasses("primary")}>{site.cta.primary}</EarlyAccessLink>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
