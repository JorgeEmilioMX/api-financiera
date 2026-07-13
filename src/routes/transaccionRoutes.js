const express = require('express');
const router = express.Router();
const transaccionController = require('../controllers/transaccionController');

// Rutas de Transacciones Financieras
router.post('/', transaccionController.crearTransaccion);       // Ejecutar transferencia
router.get('/', transaccionController.obtenerTransacciones);   // Ver historial de transacciones (Auditoría)

module.exports = router;