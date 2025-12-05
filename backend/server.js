// backend/server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const tecRoutes = require('./routes/tecs');
const carreraRoutes = require('./routes/carreras');
const materiaRoutes = require('./routes/materias');

const app = express();

// ----- CORS -----
const allowedOrigins = [
  'https://dependable-creation-production.up.railway.app', // FRONTEND Railway
  'https://tecnmreticulas-production.up.railway.app',      // BACKEND Railway (opcional)
  'http://localhost:3000',
  'http://localhost:5173',                                 // Vite dev
  'http://localhost:4173',                                 // Vite preview
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ CORS bloqueó origin:', origin);
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// ----- Rutas API -----
app.use('/api/tecs', tecRoutes);
app.use('/api/carreras', carreraRoutes);
app.use('/api/materias', materiaRoutes);

app.get('/api-status', (req, res) => {
  res.json({ ok: true, mensaje: 'API TECNM Retículas funcionando 🚀' });
});

// ----- Conexión MongoDB -----
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('❌ No se encontró MONGODB_URI en las variables de entorno');
} else {
  mongoose
    .connect(mongoUri, {
      // NADA de useNewUrlParser ni useUnifiedTopology
      dbName: 'tecnm_reticulas',
    })
    .then(() => {
      console.log('✅ Conectado a MongoDB');
    })
    .catch((err) => {
      console.error('❌ Error conectando a MongoDB:', err);
    });
}

// ----- Servidor -----
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
