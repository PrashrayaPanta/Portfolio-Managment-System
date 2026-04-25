import express from 'express'
import {
    createSkillController,
    deleteSkillController,
    getSkillController,
    updateSkillController,
    getAllSkillsController,
} from '../Controllers/skillController'
import { isAuth } from '../middleware/isAuth'

export const skillRouter = express.Router()
// Skill Routes

//! Get  Skill By Id
skillRouter.get('/:id', getSkillController)

//! Get All Skills
skillRouter.get('/', getAllSkillsController)

//! Post Skill
skillRouter.post('/', isAuth, createSkillController)

//! Delete Skill By Id
skillRouter.delete('/:id', isAuth, deleteSkillController)

//! Edit Skill By Id
skillRouter.put('/:id', isAuth, updateSkillController)
