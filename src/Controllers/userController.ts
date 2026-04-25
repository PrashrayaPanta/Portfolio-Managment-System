import { Request, Response } from 'express'
import { LoginSchema } from '../Validation/userValidation'
import z from 'zod'
import bcrypt from 'bcrypt'
import { pool } from '..'
import jwt from 'jsonwebtoken'

export const Login = async (req: Request, res: Response) => {
    console.log('I am inside the login conytropler')

    try {
        //! 1. Input validation
        const { success, data, error } = LoginSchema.safeParse(req.body)

        console.log('This is error', error)

        // console.log(result);

        if (!success) {
            console.log(error.issues)
            return res
                .status(400)
                .json({ error: z.flattenError(error).fieldErrors })
        }

        const { email, password } = data

        //! 2. Fetch user from database by email
        const [rows]: any = await pool
            .promise()
            .query(
                'SELECT id, username, email, password FROM users WHERE email = ?',
                [email]
            )

        const user = rows[0]
        //! 3. check if user exist

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        //! 4. Compare provided password with stored hash
        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        console.log(user)

        //! 5. Generate JWT token (optional but recommended)
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '2h' }
        )

        console.log(token);
        

        //!6. Set the cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        })

        return res.status(201).json({ message: 'cookie is created' })
    } catch (error) {

        
    }
}

export const Register = async (req: Request, res: Response) => {
    try {
        const { success, data, error } = LoginSchema.safeParse(req.body)

        console.log('This is error', error)

        // console.log(result);

        if (!success) {
            console.log(error.issues)
            return res
                .status(400)
                .json({ error: z.flattenError(error).fieldErrors })
        }

        //! Get the Validated Data
        const { username, email, password } = req.body

        //! find Unique Email in db

        //! 3. Hash password
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        //! 4. Insert new user
        const [result]: any = await pool
            .promise()
            .query(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                [username, email, hashedPassword]
            )
    } catch (error: any) {
        console.log(error)

        console.log(
            'This is error message of register controller',
            error.message
        )

        //! Duplicate key errror
        console.log(error.errno)

        if (error.errno === 1062) {
            res.status(401).json({ error: error.message })
        }

        console.log('Register Controller Error')
    }
}

export const Logout = (req: Request, res: Response) => {
    try {
        //! Clearing the cookie
        res.clearCookie('authToken')
        //!  Send a success response
        return res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
        console.log(error)
    }
}
