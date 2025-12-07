"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const user_route_1 = require("./modules/users/user.route");
const auth_route_1 = require("./modules/auth/auth.route");
const vehicle_route_1 = require("./modules/vehicles/vehicle.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// databse
(0, db_1.default)();
app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "server is on"
    });
});
// users router
app.use("/api/v1/users", user_route_1.userRouter);
// auth router
app.use("/api/v1/auth", auth_route_1.auhtRouter);
// vehicle route
app.use("/api/v1/vehicles", vehicle_route_1.vehicleRouter);
// server listen
app.listen(5000, () => {
    console.log(`server is running on port 5000`);
});
