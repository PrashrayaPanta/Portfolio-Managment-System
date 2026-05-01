
import express from 'express'
import { editCertainCategory, getAllCategory, getCertainCategory } from '../Controllers/categoryController';

import { createCategory }  from "../Controllers/categoryController"
import { getAllProjectsWithCertainCategory } from '../Controllers/projectController';
import { upload } from '../middleware/upload';
import { deleteImageController } from '../Controllers/ImageController';
export const categoryRouter = express.Router();



//! Get All Category
categoryRouter.get("/", getAllCategory)

//! Create Category
categoryRouter.post("/",  upload.single("category-pic"), createCategory)


//! Get Certain Catgeory
categoryRouter.get("/:id", getCertainCategory)



//! Edit Certain Category
categoryRouter.put("/:id", editCertainCategory)


//! Get Certain Category
categoryRouter.get("/:id/projects", getAllProjectsWithCertainCategory)

//! Delete Image for Category
categoryRouter.delete("/uploads/:filename", deleteImageController)