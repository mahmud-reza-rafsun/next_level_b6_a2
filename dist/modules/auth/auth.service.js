"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const db_1 = require("../../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const signinUser = async (email, password) => {
    const result = await db_1.pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    if (result.rows.length === 0) {
        throw new Error("User not found");
    }
    const matchPassword = await bcryptjs_1.default.compare(password, result.rows[0].password);
    if (!matchPassword) {
        throw new Error("Invalid Credentials! ");
    }
    const jwtPayload = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email,
        role: result.rows[0].role,
    };
    console.log(jwtPayload.role);
    const jwt_secret = config_1.default.jwt_secret;
    const token = jsonwebtoken_1.default.sign(jwtPayload, jwt_secret, { expiresIn: "7d" });
    delete result.rows[0].password;
    return { token, user: result.rows[0] };
};
exports.authService = {
    signinUser,
};
