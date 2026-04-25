"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const projectController_1 = require("../Controllers/projectController");
const express_1 = __importDefault(require("express"));
exports.projectRouter = express_1.default.Router();
// Project Routes
exports.projectRouter.get('/', projectController_1.getProjectController);
exports.projectRouter.post('/', projectController_1.createProjectController);
exports.projectRouter.delete('/', projectController_1.deleteProjectController);
exports.projectRouter.put('/', projectController_1.updateProjectController);
