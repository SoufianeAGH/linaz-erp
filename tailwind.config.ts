import type { Config } from "tailwindcss";

// Couleurs provisoires : bordeaux et sable, d'après les logos Linaz Living (à confirmer avec la charte).
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bordeaux: { DEFAULT: "#6B1F2E", 50: "#F7EEF0", 100: "#EEDCE0", 700: "#561826", 900: "#3A0F19" },
        sable: { DEFAULT: "#D6C3A3", 50: "#FBF8F3", 100: "#F3ECDF", 300: "#E4D6BE", 600: "#A88E64" },
        encre: "#2A2220",
        gris: "#6E6560",
        ok: "#2F7A4D",
        attention: "#B7791F",
        derive: "#B42318",
      },
      fontFamily: {
        titre: ['"Cormorant Garamond"', "Georgia", "serif"],
        corps: ['Inter', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
