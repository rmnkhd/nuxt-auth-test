// Pinia
import { defineStore } from 'pinia'

// Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from "~/services/firebase.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
    actions: {
        async signup(email, password) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            this.user = userCredential.user
            return userCredential.user
        },
        async login(email, password) {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            this.user = userCredential.user
            return userCredential.user
        },
        async logout() {
            await signOut(auth)
            this.user = null
        },
    }
})
