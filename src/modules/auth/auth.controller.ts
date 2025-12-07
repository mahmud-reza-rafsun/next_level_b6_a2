import { Request, Response } from "express";
import { authService } from "./auth.service";

const signinUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await authService.signinUser(email, password as string);
        res.status(200).json({
            success: true,
            messgae: "Login successful...",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const authController = {
    signinUser
}