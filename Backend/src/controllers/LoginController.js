import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import prisma from "../../prisma/client/index.js";
import jwt from "jsonwebtoken";

//function login
const login = async (req, res) => {
  // Periksa hasil validasi
  const errors = validationResult(req);

  // !errors berarti jika tidak ada error
  // isEmpty() berarti jika tidak ada error yang ditemukan
  // !errors.isEmpty() berarti jika ada error yang ditemukan
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }

  try {
    //findfirst adalah fungsi untuk mencari data pertama yang sesuai dengan kondisi yang diberikan
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    //user not found
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    //compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //password incorrect
    if (!validPassword)
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });

    //generate token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      // Menyimpan id user ke token
      expiresIn: "1h",
    });

    // Destructure to remove password from user object
    const { password, ...userWithoutPassword } = user;

    //return response
    res.status(200).send({
      success: true,
      message: "Login successfully",
      data: {
        user: userWithoutPassword,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export { login };
