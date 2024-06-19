// tailwind.config.js
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
      extend: {},
  },
  plugins: [
      require("daisyui"),
      require("@tailwindcss/line-clamp")
  ],
  daisyui: {
      themes: ["dark","white"], // Customize themes as needed
      // Other DaisyUI options can go here
  },
};
