/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#111111",
        "surface-hover": "#1a1a1a",
        border: "#222222",
        primary: {
          DEFAULT: "#ffffff",
          muted: "#a1a1aa",
        },
        accent: {
          DEFAULT: "#e4e4e7",
          hover: "#ffffff",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      fontSize: {
        'hero-heading': 'clamp(2.8rem, 7vw, 6.5rem)',
        'section-heading': 'clamp(2rem, 4vw, 3.5rem)',
        'large-heading': 'clamp(1.75rem, 3vw, 2.75rem)',
        'card-heading': 'clamp(1.15rem, 2vw, 1.4rem)',
        'body': 'clamp(1rem, 1.5vw, 1.125rem)',
        'small': 'clamp(0.8rem, 1vw, 0.9rem)',
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.02em",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        }
      }
    },
  },
  plugins: [],
}
