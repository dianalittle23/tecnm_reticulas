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
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB");

    // Puerto dinámico para Railway
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Servidor backend en el puerto ${PORT}`);
    });
  })
  .catch((err) => console.error(err));



