"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSkillController = exports.updateSkillController = exports.getAllSkillsController = exports.getSkillController = exports.createSkillController = void 0;
const __1 = require("..");
const SkillValidation_1 = require("../Validation/SkillValidation");
const zod_1 = __importDefault(require("zod"));
// ========== SKILL CONTROLLERS ==========
const createSkillController = async (req, res) => {
    try {
        const { success, data, error } = SkillValidation_1.SkillSchema.safeParse(req.body);
        if (!success) {
            return res
                .status(400)
                .json({ error: zod_1.default.flattenError(error).fieldErrors });
        }
        await __1.pool
            .promise()
            .query(`INSERT INTO Skill (Title) VALUES (?)`, [data.title]);
        return res.status(201).json({ message: 'Skill created successfully', error: null });
    }
    catch (error) {
        //! Unique field errror from mysql db
        if (error.errno === 1062) {
            return res.status(409).json({ error: 'Skill already exists' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createSkillController = createSkillController;
const getSkillController = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await __1.pool
            .promise()
            .query(`SELECT * FROM Skill WHERE id = ?`, [id]);
        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        return res.status(200).json({ data: rows[0], error: null });
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getSkillController = getSkillController;
const getAllSkillsController = async (_req, res) => {
    try {
        const [rows] = await __1.pool
            .promise()
            .query(`SELECT * FROM Skill`);
        return res.status(200).json({ data: rows, error: null });
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllSkillsController = getAllSkillsController;
const updateSkillController = async (req, res) => {
    try {
        console.log("I am isndie the update skills");
        const { id } = req.params;
        const { success, data, error } = SkillValidation_1.SkillSchema.safeParse(req.body);
        if (!success) {
            return res
                .status(400)
                .json({ error: zod_1.default.flattenError(error).fieldErrors });
        }
        const [result] = await __1.pool
            .promise()
            .query(`UPDATE Skill SET Title = ? WHERE id = ?`, [data.title, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        return res.status(200).json({ message: 'Skill updated successfully', error: null });
    }
    catch (error) {
        if (error.errno === 1062) {
            return res.status(409).json({ error: 'Skill already exists' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateSkillController = updateSkillController;
const deleteSkillController = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await __1.pool
            .promise()
            .query(`DELETE FROM Skill WHERE id = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        return res.status(200).json({ message: 'Skill deleted successfully', error: null });
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteSkillController = deleteSkillController;
