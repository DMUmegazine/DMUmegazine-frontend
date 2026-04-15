/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        card: "#1E1E1E",
        accent: "#34D399", // 시안의 초록색
        border: "#2A2A2A",
      },
    },
  },
  plugins: [],
}