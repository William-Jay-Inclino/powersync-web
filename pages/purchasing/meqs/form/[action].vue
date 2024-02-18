<template>
    <div>
        <UContainer>
        <UTabs v-model="currentStepperItem" :items="stepperItems" class="w-full mt-2" :ui="{
          list:{
            tab: {
              active: 'bg-yellow-500 text-slate-800 font-bold'
            }
          }
        }">
          <template #default="{ item, index, selected }">
            <div class="flex items-center gap-2 relative truncate">
              <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />

              <span class="truncate">{{ index + 1 }}. {{ item.label }}</span>

              <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
            </div>
          </template>
          <template #item="{ item }">
            <div v-if="item.label === 'MEQS Details'">
              <UTabs :items="tabItems" class="mt-2">
                <template #default="{ item, index, selected }">
                  <div class="flex items-center gap-2 relative truncate">
                    <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />

                    <span class="truncate">{{ item.label }}</span>
                  </div>
                </template>
                <template #item="{ item }">
                  <div v-if="item.label === 'MEQS Form'">
                    <div class="flex justify-center md:mt-2">
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
            </div>
            <div v-else-if="item.label === 'Add Suppliers'">
              <UCard class="mt-2">
                <template #header>
                  <div class="flex justify-end">
                    <UButton color="blue" label="Add Supplier" trailing-icon="i-heroicons-plus-circle" @click="onToggleAddSupplierModal"/>
                  </div>
                </template>
                <UTable :columns="supplierColumn" :rows="supplierRows">
                  <template #attachments-data="{ row }">
                    <!-- <UButton :color="row.attachments ? 'primary' : 'cyan'" variant="soft" @click="onToggleViewFilesModal(row.attachments)">{{ row.attachments ? `View ${row.attachments.length} files` : 'No files' }}</UButton> -->
                    <UBadge :color="row.attachments ? 'primary' : 'cyan'" variant="soft">{{ row.attachments ? `${row.attachments.length} attachment${row.attachments.length > 1 ? 's' : ''}` : 'No files' }}</UBadge>
                  </template>
                  <template #action-data="{ row }">
                    <UButton color="red" variant="ghost" icon="i-heroicons-trash-16-solid" @click="onDeleteSupplier(row)"/>
                  </template>
                </UTable>
              </UCard>
            </div>
            <div v-else-if="item.label === 'Particulars and Unit Cost'">
              <UCard class="w-full">
                <template #header>
                  <div class="flex flex-col md:flex-row md:justify-between items-center">
                    <h1 class="font-bold">Particulars and Unit Cost per Item</h1>
                    <div class="flex gap-1">
                      <UDropdown :items="supplierDropdownItems" :popper="{ placement: 'bottom-start' }">
                        <UButton color="cyan" label="Add Supplier" trailing-icon="i-heroicons-chevron-down-20-solid" />
                      </UDropdown>
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
                            <UInput type="number" v-model="supplier.price"/>
                          </template>
                        </UFormGroup>
                      </div>
                    </template>
                    <template #action-data="{ row }">
                        <UButton color="red" variant="ghost" icon="i-heroicons-trash-16-solid" @click="onToggleDeleteModal(row)"/>
                    </template>
                </UTable>
              </UCard>
            </div>
            <div v-else-if="item.label === 'Award Supplier'">
              <UCard class="w-full mt-4">
                <template #header>
                  <h1 class="font-bold">Award to which supplier the item will be purchased</h1>
                </template>
                <UTable :rows="meqsSupplierItems" :columns="meqsSupplierColumns">
                  <template #meqs_supplier_id-data="{ row }">
                    <USelect v-if="row.meqs_supplier_id" v-model="row.meqs_supplier_name" :options="supplierStore.supplierRecords.map(s => s.name)" />
                  </template>
                  <template #notes-data="{ row }">
                    <UFormGroup label="Notes">
                      <UTextarea v-model="row.notes" />
                    </UFormGroup>
                  </template>
                </UTable>
              </UCard>
            </div>
            <div v-else-if="item.label === 'Review Details'">

            </div>
            <UCard class="mt-4">
              <div class="flex justify-between">
                <UButton
                  icon="i-heroicons-arrow-left-16-solid"
                  size="sm"
                  color="cyan"
                  variant="ghost"
                  label="Previous"
                  :trailing="false"
                  :disabled="currentStepperItem === 0"
                  @click="onToggleTab('previous')"
                />
                <div class="flex gap-2">
                  <UButton
                    icon="i-heroicons-check-circle-20-solid"
                    size="sm"
                    color="blue"
                    variant="solid"
                    label="Save"
                    :trailing="false"
                    v-if="currentStepperItem === 4"
                  />
                  <UButton
                    icon="i-heroicons-arrow-right-16-solid"
                    size="sm"
                    color="blue"
                    variant="solid"
                    label="Next"
                    :trailing="false"
                    v-else-if="currentStepperItem !== 4"
                    :disabled="isNextButtonDisabled"
                    @click="onToggleTab('next')"
                  />
                </div>
              </div>
            </UCard>
          </template>
        </UTabs>
        <UNotifications/>
        <UModal v-model="isDeleteModalActive">
          <UCard>
            <div class="flex flex-col gap-4 justify-center items-center">
                <UIcon name="i-heroicons-exclamation-triangle-solid" class="text-6xl text-red-600"/>
                <h1 class="font-bold text-xl">Delete Canvass Item</h1>
                <p>Are you sure you want to delete canvass item with <b>Item number {{ selectedCanvassItem.id }}</b>?</p>
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
                      @click="onDeleteItem"
                  />
              </div>
            </template>
          </UCard>
        </UModal>
        <UModal v-model="isAddSupplierModalActive">
          <UCard>
            <div class="flex flex-col justify-center items-stretch gap-2">
              <UDropdown :items="supplierDropdownItems" :popper="{ placement: 'bottom-start' }">
                <UButton color="cyan" label="Select Supplier" trailing-icon="i-heroicons-chevron-down-20-solid" />
              </UDropdown>
              <div class="bg-sky-500 text-white rounded-lg px-1 py-2 text-center mt-1 mb-1" v-if="selectedSupplier">
                <div class="flex justify-between items-center">
                  <div></div>
                  <div>You selected: <span class="font-bold">{{ selectedSupplier.name }}</span></div>
                  <!-- @vue-expect-error-->
                  <UButton
                    icon="i-heroicons-trash-16-solid"
                    size="sm"
                    color="white"
                    square
                    variant="soft"
                    @click="selectedSupplier = undefined"
                  />
                </div>
                
              </div>
              <UDivider label="Upload Attachments" v-if="selectedSupplier"/>
              <file-pond
                :name="`supplierAttachments`"
                label-idle="Drop files here..."
                ref="addSupplierFilepond"
                v-bind:allow-multiple="true"
                accepted-file-types="image/jpeg, image/png"
                @updatefiles="handleFileProcessing"
                v-if="selectedSupplier"
              />
            </div>
            <template #footer>
              <div class="flex justify-between md:justify-end items-center gap-2">
                <UButton
                      size="md"
                      color="cyan"
                      variant="ghost"
                      label="Cancel"
                      :trailing="false"
                      @click="isAddSupplierModalActive = !isAddSupplierModalActive"
                  />
                  <UButton
                      icon="i-heroicons-check-circle-20-solid"
                      size="md"
                      color="blue"
                      variant="solid"
                      label="Add Supplier"
                      :trailing="false"
                      @click="onAddSupplier(selectedSupplier)"
                  />
              </div>
            </template>
          </UCard>
        </UModal>
        <UModal v-model="isFileViewerModalActive">
          <UCarousel
            v-slot="{ item }"
            :items="fileDataUrls"
            :ui="{
              item: 'basis-full',
              container: 'rounded-lg'
            }"
            :prev-button="{
              color: 'gray',
              icon: 'i-heroicons-arrow-left-20-solid',
              class: '-left-12'
            }"
            :next-button="{
              color: 'gray',
              icon: 'i-heroicons-arrow-right-20-solid',
              class: '-right-12'
            }"
            arrows
            class="w-64 mx-auto"
          >
            <img :src="item" class="w-full" draggable="true">
          </UCarousel>
        </UModal>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
