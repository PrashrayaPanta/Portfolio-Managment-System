import { Contact, EditContactSchmea } from '../Validation/ContactValidation';
import { Request, Response } from 'express';
import * as z from 'zod';
import { pool } from '../index';

// ========== CREATE CONTACT ==========
export const createContactController = async (req: Request, res: Response) => {
    try {
        const { success, data, error } = Contact.safeParse(req.body);

        if (!success) {
            return res.status(400).json({
                message: 'Validation failed',
                data: null,
                error: z.flattenError(error).fieldErrors
            });
        }

        await pool
            .promise()
            .query(
                `INSERT INTO contact (title, contactDescription) VALUES (?, ?)`,
                [data.title, data.contactDescription]
            );

        return res.status(201).json({
            message: 'Contact created successfully',
            data: null,
            error: null
        });
    } catch (error) {
        console.error('Create contact error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        });
    }
};

// ========== GET SINGLE CONTACT ==========
export const getContactController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                message: 'Invalid contact ID',
                data: null,
                error: 'Invalid contact ID'
            });
        }

        const [rows] = await pool
            .promise()
            .query(`SELECT * FROM contact WHERE id = ?`, [id]);

        const contacts = rows as any[];
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
    } catch (error) {
        console.error('Get contact error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        });
    }
};

// ========== GET ALL CONTACTS ==========
export const getAllContactController = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool
            .promise()
            .query(`SELECT * FROM contact ORDER BY id DESC`);

        return res.status(200).json({
            message: 'Contacts fetched successfully',
            data: rows,
            error: null
        });
    } catch (error) {
        console.error('Get all contacts error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        });
    }
};

// ========== UPDATE CONTACT ==========
export const updateContactController = async (req: Request, res: Response) => {
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

        const { success, data, error } = EditContactSchmea.safeParse(req.body);

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

        const updates: string[] = []
        const values: any[] = []

        const fields = [
            { key: 'title', column: 'Title' },
            { key: 'contactDescription', column: 'contactDescriptiion' },
        ]

        for (const field of fields) {
            console.log("The field is ", field);
            const value = data?.[field.key as keyof typeof data]
            if (value !== undefined && value !== null && value !== '') {
                updates.push(`${field.column} = ?`)
                values.push(value)
            }
        }

        console.log("The updates is ", updates);

        if (updates.length === 0) {
            return res.status(400).json({
                message: 'No valid fields to update',
                data: null,
                error: 'No valid fields to update'
            })
        }

        values.push(id)
        const query = `UPDATE contact SET ${updates.join(', ')} WHERE id = ?`
        const [result]: any = await pool.promise().query(query, values)

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Education record not found',
                data: null,
                error: 'Education record not found'
            })
        }

        return res.status(200).json({
            message: 'Contact updated successfully',
            data: null,
            error: null
        });
    } catch (error) {
        console.error('Update contact error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        });
    }
};

// ========== DELETE CONTACT ==========
export const deleteContactController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                message: 'Invalid contact ID',
                data: null,
                error: 'Invalid contact ID'
            });
        }

        const [result] = await pool
            .promise()
            .query(`DELETE FROM contact WHERE id = ?`, [id]);

        const deleteResult = result as any;
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
    } catch (error) {
        console.error('Delete contact error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        });
    }
};