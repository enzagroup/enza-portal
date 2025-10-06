import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
  // Set the base path for GitHub Pages deployment
  basePath: "",
  
  topNavigation: [
    { id: "docs", label: "Documentation" },
    { id: "api", label: "API Reference" },
  ],
  sidebar: {
    docs: [
      {
        type: "category",
        label: "Getting Started",
        items: ["index"],
      },
    ],
  },
  apis: [
    {
      type: "file",
      input: "./apis/generalapi.yaml",
      navigationId: "api",
    },
  ],
  metadata: {
    title: "Enza Portal API Documentation",
    description: "High quality, interactive API documentation for Enza Group",
  },
};

export default config;
