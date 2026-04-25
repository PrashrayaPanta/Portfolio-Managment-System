"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroRouter = void 0;
const express_1 = __importDefault(require("express"));
const heroController_1 = require("../Controllers/heroController");
const upload_1 = require("../middleware/upload");
const isAuth_1 = require("../middleware/isAuth");
const ImageController_1 = require("../Controllers/ImageController");
exports.heroRouter = express_1.default.Router();
// Hero Routes
// heroRouter.get('/', getHeroController)
exports.heroRouter.get("/:id", heroController_1.getHeroControllerById);
exports.heroRouter.post('/', isAuth_1.isAuth, upload_1.upload.single('hero-pic'), heroController_1.createHeroController);
exports.heroRouter.delete('/:id', isAuth_1.isAuth, heroController_1.deleteHeroController);
exports.heroRouter.put('/:id', isAuth_1.isAuth, heroController_1.updateHeroController);
exports.heroRouter.delete('/uploads/:filename', ImageController_1.deleteImageController);
