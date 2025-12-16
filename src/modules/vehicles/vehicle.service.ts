import { pool } from "../../config/db";

const createVehicle = async (payload: any) => {
    const { vehicle_name, type, registration_number, daily_rent_price } = payload;

    const result = await pool.query(
        `INSERT INTO vehicles 
         (vehicle_name, type, registration_number, daily_rent_price, availability_status)
         VALUES ($1,$2,$3,$4,'available')
         RETURNING *`,
        [vehicle_name, type, registration_number, daily_rent_price]
    );

    return result;
};

const getAllVehicle = async () => {
    return await pool.query(`SELECT * FROM vehicles`);
};

const getSingleVehicle = async (id: string) => {
    return await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);
};

const updateVehicle = async (
    vehicle_name: string,
    type: string,
    registration_number: string,
    daily_rent_price: number,
    availability_status: string,
    id: string
) => {
    if (!["available", "booked"].includes(availability_status)) {
        throw new Error("Invalid availability status");
    }

    return await pool.query(
        `UPDATE vehicles
         SET vehicle_name=$1,
             type=$2,
             registration_number=$3,
             daily_rent_price=$4,
             availability_status=$5
         WHERE id=$6
         RETURNING *`,
        [vehicle_name, type, registration_number, daily_rent_price, availability_status, id]
    );
};

const deleteVehicle = async (id: string) => {
    return await pool.query(`DELETE FROM vehicles WHERE id=$1`, [id]);
};

export const vehicleService = {
    createVehicle,
    getAllVehicle,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
};
