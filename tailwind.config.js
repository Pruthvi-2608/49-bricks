/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        clay: { 50: '#FBF1EC', 300: '#D89C87', 500: '#AC5340', 700: '#8C3A2B', 900: '#5E2620' },
        mortar: { 50: '#F1EFEC', 300: '#8A8377', 700: '#443E37', 950: '#26221E' },
        limewash: { 50: '#F4EEE4', 100: '#FBF8F2' },
        moss: { 500: '#7C8B63', 600: '#6C7A54', 700: '#57623F' },
        brass: { 400: '#C7A876', 500: '#B8935A', 600: '#9C7940' },
        stone: { 300: '#B7AFA4', 400: '#9A9086', 500: '#7D746A' },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'serif'],
        body: ['"General Sans"', '"Inter"', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '2px',
        md: '4px',
        lg: '6px',
      },
    },
  },
  plugins: [],
};
