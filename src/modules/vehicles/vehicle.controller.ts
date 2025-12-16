import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleService.createVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllVehicle = async (_req: Request, res: Response) => {
    try {
        const result = await vehicleService.getAllVehicle();
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getSingleVehicle = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const result = await vehicleService.getSingleVehicle(id as string);
        res.status(200).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result.rows[0]
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
    try {
        const result = await vehicleService.updateVehicle(
            vehicle_name,
            type,
            registration_number,
            daily_rent_price,
            availability_status,
            id as string
        );
        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: result.rows[0]
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await vehicleService.deleteVehicle(id as string);
        if (!result.rowCount) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully"
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const vehicleController = {
    createVehicle,
    getAllVehicle,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
};
