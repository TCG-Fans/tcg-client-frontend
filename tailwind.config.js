module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0f0f1c',
        surface: '#1b1b2f',
        neon: {
          purple: '#a259ff',
          cyan: '#00ffe0',
          green: '#00ff88',
          yellow: '#ffdd57',
          red: '#ff4d6d',
        },
      },
      fontFamily: {
        techno: ['"Orbitron"', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 8px rgba(0, 255, 200, 0.8), 0 0 12px rgba(160, 89, 255, 0.6)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        glitch: 'glitch 1s infinite',
        fadeIn: 'fadeIn 0.5s ease-out',
        pulseFast: 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-1px, 1px)' },
          '80%': { transform: 'translate(1px, -1px)' },
          '100%': { transform: 'translate(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
