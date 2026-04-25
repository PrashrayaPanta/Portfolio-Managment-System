import * as z from 'zod'
export const LoginSchema = z.object({
    email: z.string('text is required').email(''),
    password: z
        .string()
        .min(5, 'Password must be at least 5 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one symbol'),
})

export const RegisterSchema = z.object({
    username: z.string('Text is required'),
    email: z.string('text is required').email(''),
    password: z
        .string()
        .min(5, 'Password must be at least 5 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one symbol'),
})
