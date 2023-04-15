// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    head: {
        title: 'platten-shop-ui',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        ]
    },
    css: [
        "@/assets/styles/global-classes.scss",
        "@/assets/styles/global-mixins.scss",
    ],

    modules: [
        '@pinia/nuxt',
        '@nuxtjs/apollo',
        '@nuxtjs/google-fonts',

    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/styles/global-variables.scss";',
                },
            },
        },
    },
    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
    },
    apollo: {
        clients: {
            default: {
                httpEndpoint: `http://wp-platten-shop.local/graphql`
            }
        },
    },
    googleFonts: {
        families: {
            Montserrat: true,
        }
    }
})
