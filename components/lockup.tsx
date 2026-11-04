/**
 * The brand lockup, rendered from the file in public/brand by path.
 *
 * The exported SVGs carry generous padding on a 1180 x 512 canvas. We crop that
 * padding with a viewBox so the header can size the logo by its visible height.
 * If the files are swapped for Figma exports with different padding, update
 * LOCKUP_CROP only. The artwork itself is never redrawn or recoloured.
 */
export const LOCKUP_CANVAS = { width: 1180, height: 512 };
// Measured artwork bounds are x 50 to 1064, y 137 to 364. Two units of slack each side.
export const LOCKUP_CROP = { x: 48, y: 135, width: 1018, height: 231 };

const sources = {
  ink: "/brand/strobe-lockup-transparent-ink.svg",
  white: "/brand/strobe-lockup-transparent-white.svg",
} as const;

type LockupProps = {
  tone?: keyof typeof sources;
  className?: string;
  /** Accessible name. Pass an empty string when a parent already labels the logo. */
  label?: string;
};

export function Lockup({ tone = "ink", className, label = "Strobe" }: LockupProps) {
  const { x, y, width, height } = LOCKUP_CROP;
  return (
    <svg
      viewBox={`${x} ${y} ${width} ${height}`}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <image
        href={sources[tone]}
        width={LOCKUP_CANVAS.width}
        height={LOCKUP_CANVAS.height}
        className={tone === "ink" ? "lockup-day" : undefined}
      />
      {/* Browser night modes darken the page but not this image, so globals.css swaps in the white file */}
      {tone === "ink" && (
        <image
          href={sources.white}
          width={LOCKUP_CANVAS.width}
          height={LOCKUP_CANVAS.height}
          className="lockup-night"
        />
      )}
    </svg>
  );
}
