/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

const plugin = require('tailwindcss/plugin')
const colors = require("tailwindcss/colors");
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue"
    ],
    theme: {
        colors: {
            'primary': '#F9F6F2',
            'primary-variant': '#F1D6AB',
            'secondary': '#A0855B',
            'cta': '#38470B',
            'background': '#FFFFFF',
            'white': '#FFFFFF',
            'gray': '#6B7280',
            'gray-light': '#d3dce6',
            'transparent': 'rgba(255, 255, 255, 0)',
            'red': 'red',
            'black': 'black'
        },
        fontFamily: {
            sans: ['Montserrat', 'sans'],
        },
        aspectRatio: {
            '2/1': '2 / 1',
        },
        extend: {
            width: {
                'config-sidebar': '25rem',
            },
            minWidth: {
                'config-sidebar': '25rem'
            }
        }

    },
    plugins: [
        daisyui,
    ],
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#38470B",
                    "secondary": "#A0855B",
                    "accent": "#37cdbe",
                    "neutral": "#F1D6AB",
                    "base-100": "#ffffff",
                    "base-200": "#F9F6F2",
                    "--rounded-btn": "999px",
                },
            },
        ],
    },
}

