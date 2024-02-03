import { defineStore } from 'pinia'
import type { Canvass } from '~/stores/types';

export const useCanvassStore = defineStore('canvass', () => {
    //state

    //Mock table data
    const canvassRecords = ref<Array<Canvass>>([
        { rc_number: "24-00015", requisitioner: "Inclino, William Jay I.", date: "2024-01-12", notedby: '', purpose: ''},
        { rc_number: "24-00016", requisitioner: "Pastor, Ana Maria L.", date: "2024-01-12", notedby: '', purpose: '' },
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
        canvassRecords,
        //methods
        getLastCanvass
    }
})