import satori from "satori";
import { translateFor } from "@/i18n/utils";
import loadGoogleFonts from "../loadGoogleFont";

/** Dark theme (matches site) for stylized OG image */
const OG_DARK = {
  background: "#0c0c0b",
  foreground: "#e8e6e0",
  muted: "#9a9890",
  accent: "#e8b84b",
};

export default async (localKey, localeConfig) => {
  const t = translateFor(localKey);

  const siteTitle =
    localeConfig.direction === "rtl"
      ? t("site.title").split(" ").reverse().join(" ")
      : t("site.title");

  const siteDesc =
    localeConfig.direction === "rtl"
      ? t("site.desc").split(" ").reverse().join(" ")
      : t("site.desc");

  return satori(
    {
      type: "div",
      props: {
        style: {
          background: OG_DARK.background,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 24,
              },
              children: [
                {
                  type: "p",
                  props: {
                    style: {
                      fontFamily: "DM Serif Display",
                      fontSize: 120,
                      fontWeight: 400,
                      color: OG_DARK.foreground,
                      margin: 0,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                    },
                    children: siteTitle,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      width: 120,
                      height: 4,
                      background: OG_DARK.accent,
                      borderRadius: 2,
                    },
                  },
                },
                {
                  type: "p",
                  props: {
                    style: {
                      fontFamily: "DM Serif Display",
                      fontSize: 28,
                      color: OG_DARK.muted,
                      margin: 0,
                    },
                    children: siteDesc,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(
        siteTitle + siteDesc,
        "DM+Serif+Display",
        [400]
      ),
    }
  );
};
