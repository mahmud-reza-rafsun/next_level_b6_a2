import { pool } from "../../config/db"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import config from "../../config";

const signinUser = async (email: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

    if (result.rows.length === 0) {
        throw new Error("User not found")
    }
    const matchPassword = await bcrypt.compare(password, result.rows[0].password)

    if (!matchPassword) {
        throw new Error("Invalid Credentials! ")
    }

    const jwtPayload = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email,
        role: result.rows[0].role,
    }
    console.log(jwtPayload.role);

    const jwt_secret = config.jwt_secret;

    const token = jwt.sign(jwtPayload, jwt_secret as string, { expiresIn: "7d" })
    delete result.rows[0].password
    return { token, user: result.rows[0] }
}


export const authService = {
    signinUser,
}