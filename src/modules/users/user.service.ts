import { pool } from "../../config/db"
import bcrypt from 'bcryptjs'
// bussiness logic

// user create
const createUser = async (payload: any) => {
    if (!payload) throw new Error("Payload is empty")
    const { name, email, password, phone, role } = payload;
    const hashedPassword = await bcrypt.hash(password as string, 10)
    const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, hashedPassword, phone, role])
    return result;
}
// user get
const getUser = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}
// get single user
const getSingleUser = async (id: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result;
}
// update user
const updateUser = async (name: string, password: string, phone: string, role: string, id: string) => {
    const result = await pool.query(`UPDATE users SET name=$1, password=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`, [name, password, phone, role, id]);
    return result;
}
// delete user
const deleteUser = async (id: string) => {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    return result;
}

export const userService = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}