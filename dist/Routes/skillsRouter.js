"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillRouter = void 0;
const express_1 = __importDefault(require("express"));
const skillController_1 = require("../Controllers/skillController");
const isAuth_1 = require("../middleware/isAuth");
exports.skillRouter = express_1.default.Router();
// Skill Routes
//! Get  Skill By Id
exports.skillRouter.get('/:id', skillController_1.getSkillController);
//! Get All Skills
exports.skillRouter.get('/', skillController_1.getAllSkillsController);
//! Post Skill
exports.skillRouter.post('/', isAuth_1.isAuth, skillController_1.createSkillController);
//! Delete Skill By Id
exports.skillRouter.delete('/:id', isAuth_1.isAuth, skillController_1.deleteSkillController);
//! Edit Skill By Id
exports.skillRouter.put('/:id', isAuth_1.isAuth, skillController_1.updateSkillController);
