import express from "express";
import { register } from "../controllers/RegisterController.js";
import { validateLogin, validateRegister } from "../utils/auth.js";
import { login } from "../controllers/LoginController.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

export default router;
