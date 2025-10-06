import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
  // Set the base path for GitHub Pages deployment
  basePath: "/enza-portal",
  
  // Redirect root to API page
  redirects: [
    { from: "/", to: "/api/card-management" },
  ],
  
  topNavigation: [
    { id: "api", label: "API Reference" },
  ],
  apis: [
    {
      type: "file",
      input: "./apis/generalapi.yaml",
      navigationId: "api",
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
  
  // Custom branding
  page: {
    pageTitle: "APIs",
    logo: {
      src: {
        light: "/enza-portal/assets/logo.svg",
        dark: "/enza-portal/assets/logo-dark.svg",
      },
      width: "120px",
    },
  },
};

export default config;
