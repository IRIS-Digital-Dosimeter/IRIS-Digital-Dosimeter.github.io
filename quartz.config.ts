import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "IRIS",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: false,
    analytics: null,
    locale: "en-US",
    baseUrl: "iris-digital-dosimeter.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f2d5cf",         // Rosewater
          lightgray: "#f4b8e4",     // Pink
          gray: "#c6d0f5",          // Lavender
          darkgray: "#a6d189",      // Green
          dark: "#e78284",          // Red
          secondary: "#ca9ee6",     // Mauve
          tertiary: "#e5c890",      // Yellow
          highlight: "rgba(148, 226, 213, 0.15)", // Teal with 15% opacity
          textHighlight: "#f2d5cf88", // Rosewater with 53% opacity
        },
        darkMode: {
          light: "#1e1e2e",         // Base
          lightgray: "#313244",     // Surface0
          gray: "#45475a",          // Surface1
          darkgray: "#cdd6f4",      // Text
          dark: "#cba6f7",          // Lavender
          secondary: "#f38ba8",     // Red
          tertiary: "#a6e3a1",      // Green
          highlight: "rgba(148, 226, 213, 0.15)", // Teal with 15% opacity
          textHighlight: "#f2d5cf88", // Rosewater with 53% opacity
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "catppuccin-frappe",
          dark: "catppuccin-macchiato",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ 
        markdownLinkResolution: "shortest",
        openLinksInNewTab: true,
        prettyLinks: true,
        lazyLoad: true,
        externalLinkIcon: true,
      }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [
      Plugin.RemoveDrafts()
    ],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage({
        // sort alphabetically
        sort: (f1, f2) => {
          if (f1.slug < f2.slug) return -1
          if (f1.slug > f2.slug) return 1
          return 0
        }
      }),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: false,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
