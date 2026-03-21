import posthog from "posthog-js";
import { PUBLIC_POSTHOG_HOST, PUBLIC_POSTHOG_KEY } from "astro:env/client";

if (
  import.meta.env.PROD &&
  PUBLIC_POSTHOG_KEY &&
  sessionStorage.getItem("posthog:initialized") !== "1"
) {
  posthog.init(PUBLIC_POSTHOG_KEY, {
    api_host: PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
    defaults: "2026-01-30",
    capture_pageview: "history_change",
  });

  sessionStorage.setItem("posthog:initialized", "1");
}
