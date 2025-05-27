import axios from 'axios'


const API_KEY = 'AIzaSyABtsLEuiHBBP6LIfg8Zdzi_cZCe-wortI'
const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

export const state = () => ({
    token: null,
    user: null,
})

export const mutations = {
    setUser(state, payload) {
        state.token = payload.token
        state.user = payload.user
    },
    clearUser(state) {
        state.token = null
        state.user = null
    }
}

export const actions = {
    async signup({ commit }, { email, password }) {
        const res = await axios.post(SIGNUP_URL, {
            email,
            password,
            returnSecureToken: true
        })
        const userData = {
            token: res.data.idToken,
            user: { email: res.data.email }
        }
        localStorage.setItem('auth', JSON.stringify(userData))
        commit('setUser', userData)
    },

    async login({ commit }, { email, password }) {
        const res = await axios.post(LOGIN_URL, {
            email,
            password,
            returnSecureToken: true
        })
        const userData = {
            token: res.data.idToken,
            user: { email: res.data.email }
        }
        localStorage.setItem('auth', JSON.stringify(userData))
        commit('setUser', userData)
    },

    logout({ commit }) {
        localStorage.removeItem('auth')
        commit('clearUser')
    },

    initAuth({ commit }) {
        const authData = localStorage.getItem('auth')
        if (authData) {
            const parsed = JSON.parse(authData)
            commit('setUser', parsed)
        }
    }
}

export const getters = {
    isAuthenticated(state) {
        return !!state.token
    },
    userEmail(state) {
        return state.user?.email || ''
    }
}
