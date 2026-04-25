import jwt from 'jsonwebtoken'

import { Request, Response, NextFunction } from 'express'

// Extend Request interface
declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('I am inside the isAuth Controllers')

        const { authToken } = req.cookies;
        

        // console.log(
        //     'The request header cookie is ',
        //     req.headers.cookie?.split('=')[1]
        // )

        // console.log(req.headers.cookie?.split("=")[1]);
        // console.log(req.headers.cookie);
        

        // const authToken = req.headers.cookie?.split('=')[1]

        // console.log(authToken)

        // const  authToken  = req.cookie;

        // console.log("The auth token is ", authToken);

        // console.log(authToken);

        const verifyToken = jwt.verify(
            authToken as string,
            process.env.JWT_SECRET as string
        )

        console.log(verifyToken)

        req.user = verifyToken

        next()
        
    } catch (error) {
        //! Token Expired Error
        console.log(error)

        //! Token intercepted Error
    }
}
