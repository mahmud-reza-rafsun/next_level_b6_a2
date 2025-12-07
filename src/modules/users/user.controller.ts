import { Request, Response } from "express";
import { userService } from "./user.service";

// create user
const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "User inserted successfully!!!",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get user

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUser();
        res.status(201).json({
            success: true,
            message: "User find successfully!!!",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get single users
const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await userService.getSingleUser(id as string);
        res.status(201).json({
            success: true,
            message: "single user find successfully!!!",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// update users

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, password, phone, role } = req.body;
    try {
        const result = await userService.updateUser(name, password, phone, role, id as string)
        res.status(201).json({
            success: true,
            message: "update user successfully!!!",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// delete user

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await userService.deleteUser(id as string);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User delete successfully",
                data: result.rows[0],
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const userController = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}