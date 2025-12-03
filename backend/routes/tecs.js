const mongoose = require("mongoose");

const TecSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    estado: String,
    ciudad: String,
    clave_interna: String,
    oferta_carreras: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carrera",
      },
    ],
    activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tec", TecSchema);

