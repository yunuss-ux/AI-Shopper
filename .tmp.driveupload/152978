import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Loaded via Google Fonts in index.css
        kanit: ['Kanit', 'sans-serif'],
      },
      colors: {
        // Design system tokens
        ink: '#0C0C0C',        // brand dark / background
        mist: '#D7E2EA',       // brand light / text on dark
        slate: '#646973',      // hero-heading gradient start
        cloud: '#BBCCD7',      // hero-heading gradient end
      },
      backgroundImage: {
        // ContactButton gradient
        'cta-gradient':
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        // Hero heading gradient (used via CSS utility, not Tailwind bg-*)
        'hero-heading-gradient':
          'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
    },
  },
  plugins: [],
}

export default config
