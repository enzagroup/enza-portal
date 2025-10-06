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
