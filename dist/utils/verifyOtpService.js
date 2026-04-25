"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpSerice = void 0;
const __1 = require("..");
const verifyOtpSerice = async (req, res) => {
    console.log("I am, insode the verify OTP seRVICE");
    try {
        //! get otp from user input
        const { otp } = req.body;
        console.log("The otp that is inputted is ", otp);
        //! get the row having the otp and email same
        // const getQuery = `select * from OTP where otp = ?`, [otp])
        const [rows] = await __1.pool
            .promise()
            .query(`SELECT * FROM OTP WHERE otp = ?`, [otp]);
    }
    catch (error) {
        console.log(error);
    }
    // console.log("Thew rows is ", rows);
};
exports.verifyOtpSerice = verifyOtpSerice;
