import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/admin/users", verifyToken, getAllUsers);
router.post("/admin/users", verifyToken, createUser);
router.get("/admin/users/:id", verifyToken, getUserById);
router.put("/admin/users/:id", verifyToken, updateUser);
router.delete("/admin/users/:id", verifyToken, deleteUser);

export default router;
