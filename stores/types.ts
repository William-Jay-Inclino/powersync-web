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
    particulars?: Array<Particular>
}

export interface Particular {
    number: number
    description: string
    brand: string
    unit: string
    quantity: number
}