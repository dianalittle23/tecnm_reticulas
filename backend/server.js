const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Rutas de tu proyecto
const tecRoutes = require('./routes/tecs');
const carreraRoutes = require('./routes/carreras');
const materiaRoutes = require('./routes/materias');

const app = express();

// ---------------------------------------------
// 1. Configuración de CORS
// ---------------------------------------------
const allowedOrigins = [
  'https://dependable-creation-production.up.railway.app', // tu FRONTEND
  'https://tecnmreticulas-production.up.railway.app',      // tu BACKEND (opcional)
  'http://localhost:3000',                                 // desarrollo local
];

const corsOptions = {
  origin: (origin, callback) => {
    // permitir si viene de un origen permitido o sin origen (Postman, curl, etc.)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
};

// Usa CORS y JSON
app.use(cors(corsOptions));
app.use(express.json());

// ---------------------------------------------
// 2. Rutas API
// ---------------------------------------------
app.use('/api/tecs', tecRoutes);
app.use('/api/carreras', carreraRoutes);
app.use('/api/materias', materiaRoutes);

// Endpoint sencillo para pruebas
app.get('/api-status', (req, res) => {
  res.json({ ok: true, mensaje: 'API TECNM Retículas funcionando 🚀' });
});

// ---------------------------------------------
// 3. Conexión a MongoDB
// ---------------------------------------------
mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: 'tecnm_reticulas',
  })
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err);
  });

// ---------------------------------------------
// 4. Inicialización del servidor
// ---------------------------------------------
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
