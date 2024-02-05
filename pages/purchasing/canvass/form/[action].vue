<template>
    <div>
        <UContainer>
          <UCard class="mt-4">
            <div class="flex justify-between">
              <h1 class=" text-xl font-bold mt-2">{{ formMode }} Canvass</h1>
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
                  @click="onSaveCanvass"
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
                  <UFormGroup label="RC number" v-if="$route.params.action !== 'add'">
                      <UInput v-model="canvassStore.currentCanvass.rc_number" disabled/>
                  </UFormGroup>
                  <UFormGroup label="Date" required :error="!canvassStore.currentCanvass.date && 'Invalid date'">
                      <UInput type="date" v-model="canvassStore.currentCanvass.date" placeholder="Select date..."/>
                  </UFormGroup>
                  <UFormGroup label="Requisitioner" required :error="!canvassStore.currentCanvass.requisitioner && 'Invalid requisitioner'">
                      <USelect v-model="canvassStore.currentCanvass.requisitioner" :options="requisitioners" />
                  </UFormGroup>
                  <UFormGroup label="Noted by" required :error="!canvassStore.currentCanvass.notedby && 'Invalid approver'">
                      <USelect v-model="canvassStore.currentCanvass.notedby" :options="approvers" />
                  </UFormGroup>
                  <UFormGroup label="Purpose" required :error="!canvassStore.currentCanvass.purpose && 'Invalid purpose'">
                    <UTextarea v-model="canvassStore.currentCanvass.purpose" />
                  </UFormGroup>
                  <UFormGroup label="Notes">
                    <UTextarea v-model="canvassStore.currentCanvass.notes" />
                  </UFormGroup>
                </div>
              </UCard>
              <UCard class="w-full">
                <template #header>
                  <div class="flex justify-between items-center">
                    <h1 class="font-bold">Particulars</h1>
                    <div>
                      <UButton
                          icon="i-heroicons-plus-circle"
                          size="md"
                          color="cyan"
                          variant="solid"
                          label="Add Item"
                          @click="onAddItem"
                      />
                    </div>
                  </div>
                </template>
                <UTable :rows="particulars" :columns="columns">
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
                    <template #action-data="{ row }">
                        <UButton color="red" variant="ghost" icon="i-heroicons-trash-16-solid" @click="onDeleteItem"/>
                    </template>
                </UTable>
              </UCard>
          </div>
        </UContainer>
        <UModal v-model="isErrorModalActive">
            <UCard>
                <div class="flex flex-col gap-4 justify-center items-center">
                    <UIcon name="i-heroicons-exclamation-triangle-solid" class="text-6xl text-red-600"/>
                    <h1 class="font-bold text-xl">Invalid Form Inputs</h1>
                    <p>{{  formErrorMessage }} Please enter a valid value</p>
                </div>
                <template #footer>
                    <div class="flex justify-between md:justify-end items-center gap-2">
                        <UButton
                            size="md"
                            color="blue"
                            variant="solid"
                            label="Ok, got it"
                            :trailing="false"
                            @click="isErrorModalActive = !isErrorModalActive"
                        />
                    </div>
                </template>
            </UCard>
        </UModal>
        <UNotifications/>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard-default',
    middleware: 'canvass'
})

const route = useRoute()
const toast = useToast()
const canvassStore = useCanvassStore()
const uiStore = useUiStore()

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
        label: 'Canvass',
        icon: 'i-heroicons-clipboard-document-list',
        to: '/purchasing/canvass'
    },
    {
        label: 'Form',
        icon: 'i-heroicons-pencil-square-16-solid'
    }
]

//state
const formMode = ref(route.params.action === 'add' ? FORM_MODE.ADD : FORM_MODE.EDIT)
const canvassData = computed(():Canvass => {
  if (formMode.value === FORM_MODE.EDIT) {
    const canvass = canvassStore.canvassRecords.find(cvs => cvs.rc_number === route.params.action)
    if (canvass) {
      return canvass
    }
    return {} as Canvass
  }
  return {} as Canvass
})

const requisitioners = ['Pastor, Anna Maria L.', 'Ricaflor, Suan', 'Sanico, Marlon','Inclino, William Jay I.']
const approvers = ['Pastor, Anna Maria L.', 'Ricaflor, Suan', 'Sanico, Marlon','Inclino, William Jay I.','Tayag, Joshua']
const isErrorModalActive = useState('isErrorModalActive', () => false)
const formErrorMessage = useState('formErrorMessage')


const columns = [{
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
}]

const brands:Array<string> = ['n/a','Brand X','Brand Y','Brand Z']
const units:Array<string> = ['Pieces','Cartons','Pallets']

//Mock table data
const particulars = ref<Array<CanvassItem>>(formMode.value === FORM_MODE.ADD ? 
  [
  {number: 1,description: '',brand: '',unit:'',quantity: 0}
  ] :
  canvassData.value.particulars ? canvassData.value.particulars : []
  )


function onAddItem() {
  const lastRecord = particulars.value[particulars.value.length - 1]
  const newItem:CanvassItem = {
    number: lastRecord.number++,
    description: '',
    brand: '',
    unit: '',
    quantity: 0
  }

  particulars.value.splice(particulars.value.length - 1,0,newItem)
}

function onDeleteItem(item:CanvassItem) {
  const index  = particulars.value.indexOf(item)
  particulars.value.splice(index,1)
}

function validateCanvassForm():boolean {
  let formDetailsHasError:boolean = false
  let particularsHasError:boolean = false
  //Check details form
  if (!canvassStore.currentCanvass.date || canvassStore.currentCanvass.date === '') {
    formDetailsHasError = true
  }
  if (!canvassStore.currentCanvass.requisitioner || canvassStore.currentCanvass.requisitioner === '') {
    formDetailsHasError = true
  }
  if (!canvassStore.currentCanvass.notedby || canvassStore.currentCanvass.notedby === '') {
    formDetailsHasError = true
  }
  if (!canvassStore.currentCanvass.purpose || canvassStore.currentCanvass.purpose === '') {
    formDetailsHasError = true
  }

  if (formDetailsHasError) {
    formErrorMessage.value = 'There are one or more empty or invalid values in the details form.'
    return false
  }

  //check particulars
  if (!particulars.value || particulars.value.length <= 0) {
    particularsHasError = true
    console.log("Particulars is empty")
  }else{
    const isParticularItemInvalid = particulars.value.find(pa => 
      !pa.description || !pa.quantity || !pa.unit
    )

    if (isParticularItemInvalid) {
      particularsHasError = true
    }
    console.log("Particular item has incomplete forms")
  }

  if (particularsHasError) {
    formErrorMessage.value = 'There are one or more particular items with empty or invalid values.'
    return false
  }
  return true
}

/**
 * Perform POST request inside this method
 */
async function onSaveCanvass() {
  const isFormValid = validateCanvassForm()
  if (isFormValid) {
    canvassStore.currentCanvass.particulars = particulars.value
    const canvass:Canvass = {...canvassStore.currentCanvass}

    canvassStore.canvassRecords.push(canvass)
    
    //Reset current canvass
    // canvassStore.currentCanvass = {
    //   rc_number: '',
    //     requisitioner: '',
    //     date: '',
    //     notedby: '',
    //     purpose: '',
    //     particulars: []
    // }
    toast.add({
            title: 'Canvass successfuly added',
            icon: 'i-heroicons-check-circle-20-solid'
        })
    navigateTo({
      path: '/purchasing/canvass/form/success'
    })
  }else{
    isErrorModalActive.value = true
  }
}

</script>