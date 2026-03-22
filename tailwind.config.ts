import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#faf8f3",
          100: "#f3eedf",
          200: "#e6d9b8",
          300: "#d6c48a",
          400: "#c6ad5f",
          500: "#b89644",
          600: "#987638",
          700: "#775b2e",
          800: "#574324",
          900: "#3a2d19"
        }
      },
      boxShadow: {
        soft: "0 12px 40px rgba(17, 24, 39, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;

