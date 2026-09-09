// src/middleware/errorHandler.js
// Middleware untuk menangani error secara global
// Middleware ini dipasang PALING AKHIR di index.js

// Error handler middleware memiliki 4 parameter: (err, req, res, next)
// Express mengenali ini sebagai error handler karena ada 4 parameter
const errorHandler = (err, req, res, next) => {
  // Cetak error di terminal untuk keperluan debugging
  console.error('❌ Error:', err.stack);

  // Tentukan status code (gunakan yang sudah diset, atau default 500)
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // Kirim response error dalam format JSON yang konsisten
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Terjadi kesalahan pada server',
  });
};

// Middleware untuk menangani route yang tidak ditemukan (404)
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} tidak ditemukan`,
  });
};

module.exports = { errorHandler, notFound };
