"use client";

import Cal from "@calcom/embed-react";
import { useEffect } from "react";
import { CAL_NAMESPACE, calApi, calLink, calUi } from "./cal-booking";

/**
 * Inline booker for the form's success state, prefilled with the lead's details.
 * Imported with next/dynamic so Cal.com's code only loads after a submission.
 */
export function CalInline({ name, email }: { name: string; email: string }) {
  useEffect(() => {
    void calApi();
  }, []);

  if (!calLink) return null;
  return (
    <Cal
      namespace={CAL_NAMESPACE}
      calLink={calLink}
      config={{ layout: calUi.layout, theme: "light", name, email }}
      className="h-[640px] w-full overflow-auto"
    />
  );
}
