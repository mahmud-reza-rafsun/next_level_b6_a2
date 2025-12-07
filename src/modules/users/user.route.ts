import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.constant";

const router = Router()

router.post("/", auth(Roles.admin), userController.createUser);
router.get("/", auth(Roles.admin), userController.getUser);
router.get("/:id", auth(Roles.admin), userController.getSingleUser);
router.put("/:id", auth(Roles.admin), userController.updateUser);
router.delete("/:id", auth(Roles.admin), userController.deleteUser);

export const userRouter = router;