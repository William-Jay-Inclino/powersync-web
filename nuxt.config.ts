// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    "@nuxt/image",
    "@samk-dev/nuxt-vcalendar",
    '@vueuse/nuxt'
  ],
  pages:true,
  colorMode:{
    preference: 'light'
  }
})