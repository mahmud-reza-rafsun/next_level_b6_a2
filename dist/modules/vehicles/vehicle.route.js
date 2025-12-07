"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRouter = void 0;
const express_1 = require("express");
const vehicle_controller_1 = require("./vehicle.controller");
const router = (0, express_1.Router)();
router.post("/", vehicle_controller_1.vehicleController.createVehicle);
exports.vehicleRouter = router;
