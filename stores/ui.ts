import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
    //state
    const isMobileSidebarOpen = ref(false)
  
    //actions

    return {
        isMobileSidebarOpen,
        //method
    }
})