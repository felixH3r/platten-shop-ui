// https://nuxt.com/docs/api/configuration/nuxt-config

import {undefined} from "zod";

export default defineNuxtConfig({
  alias: undefined,
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
    ],
    script: [{
      src: '/_nuxt/node_modules/preline/dist/preline.js', defer: true
    }]
  },

  // @ts-ignore
  isr: true,
  

  css: [
    "~/assets/styles/main.css"
  ],

  buildModules: ['nuxt-graphql-request'],

  plugins: [
    "~/plugins/preline.client.ts"
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true,
  },

  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts', 'nuxt-medusa', '@nuxt/image'],

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
  },

  runtimeConfig: {
    public: {
      stripe_publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
    }
  },

  compatibilityDate: '2024-10-18'
});
