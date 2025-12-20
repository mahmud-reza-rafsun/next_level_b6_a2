import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";

const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({
                    success: false,
                    message: "Authorization header missing",
                });
            }

            // bearer token extract
            const parts = authHeader.split(" ");

            if (parts.length !== 2 || parts[0] !== "Bearer") {
                return res.status(401).json({
                    success: false,
                    message: "Invalid authorization format",
                });
            }

            const token = parts[1];

            const verify = jwt.verify(
                token as string,
                config.jwt_secret as string
            ) as JwtPayload;

            const user = await pool.query(
                `SELECT * FROM users WHERE email=$1`,
                [verify.email]
            );

            if (user.rows.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: "User not found",
                });
            }

            req.user = verify;

            if (roles.length && !roles.includes(verify.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden",
                });
            }

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }
    };
};

export default auth;
