import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          primary: { value: "#FF9F1C" },
          primaryHover: { value: "#E08A00" },
          secondary: { value: "#FF4040" },
          tertiary: { value: "#2EC4B6" },
        },
        grey: {
          dark: { value: "#0A1014" },
          base: { value: "#1B2329" },
          mid: { value: "#353F4C" },
          light: { value: "#7A8C99" },
          border: { value: "#CAD4D9" },
        },
      },
      fonts: {
        body: { value: "'Poppins', sans-serif" },
        heading: { value: "'Poppins', sans-serif" },
      },
      fontSizes: {
        "67": { value: "67px" },
        "30": { value: "30px" },
        "18": { value: "18px" },
        "16": { value: "16px" },
        "14": { value: "14px" },
      },
      fontWeights: {
        regular: { value: 400 },
        medium: { value: 500 },
        semibold: { value: 600 },
        bold: { value: 700 },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          page: { value: "#202020" },
          dark: { value: "{colors.grey.dark}" },
          card: { value: "{colors.grey.base}" },
          muted: { value: "{colors.grey.mid}" },
        },
        text: {
          primary: { value: "#FFFFFF" },
          secondary: { value: "{colors.grey.light}" },
          active: { value: "{colors.brand.tertiary}" },
          negative: { value: "{colors.brand.secondary}" },
          highlight: { value: "{colors.brand.primary}" },
          disabled: { value: "{colors.grey.mid}" },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: "bg.page",
      color: "text.primary",
      fontSize: "16px",
      fontWeight: "regular",
    },
  },
});

export const system = createSystem(defaultConfig, config);
