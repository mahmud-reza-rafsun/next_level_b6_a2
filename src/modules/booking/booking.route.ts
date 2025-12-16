import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.constant";

const router = Router();

router.post("/", auth(Roles.customer, Roles.admin), bookingController.createBooking);
router.get("/", auth(Roles.customer, Roles.admin), bookingController.getBookings);
router.put("/cancel/:bookingId", auth(Roles.customer), bookingController.cancelBooking);
router.put("/return/:bookingId", auth(Roles.admin), bookingController.markReturned);

export const bookingRouter = router;