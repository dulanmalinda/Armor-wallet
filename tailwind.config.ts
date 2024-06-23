import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        '1/3-screen': '33.333333vh',
      },
      fontFamily: {
        'jetbrains-mono': ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'armor-green': '#BDFF6A',
      },
    },
  },
  plugins: [],
};
export default config;
