import express from 'express'
import {
    createContactController,
    deleteContactController,
    getContactController,
    updateContactController,
    getAllContactController,
} from '../Controllers/contactController'
import { isAuth } from '../middleware/isAuth'

export const contactRouter = express.Router()
// Contact Routes

//! Get Contact By Id
contactRouter.get('/:id', getContactController)

//! Get All Contact
contactRouter.get('/', getAllContactController)

//! Create the Contact
contactRouter.post('/', isAuth, createContactController)

//! Delete the contact By Id
contactRouter.delete('/:id',isAuth, deleteContactController)

//! Edit Contact By Id
contactRouter.put('/:id', isAuth, updateContactController)
