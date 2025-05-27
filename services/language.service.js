import StorageService from './storage.service';

import { createI18n as createVueI18N } from 'vue-i18n';

import fa from '/locales/fa.json';
import en from '/locales/en.json';

class LanguageService {
    /**
     * Storage key
     *
     * @returns {String}
     */
    static get STORAGE_KEY() {
        return 'locale';
    }

    /**
     * Default language
     *
     * @returns {String}
     */
    static get DEFAULT() {
        return 'fa';
    }

    /**
     * Set language
     *
     * @param {String} value
     * @returns void
     */
    static set(value) {
        StorageService.set(this.STORAGE_KEY, value);
        location.reload();
    }

    /**
     * Get language
     *
     * @returns {String}
     */
    static get() {
        return StorageService.get(this.STORAGE_KEY) ?? this.DEFAULT;
    }

    /**
     * Current language is rtl
     *
     * @returns {Boolean}
     */
    static isRtl() {
        return ['fa'].includes(this.get());
    }
}

export default LanguageService;

const vueI18N = createVueI18N({
    // locale: LanguageService.get(),
    locale: 'fa',
    fallbackLocale: LanguageService.DEFAULT,
    messages: { en, fa }
});

export function createI18n() {
    return vueI18N;
}

export function t(...args) {
    return vueI18N.global.t(...args);
}
