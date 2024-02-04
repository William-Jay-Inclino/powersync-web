<template>
    <UContainer class="flex justify-center items-center">
        <UCard class="mt-4">
            <template #header>
                <div class="flex justify-between">
                    <UButton
                      icon="i-heroicons-chevron-left-16-solid"
                      size="sm"
                      color="teal"
                      variant="ghost"
                      label="Back"
                      :trailing="false"
                      @click="navigateTo('/purchasing/canvass')"
                    />
                    <UButton
                      icon="i-heroicons-plus-circle"
                      size="sm"
                      color="blue"
                      variant="solid"
                      label="Add new canvass"
                      :trailing="false"
                      @click="navigateTo('/purchasing/canvass/form/add')"
                    />
                </div>
            </template>
            <div class="flex flex-col md:flex-row">
                <div class=" w-4/5 px-4 py-2">
                    <div class="flex flex-row items-center gap-1">
                        <UIcon name="i-heroicons-document-check-16-solid" class=" text-green-600 text-3xl"/>
                        <span class="font-bold text-3xl">
                            Canvass created
                        </span>
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <UFormGroup label="RC Number">
                            <template #hint>
                                <UButton
                                    icon="i-heroicons-clipboard-document-solid"
                                    size="sm"
                                    color="teal"
                                    variant="ghost"
                                    label="Copy"
                                    :trailing="false"
                                    @click="onCopyRcNumber"
                                />
                            </template>
                            <UInput v-model="canvassStore.currentCanvass.rc_number" disabled/>
                        </UFormGroup>
                        <UFormGroup label="Date">
                            <UInput type="date" v-model="canvassStore.currentCanvass.date" disabled/>
                        </UFormGroup>
                        <UFormGroup label="Requisitioner">
                            <UInput v-model="canvassStore.currentCanvass.requisitioner" disabled/>
                        </UFormGroup>
                        <UFormGroup label="Noted by">
                            <UInput v-model="canvassStore.currentCanvass.notedby" disabled/>
                        </UFormGroup>
                    </div>
                    <div class="flex flex-col gap-2">
                        <UFormGroup label="Purpose">
                            <UTextarea v-model="canvassStore.currentCanvass.purpose" disabled/>
                        </UFormGroup>
                        <UFormGroup label="Notes">
                            <UTextarea v-model="canvassStore.currentCanvass.notes" disabled/>
                        </UFormGroup>
                    </div>
                </div>
                <div>
                    <h1 class="font-bold text-xl">Particulars</h1>
                    <UTable :columns="columns" :rows="canvassStore.currentCanvass.particulars" />
                </div>
            </div>
        </UCard>
        <UNotifications/>
    </UContainer>
</template>

<script setup lang="ts">
import { useCanvassStore } from '~/stores/canvass'

definePageMeta({
    layout: 'dashboard-default'
})

onMounted(() => {
    //use useFetch for requests here

})

const toast = useToast()
const canvassStore = useCanvassStore()
const { text, copy, copied, isSupported } = useClipboard()

const columns = [{
  key: 'number',
  label: 'No.'
}, {
  key: 'description',
  label: 'Description'
}, {
  key: 'brand',
  label: 'Brand'
}, {
  key: 'unit',
  label: 'Unit'
},{
  key: 'quantity',
  label: 'Quantity'
}]

//methods
function onCopyRcNumber() {
    copy(canvassStore.currentCanvass.rc_number)
    toast.add({
        title: 'RC number copied to clipboard',
        icon: 'i-heroicons-check-circle-20-solid'
    })
}
</script>