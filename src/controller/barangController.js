// src/controller/barangController.js
// Controller untuk CRUD barang - polanya identik dengan userController.js

const barangModel = require('../models/barangModel');

// ========================
// GET ALL BARANG
// GET /barang
// ========================
const getAllBarang = async (req, res) => {
  try {
    const barang = await barangModel.getAllBarang();

    res.status(200).json({
      success: true,
      message: 'Data barang berhasil diambil',
      data: barang,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// GET BARANG BY ID
// GET /barang/:id
// ========================
const getBarangById = async (req, res) => {
  try {
    const { id } = req.params;

    const barang = await barangModel.getBarangById(id);

    if (!barang) {
      return res.status(404).json({
        success: false,
        message: 'Barang tidak ditemukan',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Data barang berhasil diambil',
      data: barang,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// CREATE BARANG
// POST /barang
// ========================
const createBarang = async (req, res) => {
  try {
    const { nama_barang, harga, stok } = req.body; // Ambil data dari body request

    // Validasi: semua field wajib diisi
    if (!nama_barang || harga === undefined || stok === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Field nama_barang, harga, dan stok wajib diisi',
      });
    }

    const result = await barangModel.createBarang(nama_barang, harga, stok);

    res.status(201).json({
      success: true,
      message: 'Barang berhasil ditambahkan',
      data: {
        id: result.insertId,
        nama_barang,
        harga,
        stok,
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
// UPDATE BARANG
// PUT /barang/:id
// ========================
const updateBarang = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_barang, harga, stok } = req.body;

    // Validasi field wajib
    if (!nama_barang || harga === undefined || stok === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Field nama_barang, harga, dan stok wajib diisi',
      });
    }

    // Cek apakah barang dengan id tersebut ada
    const existingBarang = await barangModel.getBarangById(id);
    if (!existingBarang) {
      return res.status(404).json({
        success: false,
        message: 'Barang tidak ditemukan',
      });
    }

    await barangModel.updateBarang(id, nama_barang, harga, stok);

    res.status(200).json({
      success: true,
      message: 'Barang berhasil diperbarui',
      data: { id: parseInt(id), nama_barang, harga, stok },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// DELETE BARANG
// DELETE /barang/:id
// ========================
const deleteBarang = async (req, res) => {
  try {
    const { id } = req.params;

    // Cek apakah barang ada sebelum dihapus
    const existingBarang = await barangModel.getBarangById(id);
    if (!existingBarang) {
      return res.status(404).json({
        success: false,
        message: 'Barang tidak ditemukan',
      });
    }

    await barangModel.deleteBarang(id);

    res.status(200).json({
      success: true,
      message: 'Barang berhasil dihapus',
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
  getAllBarang,
  getBarangById,
  createBarang,
  updateBarang,
  deleteBarang,
};
