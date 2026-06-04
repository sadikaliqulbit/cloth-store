/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      screens:{
        "xs": "360px",
        "sm" : "390px",
        "md" : "412px",
        "mtd" : "768px",
        "lg" : "1024px",
        "xl" : "1280px",
        "2xl" : "1366px",
        "3xl" : "1920px",
      },

      fontFamily: {
        beatriceDeckMedium: ['"Beatrice Deck Trial Medium"', 'sans-serif'],
        beatriceDeckRegular: ['"Beatrice Deck Trial Regular"', 'sans-serif'],
        beatriceDeckExtrabold: ['"Beatrice Deck Trial Extrabold"', 'sans-serif'],
        beatriceRegular: ['"Beatrice Trial Regular"', 'sans-serif'],
        beatriceHeadlineMedium: ['"Beatrice Headline Trial Medium"', 'sans-serif'],
        beatriceLight: ['"Beatrice Trial Light"', 'sans-serif'],
        interMedium: ['"Inter Medium"', 'sans-serif'],
        beatriceDeckBold: ['"Beatrice Deck Trial Bold"', 'sans-serif'],
      },
      
    },
  },
  plugins: [],
}