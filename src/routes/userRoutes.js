// src/routes/userRoutes.js
// Routes hanya bertugas mendefinisikan endpoint dan menghubungkan ke controller
// Routes TIDAK boleh berisi logika bisnis apapun

const express = require("express");
const router = express.Router(); // Membuat router terpisah dari app utama

// Import controller yang akan menangani setiap endpoint
const userController = require("../controller/userController");

// ========================
// DEFINISI ENDPOINT USER
// ========================

// GET  /users       -> Ambil semua user
router.get("/", userController.getAllUsers);

// GET  /users/:id   -> Ambil satu user berdasarkan id
router.get("/:id", userController.getUserById);

// POST /users       -> Buat user baru
router.post("/", userController.createUser);

// PUT  /users/:id   -> Update user berdasarkan id
router.put("/:id", userController.updateUser);

// DELETE /users/:id -> Hapus user berdasarkan id
router.delete("/:id", userController.deleteUser);

// Ekspor router agar bisa dipasang di index.js
module.exports = router;
