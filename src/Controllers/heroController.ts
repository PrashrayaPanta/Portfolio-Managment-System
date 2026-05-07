// ========== HERO CONTROLLERS ==========
import { Request , Response} from "express";
import { createHeroSchema, updateHeroSchema } from "../Validation/HeroValidatiion";

import * as z from "zod";
import { pool } from "../index"
import path from "node:path";

import fs from "fs/promises"
import { getImageUrlController } from "./ImageController";



export const createHeroController = async(req:Request, res:Response) => {
  try {
             
      
  

            
        
    
    
            // console.log(process.cwd()/uploads);
            
    
            console.log("the process current wortking directory", process.cwd());
            
             console.log(req.protocol);

             console.log(req.host);
             


// //);
//                 console.log(`${req.protocol}://${req.host}${FolderPath}/${req.file?.filename}`);
                
              
              
    


               console.log(req.url);
             
                console.log(req.file);
              
       
        
      
            
        
                const { success, data, error } = createHeroSchema.safeParse(req.body)
                
                console.log("This is error", error);
                
        
                // console.log(result);
        
                if (!success) {
                    console.log(error.issues);
                   return res.status(400).json({error: z.flattenError(error).fieldErrors})
                }
    
              // ✅ Store relative path (e.g., "uploads/filename.jpg")
              const relativeImagePath = `uploads/${req?.file?.filename}`;
        
              
              await pool.promise().query(
              `INSERT INTO Hero (title,heroDescription, img_path) VALUES(?, ?, ?)`,
              [data.title, data.heroDescription, req.file?.path]
              );
    
    
              // ✅ Build full URL to access the image
              // const imageUrl = `${req.protocol}://${req.get('host')}/${relativeImagePath}`;
    
              // console.log("The image url is ", imageUrl);
              
                
              console.log("Succesful;ly inserted to about table of pms");
                
        
              res.status(200).json({message:"Success", data:null, error:null})
                
        
            } catch (error) {
                
                console.log("kye error ho", error);
            
            }
        
}

export const getHeroControllerById = async(req:Request, res:Response) => {
   try {
        const { id } = req.params;

        const [rows]: any = await pool
            .promise()
          .query(`SELECT * FROM Hero WHERE id = ?`, [id]);
     
        console.log(rows);
        

        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'Hero not found' });
        }
     

     

    // const { img_path } = rows[0]

    // console.log(img_path);
     
     
     
    

     

      // const imgrutl = getImageUrlController(req, res, img_path)
     
      // console.log("Th eimage url is ",imgrutl);
     

    //  console.log(path.join(process.cwd(), img_path));
     
     



     




     
        
        

        return res.status(200).json({ data: rows[0], error: null });
    } catch (error: any) {
        console.error('Error in getHeroByIdController:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }




}

export const deleteHeroController = () => {
    




}



export const updateHeroController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Hero ID is required' });
    }

    // Validate request body (heroDescription only)
    const { success, data, error } = updateHeroSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ errors: error.flatten().fieldErrors });
    }

    const updates: string[] = [];
    const values: any[] = [];

    // Handle heroDescription if provided
    if (data.heroDescription !== undefined && data.heroDescription !== null && data.heroDescription !== '') {
      updates.push('heroDescription = ?');
      values.push(data.heroDescription);
    }

    // Handle hero-pic file upload (field name sent as 'hero-pic')
    if (req.file && req.file.path) {
      updates.push('img_path = ?');
      values.push(req.file.path);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    // Add id for WHERE clause
    values.push(id);

    const query = `UPDATE Hero SET ${updates.join(', ')} WHERE id = ?`;
    const [result]: any = await pool.promise().query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Hero record not found' });
    }

    return res.status(200).json({ message: 'Hero record updated successfully' });
  } catch (error) {
    console.error('Update hero error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};