import express, { Request, Response } from "express"
import initDB from "./config/db";
import { userRouter } from "./modules/users/user.route";
import { auhtRouter } from "./modules/auth/auth.route";
import { vehicleRouter } from "./modules/vehicles/vehicle.route";
import { bookingRouter } from "./modules/booking/booking.route";

const app = express();

app.use(express.json())

// databse
initDB();

app.get("/", (req: Request, res: Response) => {
    res.send({
        success: true,
        message: "server is on"
    })
});

// users router
app.use("/api/v1/users", userRouter)

// auth router
app.use("/api/v1/auth", auhtRouter)

// vehicle route

app.use("/api/v1/vehicles", vehicleRouter)
app.use("/api/v1/bookings", bookingRouter)


// server listen
app.listen(5000, () => {
    console.log(`server is running on port 5000`);
})