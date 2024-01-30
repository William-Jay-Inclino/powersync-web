import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()

    if (to.path === '/auth/login') {
        authStore.logoutUser()
    }
    
    if (!authStore.isLoggedIn && to.path !== '/auth/login' && to.path !== '/auth/recovery') {
        return navigateTo('/auth/login')
    }
    // In a real app you would probably not redirect every route to `/`
    // however it is important to check `to.path` before redirecting or you
    // might get an infinite redirect loop
    // if (to.path !== '/') {
    //   return navigateTo('/')
    // }
  })