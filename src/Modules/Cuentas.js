const mongoose = require('mongoose');

const CuentaSchema = new mongoose.Schema({
    titular: {
        type: String,
        required: [true, 'El nombre del titular es obligatorio'],
    },
    numeroCuenta: {
        encryptedData: { 
            type: String, 
            required: [true, 'El dato cifrado de la cuenta es obligatorio'] 
        },
        iv: { 
            type: String, 
            required: [true, 'El Vector de Inicialización (IV) es obligatorio'] 
        },
        tag: { 
            type: String, 
            required: [true, 'El tag de autenticación GCM es obligatorio'] 
        }
    },
    saldo: {
        type: Number,
        required: true,
        min: [0, 'El saldo no puede ser negativo'], // Regla de integridad financiera
        default: 0
    }
}, {
    timestamps: true // Registra automáticamente createdAt y updatedAt
});

module.exports = mongoose.model('Cuenta', CuentaSchema);