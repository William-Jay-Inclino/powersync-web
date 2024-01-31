<template>
    <div class="flex flex-col md:flex-row">
        <Sidebar/>
        <main class="w-full p-6 md:w-full overflow-auto">
            <DashboardHeader/>
            <slot></slot>
        </main>
        <USlideover v-model="uiStore.isMobileSidebarOpen">
            <Sidebar slide-over/>
        </USlideover>
    </div>
</template>
  
<script setup lang="ts">
import { useUiStore } from '~/stores/ui';

const uiStore = useUiStore()
</script>
  
<style>
/* Tailwind CSS utility classes should handle most of the styling, but if you need to add any custom styles, they should be scoped to this component. */
</style>
  