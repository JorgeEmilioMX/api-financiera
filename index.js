require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const connectDB = require('./src/config/database');
const cuentasRoutes = require('./src/routes/cuentasRoutes');
const transaccionRoutes = require('./src/routes/transaccionRoutes');

connectDB();

const app = express();

app.use(helmet());
app.use(express.json());

app.use('/api/cuentas', cuentasRoutes);
app.use('/api/transacciones', transaccionRoutes);

app.get('/', (req, res) => {
    res.json({ ok: true, msg: 'API de Transacciones activa' });
});

app.use((req, res) => {
    res.status(404).json({ ok: false, msg: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});