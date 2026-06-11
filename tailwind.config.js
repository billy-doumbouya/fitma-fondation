/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Charte officielle Fondation Fitma
        savane:  { DEFAULT: "#2E7D32", light: "#4CAF50", dark: "#1B5E20", pale: "#E8F5E9" },
        cauri:   { DEFAULT: "#F9A825", light: "#FFD54F", dark: "#F57F17", pale: "#FFF9C4" },
        neige:   "#FFFFFF",
        sable:   { DEFAULT: "#F5F0E8", dark: "#E8DCC8" },
        nuit:    { DEFAULT: "#1A237E", light: "#283593" },
        // Neutres
        encre:   "#1C1C1E",
        ardoise: "#4A4A4A",
        brume:   "#9E9E9E",
        nuage:   "#F5F5F5",
        // Sémantiques
        success: "#2E7D32",
        error:   "#C62828",
        warning: "#F57F17",
        info:    "#1565C0",
      },
      fontFamily: {
        display: ["Montserrat", "system-ui", "sans-serif"],
        body:    ["Open Sans", "system-ui", "sans-serif"],
      },
      borderRadius: { "2xl":"1rem", "3xl":"1.5rem", "4xl":"2rem" },
      boxShadow: {
        cauri:  "0 4px 24px rgba(249,168,37,.30)",
        savane: "0 4px 24px rgba(46,125,50,.25)",
        nuit:   "0 4px 24px rgba(26,35,126,.20)",
        soft:   "0 2px 8px rgba(0,0,0,.06)",
        card:   "0 4px 24px rgba(0,0,0,.10)",
        deep:   "0 8px 48px rgba(0,0,0,.15)",
      },
      backgroundImage: {
        "grad-savane": "linear-gradient(135deg,#1B5E20 0%,#2E7D32 100%)",
        "grad-cauri":  "linear-gradient(135deg,#F57F17 0%,#F9A825 100%)",
        "grad-nuit":   "linear-gradient(135deg,#1A237E 0%,#283593 100%)",
        "grad-hero":   "linear-gradient(135deg,rgba(27,94,32,.90) 0%,rgba(26,35,126,.70) 100%)",
        "grad-sable":  "linear-gradient(135deg,#F5F0E8 0%,#E8DCC8 100%)",
      },
      animation: {
        "float":      "float 3s ease-in-out infinite",
        "pulse-g":    "pulseG 2s ease-in-out infinite",
        "fade-up":    "fadeUp .6s ease forwards",
        "shimmer":    "shimmer 1.5s infinite",
      },
      keyframes: {
        float:   { "0%,100%":{transform:"translateY(0)"}, "50%":{transform:"translateY(-6px)"} },
        pulseG:  { "0%,100%":{boxShadow:"0 0 0 0 rgba(46,125,50,.4)"}, "50%":{boxShadow:"0 0 0 12px rgba(46,125,50,0)"} },
        fadeUp:  { "0%":{opacity:0,transform:"translateY(24px)"}, "100%":{opacity:1,transform:"translateY(0)"} },
        shimmer: { "0%":{backgroundPosition:"200% 0"}, "100%":{backgroundPosition:"-200% 0"} },
      },
    },
  },
  plugins: [],
}
