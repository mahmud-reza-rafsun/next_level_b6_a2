import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.constant";

const router = Router()

router.post("/", auth(Roles.admin), vehicleController.createVehicle);
router.get("/", vehicleController.getAllVehicle);
router.get("/:id", vehicleController.getSingleVehicle);
router.put("/:id", vehicleController.updateVehicle);
router.delete("/:id", vehicleController.deleteVehicle);

export const vehicleRouter = router;