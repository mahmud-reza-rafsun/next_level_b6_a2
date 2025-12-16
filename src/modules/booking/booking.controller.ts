import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
    try {
        const user = req.user!;
        const payload = {
            ...req.body,
            customer_id: user.role === "admin" ? req.body.customer_id : user.id
        };

        const result = await bookingService.createBooking(payload);

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getBookings = async (req: Request, res: Response) => {
    try {
        const user = req.user!;
        const result = await bookingService.getBookings(user);

        res.status(200).json({
            success: true,
            message:
                user.role === "admin"
                    ? "Bookings retrieved successfully"
                    : "Your bookings retrieved successfully",
            data: result
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const cancelBooking = async (req: Request, res: Response) => {
    try {
        const bookingId = Number(req.params.bookingId);
        const user = req.user!;

        const result = await bookingService.cancelBooking(bookingId, user);

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            data: result
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const markReturned = async (req: Request, res: Response) => {
    try {
        const bookingId = Number(req.params.bookingId);
        const result = await bookingService.markReturned(bookingId);

        res.status(200).json({
            success: true,
            message: "Booking marked as returned. Vehicle is now available",
            data: result
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const bookingController = {
    createBooking,
    getBookings,
    cancelBooking,
    markReturned
};
