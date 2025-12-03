const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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
  res.send("API TECNM Retículas funcionando ");
});

//  Conexión a MongoDB (no bloquea el servidor)
mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: 'tecnm_reticulas', // <-- aquí le dices qué base de datos usar
  })
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
  });










