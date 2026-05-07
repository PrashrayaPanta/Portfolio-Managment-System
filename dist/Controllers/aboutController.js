"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAboutController = exports.deleteAboutController = exports.getAboutController = exports.createAboutController = void 0;
const AboutValidation_1 = require("../Validation/AboutValidation");
const z = __importStar(require("zod"));
const __1 = require("..");
const createAboutController = async (req, res) => {
    try {
        // console.log(req.headers);
        // console.log(req.body);
        // console.log("I am inside the create about controller");
        // console.log("inside the");
        // console.log(req.body);
        // const { description } = req.body;
        // const { success, data, error } = About.safeParse(req.body);
        // console.log(error);
        // console.log(success);
        // console.log("The data is", data);
        // console.log("I am after the error k xa tero thik xa ni");
        // const result = About.parse(req.body)
        // console.log(result);
        // console.log("TRhge srult is n", result);
        const { success, data, error } = AboutValidation_1.About.safeParse(req.body);
        console.log('This is error', error);
        // console.log(result);
        if (!success) {
            console.log(error.issues);
            return res
                .status(400)
                .json({ error: z.flattenError(error).fieldErrors });
        }
        await __1.pool
            .promise()
            .query(`INSERT INTO About (Description) VALUES(?)`, [
            data.description,
        ]);
        console.log('Succesful;ly inserted to about table of pms');
    }
    catch (error) {
        console.log('kye error ho', error);
    }
};
exports.createAboutController = createAboutController;
const getAboutController = async (req, res) => {
    try {
        const [rows] = await __1.pool.promise().query(`select * from About`);
        res.status(200).json({ message: "About gets", data: rows[0], error: null });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getAboutController = getAboutController;
const deleteAboutController = () => { };
exports.deleteAboutController = deleteAboutController;
const updateAboutController = () => { };
exports.updateAboutController = updateAboutController;
