/** State for the "Email me when Strobe opens" form. Apart from the action so the browser can import it. */
export type NotifyState =
  | { status: "idle"; attempt: number }
  | { status: "error"; attempt: number; message: string; field: boolean; email: string; consent: boolean }
  | { status: "success"; attempt: number };

export const initialNotifyState: NotifyState = { status: "idle", attempt: 0 };
