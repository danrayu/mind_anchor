import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    }
  },
  safelist: [
    "bg-radial",
    "bg-gradient-to-b",
    {
      pattern:
        /(text|border-t|bg|border|from|to)-(red|green|gray|blue|pink|purple|orange|amber|yellow|lime|emerald|cyan)-(950|900|800|700|600|500|400)/,
      variants: ["hover"],
    },
  ],
  daisyui: {
    themes: ["dark", "black", "sunset"],
  },
  plugins: [require("daisyui")],
};

export default config;
