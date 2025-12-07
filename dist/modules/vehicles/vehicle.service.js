"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleService = void 0;
const db_1 = require("../../config/db");
const createVehicle = async (payload) => {
    if (!payload)
        throw new Error("Payload is empty");
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status = "available" } = payload;
    const result = await db_1.pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status)
     VALUES($1,$2,$3,$4,$5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    return result;
};
// get All vehicle
exports.vehicleService = { createVehicle };
