"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../Controllers/categoryController");
const categoryController_2 = require("../Controllers/categoryController");
const projectController_1 = require("../Controllers/projectController");
const upload_1 = require("../middleware/upload");
const ImageController_1 = require("../Controllers/ImageController");
const isAuth_1 = require("../middleware/isAuth");
exports.categoryRouter = express_1.default.Router();
//! Get All Category
exports.categoryRouter.get("/", categoryController_1.getAllCategory);
//! Create Category
exports.categoryRouter.post("/", upload_1.upload.single("category-pic"), categoryController_2.createCategory);
//! Get Certain Catgeory
exports.categoryRouter.get("/:id", categoryController_1.getCertainCategory);
//! Edit Certain Category
exports.categoryRouter.put("/:id", isAuth_1.isAuth, categoryController_1.editCertainCategory);
//! Get Certain Category
exports.categoryRouter.get("/:id/projects", projectController_1.getAllProjectsWithCertainCategory);
//! Delete Image for Category
exports.categoryRouter.delete("/uploads/:filename", isAuth_1.isAuth, ImageController_1.deleteImageController);
