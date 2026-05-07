import { Request, Response } from "express"
import { EditProjectSchema, projectCreateSchema } from "../Validation/ProjectValidation"
import * as z from 'zod'
import { pool } from '..'


// ========== PROJECT CONTROLLERS ==========
export const createProjectController = async(req:Request, res:Response) => {
    try {

        console.log(req.body);
        
        
        const { success, data, error } = projectCreateSchema.safeParse(req.body)     
        
        if (!success) {
                    console.log(error.issues)
                    return res
                        .status(400)
                        .json({ error: z.flattenError(error).fieldErrors })
        }

        //! Get the validated input
        const { name, description, category_id } = data;

        
           await pool
            .promise()
            .query(`INSERT INTO Project (name, description, category_id) VALUES(?, ?, ?)`, [
                name,
                description,
                category_id,
            ])


    } catch (error) {
        
        console.log(error);
        
        console.log("Helo i am here");
        

    }




}

export const getProjectController = (req: any, res: any) => {
    
}

export const deleteProjectController = () => {}

export const updateProjectController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'Project ID is required',
                data: null,
                error: 'Missing ID parameter'
            });
        }

        const { success, data, error } = EditProjectSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: 'Validation failed',
                data: null,
                error: error.flatten().fieldErrors
            });
        }

        const updates: string[] = [];
        const values: any[] = [];

        if (data.name !== undefined) {
            updates.push('name = ?');
            values.push(data.name);
        }
        if (data.description !== undefined) {
            updates.push('description = ?');
            values.push(data.description);
        }
        if (data.category_id !== undefined) {
            updates.push('category_id = ?');
            values.push(data.category_id);
        }

        // Always update the 'updated_at' timestamp (if column exists)
        updates.push('updated_at = NOW()');

        if (updates.length === 1) {
            // Only 'updated_at' was added, meaning no other fields provided
            return res.status(400).json({
                message: 'No valid fields to update',
                data: null,
                error: 'At least one field (name, description, category_id) is required'
            });
        }

        values.push(id);
        const query = `UPDATE Project SET ${updates.join(', ')} WHERE id = ?`;
        const [result]: any = await pool.promise().query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Project record not found',
                data: null,
                error: 'Record does not exist'
            });
        }

        return res.status(200).json({
            message: 'Project updated successfully',
            data: { id },
            error: null
        });
    } catch (error) {
        console.error('Update project error:', error);
        return res.status(500).json({
            message: "Server Error",
            data: null,
            error: 'Internal server error'
        });
    }
};



export const addProjectImages = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const { id } = req.params; // project_id

    // Get the current max sort_order for this project to append new images
    const [maxSortResult] = await pool.promise().query(
      'SELECT COALESCE(MAX(sort_order), 0) as maxSort FROM project_images WHERE project_id = ?',
      [id]
    );
    let nextSortOrder = maxSortResult[0]?.maxSort ?? 0;

    // Build placeholders and values
    const placeholders = files.map(() => '(?, ?, ?)').join(',  ');
    console.log("The Placehodler is ", placeholders);
    
    const values: any[] = [];

    //! get each file and push to values
    files.forEach(file => {
      nextSortOrder += 1;
      values.push(id, file.path, nextSortOrder);
    });

    const query = `
      INSERT INTO project_images (project_id, image_path, sort_order)
      VALUES ${placeholders}
    `;

    await pool.promise().query(query, values);

    res.status(201).json({ message: `${files.length} images added` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add images' });
  }
};






export const getAllImagesbelongingtoCertainProductId = async(req:Request, res:Response) => {

  try {
    //! GET the params
    const { id } = req.params;

    //! Use parameterized query to prevent SQL injection
    //! Get all the row that matched that provided id from request params to db product_id
    const [rows] = await pool.promise().query(
      `SELECT * FROM project_images WHERE project_id = ?`,
      [id]
    );

    console.log(rows);
    

  } catch (error) {
    

    console.log(error);
    
  }



}


export const getAllProjectsWithCertainCategory = async(req:Request, res:Response) => {
  try {

    const { id } = req.params;

   const [rows] =  await pool.promise().query(`select * from Project where category_id = ?`, [id])

    console.log(rows);

    res.json({message:"Success", data:rows, error:null}).status(200)
    


  } catch (error) {
    

    console.log(error);
    
    }



}