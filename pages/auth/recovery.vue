<template>
    <div class="flex flex-col justify-center items-center">
        <NuxtImg src="/logo.png" sizes="120px md:64px"/>
        <h1 class=" font-bold text-2xl">Account Recovery</h1>
        <p class="mb-6">Please enter your registered email.</p>
    </div>
    <div class="flex flex-col gap-4">
        <UFormGroup label="Registered Email" required>
            <UInput placeholder="you@leyeco.com" icon="i-heroicons-envelope" />
        </UFormGroup>

        <UButton color="blue" block @click="toast.add({ title: 'Recovery email succesfully sent!' })">Send reset link</UButton>

    </div>
    <UNotifications/>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'auth-default'
})

const toast = useToast()
</script>