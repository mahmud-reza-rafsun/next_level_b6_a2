import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
    const user = (req as any).user;
    const payload = { ...req.body, customer_id: user.id }
    try {
        const result = await bookingService.createBooking(payload);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const getBookings = async (req: Request, res: Response) => {
    const user = req.user;
    try {
        const result = await bookingService.getBookings(user);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result.rows
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const cancelBooking = async (req: Request, res: Response) => {
    const user = req.user;
    const bookingId = parseInt(req.params.bookingId as string);
    try {
        const result = await bookingService.cancelBooking(bookingId, user);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result.rows[0]
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const markReturned = async (req: Request, res: Response) => {
    const bookingId = parseInt(req.params.bookingId as string);
    try {
        const result = await bookingService.markReturned(bookingId);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result.rows
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



export const bookingController = {
    createBooking,
    getBookings,
    cancelBooking,
    markReturned
}