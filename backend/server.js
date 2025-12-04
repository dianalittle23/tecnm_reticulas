const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const tecRoutes = require("./routes/tecs");
const carreraRoutes = require("./routes/carreras");
const materiaRoutes = require("./routes/materias");

const app = express();

// ------------------------------------------------------------------
// 📢 CAMBIO 1: Configuración de CORS con Lista Blanca
// ------------------------------------------------------------------

// Lista de URLs autorizadas para acceder a esta API.
const allowedOrigins = [
    // ¡TU FRONTEND! Esta URL debe coincidir exactamente con el dominio de tu otra app de Railway.
    'https://dependable-creation-production.up.railway.app', 
    
    // URLs de desarrollo local:
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8080', 
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            // Este error se verá si alguien intenta acceder desde un dominio no autorizado.
            callback(new Error('No permitido por CORS'), false);
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

// Usar el middleware CORS con la configuración de la lista blanca.
// Esto soluciona el error que ves en la consola (F12).
app.use(cors(corsOptions));
// ------------------------------------------------------------------

app.use(express.json());

// Rutas API (sin cambios, como lo tenías)
app.use("/api/tecs", tecRoutes);
app.use("/api/carreras", carreraRoutes);
app.use("/api/materias", materiaRoutes);

// ------------------------------------------------------------------
// 📢 CAMBIO 2: Uso de Variables de Entorno para Railway
// ------------------------------------------------------------------

// Railway asigna el puerto a process.env.PORT. Usamos 8080 como fallback local.
const PORT = process.env.PORT || 8080; 

// Railway asigna la URL de la DB a una variable de entorno. Usamos el valor local como fallback.
const DB_URI = process.env.MONGO_URL || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tecnm_reticulas";

mongoose
    // Usar la variable de entorno para la conexión a DB.
    .connect(DB_URI) 
    .then(() => {
        console.log("Conectado a MongoDB");
        // Usar la variable de entorno PORT para que Railway sepa dónde escuchar.
        app.listen(PORT, () => {
            console.log(`Servidor backend escuchando en el puerto ${PORT}`);
        });
    })
    .catch((err) => console.error("Error al conectar a MongoDB:", err));