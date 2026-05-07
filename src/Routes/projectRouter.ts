import {
    addProjectImages,
    createProjectController,
    deleteProjectController,
    getAllImagesbelongingtoCertainProductId,
    getProjectController,
    updateProjectController,
} from '../Controllers/projectController'




import express from 'express'
import { upload } from '../middleware/upload'
import { deleteImageController } from '../Controllers/ImageController'
import { isAuth } from '../middleware/isAuth'

export const projectRouter = express.Router()

//! Project Routes
projectRouter.get('/', getProjectController)
projectRouter.post('/', isAuth, createProjectController)
projectRouter.delete('/:id', isAuth, deleteProjectController)
projectRouter.put('/:id', isAuth, upload.array("project"),  updateProjectController)


//! Project-Images
projectRouter.post("/:id/images", isAuth, upload.array("project"), addProjectImages)

//! Get the all the images belonging to certain product ID
projectRouter.get("/:id/images", isAuth, getAllImagesbelongingtoCertainProductId)

//! Delete Image Controller
projectRouter.delete("/uploads/:filename", isAuth, deleteImageController)


