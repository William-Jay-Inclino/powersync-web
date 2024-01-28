<template>
    <HeaderNavigation />
    <div class="flex flex-col md:flex-row">
        <Sidebar/>
        <main class="w-full p-8 md:w-2/3 overflow-auto">
            <slot></slot>
        </main>
    </div>
</template>
  
<script setup lang="ts">
</script>
  
<style>
/* Tailwind CSS utility classes should handle most of the styling, but if you need to add any custom styles, they should be scoped to this component. */
</style>
  