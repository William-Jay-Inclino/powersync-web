import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Supplier } from './types'

export const useSupplierStore = defineStore('supplier', () => {
    //state

    //Mock data only
    const supplierRecords = ref<Array<Supplier>>([
        {id:1, name:'Robinson', is_awarded:false},
        {id:2, name:'SM', is_awarded:false},
        {id:3, name:'Gaisano', is_awarded:false},
    ])
  
    //actions

    return {
        supplierRecords,
        //method
    }
})