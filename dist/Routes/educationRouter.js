"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationRouter = void 0;
const express_1 = __importDefault(require("express"));
const educationController_1 = require("../Controllers/educationController");
exports.educationRouter = express_1.default.Router();
// Education Routes
//! Get Education By Id
exports.educationRouter.get('/:id', educationController_1.getEducationControllerById);
//! Get All Education
exports.educationRouter.get('/', educationController_1.getAllEducationController);
//! Post Education
exports.educationRouter.post('/', educationController_1.createEducationController);
//! Delete Education By Id
exports.educationRouter.delete('/:id', educationController_1.deleteEducationController);
//! Edit Education By Id
exports.educationRouter.put('/:id', educationController_1.updateEducationController);
