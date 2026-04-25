import { log } from 'console'
import { pool } from '..'
import {
    EditEducationSchema,
    EducationSchema,
} from '../Validation/EducationValidation'
import { SkillSchema } from '../Validation/SkillValidation'
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
            return res
                .status(400)
                .json({ errors: z.flattenError(error).fieldErrors })
        }

        await pool
            .promise()
            .query(
                `INSERT INTO Education (Board, Level, TimeRange) VALUES (?, ?, ?)`,
                [data.Board, data.Level, data.TimeRange]
            )

        return res
            .status(201)
            .json({ message: 'Education record created successfully' })
    } catch (error) {
        console.error('Create education error:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

export const getAllEducationController = async (
    req: Request,
    res: Response
) => {
    // Alias for getEducationController (returns all records)
    try {
        console.log('I am inside the get all education controllers')
        const [rows] = await pool.promise().query(`SELECT * FROM Education`)
        console.log(rows)

        return res.status(200).json(rows)
    } catch (error) {
        console.error('Get all education error:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

export const getEducationControllerById = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: 'Education ID is required' })
        }

        const [rows]: any = await pool
            .promise()
            .query(`SELECT * FROM Education WHERE id = ?`, [id])

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Education record not found' })
        }

        return res.status(200).json(rows[0])
    } catch (error) {
        console.error('Get education by id error:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

export const updateEducationController = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: 'Education ID is required' })
        }

        // Validate request body
        const { success, data, error } = EditEducationSchema.safeParse(req.body)
        if (!success) {
            return res
                .status(400)
                .json({ errors: z.flattenError(error).fieldErrors })
        }

        // Build dynamic SET clause and values array
        const updates: string[] = []
        const values: any[] = []

        // Define which fields to check and their column names
        const fields = [
            { key: 'Board', column: 'Board' },
            { key: 'Level', column: 'Level' },
            { key: 'TimeRange', column: 'TimeRange' },
        ]

        for (const field of fields) {
            const value = data?.[field.key as keyof typeof data]
            // Update only if value is provided and not an empty string / null / undefined
            if (value !== undefined && value !== null && value !== '') {
                updates.push(`${field.column} = ?`)
                values.push(value)
            }
        }

        // If no fields to update, return early
        if (updates.length === 0) {
            return res.status(400).json({ error: 'No valid fields to update' })
        }

        // Add id for the WHERE clause
        values.push(id)

        const query = `UPDATE Education SET ${updates.join(', ')} WHERE id = ?`
        const [result]: any = await pool.promise().query(query, values)

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Education record not found' })
        }

        return res
            .status(200)
            .json({ message: 'Education record updated successfully' })
    } catch (error) {
        console.error('Update education error:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

export const deleteEducationController = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: 'Education ID is required' })
        }

        const [result]: any = await pool
            .promise()
            .query(`DELETE FROM Education WHERE id = ?`, [id])

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Education record not found' })
        }

        return res
            .status(200)
            .json({ message: 'Education record deleted successfully' })
    } catch (error) {
        console.error('Delete education error:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}
