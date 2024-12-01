// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Remove undefined alias

  // Replace head with app.head for Nuxt 3
  app: {
    head: {
      title: 'FurnTune - Aus Standard wird Design',
      htmlAttrs: {
        lang: 'de'
      },
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {hid: 'description', name: 'description', content: ''},
        {name: 'format-detection', content: 'telephone=no'},
        {
          name: 'description',
          content: 'Entdecke maßgefertigte Möbelteile wie Möbelfronten und Tischplatten bei Furntune. Verwandle Standardmöbel schnell und einfach in einzigartige Designobjekte!'
        }
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/pagedone@1.2.2/src/css/pagedone.css'
        }
      ],
      // Move script to public directory instead of _nuxt
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/pagedone@1.2.2/src/js/pagedone.js',
          defer: true
        }
      ]
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
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts', 'nuxt-medusa', '@nuxt/image', '@nuxtjs/tailwindcss', '@vueuse/nuxt', 'nuxt-gtag'],

  plugins: [],

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

  gtag: {
    id: 'G-VZ5HE6C3RE'
  },

  compatibilityDate: '2024-10-29'
});
