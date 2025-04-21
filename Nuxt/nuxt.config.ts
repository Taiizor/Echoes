// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxt/ui'
  ],

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'dark',
  },

  i18n: {
    langDir: 'locales',
    defaultLocale: 'en',
    restructureDir: false,
    locales: [
      { code: 'en', iso: 'en', name: 'English', file: 'en.js', dir: 'ltr' },
      { code: 'tr', iso: 'tr', name: 'Türkçe', file: 'tr.js', dir: 'ltr' },
    ],
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  app: {
    head: {
      title: 'Echoes - Dünyadan Alıntılar',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Echoes - Dünyadan Alıntılar ve Sözler' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  nitro: {
    preset: 'node-server'
  }
})