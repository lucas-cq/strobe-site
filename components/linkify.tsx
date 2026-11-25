import { Fragment, type ReactNode } from "react";

const linkPattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\((?:\/|https?:\/\/)[^)\s]*\)|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|https?:\/\/[^\s)]+)/g;
const labelled = /^\[([^\]]+)\]\(((?:\/|https?:\/\/)[^)\s]*)\)$/;

// The email part stops before a sentence's closing full stop.
/**
 * Turns email addresses, URLs, [label](/path) and [label](https://...) links in plain copy into links,
 * and **text** into bold. Outside links open in a new tab.
 */
export function linkify(text: string): ReactNode {
  return text.split(linkPattern).map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
    if (part.startsWith("**")) return <strong key={i} className="font-semibold">{linkify(part.slice(2, -2))}</strong>;
    const named = part.match(labelled);
    const label = named ? named[1] : part;
    const href = named ? named[2] : part.includes("@") && !part.startsWith("http") ? `mailto:${part}` : part;
    const outside = href.startsWith("http");
    return (
      <a
        key={i}
        href={href}
        {...(outside && { target: "_blank", rel: "noopener noreferrer" })}
        className="font-medium text-brand underline underline-offset-4 hover:text-deep"
      >
        {label}
        {outside && named && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  });
}
