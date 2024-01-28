<template>
    <div>
        <h1 class=" text-3xl">Canvass</h1>
        <div class="flex flex-col md:mt-6">
            <UCard>
                <template #header>
                Search Filter
                </template>

                <Placeholder class="h-32" />

                <template #footer>
                <Placeholder class="h-8" />
                </template>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
//@ts-expect-error
definePageMeta({
    layout: 'dashboard-default'
})
</script>