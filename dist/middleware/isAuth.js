"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = (req, res, next) => {
    try {
        console.log('I am inside the isAuth Controllers');
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
        const verifyToken = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET);
        console.log(verifyToken);
        req.user = verifyToken;
        next();
    }
    catch (error) {
        //! Token Expired Error
        console.log(error.message);
        res.status(401).json({ mesage: "Not Login", data: null, error: "Token Expired" });
        //! Token intercepted Error
    }
};
exports.isAuth = isAuth;
