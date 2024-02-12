// models

export type User = {
    id: string
    email: string
    name: string
    emailVarified: boolean
}


export interface Task {
    id: string;
    title: string;
    status: string;
}