// src/routes/barangRoutes.js
// Routes untuk endpoint barang - polanya identik dengan userRoutes.js

const express = require('express');
const router = express.Router();

const barangController = require('../controller/barangController');

// ========================
// DEFINISI ENDPOINT BARANG
// ========================

// GET  /barang       -> Ambil semua barang
router.get('/', barangController.getAllBarang);

// GET  /barang/:id   -> Ambil satu barang berdasarkan id
router.get('/:id', barangController.getBarangById);

// POST /barang       -> Tambah barang baru
router.post('/', barangController.createBarang);

// PUT  /barang/:id   -> Update barang berdasarkan id
router.put('/:id', barangController.updateBarang);

// DELETE /barang/:id -> Hapus barang berdasarkan id
router.delete('/:id', barangController.deleteBarang);

module.exports = router;
