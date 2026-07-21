const express = require('express');
const router = express.Router();
const cuentasController = require('../controllers/cuentasController');
const authMiddleware = require('../middleware/authMiddleware'); // ← AGREGAR

// Rutas de Cuentas Financieras
router.post('/', authMiddleware, cuentasController.crearCuenta);     // ← agregar authMiddleware
router.get('/', authMiddleware, cuentasController.obtenerCuentas);   // ← agregar authMiddleware

module.exports = router;
