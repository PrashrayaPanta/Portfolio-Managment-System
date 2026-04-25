import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs/promises'

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

export const deleteImageController = (
    req: Request,
    res: Response,
    filename: string
) => {
    console.log('I am insdie the delete image controllelr')

    console.log(req.params.filename)

    // console.log(__dirname);

    console.log(req.params.filename)

    console.log(process.cwd())

    const absoluteFolderPath = path.join(process.cwd(), 'uploads')

    console.log('starting the file')

    ///! Run asynchronusly
    fs.unlink(`${absoluteFolderPath}/${req.params.filename}`)

    console.log('unlionking file')

    // const  filename  = req.params;

    // console.log(filename);

    // fs.unlink(path.join(process.cwd(), "uploads", ${filename}))
}
