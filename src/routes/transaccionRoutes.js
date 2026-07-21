const express = require('express');
const router = express.Router();
const transaccionController = require('../controllers/transaccionController');
const authMiddleware = require('../middleware/authMiddleware'); // ← AGREGAR

// Rutas de Transacciones Financieras
router.post('/', authMiddleware, transaccionController.crearTransaccion);      // ← agregar authMiddleware
router.get('/', authMiddleware, transaccionController.obtenerTransacciones);   // ← agregar authMiddleware

module.exports = router;
