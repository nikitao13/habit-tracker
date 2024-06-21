/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-to-r": "linear-gradient(to right, #3b82f6, #8b5cf6)",
      },
      colors: {
        "purple-hbt": "#8C72F8",
        "blue-hbt": "#5B8AF8",
      },
      screens: {
        "h-sm": { raw: "(max-height: 900px)" },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-gradient": {
          backgroundClip: "text",
          "-webkit-background-clip": "text",
          color: "transparent",
          backgroundImage: "linear-gradient(to right, #3b82f6, #8b5cf6)",
        },
      });
    },
  ],
};
