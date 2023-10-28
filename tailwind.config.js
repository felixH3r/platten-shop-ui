/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const colors = require("tailwindcss/colors");
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
    ],
    theme: {
        colors: {
            'primary': '#F9F6F2',
            'primary-variant': '#F1D6AB',
            'secondary': '#A0855B',
            'cta': '#38470B',
            'background': '#FFFFFF',
            'white': '#FFFFFF'
        },
        fontFamily: {
            sans: ['Montserrat', 'sans'],
        }
    },
    plugins: [],
}

