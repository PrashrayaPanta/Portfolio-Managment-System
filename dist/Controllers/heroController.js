"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHeroController = exports.deleteHeroController = exports.getHeroControllerById = exports.createHeroController = void 0;
const HeroValidatiion_1 = require("../Validation/HeroValidatiion");
const z = __importStar(require("zod"));
const index_1 = require("../index");
const createHeroController = async (req, res) => {
    var _a, _b;
    try {
        // console.log(process.cwd()/uploads);
        console.log("the process current wortking directory", process.cwd());
        console.log(req.protocol);
        console.log(req.host);
        // //);
        //                 console.log(`${req.protocol}://${req.host}${FolderPath}/${req.file?.filename}`);
        console.log(req.url);
        console.log(req.file);
        const { success, data, error } = HeroValidatiion_1.createHeroSchema.safeParse(req.body);
        console.log("This is error", error);
        // console.log(result);
        if (!success) {
            console.log(error.issues);
            return res.status(400).json({ error: z.flattenError(error).fieldErrors });
        }
        // ✅ Store relative path (e.g., "uploads/filename.jpg")
        const relativeImagePath = `uploads/${(_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
        await index_1.pool.promise().query(`INSERT INTO Hero (title,heroDescription, img_path) VALUES(?, ?, ?)`, [data.title, data.heroDescription, (_b = req.file) === null || _b === void 0 ? void 0 : _b.path]);
        // ✅ Build full URL to access the image
        // const imageUrl = `${req.protocol}://${req.get('host')}/${relativeImagePath}`;
        // console.log("The image url is ", imageUrl);
        console.log("Succesful;ly inserted to about table of pms");
        res.status(200).json({ message: "Success", data: null, error: null });
    }
    catch (error) {
        console.log("kye error ho", error);
    }
};
exports.createHeroController = createHeroController;
const getHeroControllerById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await index_1.pool
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
    }
    catch (error) {
        console.error('Error in getHeroByIdController:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getHeroControllerById = getHeroControllerById;
const deleteHeroController = () => {
};
exports.deleteHeroController = deleteHeroController;
const updateHeroController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Hero ID is required' });
        }
        // Validate request body (heroDescription only)
        const { success, data, error } = HeroValidatiion_1.updateHeroSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ errors: error.flatten().fieldErrors });
        }
        const updates = [];
        const values = [];
        // Handle heroDescription if provided
        if (data.heroDescription !== undefined && data.heroDescription !== null && data.heroDescription !== '') {
            updates.push('heroDescription = ?');
            values.push(data.heroDescription);
        }
        // Handle hero-pic file upload (field name sent as 'hero-pic')
        if (req.file && req.file.path) {
            updates.push('img_path = ?');
            values.push(req.file.path);
        }
        if (updates.length === 0) {
            return res.status(400).json({ error: 'No valid fields to update' });
        }
        // Add id for WHERE clause
        values.push(id);
        const query = `UPDATE Hero SET ${updates.join(', ')} WHERE id = ?`;
        const [result] = await index_1.pool.promise().query(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Hero record not found' });
        }
        return res.status(200).json({ message: 'Hero record updated successfully' });
    }
    catch (error) {
        console.error('Update hero error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateHeroController = updateHeroController;
