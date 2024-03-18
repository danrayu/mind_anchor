import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // your theme configurations
  },
  safelist: [
    {
      pattern: /(bg|border)-(red|green|blue|pink|purple|orange|amber|yellow|lime|emerald|cyan)-(950|900|800|700|600|500|400)/,
      variants: ["hover"],
    },
  ],
  daisyui: {
    themes: ["wireframe", "light", "dark", "cupcake"],
  },
  plugins: [require("daisyui")],
};

export default config;
