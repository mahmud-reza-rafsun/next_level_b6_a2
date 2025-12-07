import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";
import { pool } from "../config/db";

const auth = (...roles: string[]) => {
    // console.log(roles);
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("You are not Authorized")
        }
        const verify = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
        const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [verify.email])
        if (user.rows.length === 0) {
            throw new Error("User not found")
        }

        req.user = verify;

        if (roles.length && !roles.includes(verify.role)) {
            throw new Error("You are not Authorized")
        }
        next();
    };
};

export default auth;