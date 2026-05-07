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
            return res.status(400).json({
                message: 'Validation failed',
                data: null,
                error: zod_1.default.flattenError(error).fieldErrors
            });
        }
        const [result] = await __1.pool
            .promise()
            .query(`INSERT INTO Education (Board, Level, TimeRange) VALUES (?, ?, ?)`, [data.Board, data.Level, data.TimeRange]);
        return res.status(201).json({
            message: 'Education record created successfully',
            data: { id: result.insertId },
            error: null
        });
    }
    catch (error) {
        console.error('Create education error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        });
    }
};
exports.createEducationController = createEducationController;
const getAllEducationController = async (req, res) => {
    try {
        const [rows] = await __1.pool.promise().query(`SELECT * FROM Education`);
        return res.status(200).json({
            message: 'Education records fetched successfully',
            data: rows,
            error: null
        });
    }
    catch (error) {
        console.error('Get all education error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        });
    }
};
exports.getAllEducationController = getAllEducationController;
const getEducationControllerById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Education ID is required',
                data: null,
                error: 'Missing ID parameter'
            });
        }
        const [rows] = await __1.pool
            .promise()
            .query(`SELECT * FROM Education WHERE id = ?`, [id]);
        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Education record not found',
                data: null,
                error: 'Record does not exist'
            });
        }
        return res.status(200).json({
            message: 'Education record fetched successfully',
            data: rows[0],
            error: null
        });
    }
    catch (error) {
        console.error('Get education by id error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        });
    }
};
exports.getEducationControllerById = getEducationControllerById;
const updateEducationController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Education ID is required',
                data: null,
                error: 'Missing ID parameter'
            });
        }
        const { success, data, error } = EducationValidation_1.EditEducationSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: 'Validation failed',
                data: null,
                error: error.flatten().fieldErrors
            });
        }
        const updates = [];
        const values = [];
        if (data.Board !== undefined) {
            updates.push('Board = ?');
            values.push(data.Board);
        }
        if (data.Level !== undefined) {
            updates.push('Level = ?');
            values.push(data.Level);
        }
        if (data.TimeRange !== undefined) {
            updates.push('TimeRange = ?');
            values.push(data.TimeRange);
        }
        if (updates.length === 0) {
            return res.status(400).json({
                message: 'No valid fields to update',
                data: null,
                error: 'At least one field (Board, Level, TimeRange) is required'
            });
        }
        values.push(id);
        const query = `UPDATE Education SET ${updates.join(', ')} WHERE id = ?`;
        const [result] = await __1.pool.promise().query(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Education record not found',
                data: null,
                error: 'Record does not exist'
            });
        }
        return res.status(200).json({
            message: 'Education record updated successfully',
            data: { id },
            error: null
        });
    }
    catch (error) {
        console.error('Update education error:', error);
        return res.status(500).json({
            message: "Server Error",
            data: null,
            error: 'Internal server error'
        });
    }
};
exports.updateEducationController = updateEducationController;
const deleteEducationController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Education ID is required',
                data: null,
                error: 'Missing ID parameter'
            });
        }
        const [result] = await __1.pool
            .promise()
            .query(`DELETE FROM Education WHERE id = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Education record not found',
                data: null,
                error: 'Record does not exist'
            });
        }
        return res.status(200).json({
            message: 'Education record deleted successfully',
            data: null,
            error: null
        });
    }
    catch (error) {
        console.error('Delete education error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        });
    }
};
exports.deleteEducationController = deleteEducationController;
