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
  buildModules: ['nuxt-graphql-request'],

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/apollo',
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
  apollo: {
    clients: {
      default:
          {
            httpEndpoint: `http://wp-platten-shop.local/graphql`,
            httpLinkOptions: {
              fetchOptions: {
                mode: 'cors' //Cors Needed for external Cross origins, need to allow headers from server
              },
              credentials: 'include',
            },
          }
    },
  },
  googleFonts: {
    families: {
      Montserrat: [100, 300, 400, 500, 700],
    }
  },
  graphql: {
    /**
     * An Object of your GraphQL clients
     */
    clients: {
      default: {
        /**
         * The client endpoint url
         */
        endpoint: 'http://wp-platten-shop.local/graphql',
        /**
         * Per-client options overrides
         * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
         */
        options: {},
      },
    },
  }
});


