
import { Request, Response } from "express"
import * as z from 'zod'

import { categoryCreateSchema, categoryGetSchema, categoryUpdateSchema } from "../Validation/CategoryValidation";
import { pool } from "..";
import { log } from "console";

//! Get All Category
export const getAllCategory = async(req: Request, res: Response) => {

    try { 
     
 
        
        const [rows] = await pool.promise().query(`select * from Category`)
        

        res.status(200).json({message:"success", data:rows, error:null})



    } catch (error) {
        
        res.status(500).json({message:"Error", data:null, error:"Internal Server Error"})

    }





}


//! Create Category
export const createCategory = async(req:Request, res:Response) => {

  try {
      

            
               const { success, data, error } = categoryCreateSchema.safeParse(req.body);
        
        if (!success) {
                    console.log(error.issues)
                    return res
                        .status(400)
                        .json({message:"Error", data:null, error: z.flattenError(error).fieldErrors })
        }
        

           await pool
            .promise()
            .query(`INSERT INTO Category (name, description, image_path) VALUES(?, ?, ? )`, [
                data.name, data.description, req.file?.path
            ])
        
        
        res.status(200).json({message:"success", data:null, error:null})


    } catch (errror) {
        console.log(error);
        res.status(500).json({message:"Error", data:null, error:"Internal Server Error"})
    }

}


//! Get certain Catgeory Controller
export const getCertainCategory = async (req: Request, res: Response) => {

    const { id } = req.params;


    const [rows] = await pool.promise().query(`SELECT * FROM Category WHERE id = ?`, [id])
    

    res.status(200).json({message:"success", data:rows[0], error:null})
    
}


export const editCertainCategory = async (req: Request, res: Response) => {



        const { success, data, error } = categoryUpdateSchema.safeParse(req.body);
        
        if (!success) {
                    console.log(error.issues)
                    return res
                        .status(400)
                        .json({message:"Error", data:null, error: z.flattenError(error).fieldErrors })
        }
  
  const { id } = req.params;
  
  const { name, description } = data

  if (!id) {
    return res.status(400).json({message:"Not Found",data:null, error: 'Category ID not required' });
  }

  // Collect fields to update
  const updates: string[] = [];
  const values: any[] = [];

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
    const [result] = await pool.promise().query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Server Error", data:null,error: 'Internal server error' });
  }
};


