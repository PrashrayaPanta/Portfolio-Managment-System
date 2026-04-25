"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Register = exports.Login = void 0;
const userValidation_1 = require("../Validation/userValidation");
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const __1 = require("..");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Login = async (req, res) => {
    console.log('I am inside the login conytropler');
    try {
        //! 1. Input validation
        const { success, data, error } = userValidation_1.LoginSchema.safeParse(req.body);
        console.log('This is error', error);
        // console.log(result);
        if (!success) {
            console.log(error.issues);
            return res
                .status(400)
                .json({ error: zod_1.default.flattenError(error).fieldErrors });
        }
        const { email, password } = data;
        //! 2. Fetch user from database by email
        const [rows] = await __1.pool
            .promise()
            .query('SELECT id, username, email, password FROM users WHERE email = ?', [email]);
        const user = rows[0];
        //! 3. check if user exist
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        //! 4. Compare provided password with stored hash
        const isPasswordMatched = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        console.log(user);
        //! 5. Generate JWT token (optional but recommended)
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        console.log(token);
        //!6. Set the cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });
        return res.status(201).json({ message: 'cookie is created' });
    }
    catch (error) {
    }
};
exports.Login = Login;
const Register = async (req, res) => {
    try {
        const { success, data, error } = userValidation_1.LoginSchema.safeParse(req.body);
        console.log('This is error', error);
        // console.log(result);
        if (!success) {
            console.log(error.issues);
            return res
                .status(400)
                .json({ error: zod_1.default.flattenError(error).fieldErrors });
        }
        //! Get the Validated Data
        const { username, email, password } = req.body;
        //! find Unique Email in db
        //! 3. Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        //! 4. Insert new user
        const [result] = await __1.pool
            .promise()
            .query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
    }
    catch (error) {
        console.log(error);
        console.log('This is error message of register controller', error.message);
        //! Duplicate key errror
        console.log(error.errno);
        if (error.errno === 1062) {
            res.status(401).json({ error: error.message });
        }
        console.log('Register Controller Error');
    }
};
exports.Register = Register;
const Logout = (req, res) => {
    try {
        //! Clearing the cookie
        res.clearCookie('authToken');
        //!  Send a success response
        return res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        console.log(error);
    }
};
exports.Logout = Logout;
