import * as z from 'zod'
export const projectCreateSchema = z.object({
    name: z.string('text is required'),
    description: z.string().min(24, "24 is required"),
    category_id: z.number()
})



export const EditProjectSchema = z.object({
    name: z.string().optional(),
    description: z.string().min(24, "24 is required").optional(),
    category_id: z.number().optional(),
    updated_at: z.string().optional()
})
