<template>
    <div>
        <UContainer>
        <UTabs :items="tabItems" class="mt-2">
          <template #default="{ item, index, selected }">
            <div class="flex items-center gap-2 relative truncate">
              <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />

              <span class="truncate">{{ item.label }}</span>
            </div>
          </template>
          <template #item="{ item }">
            <div v-if="item.label === 'MEQS Form'">
              <UCard class="mt-4">
                <div class="flex justify-between">
                  <h1 class=" text-xl font-bold mt-2">MEQS</h1>
                  <div class="flex gap-2">
                    <UButton
                      icon="i-heroicons-printer-solid"
                      size="sm"
                      color="yellow"
                      variant="outline"
                      label="Print"
                      :trailing="false"
                    />
                    <UButton
                      icon="i-heroicons-check-circle-20-solid"
                      size="sm"
                      color="blue"
                      variant="solid"
                      label="Save"
                      :trailing="false"
                    />
                  </div>
                </div>
              </UCard>
              <div class="flex flex-col md:flex-row gap-4 md:mt-2">
                  <UCard>
                    <template #header>
                      <h1 class="font-bold">Details</h1>
                    </template>
                    <div class="flex flex-col gap-4">
                        <UFormGroup label="MEQS Number">
                            <USelect v-model="selectedMeqs" :options="meqsNumbers" placeholder="Select MEQS..."/>
                        </UFormGroup>
                        <UFormGroup label="Date">
                                <UInput type="date" v-model="selectedDate" placeholder="Select date..."/>
                        </UFormGroup>
                        <div class="flex flex-row gap-1">
                          <UFormGroup label="Type">
                              <USelect
                                  v-model="selectedTransactionType"
                                  :options="transactionTypes"
                                  placeholder="Select..."
                                  color="blue"
                              >
                              </USelect>
                          </UFormGroup>
                          <UFormGroup label="Transaction">
                              <USelect
                                  v-model="selectedTransactionNumber"
                                  :options="transactionNumbers"
                                  placeholder="Select..."
                              >
                              </USelect>
                          </UFormGroup>
                        </div>
                        <UFormGroup label="Requisitioner">
                            <USelect v-model="selectedRequisitioner" :options="requisitioners" />
                        </UFormGroup>
                    </div>
                  </UCard>
                  <UCard class="w-full">
                    <template #header>
                      <div class="flex flex-col md:flex-row md:justify-between items-center">
                        <h1 class="font-bold">Particulars and Unit Cost per Item</h1>
                        <div class="flex gap-1">
                          <UDropdown :items="supplierDropdownItems" :popper="{ placement: 'bottom-start' }">
                            <UButton color="cyan" label="Add Supplier" trailing-icon="i-heroicons-chevron-down-20-solid" />
                          </UDropdown>
                            <!-- <UButton
                              icon="i-heroicons-building-storefront-solid"
                              size="md"
                              color="cyan"
                              variant="solid"
                              label="Add supplier"
                          /> -->
                          <UButton
                              icon="i-heroicons-plus-circle"
                              size="md"
                              color="blue"
                              variant="solid"
                              label="Add item"
                          />
                        </div>
                      </div>
                    </template>
                    <UTable :rows="meqsParticulars" :columns="particularsColumn">
                        <template #description-data="{ row }">
                          <UFormGroup :error="!row.description && 'Invalid description'">
                            <UInput v-model="row.description" placeholder="Enter description"/>
                          </UFormGroup>
                        </template>
                        <template #brand-data="{ row }">
                            <USelect v-model="row.brand" :options="brands" />
                        </template>
                        <template #unit-data="{ row }">
                          <UFormGroup :error="!row.unit && 'Invalid unit'">
                            <USelect v-model="row.unit" :options="units" />
                          </UFormGroup>
                        </template>
                        <template #quantity-data="{ row }">
                          <UFormGroup :error="!row.quantity && 'Invalid quantity'">
                            <UInput type="number"  v-model="row.quantity"/>
                          </UFormGroup>
                        </template>
                        <template #suppliers-data="{ row }">
                          <div class="flex flex-row gap-1" v-if="row.suppliers">
                            <UFormGroup v-for="supplier in row.suppliers" :label="supplier">
                              <UInput type="number"/>
                            </UFormGroup>
                          </div>
                        </template>
                        <template #action-data="{ row }">
                            <UButton color="red" variant="ghost" icon="i-heroicons-trash-16-solid" @click="onDeleteItem"/>
                        </template>
                    </UTable>
                  </UCard>
              </div>
            </div>
            <div v-else-if="item.label === 'Approvers'">
              <UCard class="mt-4">
                <h1 class="font-bold">Approvers</h1>
                <UTable :rows="approvers" />
              </UCard>
            </div>
          </template>
        </UTabs>
        <UNotifications/>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
