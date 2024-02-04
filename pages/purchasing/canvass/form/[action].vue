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
                  <UFormGroup label="RC Number">
                      <UInput v-model="rcNumber" placeholder="Enter RC number"/>
                  </UFormGroup>
                  <UFormGroup label="Date" required :error="!selectedDate && 'Invalid date'">
                      <UInput type="date" v-model="selectedDate" placeholder="Select date..."/>
                  </UFormGroup>
                  <UFormGroup label="Requisitioner" required :error="!selectedRequisitioner && 'Invalid requisitioner'">
                      <USelect v-model="selectedRequisitioner" :options="requisitioners" />
                  </UFormGroup>
                  <UFormGroup label="Noted by" required :error="!selectedApprover && 'Invalid approver'">
                      <USelect v-model="selectedApprover" :options="approvers" />
                  </UFormGroup>
                  <UFormGroup label="Purpose" required :error="!purpose && 'Invalid purpose'">
                    <UTextarea v-model="purpose" />
                  </UFormGroup>
                  <UFormGroup label="Notes">
                    <UTextarea v-model="notes" />
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
                    <p>{{  formErrorMessage }}. Please enter a valid value</p>
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
import { useCanvassStore } from '~/stores/canvass'
import type { Canvass } from '~/stores/types'
import { FORM_MODE } from '~/stores/types'
definePageMeta({
    layout: 'dashboard-default'
})

const route = useRoute()
const toast = useToast()
const canvassStore = useCanvassStore()

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

const rcNumber = useState<string>('rcNumber',() => formMode.value === FORM_MODE.ADD ? useIncrementStringKey(canvassStore.getLastCanvass().rc_number) : canvassData.value.rc_number)
const selectedDate = useState<string>('selectedDate',() => formMode.value === FORM_MODE.EDIT ? canvassData.value.date : '')
const requisitioners = ['Pastor, Anna Maria L.', 'Ricaflor, Suan', 'Sanico, Marlon','Inclino, William Jay I.']
const selectedRequisitioner = ref<string>(formMode.value === FORM_MODE.EDIT ? canvassData.value.requisitioner : '')
const approvers = ['Pastor, Anna Maria L.', 'Ricaflor, Suan', 'Sanico, Marlon','Inclino, William Jay I.','Tayag, Joshua']
const selectedApprover = useState<string>('selectedApprovers',() => formMode.value === FORM_MODE.EDIT ? canvassData.value.notedby : '')
const purpose = useState<string>('purpose',() => formMode.value === FORM_MODE.EDIT ? canvassData.value.purpose : '')
const notes = useState<string | undefined>('notes',() => formMode.value === FORM_MODE.EDIT ? canvassData.value.notes : '')
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
const particulars = ref<Array<Particular>>(formMode.value === FORM_MODE.ADD ? 
  [
  {number: 1,description: '',brand: '',unit:'',quantity: 0}
  ] :
  canvassData.value.particulars ? canvassData.value.particulars : []
  )


function onAddItem() {
  const lastRecord = particulars.value[particulars.value.length - 1]
  const newItem:Particular = {
    number: lastRecord.number++,
    description: '',
    brand: '',
    unit: '',
    quantity: 0
  }

  particulars.value.splice(particulars.value.length - 1,0,newItem)
}

function onDeleteItem(item:Particular) {
  const index  = particulars.value.indexOf(item)
  particulars.value.splice(index,1)
}

function validateCanvassForm():boolean {
  let formDetailsHasError:boolean = false
  let particularsHasError:boolean = false
  //Check details form
  if (!rcNumber.value || rcNumber.value === '') {
    formDetailsHasError = true
  }
  if (!selectedDate.value || selectedDate.value === '') {
    formDetailsHasError = true
  }
  if (!selectedRequisitioner.value || selectedRequisitioner.value === '') {
    formDetailsHasError = true
  }
  if (!selectedApprover.value || selectedApprover.value === '') {
    formDetailsHasError = true
  }
  if (!purpose.value || purpose.value === '') {
    formDetailsHasError = true
  }

  if (formDetailsHasError) {
    formErrorMessage.value = 'There are one or more empty or invalid values in the details form.'
    return false
  }

  //check particulars
  if (particulars.value.length <= 0) {
    particularsHasError = true
  }else{
    const isParticularItemInvalid = particulars.value.find(pa => 
      !pa.brand || !pa.description || !pa.quantity || !pa.unit
    )

    if (isParticularItemInvalid) {
      particularsHasError = true
    }
  }

  if (particularsHasError) {
    formErrorMessage.value = 'There are one or more particular items with empty or invalid values.'
    return false
  }
  return true
}

function onSaveCanvass() {
  const isFormValid = validateCanvassForm()
  if (isFormValid) {
    const canvass:Canvass = {
      rc_number: rcNumber.value,
      requisitioner: selectedRequisitioner.value,
      date: selectedDate.value,
      notedby:selectedApprover.value,
      purpose:purpose.value,
      notes:notes.value,
      particulars: particulars.value
    }

    canvassStore.canvassRecords.push(canvass)
    toast.add({
            title: 'Canvass successfuly added',
            icon: 'i-heroicons-check-circle-20-solid'
        })
    navigateTo({
      path: '/purchasing/canvass'
    })
  }else{
    isErrorModalActive.value = true
  }
}

</script>