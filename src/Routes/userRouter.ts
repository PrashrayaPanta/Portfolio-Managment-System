import express from 'express'
import { Login, Register } from '../Controllers/userController'

export const userRouter = express.Router()

userRouter.post('/login', Login)

userRouter.post('/register', Register)
