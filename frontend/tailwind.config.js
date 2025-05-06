/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          "blue-dark": {
            50: "#e6f1ff",
            100: "#bdd4ff",
            200: "#94b7ff",
            300: "#6b9aff",
            400: "#427dff",
            500: "#1960ff",
            600: "#0047e1",
            700: "#0035a9",
            800: "#002371",
            900: "#001239",
          },
        },
      },
    },
    plugins: [],
}
  
  