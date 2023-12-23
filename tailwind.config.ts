import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // your theme configurations
  },
  daisyui: {
    themes: ['wireframe','light', 'dark'],
  },
  plugins: [require('daisyui')],
}

export default config
