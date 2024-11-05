import { body } from "express-validator";
import prisma from "../../prisma/client/index.js";

// Mendefinisikan validasi untuk register
const validateRegister = [
  body("name").notEmpty().withMessage("Name is required"), // Name tidak boleh kosong

  body("email") // Email tidak boleh kosong, harus valid, dan tidak boleh sama dengan email yang sudah ada
    .notEmpty() // Email tidak boleh kosong
    .withMessage("Email is required") // Email tidak boleh kosong
    .isEmail() // kolom email harus berupa email
    .withMessage("Email is invalid") // Email harus valid
    .custom(async (value) => { // Custom validator untuk mengecek apakah email sudah ada atau belum
      if (!value) {  // Jika email tidak ada
        throw new Error("Email is required"); // Maka akan muncul pesan error
      }

      const user = await prisma.user.findUnique({ where: { email: value } }); // Mencari email yang sama
      if (user) { // Jika email sudah ada
        throw new Error("Email already exists"); // Maka akan muncul pesan error
      }
      return true; // Jika email belum ada, maka akan mengembalikan nilai true
    }),

  body("password") // Password tidak boleh kosong dan minimal 6 karakter
    .isLength({ min: 6 }) // Password minimal 6 karakter
    .withMessage("Password must be at least 6 characters long"), // Password minimal 6 karakter
];

// Mendefinisikan validasi untuk login
const validateLogin = [
  body("email").notEmpty().withMessage("Email is required"), // Email tidak boleh kosong
  body("password").notEmpty().withMessage("Password is required"), // Password tidak boleh kosong
];

export { validateRegister, validateLogin }; // Export validateRegister dan validateLogin agar dapat digunakan di file lain
