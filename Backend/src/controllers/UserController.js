import prisma from "../../prisma/client/index.js";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";

// get all users
const getAllUsers = async (req, res) => {
  try {
    //get all users from database
    // findMany adalah fungsi untuk mengambil semua data yang ada di tabel user
    const users = await prisma.user.findMany({
      select: {
        // select digunakan untuk memilih kolom yang akan ditampilkan
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        // orderBy digunakan untuk mengurutkan data
        id: "desc", // mengurutkan data berdasarkan id secara descending (dari besar ke kecil)
      },
    });

    //send response
    res.status(200).send({
      success: true,
      message: "Get all users successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

//function createUser
const createUser = async (req, res) => {
  // Periksa hasil validasi
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Jika ada error, kembalikan error ke pengguna
    return res.status(422).json({
      success: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }

  try {
    // Periksa apakah email sudah ada di database
    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    //hash adalah proses mengubah password menjadi string acak
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //insert data
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    res.status(201).send({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

//function findUserById
const getUserById = async (req, res) => {
  //get ID from params
  const { id } = req.params;

  try {
    //get user by ID
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    //send response
    res.status(200).send({
      success: true,
      message: `Get user By ID : ${id}`,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

//function updateUser
const updateUser = async (req, res) => {
  //get ID from params
  const { id } = req.params;

  // Periksa hasil validasi
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Jika ada error, kembalikan error ke pengguna
    return res.status(422).json({
      success: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }

  //hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    //update user
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    //send response
    res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

//function deleteUser
const deleteUser = async (req, res) => {
  //get ID from params
  const { id } = req.params;

  try {
    //delete user
    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    //send response
    res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export { getAllUsers, createUser, getUserById, updateUser, deleteUser };
