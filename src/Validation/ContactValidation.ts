import * as z from 'zod'
export const Contact = z.object({
    title: z.string('text is required'),
    contactDescription: z.string('text is required'),
})




export const EditContactSchmea = z.object({
    title: z.string().optional(),
    contactDescription: z.string('text is required').optional(),
})
