// ========== HERO CONTROLLERS ==========
import { Request , Response} from "express";
import { Hero } from "../Validation/HeroValidatiion";
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
        
        
                const { success, data, error } = Hero.safeParse(req.body)
                
                console.log("This is error", error);
                
        
                // console.log(result);
        
                if (!success) {
                    console.log(error.issues);
                   return res.status(400).json({error: z.flattenError(error).fieldErrors})
                }
    
              // ✅ Store relative path (e.g., "uploads/filename.jpg")
              const relativeImagePath = `uploads/${req?.file?.filename}`;
        
                
        
              await pool.promise().query(
              `INSERT INTO Hero (heroDescription, img_path) VALUES(?, ?)`,
              [data.heroDescription, req.file?.path]
              );
    
    
              // ✅ Build full URL to access the image
              // const imageUrl = `${req.protocol}://${req.get('host')}/${relativeImagePath}`;
    
              // console.log("The image url is ", imageUrl);
              
                
              console.log("Succesful;ly inserted to about table of pms");
                
        
        
                
        
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

export const updateHeroController = () => {

  try {
    
      


  } catch (error) {





  }




}