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
exports.editCertainCategory = exports.getCertainCategory = exports.createCategory = exports.getAllCategory = void 0;
const z = __importStar(require("zod"));
const CategoryValidation_1 = require("../Validation/CategoryValidation");
const __1 = require("..");
//! Get All Category
const getAllCategory = async (req, res) => {
    try {
        const [rows] = await __1.pool.promise().query(`select * from Category`);
        res.status(200).json({ message: "success", data: rows, error: null });
    }
    catch (error) {
        res.status(500).json({ message: "Error", data: null, error: "Internal Server Error" });
    }
};
exports.getAllCategory = getAllCategory;
//! Create Category
const createCategory = async (req, res) => {
    var _a;
    try {
        const { success, data, error } = CategoryValidation_1.categoryCreateSchema.safeParse(req.body);
        if (!success) {
            console.log(error.issues);
            return res
                .status(400)
                .json({ message: "Error", data: null, error: z.flattenError(error).fieldErrors });
        }
        await __1.pool
            .promise()
            .query(`INSERT INTO Category (name, description, image_path) VALUES(?, ?, ? )`, [
            data.name, data.description,
            (_a = req.file) === null || _a === void 0 ? void 0 : _a.path
        ]);
        res.status(200).json({ message: "success", data: null, error: null });
    }
    catch (errror) {
        console.log(error);
        res.status(500).json({ message: "Error", data: null, error: "Internal Server Error" });
    }
};
exports.createCategory = createCategory;
//! Get certain Catgeory Controller
const getCertainCategory = async (req, res) => {
    const { id } = req.params;
    const [rows] = await __1.pool.promise().query(`SELECT * FROM Category WHERE id = ?`, [id]);
    res.status(200).json({ message: "success", data: rows[0], error: null });
};
exports.getCertainCategory = getCertainCategory;
const editCertainCategory = async (req, res) => {
    const { success, data, error } = CategoryValidation_1.categoryUpdateSchema.safeParse(req.body);
    if (!success) {
        console.log(error.issues);
        return res
            .status(400)
            .json({ message: "Error", data: null, error: z.flattenError(error).fieldErrors });
    }
    const { id } = req.params;
    const { name, description } = data;
    if (!id) {
        return res.status(400).json({ message: "Not Found", data: null, error: 'Category ID not required' });
    }
    // Collect fields to update
    const updates = [];
    const values = [];
    if (name !== undefined) {
        updates.push('name = ?');
        values.push(name);
    }
    if (description !== undefined) {
        updates.push('description = ?');
        values.push(description);
    }
    if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }
    values.push(id); // for WHERE clause
    const query = `UPDATE Category SET ${updates.join(', ')} WHERE id = ?`;
    try {
        const [result] = await __1.pool.promise().query(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", data: null, error: 'Internal server error' });
    }
};
exports.editCertainCategory = editCertainCategory;
