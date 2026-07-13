const mongoose = require('mongoose');

const TransaccionSchema = new mongoose.Schema({
    cuentaOrigen: {
        type: mongoose.Schema.Types.ObjectId, // Ajustado a ObjectId para compatibilidad real
        ref: 'Cuenta',
        required: true,
    },
    cuentaDestino: {
        type: mongoose.Schema.Types.ObjectId, // Ajustado a ObjectId para compatibilidad real
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
}, {
    timestamps: true // Registra la fecha y hora exacta de la transferencia (Auditoría)
});

module.exports = mongoose.model('Transaccion', TransaccionSchema);