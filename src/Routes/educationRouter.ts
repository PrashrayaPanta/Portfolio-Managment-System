import express from 'express'

import {
    createEducationController,
    deleteEducationController,
    getAllEducationController,
    getEducationControllerById,
    updateEducationController,

} from '../Controllers/educationController'
import { isAuth } from '../middleware/isAuth'




export const educationRouter = express.Router()

// Education Routes

//! Get Education By Id
educationRouter.get('/:id', getEducationControllerById)

//! Get All Education
educationRouter.get('/', getAllEducationController)

//! Post Education
educationRouter.post('/', isAuth, createEducationController)

//! Delete Education By Id
educationRouter.delete('/:id', isAuth, deleteEducationController)

//! Edit Education By Id
educationRouter.put('/:id', isAuth, updateEducationController)
