"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_1 = require("../../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// bussiness logic
// user create
const createUser = async (payload) => {
    if (!payload)
        throw new Error("Payload is empty");
    const { name, email, password, phone, role } = payload;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const result = await db_1.pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, hashedPassword, phone, role]);
    return result;
};
// user get
const getUser = async () => {
    const result = await db_1.pool.query(`SELECT * FROM users`);
    return result;
};
// get single user
const getSingleUser = async (id) => {
    const result = await db_1.pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result;
};
// update user
const updateUser = async (name, password, phone, role, id) => {
    const result = await db_1.pool.query(`UPDATE users SET name=$1, password=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`, [name, password, phone, role, id]);
    return result;
};
// delete user
const deleteUser = async (id) => {
    const result = await db_1.pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    return result;
};
exports.userService = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
};
