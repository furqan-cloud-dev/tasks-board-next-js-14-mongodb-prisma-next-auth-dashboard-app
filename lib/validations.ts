
import { z } from "zod";


const schemaCreateUser = z.object({
    name: z.string(),
    email: z.string({
        invalid_type_error: 'Invalid Email',
    }),
    password: z.string(),
})


const schemaCreateTask = z.object({
    title: z.string()
})


export { schemaCreateUser, schemaCreateTask }