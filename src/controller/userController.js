// src/controller/userController.js
// Controller menerima request, memanggil model, lalu mengirim response JSON
// Controller TIDAK boleh berisi query SQL langsung (itu tugas model)
//2

const userModel = require("../models/userModel");

// ========================
// GET ALL USERS
// GET /users
// ========================
const getAllUsers = async (req, res) => {
  try {
    // Memanggil model untuk mengambil semua data
    const users = await userModel.getAllUsers();

    // Mengirim response sukses
    res.status(200).json({
      success: true,
      message: "Data user berhasil diambil",
      data: users,
    });
  } catch (error) {
    // Jika ada error, lempar ke middleware errorHandler
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// GET USER BY ID
// GET /users/:id
// ========================
const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Mengambil id dari URL parameter

    const user = await userModel.getUserById(id);

    // Jika user tidak ditemukan, kirim response 404
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User dengan id: ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Data user berhasil diambil",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// CREATE USER
// POST /users
// ========================
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body; // Mengambil data dari body request

    // Validasi: pastikan field wajib terisi
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Field name dan email wajib diisi",
      });
    }

    const result = await userModel.createUser(name, email);

    res.status(201).json({
      success: true,
      message: "User berhasil dibuat",
      data: {
        id: result.insertId, // ID user yang baru dibuat
        name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// UPDATE USER
// PUT /users/:id
// ========================
const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // ID dari URL
    const { name, email } = req.body; // Data baru dari body

    // Validasi field wajib
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Field name dan email wajib diisi",
      });
    }

    // Cek apakah user dengan id tersebut ada
    const existingUser = await userModel.getUserById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    await userModel.updateUser(id, name, email);

    res.status(200).json({
      success: true,
      message: "User berhasil diperbarui",
      data: { id: parseInt(id), name, email },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// DELETE USER
// DELETE /users/:id
// ========================
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Cek apakah user dengan id tersebut ada
    const existingUser = await userModel.getUserById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    await userModel.deleteUser(id);

    res.status(200).json({
      success: true,
      message: "User berhasil dihapus",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Ekspor semua fungsi controller
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
