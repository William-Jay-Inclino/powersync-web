import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSupplierStore = defineStore('supplier', () => {
    //state

    //Mock data only
    const supplierRecords = ref(['Robinson','SM','Gaisano'])
  
    //actions

    return {
        supplierRecords,
        //method
    }
})