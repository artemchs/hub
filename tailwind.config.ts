import tailwindPresetMantine from "tailwind-preset-mantine";
import type { Config } from "tailwindcss";
import { breakpoints, colors } from "./src/app/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [
    tailwindPresetMantine({
      mantineBreakpoints: breakpoints,
      mantineColors: colors,
    }),
  ],
  plugins: [],
  theme: {
    container: {
      center: true,
    },
  },
};
export default config;
