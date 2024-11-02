import tailwindPresetMantine from "tailwind-preset-mantine";
import { createTheme } from "@mantine/core";

const mantineTheme = createTheme({
  // ...your custom theme
});

const themeConfig = {
  presets: [
    tailwindPresetMantine({
      mantineColors: mantineTheme.colors,
      mantineBreakpoints: mantineTheme.breakpoints,
    }),
  ],
};

export default themeConfig;
