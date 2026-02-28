import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          primary: { value: "#FF9F1C" },
          secondary: { value: "#FF4040" },
          tertiary: { value: "#2EC4B6" },
        },
        grey: {
          dark: { value: "#0A1014" },
          base: { value: "#1B2329" },
          mid: { value: "#353F4C" },
          light: { value: "#7A8C99" },
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
          dark: { value: "{colors.grey.dark}" },
          card: { value: "{colors.grey.base}" },
          muted: { value: "{colors.grey.mid}" },
        },
        text: {
          primary: { value: "#FFFFFF" },
          secondary: { value: "{colors.grey.light}" },
          muted: { value: "{colors.grey.light}" },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: "{colors.grey.dark}",
      color: "{colors.text.primary}",
      fontSize: "16px",
      fontWeight: "regular",
    },
  },
});

export const system = createSystem(defaultConfig, config);
