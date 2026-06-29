/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        garamond: ['Garamond', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
};
