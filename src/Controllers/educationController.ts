import { pool } from '..'
import {
    EditEducationSchema,
    EducationSchema,
} from '../Validation/EducationValidation'
import { Request, Response } from 'express'
import z from 'zod'

// ========== EDUCATION CONTROLLERS ==========

export const createEducationController = async (
    req: Request,
    res: Response
) => {
    try {
        const { success, data, error } = EducationSchema.safeParse(req.body)
        if (!success) {
            return res.status(400).json({
                message: 'Validation failed',
                data: null,
                error: z.flattenError(error).fieldErrors
            })
        }

        const [result]: any = await pool
            .promise()
            .query(
                `INSERT INTO Education (Board, Level, TimeRange) VALUES (?, ?, ?)`,
                [data.Board, data.Level, data.TimeRange]
            )

        return res.status(201).json({
            message: 'Education record created successfully',
            data: { id: result.insertId },
            error: null
        })
    } catch (error) {
        console.error('Create education error:', error)
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        })
    }
}

export const getAllEducationController = async (
    req: Request,
    res: Response
) => {
    try {
        const [rows] = await pool.promise().query(`SELECT * FROM Education`)

        return res.status(200).json({
            message: 'Education records fetched successfully',
            data: rows,
            error: null
        })
    } catch (error) {
        console.error('Get all education error:', error)
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        })
    }
}

export const getEducationControllerById = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                message: 'Education ID is required',
                data: null,
                error: 'Missing ID parameter'
            })
        }

        const [rows]: any = await pool
            .promise()
            .query(`SELECT * FROM Education WHERE id = ?`, [id])

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Education record not found',
                data: null,
                error: 'Record does not exist'
            })
        }

        return res.status(200).json({
            message: 'Education record fetched successfully',
            data: rows[0],
            error: null
        })
    } catch (error) {
        console.error('Get education by id error:', error)
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        })
    }
}

export const updateEducationController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Education ID is required',
                data: null,
                error: 'Missing ID parameter'
            });
        }

        const { success, data, error } = EditEducationSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: 'Validation failed',
                data: null,
                error: error.flatten().fieldErrors
            });
        }

        const updates: string[] = [];
        const values: any[] = [];

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
        const [result]: any = await pool.promise().query(query, values);

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
    } catch (error) {
        console.error('Update education error:', error);
        return res.status(500).json({
            message: "Server Error",
            data: null,
            error: 'Internal server error'
        });
    }
};

export const deleteEducationController = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                message: 'Education ID is required',
                data: null,
                error: 'Missing ID parameter'
            })
        }

        const [result]: any = await pool
            .promise()
            .query(`DELETE FROM Education WHERE id = ?`, [id])

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Education record not found',
                data: null,
                error: 'Record does not exist'
            })
        }

        return res.status(200).json({
            message: 'Education record deleted successfully',
            data: null,
            error: null
        })
    } catch (error) {
        console.error('Delete education error:', error)
        return res.status(500).json({
            message: 'Internal server error',
            data: null,
            error: 'Internal server error'
        })
    }
}