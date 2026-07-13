const Transaccion = require('../Modules/Transaccion');
const Cuenta = require('../Modules/Cuentas');

// 1. POST: Registrar una nueva transferencia con lógica de validación de saldo
exports.crearTransaccion = async (req, res) => {
    try {
        const { cuentaOrigen, cuentaDestino, monto } = req.body;

        if (!cuentaOrigen || !cuentaDestino || !monto) {
            return res.status(400).json({
                ok: false,
                msg: 'cuentaOrigen, cuentaDestino y monto son requeridos'
            });
        }

        // 1. Validar que las cuentas existan en la base de datos por su ID
        const origen = await Cuenta.findById(cuentaOrigen);
        const destino = await Cuenta.findById(cuentaDestino);

        if (!origen || !destino) {
            return res.status(404).json({
                ok: false,
                msg: 'Una o ambas cuentas no existen'
            });
        }

        // 2. Regla de Integridad Financiera: Validar saldo suficiente
        if (origen.saldo < monto) {
            // Guardamos el registro como FALLIDA por auditoría de seguridad
            const transaccionFallida = new Transaccion({
                cuentaOrigen,
                cuentaDestino,
                monto,
                estado: 'FALLIDA'
            });
            await transaccionFallida.save();

            return res.status(400).json({
                ok: false,
                msg: 'Saldo insuficiente para realizar la transacción',
                transaccion: transaccionFallida
            });
        }

        // 3. Modificación de saldos
        origen.saldo -= monto;
        destino.saldo += monto;

        // Guardamos los cambios de saldos
        await origen.save();
        await destino.save();

        // 4. Registrar transacción exitosa
        const nuevaTransaccion = new Transaccion({
            cuentaOrigen,
            cuentaDestino,
            monto,
            estado: 'EXITOSA'
        });

        await nuevaTransaccion.save();

        res.status(201).json({
            ok: true,
            msg: 'Transferencia realizada con éxito',
            transaccion: nuevaTransaccion
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error al procesar la transacción',
            error: error.message
        });
    }
};

// 2. GET: Obtener el historial de auditoría de transacciones
exports.obtenerTransacciones = async (req, res) => {
    try {
        const transacciones = await Transaccion.find()
            .populate('cuentaOrigen', 'titular')
            .populate('cuentaDestino', 'titular');
            
        res.json({
            ok: true,
            transacciones
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener el historial de transacciones',
            error: error.message
        });
    }
};