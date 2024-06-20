/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primarySkyblue: '#00C2DD',
        primaryBlue: '#003399',
        primaryGray: '#4b5563',
        // primary: '#14A800',
        negro: '#1F1F1F',
        badged: '#E7FFEC',
        plomo: '#5E6D55',
        blackCustom: '#858585',
      }
    },
  },
  plugins: [],
}

