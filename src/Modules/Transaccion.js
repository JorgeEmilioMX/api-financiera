const mongoose = require('mongoose');

const TransaccionSchema = new mongoose.Schema({
    cuentaOrigen: {
        type: Number,
        ref: 'Cuenta',
        required: true,
    },
    cuentaDestino: {
        type: Number,
        ref: 'Cuenta',
        required: true,
    },
    monto: {
        type: Number,
        required: true,
        min: 0.01,
    },
    estado: {
        type: String,
        enum: ['EXITOSA', 'FALLIDA', 'REVERTIDA'],
        default: 'EXITOSA'
    }
});

module.exports = mongoose.model('Transaccion', TransaccionSchema);