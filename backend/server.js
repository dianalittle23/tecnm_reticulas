const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Asegúrate de que estas rutas existan en tu proyecto
const tecRoutes = require("./routes/tecs");
const carreraRoutes = require("./routes/carreras");
const materiaRoutes = require("./routes/materias");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas API
app.use("/api/tecs", tecRoutes);
app.use("/api/carreras", carreraRoutes);
app.use("/api/materias", materiaRoutes);

app.get("/", (req, res) => {
  res.send("API TECNM Retículas funcionando 🚀");
});

// --- CORRECCIÓN IMPORTANTE ---
// 1. Definimos el puerto usando la variable de entorno de Railway (process.env.PORT)
// 2. Si no existe (en tu compu), usamos el 8080.
const port = process.env.PORT || 8080;

// 3. Iniciamos el servidor para que "escuche"
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
// -----------------------------

// Conexión a MongoDB
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







