import { pool } from "../../config/db"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import config from "../../config";

const signupUser = async (payload: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role?: never;
}) => {
    const { name, email, password, phone, role } = payload;
    const existingUser = await pool.query(
        `SELECT id FROM users WHERE email=$1`,
        [email.toLowerCase()]
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser.rowCount) {
        throw new Error("User already exists");
    }
    if (!name || !email || !password || !phone) {
        throw new Error("All fields are required");
    }

    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
    }
    const result = await pool.query(
        `INSERT INTO users (name, email, password, phone, role)
     VALUES ($1, $2, $3, $4, 'customer')
     RETURNING id, name, email, phone, role`,
        [name, email.toLowerCase(), hashedPassword, phone]
    );

    return result.rows[0];
};

const signinUser = async (email: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email.toLowerCase()]);

    if (result.rows.length === 0) {
        throw new Error("User not found")
    }
    const matchPassword = await bcrypt.compare(password, result.rows[0].password)

    if (!matchPassword) {
        throw new Error("Invalid Credentials!")
    }

    const jwtPayload = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email,
        role: result.rows[0].role,
    }

    const jwt_secret = config.jwt_secret;

    const token = jwt.sign(jwtPayload, jwt_secret as string, { expiresIn: "7d" })
    delete result.rows[0].password
    return { token, user: result.rows[0] }
}


export const authService = {
    signinUser,
    signupUser
}