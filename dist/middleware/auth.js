"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const db_1 = require("../config/db");
const auth = (...roles) => {
    // console.log(roles);
    return async (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("You are not Authorized");
        }
        const verify = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        const user = await db_1.pool.query(`SELECT * FROM users WHERE email=$1`, [verify.email]);
        if (user.rows.length === 0) {
            throw new Error("User not found");
        }
        req.user = verify;
        if (roles.length && !roles.includes(verify.role)) {
            throw new Error("You are not Authorized");
        }
        next();
    };
};
exports.default = auth;
