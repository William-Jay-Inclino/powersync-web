import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()

    if (to.path === '/auth/login') {
        authStore.logoutUser()
    }
    
    if (!authStore.isLoggedIn && to.path !== '/auth/login' && to.path !== '/auth/recovery') {
        return navigateTo('/auth/login')
    }
  })