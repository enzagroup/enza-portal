import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
  // Set the base path for GitHub Pages deployment
  basePath: "/enza-portal",
  
  // Redirect root to API page
  redirects: [
    { from: "/", to: "/api" },
  ],
  
  navigation: [
    { type: "link", to: "api", label: "API Reference" },
  ],
  apis: [
    {
      type: "file",
      input: "./apis/generalapi.yaml",
      path: "/api",
    },
  ],
  metadata: {
    title: "enza Open API Developer Portal",
    description: "This is enza Open API Developer Portal",
    logo: "https://www.enzagroup.global/wp-content/uploads/2024/06/enza-logo.svg",
    favicon: "https://www.enzagroup.global/wp-content/uploads/2024/06/cropped-fav-icon-32x32.png",
    referrer: "no-referrer",
    keywords: ["enza", "liberating", "payments", "Africa"],
    authors: ["enza Group - Payments Liberated"],
    creator: "enza Payments",
    publisher: "enza Payments",
  },
  
  // Site branding
  site: {
    title: "APIs",
    logo: {
      src: {
        light: "/assets/logo.svg",
        dark: "/assets/logo-dark.svg",
      },
      width: "120px",
    },
  },
};

export default config;
