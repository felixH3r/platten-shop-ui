// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Remove undefined alias

  // Replace head with app.head for Nuxt 3
  app: {
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
      // Move script to public directory instead of _nuxt
      script: [{
        src: '/preline/preline.js',
        defer: true
      }]
    }
  },

  // ISR configuration
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    }
  },

  css: [
    "~/assets/styles/main.css"
  ],

  // Remove buildModules (deprecated in Nuxt 3)
  // Add GraphQL module directly to modules
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    'nuxt-medusa',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],

  plugins: [
    "~/plugins/preline.client.ts"
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
      redirect_url: process.env.REDIRECT_URL
    }
  },

  compatibilityDate: '2024-10-29'
});
