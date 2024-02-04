export interface User {
    username: string | undefined
    email: string
    firstname: string
    lastname: string
    password: string
}

export interface Canvass {
    rc_number: string
    requisitioner: string
    date:string
    notedby:string
    purpose:string
    notes?:string
    particulars?: Array<CanvassItem>
}

export interface CanvassItem {
    number: number
    description: string
    brand: string
    unit: string
    quantity: number
}

export interface Breadcrumb {
    label:string
    icon:string
    to?:string
}

export interface Meqs {
    id:number
    jo_id?: string
    rv_id?: string
    spr_id?: string
    meqs_number:string
    requisitioner?: string //for mock data only. Should be removed once db connection established
    request_type: REQUEST_TYPE | string
    meqs_date: string
    canceller_id: string
    status: APPROVAL_STATUS | string
    notes: string
}

export interface MeqsSupplier {
    id: number
    meqs_id: string
    supplier_id: string
    payment_terms: string
    is_referenced: string //foreign key?
}

export interface MeqsSupplierAttachment {
    id: number
    meqs_supplier_id: string
    src: string
}

export const enum FORM_MODE { 
    ADD = 'ADD',
    EDIT = 'EDIT'
}

export const enum REQUEST_TYPE {
    JO = 'JO',
    RV = 'RB',
    SPR = 'SPR'
}

export const enum APPROVAL_STATUS {
    PENDING = 'pending',
    APPROVED = 'approved',
    DISAPPROVED = 'disapproved',
    CANCELLED = 'cancelled'
}