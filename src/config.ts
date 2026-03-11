export const SITE = {
  website: "https://www.myastr0.dev/",
  author: "Myastr0",
  /** Display name on homepage (e.g. "Leo DUMON") */
  authorDisplayName: "Leo DUMON",
  /** Handle shown next to name (e.g. "Myastr0") */
  handle: "@Myastr0",
  /** Homepage avatar path (in public/), or null to hide */
  avatar: "/images/avatar.jpg",
  profile: "https://github.com/Myastr0",
  /** Default OG image: "" = use dynamic /og.png (stylized "Myastr0.dev" title). Or set e.g. "default-og.jpg" for a static file. */
  ogImage: "",
  lightAndDarkMode: true,
  postPerIndex: 5,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    url: "",
  },
  dynamicOgImage: true,
  lang: "fr", // html lang code. Set this empty and default will be "en"
  timezone: "Europe/Paris", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;

/** Homepage projects (jdx-style). descriptionKey = i18n key for short description. */
export const HOME_PROJECTS = [
  {
    name: "Mk Notes",
    descriptionKey: "projects.mknotes" as const,
    href: "https://github.com/Myastr0/mk-notes",
    logo: "/images/projects/mk-notes.svg",
  },
  {
    name: "SuperDuty",
    descriptionKey: "projects.superduty" as const,
    href: "https://superduty.app",
    logo: "/images/projects/superduty.ico",
  },
] as const;
