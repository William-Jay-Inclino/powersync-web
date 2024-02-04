import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Meqs } from './types'

export const useMeqsStore = defineStore('meqs', () => {
    //state
    const currentMeqs = ref<Meqs>({ 
        id: 11, jo_id: '', rv_id: '', spr_id: '', meqs_number: '', request_type: '', meqs_date: '', canceller_id: '', status: '', notes: '' 
    })
    //mock table data
    const meqsRecords = ref<Array<Meqs>>([
        { id: 1, jo_id: '', rv_id: 'RV#24-00010', spr_id: '', meqs_number: '24-00015', requisitioner: 'Test user', request_type: 'RV', meqs_date: '2024-01-15', canceller_id: '', status: 'disapproved', notes: '' },
        { id: 2, jo_id: '', rv_id: 'RV#24-00011', spr_id: '', meqs_number: '24-00016', requisitioner: 'Test user', request_type: 'RV', meqs_date: '2024-02-24', canceller_id: '', status: 'disapproved', notes: '' },
        { id: 3, jo_id: '', rv_id: 'RV#24-00012', spr_id: '', meqs_number: '24-00017', requisitioner: 'Test user', request_type: 'RV', meqs_date: '2024-05-03', canceller_id: '', status: 'pending', notes: '' },
        { id: 4, jo_id: '', rv_id: 'RV#24-00013', spr_id: '', meqs_number: '24-00018', requisitioner: 'Test user', request_type: 'RV', meqs_date: '2024-04-16', canceller_id: '', status: 'disapproved', notes: '' },
        { id: 5, jo_id: '', rv_id: 'RV#24-00014', spr_id: '', meqs_number: '24-00019', requisitioner: 'Test user', request_type: 'RV', meqs_date: '2024-02-27', canceller_id: 'canceller', status: 'cancelled', notes: '' },
        { id: 6, jo_id: '', rv_id: 'RV#24-00015', spr_id: '', meqs_number: '24-00020', requisitioner: 'Test user', request_type: 'RV', meqs_date: '2024-12-09', canceller_id: '', status: 'approved', notes: '' },
        { id: 7, jo_id: '', rv_id: 'RV#24-00016', spr_id: '', meqs_number: '24-00021', requisitioner: 'Test user', request_type: 'RV', meqs_date: '2024-10-13', canceller_id: '', status: 'disapproved', notes: '' },
        { id: 8, jo_id: '', rv_id: 'RV#24-00017', spr_id: '', meqs_number: '24-00022', requisitioner: 'Test user', request_type: 'RV', meqs_date: '2024-10-15', canceller_id: '', status: 'approved', notes: '' },
        { id: 9, jo_id: '', rv_id: 'RV#24-00018', spr_id: '', meqs_number: '24-00023', requisitioner: 'Test user', request_type: 'RV', meqs_date: '2024-03-04', canceller_id: '', status: 'pending', notes: '' },
        { id: 10, jo_id: '', rv_id: 'RV#24-00019', spr_id: '', meqs_number: '24-00024', requisitioner: 'Test user', request_type: 'RV', meqs_date: '2024-08-04', canceller_id: '', status: 'disapproved', notes: '' }
    ])
      
    //actions

    return {
        currentMeqs,
        meqsRecords
        //method
    }
})