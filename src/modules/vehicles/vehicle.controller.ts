import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleService.createVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle inserted successfully!!!",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleService.getAllVehicle();
        res.status(201).json({
            success: true,
            message: "get all vehicle successfully!!!",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getSingleVehicle = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const result = await vehicleService.getSingleVehicle(id as string);
        res.status(201).json({
            success: true,
            message: "get single vehicle successfully!!!",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body
    try {
        const result = await vehicleService.updateVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status, id as string);
        res.status(201).json({
            success: true,
            message: "update vehicle successfully!!!",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await vehicleService.deleteVehicle(id as string);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "vehicle delete successfully",
                data: result.rows[0],
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const vehicleController = {
    createVehicle,
    getAllVehicle,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
}