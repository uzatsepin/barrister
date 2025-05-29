// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-icon',
    'nuxt-aos',
    '@nuxt/image'
  ],
  app: {
    head: {
      title: 'BarristerCorp - Иммиграция и образование в США',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Международная компания BarristerCorp предоставляет поддержку людям, желающим учиться, работать, вести бизнес или переехать в США по гуманитарным программам.'
        }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap' },
        { rel: 'icon', type: 'image/png', href: '/favicon/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' }
      ]
    }
  },
  i18n: {
    locales: [
      {
        code: 'ru',
        name: 'Русский',
        file: 'ru.js'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'ru',
    strategy: 'no_prefix'
  },
  aos: {
    disable: false,
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,
    
    offset: 50,
    delay: 100,
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom'
  }
})