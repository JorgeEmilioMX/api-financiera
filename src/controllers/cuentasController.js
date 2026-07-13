const Cuenta = require('../Modules/Cuentas'); // Ajusta la ruta a tus modelos según tu estructura
const crypto = require('crypto');

// Configuración para simular cifrado AES-256-GCM
const ALGORITHM = 'aes-256-gcm';
// IMPORTANTE: Asegúrate de tener una KEY de 32 bytes en tu archivo .env en el futuro
const SECRET_KEY = process.env.CRYPTO_KEY || '12345678901234567890123456789012'; 

// Función auxiliar para cifrar el número de cuenta
const cifrarNumeroCuenta = (numero) => {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
    let encrypted = cipher.update(numero.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag().toString('hex');

    return {
        encryptedData: encrypted,
        iv: iv.toString('hex'),
        tag: tag
    };
};

// 1. CREATE: Crear cuenta cifrando el número de cuenta
exports.crearCuenta = async (req, res) => {
    try {
        const { titular, numeroCuenta, saldo } = req.body;

        if (!titular || !numeroCuenta) {
            return res.status(400).json({
                ok: false,
                msg: 'El titular y el numeroCuenta son obligatorios'
            });
        }

        // Ciframos el número de cuenta con la estructura solicitada en el modelo
        const numeroCuentaCifrado = cifrarNumeroCuenta(numeroCuenta);

        const nuevaCuenta = new Cuenta({
            titular,
            numeroCuenta: numeroCuentaCifrado,
            saldo: saldo || 0
        });

        await nuevaCuenta.save();

        res.status(201).json({
            ok: true,
            msg: 'Cuenta creada exitosamente con datos cifrados',
            cuenta: {
                id: nuevaCuenta._id,
                titular: nuevaCuenta.titular,
                saldo: nuevaCuenta.saldo
            }
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error al crear la cuenta',
            error: error.message
        });
    }
};

// 2. READ: Obtener listado de cuentas
exports.obtenerCuentas = async (req, res) => {
    try {
        // Obtenemos las cuentas (ocultando los detalles técnicos del cifrado para el cliente)
        const cuentas = await Cuenta.find({}, 'titular saldo');
        res.json({
            ok: true,
            cuentas
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las cuentas',
            error: error.message
        });
    }
};