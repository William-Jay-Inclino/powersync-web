// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', "@nuxt/image","@samk-dev/nuxt-vcalendar"],
  pages:true,
  colorMode:{
    preference: 'light'
  }
})