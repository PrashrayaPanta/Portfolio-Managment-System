import express from 'express'
import { createAboutController, deleteAboutController, getAboutController, updateAboutController } from '../Controllers/aboutController';

export const aboutRouter = express.Router();




aboutRouter.get("/", getAboutController)


aboutRouter.post("/", createAboutController)

aboutRouter.delete("/:id", deleteAboutController)

aboutRouter.put("/:id", updateAboutController)

