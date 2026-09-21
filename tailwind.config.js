/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: '#00f0ff',
          neon: '#06b6d4',
          blue: '#3b82f6',
          bg: '#040711',
          panel: '#080d1e',
          border: 'rgba(0, 240, 255, 0.25)',
          glow: 'rgba(0, 240, 255, 0.4)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'neon-cyan': '0 0 25px rgba(0, 240, 255, 0.35)',
        'neon-blue': '0 0 25px rgba(59, 130, 246, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.6)'
      }
    },
  },
  plugins: [],
}
