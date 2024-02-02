<template>
    <div>
        
        <UContainer>
          <UCard class="mt-4">
            <div class="flex justify-between">
              <h1 class=" text-xl font-bold mt-2">Add Canvass</h1>
              <div class="flex gap-2">
                <UButton
                  icon="i-heroicons-printer-solid"
                  size="sm"
                  color="yellow"
                  variant="solid"
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
                  <UFormGroup label="RC Number">
                      <!-- @vue-expect-error-->
                      <UInput v-model="rcNumber" placeholder="Enter RC number"/>
                  </UFormGroup>
                  <UFormGroup label="Date" required>
                      <!-- @vue-expect-error-->
                      <UInput type="date" v-model="selectedDate" placeholder="Select date..."/>
                  </UFormGroup>
                  <UFormGroup label="Requisitioner" required>
                      <!-- @vue-expect-error-->
                      <USelect v-model="selectedRequisitioner" :options="requisitioners" />
                  </UFormGroup>
                  <UFormGroup label="Noted by" required>
                      <!-- @vue-expect-error-->
                      <USelect v-model="selectedApprover" :options="approvers" />
                  </UFormGroup>
                  <UFormGroup label="Purpose" required>
                      <!-- @vue-expect-error-->
                    <UTextarea v-model="purpose" />
                  </UFormGroup>
                  <UFormGroup label="Notes">
                      <!-- @vue-expect-error-->
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
                <UTable :rows="records" :columns="columns">
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
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard-default'
})

//state
const rcNumber = useState('rcNumber')
const selectedDate = useState('selectedDate')
const requisitioners = ['Pastor, Anna Maria L.', 'Ricaflor, Suan', 'Sanico, Marlon']
const selectedRequisitioner = useState('selectedRequisitioner')
const approvers = ['Pastor, Anna Maria L.', 'Ricaflor, Suan', 'Sanico, Marlon','Inclino, William','Tayag, Joshua']
const selectedApprover = useState('selectedApprovers')
const purpose = useState('purpose')
const notes = useState('notes')


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
const records = ref<Array<Particular>>([
  {number: 1,description: '',brand: '',unit:'',quantity: 0}
])

function onAddItem() {
  const lastRecord = records.value[records.value.length - 1]
  const index = records.value.indexOf(lastRecord)
  const newItem:Particular = {
    number: lastRecord.number++,
    description: '',
    brand: '',
    unit: '',
    quantity: 0
  }

  records.value.splice(records.value.length - 1,0,newItem)
}

function onDeleteItem() {
  records.value.pop()
}

</script>