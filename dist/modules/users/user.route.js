"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const auth_constant_1 = require("../auth/auth.constant");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)(auth_constant_1.Roles.admin), user_controller_1.userController.createUser);
router.get("/", (0, auth_1.default)(auth_constant_1.Roles.admin), user_controller_1.userController.getUser);
router.get("/:id", (0, auth_1.default)(auth_constant_1.Roles.admin), user_controller_1.userController.getSingleUser);
router.put("/:id", (0, auth_1.default)(auth_constant_1.Roles.admin), user_controller_1.userController.updateUser);
router.delete("/:id", (0, auth_1.default)(auth_constant_1.Roles.admin), user_controller_1.userController.deleteUser);
exports.userRouter = router;
