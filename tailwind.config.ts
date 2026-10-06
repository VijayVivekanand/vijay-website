import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        steel: {
          950: "#080c11",
          900: "#0d131a",
          850: "#121922",
          800: "#17212c",
          700: "#223040",
          600: "#324458",
          500: "#496078",
          400: "#6d86a2",
          300: "#98acc2",
          200: "#c8d6e5",
          100: "#e9f0f8",
        },
        accent: {
          blue: "#5294e2",
          sky: "#70a5ea",
          slate: "#8ba3bc",
          muted: "#4a627a",
          amber: "#c59a45",
          teal: "#3caea3",
        },
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      backgroundImage: {
        "subtle-grid": "radial-gradient(circle, rgba(100, 130, 165, 0.07) 1px, transparent 1px)",
        "mesh-dark": "radial-gradient(at 50% 0%, #151e2a 0px, transparent 65%)",
      },
    },
  },
  plugins: [],
};
export default config;
