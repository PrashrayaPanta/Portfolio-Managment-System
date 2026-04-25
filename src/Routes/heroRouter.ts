import express from 'express'
import {
    createHeroController,
    deleteHeroController,

    getHeroControllerById,
    updateHeroController,
} from '../Controllers/heroController'
import { upload } from '../middleware/upload'
import { isAuth } from '../middleware/isAuth'
import { deleteImageController } from '../Controllers/ImageController'



export const heroRouter = express.Router()

// Hero Routes
// heroRouter.get('/', getHeroController)
heroRouter.get("/:id", getHeroControllerById)
heroRouter.post('/', isAuth, upload.single('hero-pic'), createHeroController)
heroRouter.delete('/:id', isAuth, deleteHeroController)
heroRouter.put('/:id', isAuth, updateHeroController)

heroRouter.delete('/uploads/:filename', deleteImageController)
