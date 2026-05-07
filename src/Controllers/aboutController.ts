import { Request, Response } from 'express'
import { About } from '../Validation/AboutValidation'
import * as z from 'zod'
import { pool } from '..'



export const createAboutController = async (req: Request, res: Response) => {
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

        const { success, data, error } = About.safeParse(req.body)

        console.log('This is error', error)

        // console.log(result);

        if (!success) {
            console.log(error.issues)
            return res
                .status(400)
                .json({ error: z.flattenError(error).fieldErrors })
        }

        await pool
            .promise()
            .query(`INSERT INTO About (Description) VALUES(?)`, [
                data.description,
            ])

        console.log('Succesful;ly inserted to about table of pms')
    } catch (error) {
        console.log('kye error ho', error)
    }
}

export const getAboutController = async(req:Request, res:Response) => {

    try {
        const [rows]: any = await pool.promise().query(`select * from About`)

        res.status(200).json({message:"About gets", data:rows[0], error:null})
 
    } catch (error) {
        

        console.log(error);
        
    }
  






}

export const deleteAboutController = () => {}

export const updateAboutController = () => {}
