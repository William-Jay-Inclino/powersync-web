<template>
    <div class="flex flex-wrap gap-4">
        <div>
            <div class="flex flex-col justify-center items-center">
                <NuxtImg src="/logo.png" sizes="120px md:120px"/>
                <h1 class=" font-bold text-2xl">Welcome back!</h1>
                <p class="mb-6">Please enter your LVUMS credentials to login</p>
            </div>
            <div class="flex flex-col gap-4">
                <UFormGroup label="Username" required :error="!username && 'You must enter a username'">
                    <UInput v-model="username" placeholder="username" icon="i-heroicons-user-20-solid" />
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
        </div>
        <div class="hidden md:flex items-center px-6 rounded-xl bg-gradient-to-br from-slate-50 via-sky-100 to-sky-300">

            <div class="flex flex-col gap-4 ">
                <div>
                    <h1 class=" font-bold text-3xl">LVUMS</h1>
                    <p class="font-bold text-xl">Leyeco V Unified Management System</p>
                </div>
                <div>
                    <p>
                        LVUMS empowers Leyeco V mission and vision through the <br> following suite of powerful management tools
                    </p>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <div class="rounded-md px-1 py-2 bg-amber-200 basis-3 hover:bg-sky-400 hover:*:text-white hover:-translate-y-1 cursor-pointer transition-colors duration-300" v-for="item in menuItems">
                        <div class="flex flex-row gap-1  justify-center items-center">
                            <UIcon :name="item.icon" />
                            <p class="font-bold hover:font-extrabold">{{ item.label }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

import type { User } from '@/stores/types';

definePageMeta({
    layout: 'auth-default'
})

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

interface MenuItem {
    label: string
    icon: string
}

const menuItems:Array<MenuItem> = [{
  label: 'Powerserve',
  icon: 'i-heroicons-bolt'
}, {
  label: 'System',
  icon: 'i-heroicons-cog-6-tooth-20-solid'
}, {
  label: 'e-Forms',
  icon: 'i-heroicons-clipboard-document'
}, {
  label: 'eConnect',
  icon: 'i-heroicons-link-16-solid'
}, {
  label: 'Powerbill',
  icon: 'i-heroicons-receipt-percent-20-solid'
}, {
  label: 'LPS',
  icon: 'i-heroicons-rectangle-stack-16-solid'
}, {
  label: 'Powerhouse',
  icon: 'i-heroicons-home-modern-16-solid'
}, {
  label: 'Accounting',
  icon: 'i-heroicons-currency-dollar'
}, {
  label: 'PowerPay',
  icon: 'i-heroicons-credit-card-16-solid'
}]

//state
const username = ref('')
const userPassword = ref('')

function onLogin() {
    const user = {} as User
    user.username = username.value
    user.password = userPassword.value
    const isCredentialValid = authStore.authenticateUser(user)
    if (isCredentialValid) {
        router.push('/')
    }else{
        toast.add({title: 'Invalid email or password!',icon:'i-heroicons-shield-exclamation'})
    }
}
</script>