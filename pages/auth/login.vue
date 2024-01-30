<template>
    <div class="flex flex-col justify-center items-center">
        <NuxtImg src="/logo.png" sizes="120px md:64px"/>
        <h1 class=" font-bold text-2xl">Welcome back!</h1>
        <p class="mb-6">Please enter your credentials to login</p>
    </div>
    <div class="flex flex-col gap-4">
        <UFormGroup label="Email" required>
            <UInput placeholder="you@leyeco.com" icon="i-heroicons-envelope" />
        </UFormGroup>
        <UFormGroup label="Password" required>
            <template #hint>
                <ULink
                    to="/auth/recovery"
                    active-class="text-primary"
                    inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                    Forgot password?
                </ULink>
            </template>
            <template #default>
                <UInput type="password" placeholder="*********" icon="i-heroicons-lock-closed" />
            </template>
        </UFormGroup>
        <RouterLink to="/">
            <UButton color="blue" block>Login</UButton>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'auth-default'
})
</script>