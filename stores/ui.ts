import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Breadcrumb } from './types'

export const useUiStore = defineStore('ui', () => {
    //state
    const isMobileSidebarOpen = ref(false)
    const breadcrumb = ref<Array<Breadcrumb>>([
        {
            label: 'Home',
            icon: 'i-heroicons-queue-list-solid',
            to: '/'
        }
    ])
    //actions

    return {
        isMobileSidebarOpen,
        breadcrumb
        //method
    }
})