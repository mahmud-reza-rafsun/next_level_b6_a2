import { Router } from "express";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.constant";
import { vehicleController } from "./vehicle.controller";

const router = Router();

router.post("/", auth(Roles.admin, Roles.customer), vehicleController.createVehicle);
router.get("/", vehicleController.getAllVehicle);
router.get("/:id", vehicleController.getSingleVehicle);
router.put("/:id", auth(Roles.admin), vehicleController.updateVehicle);
router.delete("/:id", auth(Roles.admin), vehicleController.deleteVehicle);

export const vehicleRouter = router;
