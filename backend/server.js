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

// 🔹 Conexión a MongoDB (no bloquea el servidor)
mongoose
  .connect(process.env.MongoDB_MONGO_URL)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
  });

// 🔹 Puerto dinámico para Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor backend en el puerto ${PORT}`);
});






