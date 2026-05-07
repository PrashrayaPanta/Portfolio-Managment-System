import { NextFunction, Request, Response } from 'express'
import path from 'path'
import fs from 'fs/promises'
import { pool } from '..'
import { createAboutController } from './aboutController'


export const getImageUrlController = (req: Request, res: Response, filename: string) => {


    console.log(filename);
    

    console.log("I am insdie get image uirl controlelr");

    console.log("The dirname is ", __dirname);

    console.log("Current working directory is ", process.cwd());

    console.log(req.params);

    console.log(req.params.filename);

    const absoluteFolderPath = path.join(process.cwd(), `${filename}`)

    console.log("The relative folder path is ", absoluteFolderPath);

    //!  ✅ Build full URL to access the image
    const imageUrl = `${req.protocol}://${req.get('host')}${absoluteFolderPath}`;
    

    return imageUrl

    // console.log(imageUrl);

    // const imageurl =

}

export const deleteImageController = async(
    req: Request,
    res: Response,
) => {


    try {

      console.log("I am inside the delete image controller");
        
        console.log("I am inside the delte image");
    
        console.log('I am insdie the delete image controllelr')

        console.log(req.params.filename)

        // console.log(__dirname);

        console.log("The params file name is", req.params.filename)

        console.log(process.cwd())

        const absoluteFolderPath = path.join(process.cwd(), 'uploads')


        const imagePath = `uploads/${req.params.filename}`

        console.log('starting the file')

        ///! Run asynchronusly
        await fs.unlink(`${absoluteFolderPath}/${req.params.filename}`)


        //! 2. Update the single hero row (assuming it always exists)
        const [result]: any = await pool.promise().query(
            'UPDATE Hero SET img_path = NULL WHERE id = 1'  // or just WHERE id = 1
        );

         //! For project_images table – update all rows having this filename
            const [projectResult]: any = await pool.promise().query(
                'UPDATE project_images SET image_path = NULL WHERE image_path = ?',
                [imagePath]
            );
        
            const [categoryResult]: any = await pool.promise().query(`UPDATE Category SET image_path = NULL WHERE image_path = ?`, [imagePath])
        

        
        if (result.affectedRows === 0) {
            // No hero row found – create one? Or just log.
            console.warn('No hero record found to update');
        }
    
        return res.status(200).json({ message: 'Hero image deleted successfully' });

            

    } catch (error) {
        

        console.log("Error if image is not avaiable", error);
        
    }

    // const  filename  = req.params;

    // console.log(filename);

    // fs.unlink(path.join(process.cwd(), "uploads", ${filename}))
}


export const updateImageController = async(req:Request, res:Response, next:NextFunction) => {

    try {

                console.log(req.file);
                // createAboutController(req, res, filename)


                const [result] = await pool.promise().query(
                'UPDATE Hero SET img_path = ? WHERE id = 1',
                [req.file?.path]
                );



    } catch (error) {
        

        console.log(error);
        
    }




}



