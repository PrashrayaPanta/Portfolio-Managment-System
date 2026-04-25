"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutRouter = void 0;
const express_1 = __importDefault(require("express"));
const aboutController_1 = require("../Controllers/aboutController");
exports.aboutRouter = express_1.default.Router();
exports.aboutRouter.get("/", aboutController_1.getAboutController);
exports.aboutRouter.post("/", aboutController_1.createAboutController);
exports.aboutRouter.delete("/:id", aboutController_1.deleteAboutController);
exports.aboutRouter.put("/:id", aboutController_1.updateAboutController);
