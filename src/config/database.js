// src/config/database.js
// File ini bertugas membuat koneksi ke database PostgreSQL (Supabase) menggunakan pg

const { Pool } = require('pg');
require('dotenv').config(); // Memuat variabel dari file .env

// Membuat pool koneksi (lebih efisien dari single connection)
// Pool = kumpulan koneksi yang bisa dipakai ulang
const pool = new Pool({
  host: process.env.DB_HOST,         // Host database Supabase (lihat Project Settings > Database)
  port: process.env.DB_PORT,         // Port PostgreSQL Supabase (default: 5432, atau 6543 untuk pooler)
  user: process.env.DB_USER,         // Username database Supabase (default: postgres)
  password: process.env.DB_PASSWORD, // Password database Supabase
  database: process.env.DB_NAME,     // Nama database (default: postgres)
  ssl: { rejectUnauthorized: false }, // Supabase mewajibkan koneksi SSL
  max: 10,                           // Maksimal 10 koneksi bersamaan
  idleTimeoutMillis: 30000,          // Tutup koneksi idle setelah 30 detik
});

// Tes koneksi saat aplikasi pertama kali dijalankan
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Gagal koneksi ke database:', err.message);
    return;
  }
  console.log('✅ Berhasil koneksi ke database Supabase (PostgreSQL)!');
  release(); // Kembalikan koneksi ke pool setelah selesai
});

// Ekspor pool agar bisa digunakan di file lain (model)
module.exports = pool;
