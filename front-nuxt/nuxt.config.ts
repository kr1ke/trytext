// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    TELEGRAM_TOKEN: "my_fancy_bot_token",
  },
  devtools: { enabled: true },
  css: ['@/app/styles/tailwind.css'],
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', 'nuxt-telegram-auth'],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.

     * @default "./components/ui"
     */
    componentDir: './shared/ui',
  },

  // автоимпорты
  imports: {
    dirs: [
      // "shared/**",
      // You can specify here any folder from which you want to auto-import
    ],
  },

  // чтоб работал shadcn
  components: {
    dirs: [
      {
        path: '~/shared/ui',
        pathPrefix: false,
      },
    ],
  },

  compatibilityDate: '2024-08-26',
});