import { useMeqsStore } from '~/stores/meqs'
import { useCanvassStore } from '~/stores/canvass';
import { useSupplierStore } from '~/stores/supplier'
import type { CanvassItem, Meqs, MeqsSupplierItem, Supplier } from '~/stores/types'
import vueFilePond from "vue-filepond"
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

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

const stepperItems = ref([{
  label: 'MEQS Details',
  icon: 'i-heroicons-information-circle',
},{
  label: 'Add Suppliers',
  icon: 'i-heroicons-building-storefront-solid',
  disabled: true
},{
  label: 'Particulars and Unit Cost',
  icon: 'i-heroicons-cube-20-solid',
  disabled: true
},{
  label: 'Award Supplier',
  icon: 'i-heroicons-star-20-solid',
  disabled: true
},{
  label: 'Review Details',
  icon: 'i-heroicons-document-magnifying-glass-16-solid',
  disabled: true
}])

const tabItems = [{
  label: 'MEQS Form',
  icon: 'i-heroicons-information-circle'
}, {
  label: 'Approvers',
  icon: 'i-heroicons-user-group-20-solid'
}]

const supplierColumn = [{
  key: 'id',
  label: 'ID'
},{
  key: 'name',
  label: 'Supplier'
},{
  key: 'attachments',
  label: 'Attachments'
},{
  key: 'action'
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
const selectedCanvassItem = useState<CanvassItem>('selectedCanvassItem')
const particularsHasSupplier = useState<boolean>('particularsHasSupplier',() => false)
const currentStepperItem = useState('currentStepperItem', () => 0)
const selectedSupplier = useState<Supplier>('selectedSupplier')
const selectedSupplierAttachments = useState<Array<File>>('selectedSupplierAttachments', () => [])
const addSupplierFilepond = useState('addSupplierFilepond')
const isAddSupplierModalActive = useState<boolean>('isAddSupplierModalActive',() => false)
const isFileViewerModalActive = useState<boolean>('isFileViewerModalActive',() => false)
const fileDataUrls = useState<Array<string>>('fileDataUrls', () => [])

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
    click: () => selectedSupplier.value = res
    //click: () => onAddSupplier(res)
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

const supplierRows = ref<Array<Supplier>>([])
const isNextButtonDisabled = computed(() => {
  if (currentStepperItem.value === 0) {
    if (selectedTransactionNumber.value) {
      stepperItems.value[1].disabled = false
      return false
    }
    return true
  }else if(currentStepperItem.value === 1){
    if (supplierRows.value && supplierRows.value.length > 0) {
      stepperItems.value[2].disabled = false
      return false
    }
    return true
  }
  return false
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

function onToggleDeleteModal(supplierItem:CanvassItem){
  if(!supplierItem) {
    console.error("supplierItem is undefined")
    return
  }
  selectedCanvassItem.value = supplierItem
  isDeleteModalActive.value = !isDeleteModalActive.value
}

async function onDeleteItem() {
  if (!meqsParticulars.value) {
    console.error("meqsParticulars.value is undefined")
    return
  }

  if (!selectedCanvassItem.value) {
    console.error("selectedCanvassItem.value is undefined")
    return
  }
  const index = meqsParticulars.value.indexOf(selectedCanvassItem.value)
  meqsParticulars.value.splice(index,1)
}

function onToggleAddSupplierModal(){
  //@ts-expect-error
  selectedSupplier.value = undefined
  isAddSupplierModalActive.value = !isAddSupplierModalActive.value
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

    //Add to supplier table in second tab
    supplierRows.value.push({
      id: supplier.id,
      name: supplier.name,
      attachments: supplier.attachments
    })

    //Add supplier to canvass item table in third tab
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

    //@ts-expect-error
    selectedSupplier.value = undefined
    toast.add({
            title: 'Supplier successfuly added',
            icon: 'i-heroicons-check-circle-20-solid'
        })
    isAddSupplierModalActive.value = false
    console.log("Attachments ",supplier.attachments)
    return
  }
  toast.add({
        title: 'No supplier selected',
        icon: 'i-heroicons-x-mark-16-solid'
    })
  return
}

function onDeleteSupplier(supplier:Supplier){
  if (supplier) {
    const index = supplierRows.value.indexOf(supplier)

    //Remove from suppliers table
    supplierRows.value.splice(index,1)

    //Remove from canvass items table
    let supplierParticularIndex:number
    if (meqsParticulars.value) {
      meqsParticulars.value.forEach((part,index) => {
        if (part.suppliers) {
          if(!supplierParticularIndex){
            supplierParticularIndex = part.suppliers.indexOf(supplier)
          }else{
            part.suppliers.splice(supplierParticularIndex,1)
          }
        }
      })
    }

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

function onToggleTab(action:string = 'next') {

  if (action === 'next') {
    currentStepperItem.value++
    return
  }
  currentStepperItem.value--
}

function handleFileProcessing(files:Array<File>) {
  console.log("FilePond succesfully processed file ", files);
  selectedSupplier.value.attachments = files
}

function onToggleViewFilesModal(files:any) {
  console.log("onToggleViewFilesModal",files)
  if (files && files.length > 0) {
    let fileArray = files
    if (isProxy(files)) {
      fileArray = toRaw(files)
      console.log("File is proxy", fileArray)
    }
    fileDataUrls.value = convertFilesToDataUrls(fileArray)
    isFileViewerModalActive.value = true
    return
  }
  console.error("Files is undefined")
  return
}
</script>