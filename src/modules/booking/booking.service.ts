import { pool } from "../../config/db";
import { Roles } from "../auth/auth.constant";

const createBooking = async (payload: any) => {
    if (!payload) {
        throw new Error("Payload is Empty")
    }
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    const start_date = new Date(rent_start_date);
    const end_date = new Date(rent_end_date);

    if (end_date <= start_date) {
        throw new Error("End date must be after start date")
    }

    const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicle_id])

    if (result.rows.length === 0) {
        throw new Error("Vehicle not found")
    }
    if (result.rows[0].availability_status === "booked") {
        throw new Error("Vehicle already booked")
    }

    // calculate price
    const deffrenceTime = Math.abs(end_date.getTime() - start_date.getTime());
    const deffrenceDays = Math.ceil(deffrenceTime / (1000 * 60 * 60 * 24)) || 1
    const totalPrice = result.rows[0].daily_rent_price * deffrenceDays;


    // booking

    const bookingResult = await pool.query(
        `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
         VALUES($1,$2,$3,$4,$5,'active') RETURNING *`,
        [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice]
    );

    return bookingResult
}

const getBookings = async (user: any) => {
    if (user.role === Roles.admin) {
        return await pool.query(`SELECT * FROM bookings`)
    } else {
        return await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [user?.id])
    }
}

const cancelBooking = async (bookingId: number, user: any) => {
    const cancelBooking = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [bookingId])
    if (cancelBooking.rows.length === 0) {
        throw new Error("Booking not found")
    }
    const booking = cancelBooking.rows[0]

    // admin and customer
    if (user.role !== Roles.admin && user.id !== booking.customer_id) {
        throw new Error("unAuthorized")
    }
    const now = new Date();
    if (user.role !== Roles.admin && new Date(booking.rent_start_date) <= now) {
        throw new Error("Cannot cancel after start date");
    }
    await pool.query(`UPDATE bookings SET status='cancelled' WHERE id=$1`, [bookingId])

    return cancelBooking
}

const markReturned = async (bookingId: number) => {
    const bookingRes = await pool.query(
        `SELECT * FROM bookings WHERE id=$1`,
        [bookingId]
    );
    if (bookingRes.rows.length === 0) throw new Error("Booking not found");

    const booking = bookingRes.rows[0];

    await pool.query(
        `UPDATE bookings SET status='returned' WHERE id=$1`,
        [bookingId]
    );

    await pool.query(
        `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
        [booking.vehicle_id]
    );

    return bookingRes;
};

export const bookingService = {
    createBooking,
    getBookings,
    cancelBooking,
    markReturned
}