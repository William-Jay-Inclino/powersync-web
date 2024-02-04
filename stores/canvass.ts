import { defineStore } from 'pinia'
import type { Canvass } from '~/stores/types';

export const useCanvassStore = defineStore('canvass', () => {
    //state
    const currentCanvass = ref<Canvass>({
        rc_number: '',
        requisitioner: '',
        date: '',
        notedby: '',
        purpose: '',
        particulars: []
    })
    //Mock table data
    const canvassRecords = ref<Array<Canvass>>([
        { rc_number: "24-00015", requisitioner: "Inclino, William Jay I.", date: "2024-01-12", notedby: 'Pastor, Anna Maria L.', purpose: 'Testing',
        particulars: [{
            number: 1,
            description: 'Canned Tuna',
            brand: 'Brand X',
            unit: 'Cartons',
            quantity: 1
        }]},
        { rc_number: "24-00016", requisitioner: "Pastor, Anna Maria L.", date: "2024-01-12", notedby: 'Inclino, William Jay I.', purpose: 'Order',
        particulars: [{
            number: 1,
            description: 'Soap',
            brand: 'Brand Y',
            unit: 'Cartons',
            quantity: 1
        }] },
        { rc_number: "24-00017", requisitioner: "Inclino, William Jay I.", date: "2024-01-11", notedby: '', purpose: '' },
        { rc_number: "24-00018", requisitioner: "Sanico, Marlon", date: "2024-01-11", notedby: '', purpose: '' },
        { rc_number: "24-00019", requisitioner: "Pastor, Ana Maria L.", date: "2024-01-08", notedby: '', purpose: '' },
        { rc_number: "24-00020", requisitioner: "Pelones, Jessa X.", date: "2024-01-11", notedby: '', purpose: '' },
        { rc_number: "24-00021", requisitioner: "Dayandayan, Jannie Ann", date: "2024-01-01", notedby: '', purpose: '' },
        { rc_number: "24-00022", requisitioner: "Dayandayan, Jannie Ann", date: "2024-01-01", notedby: '', purpose: '' },
        { rc_number: "24-00023", requisitioner: "Dayandayan, Jannie Ann", date: "2024-01-01", notedby: '', purpose: '' }
    ])
  
    //actions
    function getLastCanvass():Canvass {
       return canvassRecords.value[canvassRecords.value.length - 1]
    }



    return {
        currentCanvass,
        canvassRecords,
        //methods
        getLastCanvass
    }
})