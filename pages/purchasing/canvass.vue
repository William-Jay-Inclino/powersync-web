<template>
    <div>
        <h1 class=" text-3xl font-bold">Canvass</h1>
        <div class="md:mt-2">Search Filters</div>
        <div class="md:mt-2">
            <UCard>
                <div class="flex flex-col md:flex-row md:justify-between">
                    <div class="flex flex-col md:flex-row gap-6">
                        <UFormGroup label="RC Number">
                            <USelect v-model="selectedRc" :options="rcnumbers" />
                        </UFormGroup>
                        <UFormGroup label="Date">
                                <UInput type="date" v-model="selectedDate" placeholder="Select date..."/>
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
                        <UButton
                            icon="i-heroicons-plus-circle"
                            size="lg"
                            color="blue"
                            variant="solid"
                            label="Add Canvass"
                        />
                    </div>
                </div>
            </UCard>
            <UContainer class="w-full">
                <div class="md:mt-6">List of Canvass</div>
                <UTable v-model="selectedRow" :rows="records" :columns="columns">
                    <template #name-data="{ row }">
                    <span :class="[selectedRow.find(req => req.rc_number === row.rc_number) && 'text-primary-500 dark:text-primary-400']">{{ row.name }}</span>
                    </template>

                    <template #actions-data="{ row }">
                    <UDropdown :items="tableActions(row)">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </UDropdown>
                    </template>
                </UTable>
            </UContainer>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard-default'
})

//temporary interface
interface Canvass {
    rc_number: string
    requisitioner: string
    date:string
}

//state
const rcnumbers = ['24-00015', '24-00016', '24-00017']
const selectedRc = useState('selectedRcFilter')
const selectedDate = useState('selectedDate')
const requisitioners = ['Pastor, Anna Maria L.', 'Ricaflor, Suan', 'Sanico, Marlon']
const selectedRequisitioner = useState('selectedRequisitioner')

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
    click: () => console.log('Edit', row.requisitioner)
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
  }]
]

//Mock table data
const records:Array<Canvass> = [
  { rc_number: "24-00015", requisitioner: "Inclino, William Jay I.", date: "2024-01-12" },
  { rc_number: "24-00014", requisitioner: "Pastor, Ana Maria L.", date: "2024-01-12" },
  { rc_number: "24-00013", requisitioner: "Inclino, William Jay I.", date: "2024-01-11" },
  { rc_number: "24-0012", requisitioner: "Sanico, Marlon", date: "2024-01-11" },
  { rc_number: "24-0011", requisitioner: "Pastor, Ana Maria L.", date: "2024-01-08" },
  { rc_number: "24-00010", requisitioner: "Pelones, Jessa X.", date: "2024-01-11" },
  { rc_number: "24-00008", requisitioner: "Dayandayan, Jannie Ann", date: "2024-01-01" },
  { rc_number: "24-0007", requisitioner: "Dayandayan, Jannie Ann", date: "2024-01-01" },
  { rc_number: "24-00006", requisitioner: "Dayandayan, Jannie Ann", date: "2024-01-01" }
];

//@ts-expect-error
const selectedRow:Array<Canvass> = useState('selectedRow',() => [records[1]])




</script>