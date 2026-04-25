import * as z from 'zod'
export const Hero = z.object({
    heroDescription: z
        .string('text is required')
        .min(24, 'minmum 24 character is required'),
})
