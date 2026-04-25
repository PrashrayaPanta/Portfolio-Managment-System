"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectController = exports.deleteProjectController = exports.getProjectController = exports.createProjectController = void 0;
// ========== PROJECT CONTROLLERS ==========
const createProjectController = () => { };
exports.createProjectController = createProjectController;
const getProjectController = (req, res) => {
    res.send(`<h1>get project router</h1>`);
    console.log('I am isndie the project controller');
};
exports.getProjectController = getProjectController;
const deleteProjectController = () => { };
exports.deleteProjectController = deleteProjectController;
const updateProjectController = () => { };
exports.updateProjectController = updateProjectController;
