"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = void 0;
const vehicle_service_1 = require("./vehicle.service");
const createVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleService.createVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle inserted successfully!!!",
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.vehicleController = {
    createVehicle,
};
