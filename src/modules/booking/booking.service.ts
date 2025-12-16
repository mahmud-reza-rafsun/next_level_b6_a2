import { pool } from "../../config/db";
import { Roles } from "../auth/auth.constant";

const createBooking = async (payload: any) => {
    if (!payload) {
        throw new Error("Payload is empty");
    }

    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    if (!customer_id || !vehicle_id || !rent_start_date || !rent_end_date) {
        throw new Error("All fields are required");
    }

    const start_date = new Date(rent_start_date);
    const end_date = new Date(rent_end_date);

    if (end_date <= start_date) {
        throw new Error("End date must be after start date");
    }

    // Check vehicle
    const vehicleRes = await pool.query(
        `SELECT * FROM vehicles WHERE id=$1`,
        [vehicle_id]
    );

    if (vehicleRes.rows.length === 0) {
        throw new Error("Vehicle not found");
    }

    const vehicle = vehicleRes.rows[0];

    if (vehicle.availability_status === "booked") {
        throw new Error("Vehicle already booked");
    }

    // calculate price
    const diffTime = end_date.getTime() - start_date.getTime();
    const diffDays =
        Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    const totalPrice = Number(vehicle.daily_rent_price) * diffDays;

    // Create booking
    const bookingRes = await pool.query(
        `INSERT INTO bookings
     (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1,$2,$3,$4,$5,'active')
     RETURNING *`,
        [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice]
    );

    // mark vehicle as booked
    await pool.query(
        `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
        [vehicle_id]
    );

    return bookingRes.rows[0];
};

const getBookings = async (user: any) => {
    if (!user) throw new Error("Unauthorized");

    if (user.role === Roles.admin) {
        const res = await pool.query(`SELECT * FROM bookings`);
        return res.rows;
    }

    const res = await pool.query(
        `SELECT * FROM bookings WHERE customer_id=$1`,
        [user.id]
    );
    return res.rows;
};

const cancelBooking = async (bookingId: number, user: any) => {
    if (!bookingId) throw new Error("Booking id is required");

    const res = await pool.query(
        `SELECT * FROM bookings WHERE id=$1`,
        [bookingId]
    );

    if (res.rows.length === 0) {
        throw new Error("Booking not found");
    }

    const booking = res.rows[0];

    // authorization
    if (user.role !== Roles.admin && user.id !== booking.customer_id) {
        throw new Error("Unauthorized");
    }

    // Customer cannot cancel after start date
    if (
        user.role !== Roles.admin &&
        new Date(booking.rent_start_date) <= new Date()
    ) {
        throw new Error("Cannot cancel after start date");
    }

    await pool.query(
        `UPDATE bookings SET status='cancelled' WHERE id=$1`,
        [bookingId]
    );

    // make vehicle available again
    await pool.query(
        `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
        [booking.vehicle_id]
    );

    return { ...booking, status: "cancelled" };
};

const markReturned = async (bookingId: number) => {
    if (!bookingId) throw new Error("Booking id is required");

    const res = await pool.query(
        `SELECT * FROM bookings WHERE id=$1`,
        [bookingId]
    );

    if (res.rows.length === 0) {
        throw new Error("Booking not found");
    }

    const booking = res.rows[0];

    await pool.query(
        `UPDATE bookings SET status='returned' WHERE id=$1`,
        [bookingId]
    );

    await pool.query(
        `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
        [booking.vehicle_id]
    );

    return { ...booking, status: "returned" };
};

export const bookingService = {
    createBooking,
    getBookings,
    cancelBooking,
    markReturned
};
