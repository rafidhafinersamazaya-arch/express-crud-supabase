// index.js
// File utama aplikasi Express - titik masuk (entry point) project

// ========================
// IMPORT DEPENDENCIES
// ========================
const express = require("express");
require("dotenv").config(); // Harus dipanggil paling awal agar .env terbaca

// Import routes
const userRoutes = require("./src/routes/userRoutes");
const barangRoutes = require("./src/routes/barangRoutes");

// Import middleware
const { errorHandler, notFound } = require("./src/middleware/errorHandler");

// ========================
// INISIALISASI APP
// ========================
const app = express();
const PORT = process.env.PORT || 3000; // Ambil PORT dari .env, default 3000

// ========================
// MIDDLEWARE GLOBAL
// ========================
// Middleware ini berjalan untuk SEMUA request sebelum sampai ke route

// Mengizinkan Express membaca request body dalam format JSON
app.use(express.json());

// Mengizinkan Express membaca request body dari form (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// ========================
// ROUTES
// ========================
// Mendaftarkan semua route dengan prefix URL masing-masing

// Semua route user akan dimulai dengan /users
// Contoh: GET /users, POST /users, GET /users/1
app.use("/users", userRoutes);

// Semua route barang akan dimulai dengan /barang
// Contoh: GET /barang, POST /barang, GET /barang/1
app.use("/barang", barangRoutes);

// Route default untuk cek apakah server berjalan
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server Express CRUD berjalan dengan baik!",
    endpoints: {
      users: "/users",
      barang: "/barang",
    },
  });
});

// ========================
// MIDDLEWARE ERROR (Harus di paling bawah!)
// ========================

// Tangani route yang tidak terdaftar (404)
app.use(notFound);

// Tangani semua error yang terjadi di aplikasi
app.use(errorHandler);

// ========================
// JALANKAN SERVER
// ========================
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📌 Endpoints:`);
  console.log(`   - Users  : http://localhost:${PORT}/users`);
  console.log(`   - Barang : http://localhost:${PORT}/barang`);
});
