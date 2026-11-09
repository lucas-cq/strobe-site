import { type Reviewer, site } from "@/content/site";
import { formatDate } from "@/lib/dates";

/** Under the H1 on every city page and guide. */
export function Byline({
  lastReviewed,
  reviewer,
  className = "",
}: {
  lastReviewed: string;
  reviewer?: Reviewer;
  className?: string;
}) {
  return (
    <div className={`text-[15px] text-muted ${className}`}>
      <p>
        Written by {site.founder.name} · Last reviewed {formatDate(lastReviewed)}
      </p>
      {reviewer && (
        <p className="mt-0.5">
          Reviewed by {reviewer.name}, {reviewer.role}
        </p>
      )}
    </div>
  );
}
