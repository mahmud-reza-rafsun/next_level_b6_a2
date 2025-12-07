"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
// create user
const createUser = async (req, res) => {
    try {
        const result = await user_service_1.userService.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "User inserted successfully!!!",
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// get user
const getUser = async (req, res) => {
    try {
        const result = await user_service_1.userService.getUser();
        res.status(201).json({
            success: true,
            message: "User find successfully!!!",
            data: result.rows
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// get single users
const getSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await user_service_1.userService.getSingleUser(id);
        res.status(201).json({
            success: true,
            message: "single user find successfully!!!",
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// update users
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, password, phone, role } = req.body;
    try {
        const result = await user_service_1.userService.updateUser(name, password, phone, role, id);
        res.status(201).json({
            success: true,
            message: "update user successfully!!!",
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// delete user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await user_service_1.userService.deleteUser(id);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User delete successfully",
                data: result.rows[0],
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.userController = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
};
