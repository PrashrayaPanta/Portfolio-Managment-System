import express from 'express'
import { aboutRouter } from './Routes/aboutRouter'
import { heroRouter } from './Routes/heroRouter'
import { skillRouter } from './Routes/skillsRouter'
import { contactRouter } from './Routes/contactRouter'
import { educationRouter } from './Routes/educationRouter'
import { projectRouter } from './Routes/projectRouter'

import dotenv from 'dotenv'
dotenv.config()

import mysql from 'mysql2'
import { userRouter } from './Routes/userRouter'
import cookieParser from 'cookie-parser'
import path from 'node:path'

import cors from "cors"
import { sendOtpService } from './utils/sendOtpService'
import { verifyOtpSerice } from './utils/verifyOtpService'




const pool = mysql.createPool({
    host: process.env.DB_host,
    port: Number(process.env.DB_port),
    user: process.env.user,
    password: process.env.password,
    database: process.env.DB_Name,
})

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err)
    } else {
        console.log('DFB connetced suyccesfiully hjbjh hjbghjb')
    }
})

export { pool }

// console.log(connection);

// const connection = await connectDB()

// console.log(connection);

// Create the connection to database

const app = express()

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors())

// app.post("/profile", upload.single("profile-pic"), (req:Request, res:Response) => {

// 		console.log(req.file);

// })

app.use(express.json())

app.use(cookieParser())


//! User Route 
app.use('/user', userRouter)

//! About Route
app.use('/about', aboutRouter)




//! Hero Route
app.use('/hero', heroRouter)

//! Skills
app.use('/skills', skillRouter)

//! Contact
app.use('/contact', contactRouter)

//! Education
app.use('/education', educationRouter)

//! Project
app.use('/project', projectRouter)

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

//! No any route match
app.get(`{/*aa}`, (req, res) => {
    console.log(req.method)
    res.send(`<h1>404 this is not found No Found hb</h1>`)
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on hbm http://localhost:3000 hjbhj')
})
