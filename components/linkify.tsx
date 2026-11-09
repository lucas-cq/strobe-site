import { Fragment, type ReactNode } from "react";

const linkPattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\(\/[^)\s]*\)|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|https?:\/\/[^\s)]+)/g;
const sitePath = /^\[([^\]]+)\]\((\/[^)\s]*)\)$/;

// The email part stops before a sentence's closing full stop.
/** Turns email addresses, URLs and [label](/path) links in plain copy into links, and **text** into bold. */
export function linkify(text: string): ReactNode {
  return text.split(linkPattern).map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
    if (part.startsWith("**")) return <strong key={i} className="font-semibold">{linkify(part.slice(2, -2))}</strong>;
    const internal = part.match(sitePath);
    const label = internal ? internal[1] : part;
    const href = internal ? internal[2] : part.includes("@") && !part.startsWith("http") ? `mailto:${part}` : part;
    return (
      <a key={i} href={href} className="font-medium text-indigo underline underline-offset-4 hover:text-violet">
        {label}
      </a>
    );
  });
}
