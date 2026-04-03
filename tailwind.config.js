/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.php",
    "./assets/**/*.css",
    "./assets/**/*.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // add dynamic classes here if needed
    'bg-gray-100', 'bg-gray-200', 'bg-gray-300', 'bg-emerald-500',
    'text-white', 'text-gray-500', 'text-xl', 'text-2xl',
    'peer-checked:bg-green-600', 'dark:bg-gray-700',
    'md:text-[1.5em]', 'min-w-[600px]'
  ],
};