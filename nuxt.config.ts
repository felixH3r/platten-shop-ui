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
    "~/assets/styles/main.css"
  ],
  buildModules: ['nuxt-graphql-request'],

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    'nuxt-medusa',
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
  googleFonts: {
    families: {
      Montserrat: [100, 300, 400, 500, 700],
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
});



