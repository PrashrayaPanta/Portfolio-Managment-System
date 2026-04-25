import * as z from 'zod'
export const EducationSchema = z.object({
    Board: z.string(),
    Level: z.string(),
    TimeRange: z.string(),
})

export const EditEducationSchema = z.object({
    Board: z.string().optional(),
    Level: z.string().optional(),
    TimeRange: z.string().optional(),
})
