import { log } from 'console'
import { pool } from '..'
import { SkillSchema } from '../Validation/SkillValidation'
import { Request, Response } from 'express'
import z from 'zod'






// ========== SKILL CONTROLLERS ==========

export const createSkillController = async (req: Request, res: Response) => {
    try {
        const { success, data, error } = SkillSchema.safeParse(req.body)

        if (!success) {
            return res
                .status(400)
                .json({ error: z.flattenError(error).fieldErrors })
        }

        await pool
            .promise()
            .query(`INSERT INTO Skill (Title) VALUES (?)`, [data.title])
        

        return res.status(201).json({ message: 'Skill created successfully', error: null })
    } catch (error: any) {

        //! Unique field errror from mysql db
        if (error.errno === 1062) {
            return res.status(409).json({ error: 'Skill already exists' })
        }

        return res.status(500).json({ error: 'Internal server error' })
    }
}

export const getSkillController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const [rows]: any = await pool
            .promise()
            .query(`SELECT * FROM Skill WHERE id = ?`, [id])

        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'Skill not found' })
        }

        return res.status(200).json({ data: rows[0], error: null })
    } catch (error: any) {
        return res.status(500).json({ error: 'Internal server error' })
    }
}

export const getAllSkillsController = async (_req: Request, res: Response) => {
    try {
        const [rows]: any = await pool
            .promise()
            .query(`SELECT * FROM Skill`)

        return res.status(200).json({ data: rows, error: null })
    } catch (error: any) {
        return res.status(500).json({ error: 'Internal server error' })
    }
}

export const updateSkillController = async (req: Request, res: Response) => {
    try {

        console.log("I am isndie the update skills");
        

        const { id } = req.params

        const { success, data, error } = SkillSchema.safeParse(req.body)

        if (!success) {
            return res
                .status(400)
                .json({ error: z.flattenError(error).fieldErrors })
        }

        const [result]: any = await pool
            .promise()
            .query(`UPDATE Skill SET Title = ? WHERE id = ?`, [data.title, id])

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Skill not found' })
        }

        return res.status(200).json({ message: 'Skill updated successfully', error: null })
    } catch (error: any) {
        if (error.errno === 1062) {
            return res.status(409).json({ error: 'Skill already exists' })
        }

        return res.status(500).json({ error: 'Internal server error' })
    }
}

export const deleteSkillController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const [result]: any = await pool
            .promise()
            .query(`DELETE FROM Skill WHERE id = ?`, [id])

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Skill not found' })
        }

        return res.status(200).json({ message: 'Skill deleted successfully', error: null })
    } catch (error: any) {
        return res.status(500).json({ error: 'Internal server error' })
    }
}