// src/models/barangModel.js
// Model berisi semua query SQL untuk tabel barang
// Polanya sama persis dengan userModel.js agar mudah dipelajari

const db = require('../config/database');

// ========================
// GET ALL BARANG
// ========================
// Mengambil semua data barang dari database
const getAllBarang = async () => {
  const result = await db.query('SELECT * FROM barang ORDER BY created_at DESC');
  return result.rows;
};

// ========================
// GET BARANG BY ID
// ========================
// Mengambil satu data barang berdasarkan id
const getBarangById = async (id) => {
  const result = await db.query('SELECT * FROM barang WHERE id = $1', [id]);
  return result.rows[0]; // Mengembalikan satu objek (atau undefined)
};

// ========================
// CREATE BARANG
// ========================
// Menyimpan data barang baru ke database
const createBarang = async (nama_barang, harga, stok) => {
  const result = await db.query(
    'INSERT INTO barang (nama_barang, harga, stok) VALUES ($1, $2, $3) RETURNING id',
    [nama_barang, harga, stok]
  );
  return { insertId: result.rows[0].id }; // Samakan bentuk return dengan sebelumnya (result.insertId)
};

// ========================
// UPDATE BARANG
// ========================
// Mengubah data barang berdasarkan id
const updateBarang = async (id, nama_barang, harga, stok) => {
  const result = await db.query(
    'UPDATE barang SET nama_barang = $1, harga = $2, stok = $3 WHERE id = $4',
    [nama_barang, harga, stok, id]
  );
  return { affectedRows: result.rowCount };
};

// ========================
// DELETE BARANG
// ========================
// Menghapus data barang berdasarkan id
const deleteBarang = async (id) => {
  const result = await db.query('DELETE FROM barang WHERE id = $1', [id]);
  return { affectedRows: result.rowCount };
};

// Ekspor semua fungsi agar bisa digunakan di controller
module.exports = {
  getAllBarang,
  getBarangById,
  createBarang,
  updateBarang,
  deleteBarang,
};
