<template>
    <div>
        <HeaderNavigation/>
        <section class="bg-light text-white p-8">
            <div class="container mx-auto">
            <h2 class="text-4xl font-bold text-black mb-12 text-center">
                Welcome to Leyeco V Unified Management System
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                <div class="item">
                    <UContainer>
                        <div class="flex flex-col p-16">
                            <div class="flex justify-center items-center gap-4">
                                <UIcon name="i-heroicons-bolt" class="text-6xl text-black"/>
                                <h1 class="font-black text-black text-xl">POWERSERVE</h1>
                            </div>
                        </div>
                    </UContainer>
                    <NuxtHoverEffect/>
                </div>
                <div class="item">
                    <UContainer>
                        <div class="flex flex-col p-16">
                            <div class="flex justify-center items-center gap-4">
                                <UIcon name="i-heroicons-cog-6-tooth-20-solid" class="text-6xl text-black"/>
                                <h1 class="font-black text-black text-xl">SYSTEM</h1>
                            </div>
                        </div>
                    </UContainer>
                    <NuxtHoverEffect/>
                </div>
                <div class="item">
                    <UContainer>
                        <div class="flex flex-col p-16">
                            <div class="flex justify-center items-center gap-4">
                                <UIcon name="i-heroicons-clipboard-document" class="text-6xl text-black"/>
                                <h1 class="font-black text-black text-xl">e-FORMS</h1>
                            </div>
                        </div>
                    </UContainer>
                    <NuxtHoverEffect/>
                </div>
                <div class="item">
                    <UContainer>
                        <div class="flex flex-col p-16">
                            <div class="flex justify-center items-center gap-4">
                                <UIcon name="i-heroicons-link-16-solid" class="text-6xl text-black"/>
                                <h1 class="font-black text-black text-xl">eCONNECT</h1>
                            </div>
                        </div>
                    </UContainer>
                    <NuxtHoverEffect/>
                </div>
                <div class="item">
                    <UContainer>
                        <div class="flex flex-col p-16">
                            <div class="flex justify-center items-center gap-4">
                                <UIcon name="i-heroicons-receipt-percent-20-solid" class="text-6xl text-black"/>
                                <h1 class="font-black text-black text-xl">POWERBILL</h1>
                            </div>
                        </div>
                    </UContainer>
                    <NuxtHoverEffect/>
                </div>
                <div class="item">
                    <UContainer>
                        <div class="flex flex-col p-16">
                            <div class="flex justify-center items-center gap-4">
                                <UIcon name="i-heroicons-rectangle-stack-16-solid" class="text-6xl text-black"/>
                                <h1 class="font-black text-black text-xl">LPS</h1>
                            </div>
                        </div>
                    </UContainer>
                    <NuxtHoverEffect/>
                </div>
                <div class="item">
                    <UContainer>
                        <RouterLink to="/purchasing/canvass">
                            <div class="flex flex-col p-16">
                                <div class="flex justify-center items-center gap-4">
                                    <UIcon name="i-heroicons-home-modern-16-solid" class="text-6xl text-black"/>
                                    <h1 class="font-black text-black text-xl">POWERHOUSE</h1>
                                </div>
                            </div>
                        </RouterLink>
                    </UContainer>
                    <NuxtHoverEffect/>
                </div>
                <div class="item">
                    <UContainer>
                        <div class="flex flex-col p-16">
                            <div class="flex justify-center items-center gap-4">
                                <UIcon name="i-heroicons-currency-dollar" class="text-6xl text-black"/>
                                <h1 class="font-black text-black text-xl">ACCOUNTING</h1>
                            </div>
                        </div>
                    </UContainer>
                    <NuxtHoverEffect/>
                </div>
                <div class="item">
                    <UContainer>
                        <div class="flex flex-col p-16">
                            <div class="flex justify-center items-center gap-4">
                                <UIcon name="i-heroicons-credit-card-16-solid" class="text-6xl text-black"/>
                                <h1 class="font-black text-black text-xl">POWERPAY</h1>
                            </div>
                        </div>
                    </UContainer>
                    <NuxtHoverEffect/>
                </div>
            </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import '~/assets/css/main.css'

const router = useRouter()
</script>

<style lang="scss" scoped>
.item {
  border: 1px solid var(--divider-dark-1);
  border-radius: 15px;

  position: relative;
  z-index: 0;
  cursor: pointer;

  a {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .item-img {
    overflow: hidden;
    border-radius: 15px;

    transition: filter 0.3s ease;
  }

  .img-wrapper {
    width: 375px;
    height: 200px;
    transition: transform 0.3s ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &:hover {
    .img-wrapper {
      transform: scale(1.2);
    }
  }
  &:active {
    .img-wrapper {
      filter: brightness(0.8);
    }
  }
}
</style>