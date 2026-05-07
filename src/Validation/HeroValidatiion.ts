import * as z from 'zod'
export const createHeroSchema = z.object({
    title:z.string("title is required"),
    heroDescription: z
        .string('text is required')
        .min(24, 'minmum 24 character is required').optional(),
    "hero-pic":z.string().optional()
})


export const updateHeroSchema = z.object({
    title:z.string().optional(),
    heroDescription: z
        .string('text is required')
        .min(24, 'minmum 24 character is required').optional(),
   "hero-pic":z.string().optional()
})



