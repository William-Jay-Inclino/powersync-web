<template>
    <div>
        <h1 class=" text-3xl font-bold">Canvass</h1>
        <div class="md:mt-2">Search Filters</div>
        <div class="md:mt-2">
            <UCard>
                <div class="flex flex-col md:flex-row md:justify-between">
                    <div class="flex flex-col md:flex-row gap-6">
                        <UFormGroup label="RC Number">
                            <!-- @vue-expect-error-->
                            <USelect v-model="selectedRc" :options="rcnumbers" />
                        </UFormGroup>
                        <UFormGroup label="Date">
                            <!-- @vue-expect-error-->
                                <UInput type="date" v-model="selectedDate" placeholder="Select date..."/>
                        </UFormGroup>
                        <UFormGroup label="Requisitioner">
                            <!-- @vue-expect-error-->
                            <USelect v-model="selectedRequisitioner" :options="requisitioners" />
                        </UFormGroup>
                        <div class="flex justify-center items-center">
                            <UButton
                                icon="i-heroicons-magnifying-glass-16-solid"
                                size="lg"
                                color="yellow"
                                variant="outline"
                                label="Search"
                            />
                        </div>
                    </div>
                    <div class="flex justify-center items-center">
                        <RouterLink to="/purchasing/canvass/form/add">
                            <UButton
                                icon="i-heroicons-plus-circle"
                                size="lg"
                                color="blue"
                                variant="solid"
                                label="Add Canvass"
                            />
                        </RouterLink>
                    </div>
                </div>
            </UCard>
            <UContainer class="w-full">
                <div class="md:mt-6">List of Canvass</div>
                <UTable v-model="selectedRow" :rows="rows" :columns="columns">
                    <template #name-data="{ row }">
                    <span :class="[selectedRow.find(req => req.rc_number === row.rc_number) && 'text-primary-500 dark:text-primary-400']">{{ row.name }}</span>
                    </template>

                    <template #actions-data="{ row }">
                    <UDropdown :items="tableActions(row)">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </UDropdown>
                    </template>
                </UTable>
                <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                    <UPagination v-model="page" :page-count="pageCount" :total="canvassStore.canvassRecords.length" />
                </div>
            </UContainer>
        </div>
        <UModal v-model="isDeleteModalActive">
            <UCard>
                <div class="flex flex-col gap-4 justify-center items-center">
                    <UIcon name="i-heroicons-exclamation-triangle-solid" class="text-3xl text-red-600"/>
                    <h1 class="font-bold text-xl">Delete Canvass</h1>
                    <p>Are you sure you want to delete canvass item with <b>RC number {{ selectedActionItem.rc_number }}</b>?</p>
                </div>
                <template #footer>
                    <div class="flex justify-between md:justify-end items-center gap-2">
                        <UButton
                            size="md"
                            color="blue"
                            variant="ghost"
                            label="Cancel"
                            :trailing="false"
                            @click="isDeleteModalActive = !isDeleteModalActive"
                        />
                        <UButton
                            icon="i-heroicons-trash-16-solid"
                            size="md"
                            color="red"
                            variant="solid"
                            label="Delete"
                            :trailing="false"
                            @click="onDeleteCanvass"
                        />
                    </div>
                </template>
            </UCard>
        </UModal>
        <UNotifications/>
    </div>
</template>

<script setup lang="ts">
import { useCanvassStore } from '~/stores/canvass'
import type { Canvass } from '~/stores/types';

definePageMeta({
    layout: 'dashboard-default'
})

const canvassStore = useCanvassStore()
const toast = useToast()

//state
const rcnumbers = ['24-00015', '24-00016', '24-00017']
const selectedRc = useState('selectedRcFilter')
const selectedDate = useState('selectedDate')
const requisitioners = ['Pastor, Anna Maria L.', 'Ricaflor, Suan', 'Sanico, Marlon']
const selectedRequisitioner = useState('selectedRequisitioner')
const isDeleteModalActive = useState('selectedRequisitioner', () => false)
const selectedActionItem = useState<Canvass>('selectedActionItem')

const columns = [{
  key: 'rc_number',
  label: 'RC number'
}, {
  key: 'requisitioner',
  label: 'Requisitioner'
}, {
  key: 'date',
  label: 'Date'
},{
  key: 'actions'
}]

const tableActions = (row:Canvass) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo({path: `/purchasing/canvass/form/${row.rc_number}`})
  },{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => toggleDeleteModal(row)
  }]
]

//@ts-expect-error
const selectedRow:Array<Canvass> = useState('selectedRow',() => [])
const page = ref(1)
const pageCount = 5

const rows = computed(() => {
  const records = canvassStore.canvassRecords
  return records.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

//methods
function toggleDeleteModal(item:Canvass){
    isDeleteModalActive.value = !isDeleteModalActive.value
    selectedActionItem.value = item
}

function onDeleteCanvass() {
    if (!selectedActionItem.value) {
        toast.add({
            title: 'No canvass item selected',
            icon: 'i-heroicons-x-mark-16-solid'
        })
        return
    }
    const index = canvassStore.canvassRecords.indexOf(selectedActionItem.value)
    canvassStore.canvassRecords.splice(index,1)
    isDeleteModalActive.value = !isDeleteModalActive.value
    toast.add({
            title: 'Canvass successfuly deleted',
            icon: 'i-heroicons-check-circle-20-solid'
        })
    return
}

</script>