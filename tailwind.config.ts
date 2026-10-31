import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.12)",
      },
      colors: {
        brand: {
          50: "#f3fbff",
          100: "#dff7ff",
          500: "#22c3f7",
          600: "#0ea5e9",
          700: "#0369a1",
        },
      },
    },
  },
  plugins: [],
};

export default config;
