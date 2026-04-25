"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = void 0;
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../Controllers/contactController");
exports.contactRouter = express_1.default.Router();
// Contact Routes
//! Get Contact By Id
exports.contactRouter.get('/:id', contactController_1.getContactController);
//! Get All Contact
exports.contactRouter.get('/', contactController_1.getAllContactController);
//! Create the Contact
exports.contactRouter.post('/', contactController_1.createContactController);
//! Delete the contact By Id
exports.contactRouter.delete('/:id', contactController_1.deleteContactController);
//! Edit Contact By Id
exports.contactRouter.put('/:id', contactController_1.updateContactController);
