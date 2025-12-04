const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Importado para manejar las peticiones de origen cruzado

// Asegúrate de que estas rutas existan en tu proyecto
const tecRoutes = require("./routes/tecs");
const carreraRoutes = require("./routes/carreras");
const materiaRoutes = require("./routes/materias");

const app = express();

// --- 1. CONFIGURACIÓN DE CORS (SOLUCIÓN AL ERROR) ---

// Define el origen permitido. Esta es la URL de tu Frontend en Railway.
const allowedOrigins = [
  "https://dependable-creation-production.up.railway.app", // ¡URL de tu Frontend!
  "http://localhost:3000" // Permite el acceso para pruebas locales
];

// Configura CORS para aceptar solo solicitudes de los orígenes definidos.
app.use(cors({
  origin: function (origin, callback) {
    // Permite solicitudes sin origen (como Postman o curl)
    if (!origin) return callback(null, true);
    
    // Si el origen está en nuestra lista, permitirlo
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Bloquea cualquier otro dominio (seguridad)
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));

// --- Middleware General ---
app.use(express.json());

// --- Rutas API ---
app.use("/api/tecs", tecRoutes);
app.use("/api/carreras", carreraRoutes);
app.use("/api/materias", materiaRoutes);

app.get("/", (req, res) => {
  res.send("API TECNM Retículas funcionando 🚀");
});


// --- Conexión a MongoDB ---
mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: 'tecnm_reticulas',
  })
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
  });


// --- Inicialización del Servidor ---
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
