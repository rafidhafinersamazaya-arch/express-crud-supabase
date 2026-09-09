// src/models/userModel.js
// Model berisi semua query SQL untuk tabel users
// Model TIDAK boleh mengandung logika response (itu tugas controller)

//1

const db = require("../config/database");

// ========================
// GET ALL USERS
// ========================
// Mengambil semua data user dari database
const getAllUsers = async () => {
  const result = await db.query("SELECT * FROM users ORDER BY created_at DESC");
  return result.rows; // Mengembalikan array berisi semua user
};

// ========================
// GET USER BY ID
// ========================
// Mengambil satu data user berdasarkan id
// Tanda $1 adalah placeholder untuk mencegah SQL Injection (sintaks PostgreSQL)
const getUserById = async (id) => {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0]; // Mengembalikan satu objek user (atau undefined jika tidak ada)
};

// ========================
// CREATE USER
// ========================
// Menyimpan data user baru ke database
const createUser = async (name, email) => {
  const result = await db.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id",
    [name, email],
  );
  return { insertId: result.rows[0].id }; // Samakan bentuk return dengan sebelumnya (result.insertId)
};

// ========================
// UPDATE USER
// ========================
// Mengubah data user berdasarkan id
const updateUser = async (id, name, email) => {
  const result = await db.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
  );
  return { affectedRows: result.rowCount }; // Samakan bentuk return dengan sebelumnya (result.affectedRows)
};

// ========================
// DELETE USER
// ========================
// Menghapus data user berdasarkan id
const deleteUser = async (id) => {
  const result = await db.query("DELETE FROM users WHERE id = $1", [id]);
  return { affectedRows: result.rowCount };
};

// Ekspor semua fungsi agar bisa digunakan di controller
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
