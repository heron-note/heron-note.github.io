/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Nordic palette
          oat: "#F1EBE0",       // warm cream background
          linen: "#FAF6EE",     // lighter off-white
          sand: "#E8DFCF",      // soft beige divider
          ink: "#2A2926",       // warm near-black for text
          charcoal: "#3D3A35",  // slightly lighter dark
          sage: "#8FA08F",      // muted sage green accent
          sageDeep: "#5E7060",  // darker sage
          clay: "#C97A5F",      // warm terracotta accent
          stone: "#A39A8B",     // muted stone gray
        },
      },
    },
    plugins: [],
  }