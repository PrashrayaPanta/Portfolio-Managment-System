import express from 'express'
import { createAboutController, deleteAboutController, getAboutController, updateAboutController } from '../Controllers/aboutController';
import { isAuth } from '../middleware/isAuth';

export const aboutRouter = express.Router();




aboutRouter.get("/", getAboutController)


aboutRouter.post("/", isAuth, createAboutController)

aboutRouter.delete("/:id", isAuth, deleteAboutController)

aboutRouter.put("/:id", isAuth, updateAboutController)

