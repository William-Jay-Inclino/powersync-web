import { useCanvassStore } from "~/stores/canvass"
import { FORM_MODE } from "~/stores/types"

export default defineNuxtRouteMiddleware((to, from) => {
    const canvassStore = useCanvassStore()
    
    if (to.params.action !== 'success') {
        const formMode = ref(to.params.action === 'add' ? FORM_MODE.ADD : FORM_MODE.EDIT)
        console.log('Canvass middleware route params ',to.params)
        console.log('Canvass middleware formModel ',formMode.value)
        
        if (formMode.value === FORM_MODE.EDIT) {
            const canvass = canvassStore.canvassRecords.find(cvs => cvs.rc_number === to.params.action)
            console.log('Canvass edit', canvass)
            if (canvass) {
                canvassStore.currentCanvass = canvass
            }
        }else{
            console.log('Canvass add')
            canvassStore.currentCanvass = {
                rc_number: useIncrementStringKey(canvassStore.getLastCanvass().rc_number),
                requisitioner: '',
                date: '',
                notedby: '',
                purpose: '',
                particulars: []
            }
        }
    }
  })