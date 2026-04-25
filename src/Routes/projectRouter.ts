import {
    createProjectController,
    deleteProjectController,
    getProjectController,
    updateProjectController,
} from '../Controllers/projectController'

import express from 'express'

export const projectRouter = express.Router()

// Project Routes
projectRouter.get('/', getProjectController)
projectRouter.post('/', createProjectController)
projectRouter.delete('/', deleteProjectController)
projectRouter.put('/', updateProjectController)
