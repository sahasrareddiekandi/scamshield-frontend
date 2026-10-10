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
          dark: '#0a0f1d',
          darker: '#060a14',
          card: '#0f172a',
          cardHover: '#131e36',
          border: '#1e293b',
          accent: '#06b6d4',      // cyan
          accentGlow: 'rgba(6, 182, 212, 0.15)',
          safe: '#10b981',        // emerald
          safeGlow: 'rgba(16, 185, 129, 0.15)',
          warning: '#f59e0b',     // amber
          warningGlow: 'rgba(245, 158, 11, 0.15)',
          danger: '#ef4444',      // rose/red
          dangerGlow: 'rgba(239, 68, 68, 0.15)'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cyber-cyan': '0 0 20px -5px rgba(6, 182, 212, 0.3)',
        'cyber-danger': '0 0 25px -5px rgba(239, 68, 68, 0.3)',
        'cyber-safe': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'cyber-warning': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
      }
    },
  },
  plugins: [],
}
