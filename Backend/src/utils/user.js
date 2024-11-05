import { body } from "express-validator";
import prisma from "../../prisma/client/index.js";

// Mendefinisikan validasi untuk create user
const validateUser = [
  body("name").notEmpty().withMessage("Name is required"), // Name tidak boleh kosong
  body("email") // Email tidak boleh kosong, harus valid, dan tidak boleh sama dengan email yang sudah ada
    .notEmpty()
    .withMessage("Email is required") // Email tidak boleh kosong
    .isEmail()
    .withMessage("Email is invalid") // kolom email harus berupa email
    .custom(async (value, { req }) => {
      // Custom validator untuk mengecek apakah email sudah ada atau belum
      if (!value) {
        // Jika email tidak ada
        throw new Error("Email is required"); // Maka akan muncul pesan error
      }
      
      const user = await prisma.user.findUnique({ where: { email: value } }); // Mencari email yang sama
      if (user && user.id !== Number(req.params.id)) {
        // Jika email sudah ada
        throw new Error("Email already exists"); // Maka akan muncul pesan error
      }
      return true; // Jika email belum ada, maka akan mengembalikan nilai true
    }),

  body("password") // Password tidak boleh kosong dan minimal 6 karakter
    .isLength({ min: 6 }) // Password minimal 6 karakter
    .withMessage("Password must be at least 6 characters long"), // Password minimal 6 karakter
];

export { validateUser }; // Export validateUser agar dapat digunakan di file lain
