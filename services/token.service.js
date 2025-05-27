import StorageService from './storage.service';

class TokenService {
    /**
     * Storage key
     *
     * @returns {String}
     */
    static get STORAGE_KEY() {
        return 'auth_token';
    }

    /**
     * Set token
     *
     * @param {String} value
     * @returns void
     */
    static set(value) {
        useCookie(this.STORAGE_KEY , { path: '/' }).value = value
    }

    /**
     * Get token
     *
     * @returns {String}
     */
    static get() {
        const token = useCookie(this.STORAGE_KEY)
        return token?.value || null
    }

    /**
     * Token is exist
     *
     * @returns {Boolean}
     */
    static isExist() {
        return !!this.get()
    }

    /**
     * Clear token
     *
     * @returns void
     */
    static clear() {
        useCookie(this.STORAGE_KEY).value = null
    }
}

export default TokenService;
