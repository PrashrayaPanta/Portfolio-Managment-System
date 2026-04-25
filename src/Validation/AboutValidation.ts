import * as z from 'zod'
export const About = z.object({
    description: z.string('text is required').min(24, 'minium'),
})
