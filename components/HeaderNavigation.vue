<template>
    <nav class="bg-blue-500 border-b-2 sticky top-0 z-10">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <div class="py-5">
          <!-- Your logo or brand name -->
          <NuxtLink to="/" class="text-white text-lg font-bold">LVUMS</NuxtLink>
        </div>
        <div class="hidden md:flex space-x-4">
          <!-- Navigation Links -->
          <!-- <NuxtLink to="/docs" class="text-white">Docs</NuxtLink>
          <NuxtLink to="/integrations" class="text-white">Integrations</NuxtLink> -->
          <!-- Add more navigation links as needed -->
        </div>
        <div class="flex items-center space-x-2">
          <!-- Right-side items -->
          <UButton color="white" variant="solid" size="lg">Login</UButton>
          <!-- Responsive menu button -->
          <button @click="toggleMenu" class="md:hidden text-white">
            <span>Menu</span>
          </button>
        </div>
      </div>
      <!-- Responsive Menu -->
      <div v-if="menuOpen" class="md:hidden">
        <ULink to="/docs" class="text-white">Docs</ULink>
        <ULink to="/integrations" class="text-white">Integrations</ULink>
        <!-- Add more responsive links as needed -->
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const menuOpen = ref(false);
  
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
  };
  </script>
  
  <style scoped>
  .bg-dark {
    background-color: #2D3748; /* Adjust the color to match your theme */
  }
  /* Add more styles for responsiveness and design */
  </style>
  