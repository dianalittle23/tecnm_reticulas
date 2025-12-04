// Asumiendo que usas Express
const express = require('express');
const cors = require('cors'); // Asegúrate de instalar 'npm install cors'
const app = express();

// ----------------------------------------------------
// 1. Configuración de CORS
// ----------------------------------------------------

// Define una lista de orígenes permitidos (Whitelist)
// Esto es CRUCIAL para producción. Debes incluir la URL de tu frontend.
const allowedOrigins = [
    'https://dependable-creation-production.up.railway.app', // <-- ¡TU FRONTEND!
    'https://tecnmreticulas-production.up.railway.app', // (Opcional, si tu API se consume a sí misma)
    // Agrega cualquier otra URL donde despliegues tu frontend
];

const corsOptions = {
    origin: (origin, callback) => {
        // Permite la conexión si:
        // 1. El origen está en la lista blanca (allowedOrigins).
        // 2. No hay origen (p.ej., si la petición viene del mismo servidor o herramientas como Postman).
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            // Reemplaza new Error() por un manejo de error real para no mostrarlo al usuario
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Para permitir cookies, encabezados de autorización, etc.
};

// Usa el middleware CORS con tus opciones
app.use(cors(corsOptions));

// ----------------------------------------------------
// 2. Resto de la configuración del servidor
// ----------------------------------------------------
// Middleware para parsear JSON
app.use(express.json());

// Tus rutas aquí...
// app.use('/api', tusRutas);

// Configuración del puerto y el inicio del servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
