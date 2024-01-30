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

</style>