import { createI18n } from '@/services/language.service'

export default defineNuxtPlugin(nuxtApp => {
    const i18n = createI18n()
    nuxtApp.vueApp.use(i18n)
})
