import IconBluesky from "@/assets/icons/IconBluesky.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import { translateFor } from "@/i18n/utils";
import type { Props } from "astro";

type Translator = ReturnType<typeof translateFor>;

interface Social {
  name: string;
  href: string;
  linkTitle: (t: Translator) => string;
  icon: (_props: Props) => Element;
  /** If set, used instead of href + url for share links (e.g. Bluesky). shareText is the pre-filled post body when provided. */
  getShareHref?: (url: string, shareText?: string) => string;
}

export const SOCIALS: Social[] = [
  {
    name: "Github",
    href: "https://github.com/Myastr0",
    linkTitle: (t: Translator) => t("socials.github"),
    icon: IconGitHub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/l%C3%A9o-dumon-67903b107/",
    linkTitle: (t: Translator) => t("socials.linkedin"),
    icon: IconLinkedin,
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/myastr0.bsky.social",
    linkTitle: (t: Translator) => t("socials.bluesky"),
    icon: IconBluesky,
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/sharing/share-offsite/?url=",
    linkTitle: (t: Translator) => t("sharePost.on", { media: "LinkedIn" }),
    icon: IconLinkedin,
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/intent/compose",
    linkTitle: (t: Translator) => t("sharePost.on", { media: "Bluesky" }),
    icon: IconBluesky,
    getShareHref: (url: string, shareText?: string) =>
      `https://bsky.app/intent/compose?text=${encodeURIComponent(shareText ?? url)}`,
  },
] as const;
