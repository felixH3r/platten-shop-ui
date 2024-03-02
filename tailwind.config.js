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
        './node_modules/preline/preline/preline.js',
    ],
    theme: {
        colors: {
            'primary': '#F9F6F2',
            'primary-variant': '#F1D6AB',
            'secondary': '#A0855B',
            'cta': '#38470B',
            'background': '#FFFFFF',
            'white': '#FFFFFF',
            'gray': '#8492a6',
            'gray-light': '#d3dce6',
            'transparent': 'rgba(255, 255, 255, 0)'
        },
        fontFamily: {
            sans: ['Montserrat', 'sans'],
        },
        aspectRatio: {
            '2/1': '2 / 1',
        },
        extend: {
            width: {
                'config-sidebar': '30rem'
            }
        }

    },
    plugins: [
        require('preline/plugin'),
    ],
}

