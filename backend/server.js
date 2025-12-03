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

mongoose
  .connect("mongodb://127.0.0.1:27017/tecnm_reticulas")
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(3000, () => {
      console.log("Servidor backend en http://localhost:3000");
    });
  })
  .catch((err) => console.error(err));
