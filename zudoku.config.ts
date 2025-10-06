import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
  basePath: "/enza-portal",
  page: {
    pageTitle: "APIs",
    logo: {
      src: {
        light: "/enza-portal/logos/logo.svg",
        dark: "/enza-portal/logos/logo-dark.svg",
      },
      width: "99px",
    },
  },
    metadata: {
      title: "enza Open API Developer Portal",
      description: "This is enza Open API Developer Portal",
      logo: "https://www.enzagroup.global/wp-content/uploads/2024/06/enza-logo.svg",
      favicon: "https://www.enzagroup.global/wp-content/uploads/2024/06/cropped-fav-icon-32x32.png",
      referrer: "no-referrer",
      keywords: ["enza", "liberating", "payments", "Africa"],
      authors: ["enza Group - Payments Liberated"],
      creator: "enza Payments",
      publisher: "enza Payments"
  },
  theme: {
    fonts: {
      sans: {
        fontFamily: "Readex Pro, serif",
        url: "https://fonts.googleapis.com/css2?family=Readex+Pro:wght@160..700&display=swap",
      },
    },
    light: {
      primary: "156 52% 72%",
      primaryForeground: "156 5.2% 7.2%",
    },
    dark: {
      primary: "156 52% 72%",
      primaryForeground: "156 5.2% 7.2%",
      secondary: "156 26% 21.6%",
      secondaryForeground: "156 5.2% 98.6%",
      popover: "156 54.6% 9.36%;",
      popoverForeground: "156 5.2% 98.6%",
      card: "156 54.6% 9.36%",
      cardForeground: "156 5.2% 98.6%",
      background: "156 33.8% 5.76%",
      foreground: "156 5.2% 98.6%",
      muted: "156 26% 21.6%",
      mutedForeground: "156 5.2% 57.2%",
      border: "156 26% 21.6%",
      input: "156 26% 21.6%",
      accent: "156 26% 21.6%",
      accentForeground: "156 5.2% 98.6%",
      destructive: "0 62.8% 30.6%",
      destructiveForeground: "156 5.2% 98.6%",
      ring: "156 52% 72%",
    },
  },
  redirects: [{ from: "/", to: "/api" }],
  apis: {
    type: "file",
    input: "./public/apis/generalapi.yaml",
    navigationId: "api",
  },
};

export default config;