<template>
    <div>
        <h1 class=" text-3xl font-bold">MEQS (Material/Equipment Quotation Summary)</h1>
        <div class="md:mt-2">Search Filters</div>
        <div class="md:mt-2">
            <UCard>
                <div class="flex flex-col md:flex-row md:justify-between">
                    <div class="flex flex-col md:flex-row gap-6">
                        <UFormGroup label="MEQS Number">
                            <USelect v-model="selectedMeqs" :options="meqsNumbers" placeholder="Select MEQS..."/>
                        </UFormGroup>
                        <UFormGroup label="Date">
                                <UInput type="date" v-model="selectedDate" placeholder="Select date..."/>
                        </UFormGroup>
                        <UFormGroup label="Transaction">
                            <USelect
                                v-model="selectedTransactionNumber"
                                :options="transactionNumbers"
                                placeholder="Select..."
                            >
                            </USelect>
                        </UFormGroup>
                        <UFormGroup label="Requisitioner">
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
                        <RouterLink to="/purchasing/meqs/form/add">
                            <UButton
                                icon="i-heroicons-plus-circle"
                                size="lg"
                                color="blue"
                                variant="solid"
                                label="Add MEQS"
                            />
                        </RouterLink>
                    </div>
                </div>
            </UCard>
            <UContainer class="w-full">
                <div class="md:mt-6">List of MEQS</div>
                <UTable v-model="selectedRow" :rows="rows" :columns="columns">
                    <template #name-data="{ row }">
                        <span :class="[selectedRow.find(req => req.meqs_number === row.meqs_number) && 'text-primary-500 dark:text-primary-400']">{{ row.name }}</span>
                    </template>

                    <template #status-data="{ row }">
                        <UBadge :color="getBadgeStatusColor(row.status)" variant="subtle">{{ row.status }}</UBadge>
                    </template>

                    <template #actions-data="{ row }">
                    <UDropdown :items="tableActions(row)">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </UDropdown>
                    </template>
                </UTable>
                <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                    <UPagination v-model="page" :page-count="pageCount" :total="meqsStore.meqsRecords.length" />
                </div>
            </UContainer>
        </div>
        <UModal v-model="isDeleteModalActive">
            <UCard>
                <div class="flex flex-col gap-4 justify-center items-center">
                    <UIcon name="i-heroicons-exclamation-triangle-solid" class="text-6xl text-red-600"/>
                    <h1 class="font-bold text-xl">Delete MEQS</h1>
                    <p>Are you sure you want to delete MEQS item with <b>MEQS number {{ selectedActionItem.meqs_number }}</b>?</p>
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
                            @click="onDeleteMeqs"
                        />
                    </div>
                </template>
            </UCard>
        </UModal>
        <UNotifications/>
    </div>
</template>

<script setup lang="ts">
import { useMeqsStore } from '~/stores/meqs'
import type { Meqs } from '~/stores/types'
import { APPROVAL_STATUS } from '~/stores/types'
definePageMeta({
    layout: 'dashboard-default'
})

onMounted(async () => {
    //useFetch should be used here to fetch data from db
})

const meqsStore = useMeqsStore()
const uiStore = useUiStore()
const toast = useToast()

//Update breadcrumbs
uiStore.breadcrumb = [
        {
            label: 'Home',
            icon: 'i-heroicons-queue-list-solid',
            to: '/'
        },
        {
            label: 'Purchasing',
            icon: 'i-heroicons-shopping-cart-16-solid'
        },
        {
            label: 'MEQS',
            icon: 'i-heroicons-table-cells-solid'
        }
    ]

//state
const meqsNumbers = useState<Array<string>>('meqsNumbers',() => ['24-00015','24-00016','24-00017','24-00018','24-00019','24-00020'])
const selectedMeqs = useState<string>('selectedMeqs')
const selectedDate = useState<string>('selectedDate')
const requisitioners = ['Pastor, Anna Maria L.', 'Ricaflor, Suan', 'Sanico, Marlon'] //should be replaced with data from db
const selectedRequisitioner = useState<string>('selectedRequisitioner')
const transactionTypes = ['RV','JO','SPR']
const selectedTransactionType = useState<string>('selectedTransactionType')
const transactionNumbers = ['24-00015','24-00016','24-00017','24-00018','24-00019','24-00020'] //should be replaced with data from db
const selectedTransactionNumber = useState<string>('selectedTransactionNumber')
const isDeleteModalActive = useState('isDeleteModalActive', () => false)
const selectedActionItem = useState<Meqs>('selectedActionItem')


const columns = [{
  key: 'meqs_number',
  label: 'MEQS number'
}, {
  key: 'rv_id',
  label: 'Reference'
}, {
  key: 'requisitioner',
  label: 'Requisitioner'
},{
  key: 'meqs_date',
  label: 'Date'
},{
  key: 'status',
  label: 'Status'
},{
  key: 'actions'
}]

const tableActions = (row:Meqs) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo({path: `/purchasing/meqs/form/${row.meqs_number}`})
  },{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => toggleDeleteModal(row)
  }]
]

//@ts-expect-error
const selectedRow:Array<Meqs> = useState('selectedRow',() => [])
const page = ref(1)
const pageCount = 5

const rows = computed(() => {
  const records = meqsStore.meqsRecords
  return records.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

//methods
function toggleDeleteModal(item:Meqs){
    isDeleteModalActive.value = !isDeleteModalActive.value
    selectedActionItem.value = item
}

function onDeleteMeqs() {
    if (!selectedActionItem.value) {
        toast.add({
            title: 'No MEQS record selected',
            icon: 'i-heroicons-x-mark-16-solid'
        })
        return
    }
    const index = meqsStore.meqsRecords.indexOf(selectedActionItem.value)
    meqsStore.meqsRecords.splice(index,1)
    isDeleteModalActive.value = !isDeleteModalActive.value
    toast.add({
            title: 'MEQS record successfuly deleted',
            icon: 'i-heroicons-check-circle-20-solid'
        })
    return
}

function getBadgeStatusColor(status:string):string {
    if (status === APPROVAL_STATUS.APPROVED) {
        return 'green'
    }else if(status === APPROVAL_STATUS.DISAPPROVED){
        return 'red'
    }else if(status === APPROVAL_STATUS.PENDING){
        return 'blue'
    }else if(status === APPROVAL_STATUS.CANCELLED){
        return 'yellow'
    }else{
        return 'teal'
    }
}

</script>