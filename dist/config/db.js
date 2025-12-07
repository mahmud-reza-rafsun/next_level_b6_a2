"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const _1 = __importDefault(require("."));
exports.pool = new pg_1.Pool({
    connectionString: `${_1.default.connection_str}`
});
const initDB = async () => {
    await exports.pool.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    phone VARCHAR(20) NOT NULL,
                    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer'))
                );

                CREATE TABLE IF NOT EXISTS vehicles (
                    id SERIAL PRIMARY KEY,
                    vehicle_name VARCHAR(100) NOT NULL,
                    type VARCHAR(20) NOT NULL CHECK (type IN ('car','bike','van','SUV')),
                    registration_number VARCHAR(50) UNIQUE NOT NULL,
                    daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
                    availability_status VARCHAR(20) NOT NULL CHECK (availability_status IN ('available','booked')),
                    created_at TIMESTAMP DEFAULT NOW()
                );

                CREATE TABLE IF NOT EXISTS bookings (
                    id SERIAL PRIMARY KEY,
                    customer_id INT REFERENCES users(id),
                    vehicle_id INT REFERENCES vehicles(id),
                    rent_start_date DATE NOT NULL,
                    rent_end_date DATE NOT NULL,
                    total_price NUMERIC(10,2) NOT NULL,
                    status VARCHAR(20) NOT NULL CHECK (status IN ('active','cancelled','returned'))
                );

        `);
    console.log("connected");
};
exports.default = initDB;