import { useMeqsStore } from '~/stores/meqs'
import { useCanvassStore } from '~/stores/canvass';
import { useSupplierStore } from '~/stores/supplier'
import { stringContains } from '~/utils'
import type { Meqs } from '~/stores/types'
import { APPROVAL_STATUS } from '~/stores/types'
definePageMeta({
    layout: 'dashboard-default'
})

onMounted(async () => {
    //useFetch should be used here to fetch data from db
})

const meqsStore = useMeqsStore()
const canvassStore = useCanvassStore()
const supplierStore = useSupplierStore()
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
        icon: 'i-heroicons-table-cells-solid',
        to: '/purchasing/meqs'
    },
    {
        label: 'Form',
        icon: 'i-heroicons-pencil-square-16-solid'
    }
]

const tabItems = [{
  label: 'MEQS Form',
  icon: 'i-heroicons-information-circle'
}, {
  label: 'Approvers',
  icon: 'i-heroicons-user-group-20-solid'
}]

const particularsColumn = ref([{
  key: 'number',
  label: 'No.'
}, {
  key: 'description',
  label: 'Description*'
}, {
  key: 'brand',
  label: 'Brand'
}, {
  key: 'unit',
  label: 'Unit*'
},{
  key: 'quantity',
  label: 'Quantity*'
},{
  key: 'action',
}])

//state
const meqsNumbers = useState<Array<string>>('meqsNumbers',() => ['24-00015','24-00016','24-00017','24-00018','24-00019','24-00020'])
const selectedMeqs = useState<string>('selectedMeqs')
const selectedDate = useState<string>('selectedDate')
const requisitioners = ['Pastor, Anna Maria L.', 'Ricaflor, Suan', 'Sanico, Marlon'] //should be replaced with data from db
const selectedRequisitioner = useState<string>('selectedRequisitioner')
const transactionTypes = ['RV','JO','SPR']
const selectedTransactionType = useState<string>('selectedTransactionType', () => transactionTypes[0])
const transactionNumbers = canvassStore.canvassRecords.map(cvs => cvs.rc_number) //should be replaced with data from db
const selectedTransactionNumber = useState<string>('selectedTransactionNumber')
const isDeleteModalActive = useState('isDeleteModalActive', () => false)
const selectedActionItem = useState<Meqs>('selectedActionItem')
const particularsHasSupplier = useState<boolean>('particularsHasSupplier',() => false)

//Mock data only
const approvers = [
    { order: 1, position: "1st CPC Member", name: "Nahine, Jhun Rey" },
    { order: 2, position: "2nd CPC Member", name: "Tagalog, Gretchen" },
    { order: 3, position: "Witness", name: "De La Pena, Dionic" },
    { order: 4, position: "CPC Chairman", name: "Cecilio, Anthony" },
    { order: 5, position: "GM / OIC", name: "Dayandayan, Jannie Ann" }
];

//Mock data only
const brands:Array<string> = ['n/a','Brand X','Brand Y','Brand Z']
const units:Array<string> = ['Pieces','Cartons','Pallets']

const supplierItems = supplierStore.supplierRecords.reduce((acc:Array<any>,res,i) => {
  acc.push({
    label: res,
    click: () => onAddSupplier(res)
  })
  return acc
},[])

const supplierDropdownItems = ref<Array<any>>([])
supplierDropdownItems.value.push(supplierItems)

const meqsParticulars = computed(() => {
  if (selectedTransactionNumber.value) {
    const canvass = canvassStore.canvassRecords.find(cvs => cvs.rc_number === selectedTransactionNumber.value)
    if (canvass) {
      return canvass.particulars
    }
    return []
  }
  return []
})

//methods
async function onDeleteItem() {
  
}

function onAddSupplier(supplier:string) {
  console.log("onAddSupplier ", supplier)
  if (supplier) {
    const isSupplierColumnExists = particularsColumn.value.find(part => part.key === 'suppliers')

    if (!isSupplierColumnExists) {
      particularsColumn.value.splice(4,0,{
        key: 'suppliers',
        label: 'Suppliers'
      })
    }

    if (!meqsParticulars.value) {
      console.error("meqsParticulars isn undefined")
      return
    }
    const isSupplierAlreadyAdded = meqsParticulars.value[0].suppliers?.find(sup => sup === supplier)

    if (isSupplierAlreadyAdded) {
      toast.add({
            title: 'This supplier has already been added',
            icon: 'i-heroicons-x-mark-16-solid'
        })
      return
    }

    meqsParticulars.value.forEach((part:CanvassItem) => {
      if (!part.suppliers) {
        part.suppliers = []
      }
      part.suppliers.push(supplier)
    })

    toast.add({
            title: 'Supplier successfuly added',
            icon: 'i-heroicons-check-circle-20-solid'
        })
    return
  }
}

</script>