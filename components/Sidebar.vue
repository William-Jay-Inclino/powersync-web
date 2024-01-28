<template>
    <aside class="bg-gray-800 text-white w-full md:w-1/6 md:sticky top-0 h-screen overflow-auto p-4">
        <h1 class="font-medium">Dashboard</h1>
        <UAccordion :items="items" :ui="{ wrapper: 'flex flex-col w-full' }">
            <template #default="{ item, index, open }">
                <UButton color="gray" variant="ghost"
                    :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
                    <template #leading>
                        <div
                            class="w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 flex items-center justify-center -my-1">
                            <UIcon :name="item.icon" class="w-4 h-4 text-white dark:text-gray-900" />
                        </div>
                    </template>

                    <span class="truncate">{{ index + 1 }}. {{ item.label }}</span>

                    <template #trailing>
                        <UIcon name="i-heroicons-chevron-right-20-solid"
                            class="w-5 h-5 ms-auto transform transition-transform duration-200"
                            :class="[open && 'rotate-90']" />
                    </template>
                </UButton>
            </template>
            <template #purchasing-menu>
                <UVerticalNavigation
                    :links="purchasingItems"
                    :ui="{
                        wrapper: 'border-s border-gray-200 dark:border-gray-800 space-y-2',
                        base: 'group block border-s -ms-px lg:leading-6 before:hidden',
                        padding: 'p-0 ps-4',
                        rounded: '',
                        font: '',
                        ring: '',
                        active: 'text-primary-500 dark:text-primary-400 border-current font-semibold',
                        inactive: 'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
                    }"
                />
            </template>
        </UAccordion>
        <button @click="toggleSidebar" class="md:hidden btn btn-primary">
            Toggle Sidebar
        </button>
    </aside>
</template>

<script setup lang="ts">
const isSidebarOpen = useState('isSidebarOpen', () => false)
const items = [{
    label: 'Purchasing',
    icon: 'i-heroicons-shopping-cart-16-solid',
    defaultOpen: true,
    slot: 'purchasing-menu'
}, {
    label: 'Warehouse',
    icon: 'i-heroicons-home-modern-16-solid',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}, {
    label: 'Motorpool',
    icon: 'i-heroicons-truck-solid',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}, {
    label: 'Project',
    icon: 'i-heroicons-briefcase',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}, {
    label: 'Data Management',
    icon: 'i-heroicons-circle-stack-16-solid',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}, {
    label: 'Reports',
    icon: 'i-heroicons-chart-bar-square-16-solid',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.'
}]

const purchasingItems = [{
  label: 'Canvass',
  to: '/purchasing/canvass'
}, {
  label: 'RV',
  to: '/purchasing/rv'
}, {
  label: 'SPR',
  to: '/purchasing/spr'
}, {
  label: 'JO',
  to: '/purchasing/jo'
}, {
  label: 'MEQS',
  to: '/purchasing/meqs'
}, {
  label: 'PO',
  to: '/purchasing/po'
}]

function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
}
</script>