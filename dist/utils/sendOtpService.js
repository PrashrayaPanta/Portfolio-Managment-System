"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpService = void 0;
const resend_1 = require("resend");
const __1 = require("..");
const resend = new resend_1.Resend('re_3QzrC4Fk_A7QExSDomzjeYauuSmAUQW6s');
const sendOtpService = async (req, res) => {
    const { email } = req.body;
    // console.log("The request body is ", req?.body.email);
    console.log("I am inisde the send otp service");
    try {
        //!1. Generating 4 digit Random Number
        const otp = Math.floor(1000 + Math.random() * 9000);
        console.log("The otp to send is ", otp);
        //! 2.    Store (or update) OTP in database hbjh 
        //    - If email exists: update OTP and expires_at, keep original created_at
        //    - Otherwise: insert new row
        const insertQuery = `
           INSERT INTO OTP (email, otp, created_at, expires_at)
            VALUES (?, ?, UTC_TIMESTAMP(), DATE_ADD(UTC_TIMESTAMP(), INTERVAL 2 MINUTE))
            ON DUPLICATE KEY UPDATE
            otp = VALUES(otp),
            expires_at = VALUES(expires_at)`;
        await __1.pool.promise().query(insertQuery, [email, otp]);
        //! 3. html contect to send in email
        const htmlContent = `Your OTP is <strong>${otp} </strong>. It is valid for 10 minutes.`;
        console.log(htmlContent);
        //! 4. from whom to whom
        await resend.emails.send({
            from: 'Hello from <contact@prashraya-panta.com.np>',
            to: email,
            subject: 'Your App OTP',
            html: htmlContent,
        });
        console.log("Email send succesfully");
    }
    catch (error) {
        //! email column is null
        // error code = 1048
        console.log(error);
        //! Unverified domain
        //! 
    }
};
exports.sendOtpService = sendOtpService;
