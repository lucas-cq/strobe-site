/* Decorative pieces from SITE_V2.md. All aria-hidden. */

/** Faint 32px grid that fades toward the edges. Place inside a `relative` parent. */
export function GridPattern({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${light ? "bg-grid-light" : "bg-grid"} ${className}`}
    />
  );
}

/**
 * The logo mark as one image, faded, for backgrounds. `pulse` gives the slow strobe in the
 * dark band. The beams are never redrawn or recoloured: only the whole image's opacity changes.
 */
export function BackgroundMark({
  onDark = false,
  pulse = false,
  className = "",
}: {
  onDark?: boolean;
  pulse?: boolean;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- brand SVG, referenced by path
    <img
      src={onDark ? "/brand/strobe-mark-on-dark.svg" : "/brand/strobe-mark.svg"}
      alt=""
      aria-hidden="true"
      width={512}
      height={512}
      className={`pointer-events-none absolute select-none ${pulse ? "strobe-pulse" : ""} ${className}`}
    />
  );
}

/** 2px brand-gradient line along the top edge of a card. Put the card in `relative overflow-hidden`. */
export function TopGradientLine() {
  return <span aria-hidden="true" className="bg-gradient-brand absolute inset-x-0 top-0 h-0.5" />;
}
