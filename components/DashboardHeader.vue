<template>
<div class=" bg-sky-600 text-white flex justify-between rounded-lg p-4 items-center">
    <UBreadcrumb :links="uiStore.breadcrumb" class="hidden md:block" :ui="{
        active: 'text-white hover:text-yellow-200 hover:cursor-pointer',
        inactive: 'text-white hover:text-yellow-200',
        base: 'text-white',
        divider: {
            base: 'text-white'
        }
    }"/>
    <UButton
      icon="i-heroicons-bars-3-bottom-left-16-solid"
      size="sm"
      color="yellow"
      square
      variant="ghost"
      class="sm:block md:hidden"
      @click="uiStore.isMobileSidebarOpen = !uiStore.isMobileSidebarOpen"
    />

    <UDropdown :items="profileItems" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

        <template #account="{ item }">
        <div class="text-left">
            <p>
            Signed in as
            </p>
            <p class="truncate font-medium text-gray-900 dark:text-white">
            {{ item.label }}
            </p>
        </div>
        </template>

        <template #item="{ item }" >
        <span class="truncate">{{ item.label }}</span>

        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
        </template>
    </UDropdown>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useUiStore } from '~/stores/ui';

const authStore = useAuthStore()
const uiStore = useUiStore()

const profileItems = ref([
  [{
    label: authStore.isLoggedIn ? authStore.currentUser.email : 'default@leyeco.com',
    slot: 'account',
    disabled: true
  }], [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth'
  }], [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    to: '/auth/login'
  }]
])
</script>