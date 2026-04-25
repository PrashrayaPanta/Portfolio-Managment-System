"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const express_1 = __importDefault(require("express"));
const aboutRouter_1 = require("./Routes/aboutRouter");
const heroRouter_1 = require("./Routes/heroRouter");
const skillsRouter_1 = require("./Routes/skillsRouter");
const contactRouter_1 = require("./Routes/contactRouter");
const educationRouter_1 = require("./Routes/educationRouter");
const projectRouter_1 = require("./Routes/projectRouter");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mysql2_1 = __importDefault(require("mysql2"));
const userRouter_1 = require("./Routes/userRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_path_1 = __importDefault(require("node:path"));
const cors_1 = __importDefault(require("cors"));
const pool = mysql2_1.default.createPool({
    host: process.env.DB_host,
    port: Number(process.env.DB_port),
    user: process.env.user,
    password: process.env.password,
    database: process.env.DB_Name,
});
exports.pool = pool;
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err);
    }
    else {
        console.log('DFB connetced suyccesfiully hjbjh hjbghjb');
    }
});
// console.log(connection);
// const connection = await connectDB()
// console.log(connection);
// Create the connection to database
const app = (0, express_1.default)();
// Adds headers: Access-Control-Allow-Origin: *
app.use((0, cors_1.default)());
// app.post("/profile", upload.single("profile-pic"), (req:Request, res:Response) => {
// 		console.log(req.file);
// })
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//! User Route 
app.use('/user', userRouter_1.userRouter);
//! About Route
app.use('/about', aboutRouter_1.aboutRouter);
//! Hero Route
app.use('/hero', heroRouter_1.heroRouter);
//! Skills
app.use('/skills', skillsRouter_1.skillRouter);
//! Contact
app.use('/contact', contactRouter_1.contactRouter);
//! Education
app.use('/education', educationRouter_1.educationRouter);
//! Project
app.use('/project', projectRouter_1.projectRouter);
app.use('/uploads', express_1.default.static(node_path_1.default.join(process.cwd(), 'uploads')));
//! No any route match
app.get(`{/*aa}`, (req, res) => {
    console.log(req.method);
    res.send(`<h1>404 this is not found No Found hb</h1>`);
});
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on hbm http://localhost:3000 hjbhj');
});
