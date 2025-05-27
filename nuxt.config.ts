// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
      '@pinia/nuxt',
  ],
  plugins: [
    '~/plugins/i18n.js'
  ],
  css: [
      'bootstrap/dist/css/bootstrap.min.css',
      'bootstrap-rtl/dist/css/bootstrap-rtl.min.css',
      '~/assets/app.css'
  ],
  app: {
        head: {
            htmlAttrs: {
                dir: 'rtl',
                lang: 'fa',
            },
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Vazirmatn&display=swap',
                },
            ],
        },
    },
})
