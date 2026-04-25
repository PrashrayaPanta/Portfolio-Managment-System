
import { Request, Response } from "express"
import { pool } from "..";


export const verifyOtpSerice = async(req: Request, res: Response) => {

    console.log("I am, insode the verify OTP seRVICE");
    
    try {
        //! get otp from user input
        const { otp } = req.body

        console.log("The otp that is inputted is ", otp);
        


        //! get the row having the otp and email same
        // const getQuery = `select * from OTP where otp = ?`, [otp])
        const [rows] = await pool
            .promise()
            .query(`SELECT * FROM OTP WHERE otp = ?`, [otp]);
        
        
        
        
    

     

    } catch (error) {
        
        console.log(error);
        

    }



    
    // console.log("Thew rows is ", rows);
    
    
    





}