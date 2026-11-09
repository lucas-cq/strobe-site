import { deadlineTool } from "./tool-deadline";
import { deviceTemplate } from "./tool-device-template";

// The /tools index. Each tool brings its own title, summary and path.
export const toolsIndex = {
  lastReviewed: "2026-11-09",
  path: "/tools",
  meta: {
    title: "Free tools for fire alarm contractors | Strobe",
    description:
      "Free tools for Canadian fire alarm contractors: a Calgary deadline calculator and an Excel device list template. No signup needed.",
  },
  title: "Free tools for fire alarm contractors",
  breadcrumb: "Tools",
  tools: [deadlineTool, deviceTemplate],
};
