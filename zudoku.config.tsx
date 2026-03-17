import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
  basePath: "/enza-portal",

  redirects: [
    { from: "/", to: "/api" },
  ],

  docs: {
    files: "pages/**/*.{md,mdx}",
  },

  navigation: [
    { type: "link", to: "/api", label: "API Reference" },
    { type: "link", to: "/changelog", label: "Changelog" },
    { type: "link", to: "/versioning", label: "Versioning Policy" },
  ],

  apis: [
    {
      type: "file",
      path: "/api",
      input: "./apis/generalapi.yaml",
    },
  ],

  metadata: {
    title: "enza Open API Developer Portal",
    description: "enza API developer portal and reference documentation",
    logo: "https://www.enzagroup.global/wp-content/uploads/2024/06/enza-logo.svg",
    favicon: "https://www.enzagroup.global/wp-content/uploads/2024/06/cropped-fav-icon-32x32.png",
    referrer: "no-referrer",
    keywords: ["enza", "payments", "developer portal", "Africa"],
    authors: ["enza Group"],
    creator: "enza Payments",
    publisher: "enza Payments",
  },

  site: {
    title: "enza APIs",
    logo: {
      src: {
        light: "/assets/logo.svg",
        dark: "/assets/logo-dark.svg",
      },
      width: "120px",
    },
  },

  search: {
    type: "pagefind",
  },
};

export default config;
