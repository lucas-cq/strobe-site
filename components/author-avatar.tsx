import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { home } from "@/content/home";

// Checked at build time. Drop a photo at public/lucas-cummings.jpg and redeploy to show it.
const hasPhoto = existsSync(path.join(process.cwd(), "public", "lucas-cummings.jpg"));

/** Lucas's photo, or his initials when there isn't one. */
export function AuthorAvatar() {
  const { photoAlt, initials } = home.note;
  return hasPhoto ? (
    <Image src="/lucas-cummings.jpg" alt={photoAlt} width={56} height={56} className="size-14 rounded-full object-cover" />
  ) : (
    <span
      aria-hidden="true"
      className="bg-gradient-band flex size-14 items-center justify-center rounded-full font-display text-lg font-semibold text-white"
    >
      {initials}
    </span>
  );
}
