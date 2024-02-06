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
                  <div class="flex flex-col w-full">
                    <UCard class="w-full">
                      <template #header>
                        <div class="flex flex-col md:flex-row md:justify-between items-center">
                          <h1 class="font-bold">Particulars and Unit Cost per Item</h1>
                          <div class="flex gap-1">
                            <UDropdown :items="supplierDropdownItems" :popper="{ placement: 'bottom-start' }">
                              <UButton color="cyan" label="Add Supplier" trailing-icon="i-heroicons-chevron-down-20-solid" />
                            </UDropdown>
                            <UButton
                                icon="i-heroicons-plus-circle"
                                size="md"
                                color="blue"
                                variant="solid"
                                label="Add item"
                                @click="onAddItem"
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
                            <div class="flex flex-row gap-2 md:gap-1" v-if="row.suppliers">
                              <UFormGroup v-for="supplier in row.suppliers" :label="supplier.name">
                                <template #hint>
                                  <UToggle
                                    size="sm"
                                    color="yellow"
                                    on-icon="i-heroicons-star-16-solid"
                                    off-icon="i-heroicons-star"
                                    :model-value="supplier.is_awarded"
                                    @click="onAwardSupplier(row,supplier)"
                                  />
                                </template>
                                <template #default>
                                  <UInput type="number"/>
                                </template>
                              </UFormGroup>
                            </div>
                          </template>
                          <template #action-data="{ row }">
                              <UButton color="red" variant="ghost" icon="i-heroicons-trash-16-solid" @click="onDeleteItem(row)"/>
                          </template>
                      </UTable>
                    </UCard>
                    <UCard class="w-full mt-4">
                      <template #header>
                        <h1 class="font-bold">Award to which supplier the item will be purchased</h1>
                      </template>
                      <UTable :rows="meqsSupplierItems" :columns="meqsSupplierColumns">
                        <template #meqs_supplier_id-data="{ row }">
                          <USelect v-if="row.meqs_supplier_id" v-model="row.meqs_supplier_name" :options="supplierStore.supplierRecords.map(s => s.name)" />
                        </template>
                        <template #notes-data="{ row }">
                          <UTextarea v-model="row.notes" />
                        </template>
                      </UTable>
                    </UCard>
                  </div>
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
import type { Meqs, MeqsSupplierItem, Supplier } from '~/stores/types'
import { APPROVAL_STATUS } from '~/stores/types'
import { sub } from 'date-fns';
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
  key: 'id',
  label: 'No.'
}, {
  key: 'description',
  label: 'Description'
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

const meqsSupplierColumns = ref([{
  key: 'id',
  label: 'No.'
}, {
  key: 'canvass_description',
  label: 'Description*'
}, {
  key: 'meqs_supplier_id',
  label: 'Awarded Supplier'
}, {
  key: 'notes',
  label: 'Notes'
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
    label: res.name,
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

const meqsSupplierItems = computed(() => {
  if (meqsParticulars.value) {
    console.log("meqsParticulars ", meqsParticulars.value)
    const meqsSuppliers = meqsParticulars.value.reduce((acc:Array<MeqsSupplierItem>,part) => {
      console.log("part ", part)
      const awardedSupplier = part.suppliers?.find(sup => sup.is_awarded === true)
      console.log("awardedSupplier ", awardedSupplier)
      const item:MeqsSupplierItem = {
        id: part.id,
        meqs_supplier_id: awardedSupplier ? awardedSupplier.id : undefined,
        meqs_supplier_name: awardedSupplier ? getSelectedSupplierNameById(awardedSupplier.id) : undefined,
        canvass_item_id: part.id,
        canvass_description: part.description,
        notes: '',
        is_awarded: true
      }
      console.log("item ", item)


      acc.push(item)
      return acc
    },[])

    console.log("meqsSuppliers ", meqsSuppliers)

    return meqsSuppliers
  }
  return []
})

//methods
function onAddItem() {
  if (!meqsParticulars.value) {
    console.error("meqsParticulars.value is undefined")
    return
  }
  const lastRecord = meqsParticulars.value[meqsParticulars.value.length - 1]
  const newItem:CanvassItem = {
    id: lastRecord.id++,
    description: '',
    brand: '',
    unit: '',
    quantity: 0
  }

  if (meqsParticulars.value[0].suppliers) {
    newItem.suppliers = meqsParticulars.value[0].suppliers
  }

  meqsParticulars.value.splice(meqsParticulars.value.length - 1,0,newItem)
}

async function onDeleteItem(item:CanvassItem) {
  if (!meqsParticulars.value) {
    console.error("meqsParticulars.value is undefined")
    return
  }
  const index  = meqsParticulars.value.indexOf(item)
  meqsParticulars.value.splice(index,1)
}

function onAddSupplier(supplier:Supplier) {
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
    const isSupplierAlreadyAdded = meqsParticulars.value[0].suppliers?.find(sup => sup.id === supplier.id)

    if (isSupplierAlreadyAdded) {
      toast.add({
            title: 'This supplier has already been added',
            icon: 'i-heroicons-x-mark-16-solid'
        })
      return
    }

    meqsParticulars.value.forEach((part:CanvassItem,index) => {
      if (!part.suppliers) {
        part.suppliers = []
      }
      part.suppliers.push({
        id: supplier.id,
        name: supplier.name,
        is_awarded: false
      })
    })

    toast.add({
            title: 'Supplier successfuly added',
            icon: 'i-heroicons-check-circle-20-solid'
        })
    return
  }
}

function onAwardSupplier(item:CanvassItem,supplier:Supplier){
  console.log("onAwardSupplier()")
  if (!meqsParticulars.value) {
    console.error("meqsParticulars isn undefined")
    return
  }
  const index = meqsParticulars.value.indexOf(item)
  console.log("meqsParticulars.value.indexOf ",index)
  if (index !== undefined) {
    const isOtherSupplierAwarded = meqsParticulars.value[index].suppliers?.find(sup => sup.is_awarded === true)
    console.log("isOtherSupplierAwarded ",isOtherSupplierAwarded, supplier)
    if (isOtherSupplierAwarded) {
      const idx = meqsParticulars.value[index].suppliers?.indexOf(isOtherSupplierAwarded)
      //@ts-expect-error
      meqsParticulars.value[index].suppliers[idx].is_awarded = false

      if (isOtherSupplierAwarded.id === supplier.id) {
        return
      }
    }
    
    const supIndex = meqsParticulars.value[index].suppliers?.indexOf(supplier)
    if (supIndex !== undefined) {
      //@ts-expect-error
      meqsParticulars.value[index].suppliers[supIndex].is_awarded = !meqsParticulars.value[index].suppliers[supIndex].is_awarded
    }
  }
}

function getSelectedSupplierNameById(id:number):string {
  const supplier = supplierStore.supplierRecords.find(sup => sup.id === id)

  if (supplier) {
    return supplier.name
  }
  return ''
}

</script>