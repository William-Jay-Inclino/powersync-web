import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    //state
    const isDark = ref(false)
  
    //actions
    function toggleTheme() {
      isDark.value = !isDark.value
    }

    return {
        isDark,
        //method
        toggleTheme
    }
})