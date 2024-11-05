import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import prisma from "../../prisma/client/index.js";

// function to register user
const register = async (req, res) => {
  // Periksa hasil validasi
  const errors = validationResult(req);

  // !errors berarti jika tidak ada error
  // isEmpty() berarti jika tidak ada error yang ditemukan
  // !errors.isEmpty() berarti jika ada error yang ditemukan
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation error",
      errors: errors.array(), // Menampilkan pesan error dengan format array yang dihasilkan oleh validationResult
    });
  }

  //hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    //insert data
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    //return response json
    res.status(201).send({
      success: true,
      message: "Register successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export { register };
