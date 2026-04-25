"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
//! Configure storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        console.log('I am inside the filename method');
        // file.mimetype
        //! Generate 5 randon Character
        const randomName = Math.random().toString(36).substring(2, 7);
        //! Get the original Name
        const originalName = file.originalname;
        console.log(originalName);
        cb(null, randomName + '-' + originalName);
        // Create custom filename: timestamp-originalname
        // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        // cb(null, uniqueSuffix + path.extname(file.originalname));
        // console.log(req.file);
    },
});
//! Upload
exports.upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB – stops upload early
    fileFilter: (req, file, cb) => {
        const allowed = ['image/png', 'image/jpeg'];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type')); // Rejects before file data is written
        }
    },
});
