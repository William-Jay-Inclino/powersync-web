<template>
    <div class="flex flex-col justify-center items-center">
        <NuxtImg src="/logo.png" sizes="120px md:120px"/>
        <h1 class=" font-bold text-2xl">Welcome back!</h1>
        <p class="mb-6">Please enter your credentials to login</p>
    </div>
    <div class="flex flex-col gap-4">
        <UFormGroup label="Email" required :error="!userEmail && 'You must enter an email'">
            <UInput v-model="userEmail" placeholder="you@leyeco.com" icon="i-heroicons-envelope" />
        </UFormGroup>
        <UFormGroup label="Password" required :error="!userPassword && 'You must enter a password'">
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
                <UInput type="password" v-model="userPassword" placeholder="*********" icon="i-heroicons-lock-closed" />
            </template>
        </UFormGroup>
        <UButton color="blue" block @click="onLogin">Login</UButton>
        <UNotifications />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

import type { User } from '@/stores/types';

definePageMeta({
    layout: 'auth-default'
})

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

//state
const userEmail = ref('')
const userPassword = ref('')

function onLogin() {
    const user = {} as User
    user.email = userEmail.value
    user.password = userPassword.value
    const isCredentialValid = authStore.authenticateUser(user)
    if (isCredentialValid) {
        router.push('/')
    }else{
        toast.add({title: 'Invalid email or password!',icon:'i-heroicons-shield-exclamation'})
    }
}
</script>