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
exports.deleteContactController = exports.updateContactController = exports.getAllContactController = exports.getContactController = exports.createContactController = void 0;
const ContactValidation_1 = require("../Validation/ContactValidation");
const z = __importStar(require("zod"));
const index_1 = require("../index");
// ========== CREATE CONTACT ==========
const createContactController = async (req, res) => {
    try {
        const { success, data, error } = ContactValidation_1.Contact.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: 'Validation failed',
                data: null,
                error: z.flattenError(error).fieldErrors
            });
        }
        await index_1.pool
            .promise()
            .query(`INSERT INTO contact (title, contactDescription) VALUES (?, ?)`, [data.title, data.contactDescription]);
        return res.status(201).json({
            message: 'Contact created successfully',
            data: null,
            error: null
        });
    }
    catch (error) {
        console.error('Create contact error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        });
    }
};
exports.createContactController = createContactController;
// ========== GET SINGLE CONTACT ==========
const getContactController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                message: 'Invalid contact ID',
                data: null,
                error: 'Invalid contact ID'
            });
        }
        const [rows] = await index_1.pool
            .promise()
            .query(`SELECT * FROM contact WHERE id = ?`, [id]);
        const contacts = rows;
        if (contacts.length === 0) {
            return res.status(404).json({
                message: 'Contact not found',
                data: null,
                error: 'Contact not found'
            });
        }
        return res.status(200).json({
            message: 'Contact fetched successfully',
            data: contacts[0],
            error: null
        });
    }
    catch (error) {
        console.error('Get contact error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        });
    }
};
exports.getContactController = getContactController;
// ========== GET ALL CONTACTS ==========
const getAllContactController = async (req, res) => {
    try {
        const [rows] = await index_1.pool
            .promise()
            .query(`SELECT * FROM contact ORDER BY id DESC`);
        return res.status(200).json({
            message: 'Contacts fetched successfully',
            data: rows,
            error: null
        });
    }
    catch (error) {
        console.error('Get all contacts error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        });
    }
};
exports.getAllContactController = getAllContactController;
// ========== UPDATE CONTACT ==========
const updateContactController = async (req, res) => {
    try {
        console.log("I am update contact controller");
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Invalid contact ID',
                data: null,
                error: 'Invalid contact ID'
            });
        }
        console.log("I am after the id");
        const { success, data, error } = ContactValidation_1.EditContactSchmea.safeParse(req.body);
        console.log("The validated data is ", data);
        console.log("The errror is ", error);
        if (!success) {
            return res.status(400).json({
                message: 'Validation failed',
                data: null,
                error: z.flattenError(error).fieldErrors
            });
        }
        console.log("I am not error but i am success you know what");
        const updates = [];
        const values = [];
        const fields = [
            { key: 'title', column: 'Title' },
            { key: 'contactDescription', column: 'contactDescriptiion' },
        ];
        for (const field of fields) {
            console.log("The field is ", field);
            const value = data === null || data === void 0 ? void 0 : data[field.key];
            if (value !== undefined && value !== null && value !== '') {
                updates.push(`${field.column} = ?`);
                values.push(value);
            }
        }
        console.log("The updates is ", updates);
        if (updates.length === 0) {
            return res.status(400).json({
                message: 'No valid fields to update',
                data: null,
                error: 'No valid fields to update'
            });
        }
        values.push(id);
        const query = `UPDATE contact SET ${updates.join(', ')} WHERE id = ?`;
        const [result] = await index_1.pool.promise().query(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Education record not found',
                data: null,
                error: 'Education record not found'
            });
        }
        return res.status(200).json({
            message: 'Contact updated successfully',
            data: null,
            error: null
        });
    }
    catch (error) {
        console.error('Update contact error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        });
    }
};
exports.updateContactController = updateContactController;
// ========== DELETE CONTACT ==========
const deleteContactController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                message: 'Invalid contact ID',
                data: null,
                error: 'Invalid contact ID'
            });
        }
        const [result] = await index_1.pool
            .promise()
            .query(`DELETE FROM contact WHERE id = ?`, [id]);
        const deleteResult = result;
        if (deleteResult.affectedRows === 0) {
            return res.status(404).json({
                message: 'Contact not found',
                data: null,
                error: 'Contact not found'
            });
        }
        return res.status(200).json({
            message: 'Contact deleted successfully',
            data: null,
            error: null
        });
    }
    catch (error) {
        console.error('Delete contact error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        });
    }
};
exports.deleteContactController = deleteContactController;
