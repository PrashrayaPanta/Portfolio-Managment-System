"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEducationController = exports.updateEducationController = exports.getEducationControllerById = exports.getAllEducationController = exports.createEducationController = void 0;
const __1 = require("..");
const EducationValidation_1 = require("../Validation/EducationValidation");
const zod_1 = __importDefault(require("zod"));
// ========== EDUCATION CONTROLLERS ==========
const createEducationController = async (req, res) => {
    try {
        const { success, data, error } = EducationValidation_1.EducationSchema.safeParse(req.body);
        if (!success) {
            return res
                .status(400)
                .json({ errors: zod_1.default.flattenError(error).fieldErrors });
        }
        await __1.pool
            .promise()
            .query(`INSERT INTO Education (Board, Level, TimeRange) VALUES (?, ?, ?)`, [data.Board, data.Level, data.TimeRange]);
        return res
            .status(201)
            .json({ message: 'Education record created successfully' });
    }
    catch (error) {
        console.error('Create education error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createEducationController = createEducationController;
const getAllEducationController = async (req, res) => {
    // Alias for getEducationController (returns all records)
    try {
        console.log('I am inside the get all education controllers');
        const [rows] = await __1.pool.promise().query(`SELECT * FROM Education`);
        console.log(rows);
        return res.status(200).json(rows);
    }
    catch (error) {
        console.error('Get all education error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllEducationController = getAllEducationController;
const getEducationControllerById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Education ID is required' });
        }
        const [rows] = await __1.pool
            .promise()
            .query(`SELECT * FROM Education WHERE id = ?`, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Education record not found' });
        }
        return res.status(200).json(rows[0]);
    }
    catch (error) {
        console.error('Get education by id error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getEducationControllerById = getEducationControllerById;
const updateEducationController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Education ID is required' });
        }
        // Validate request body
        const { success, data, error } = EducationValidation_1.EditEducationSchema.safeParse(req.body);
        if (!success) {
            return res
                .status(400)
                .json({ errors: zod_1.default.flattenError(error).fieldErrors });
        }
        // Build dynamic SET clause and values array
        const updates = [];
        const values = [];
        // Define which fields to check and their column names
        const fields = [
            { key: 'Board', column: 'Board' },
            { key: 'Level', column: 'Level' },
            { key: 'TimeRange', column: 'TimeRange' },
        ];
        for (const field of fields) {
            const value = data === null || data === void 0 ? void 0 : data[field.key];
            // Update only if value is provided and not an empty string / null / undefined
            if (value !== undefined && value !== null && value !== '') {
                updates.push(`${field.column} = ?`);
                values.push(value);
            }
        }
        // If no fields to update, return early
        if (updates.length === 0) {
            return res.status(400).json({ error: 'No valid fields to update' });
        }
        // Add id for the WHERE clause
        values.push(id);
        const query = `UPDATE Education SET ${updates.join(', ')} WHERE id = ?`;
        const [result] = await __1.pool.promise().query(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Education record not found' });
        }
        return res
            .status(200)
            .json({ message: 'Education record updated successfully' });
    }
    catch (error) {
        console.error('Update education error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateEducationController = updateEducationController;
const deleteEducationController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Education ID is required' });
        }
        const [result] = await __1.pool
            .promise()
            .query(`DELETE FROM Education WHERE id = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Education record not found' });
        }
        return res
            .status(200)
            .json({ message: 'Education record deleted successfully' });
    }
    catch (error) {
        console.error('Delete education error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteEducationController = deleteEducationController;
