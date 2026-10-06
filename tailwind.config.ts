import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1f344f",
          deep: "#1a304b",
        },
        green: {
          DEFAULT: "#629c35",
          dark: "#5c982d",
        },
        surface: {
          DEFAULT: "#f8f8f8",
          2: "#f9f9f9",
        },
        ink: "#2b3440",
        muted: "#6b7785",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "60ch",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(31, 52, 79, 0.18)",
        card: "0 18px 50px -20px rgba(31, 52, 79, 0.25)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "ping-slow": {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease forwards",
        "ping-slow": "ping-slow 2.4s cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
