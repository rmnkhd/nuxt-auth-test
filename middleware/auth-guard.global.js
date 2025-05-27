// Services
import TokenService from "~/services/token.service.js";

export default defineNuxtRouteMiddleware((to) => {
    const publicPages = ['/login', '/signup']
    const privatePages = ['/']

    const tokenExists = TokenService.isExist()

    if (!tokenExists  && privatePages.includes(to.path)) {
        return navigateTo('/login')
    }

    if (tokenExists && publicPages.includes(to.path)) {
        return navigateTo('/')
    }
})
