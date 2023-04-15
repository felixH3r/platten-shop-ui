// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/apollo'
    ],
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
})
