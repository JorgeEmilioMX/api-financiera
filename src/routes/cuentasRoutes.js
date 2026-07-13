const express = require('express');
const router = express.Router();
const cuentasController = require('../controllers/cuentasController');

// Rutas de Cuentas Financieras
router.post('/', cuentasController.crearCuenta);       // Crear una cuenta nueva
router.get('/', cuentasController.obtenerCuentas);     // Consultar listado de cuentas

module.exports = router;