"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auhtRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post("/signin", auth_controller_1.authController.signinUser);
exports.auhtRouter = router;
