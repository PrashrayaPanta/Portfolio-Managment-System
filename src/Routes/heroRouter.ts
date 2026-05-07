import express from 'express'
import {
    createHeroController,
    deleteHeroController,

    getHeroControllerById,
    updateHeroController,
} from '../Controllers/heroController'
import { upload } from '../middleware/upload'
import { isAuth } from '../middleware/isAuth'
import { deleteImageController, updateImageController } from '../Controllers/ImageController'



export const heroRouter = express.Router()

// Hero Routes
// heroRouter.get('/', getHeroController)

//! Get the Hero By Id
heroRouter.get("/:id", getHeroControllerById)



//! Post The Hero Content
heroRouter.post('/', isAuth, upload.single('hero-pic'), createHeroController)


//! Delete the Hero  Content
heroRouter.delete('/:id', isAuth, deleteHeroController)

//! Hero Image Deletion
heroRouter.delete('/uploads/:filename', isAuth, deleteImageController)



//! Hero Edition
heroRouter.put("/:id", isAuth, upload.single("hero-pic"), updateHeroController)
