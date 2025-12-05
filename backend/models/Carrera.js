const mongoose = require("mongoose");

// Semestres de la carrera
const SemestreSchema = new mongoose.Schema(
  {
    numero: { type: Number, required: true }, // 1,2,3...
    materias: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Materia",
      },
    ],
  },
  { _id: false }
);

// Especialidades de la carrera
const EspecialidadSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: String,
    materias: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Materia",
      },
    ],
  },
  { _id: false }
);

const CarreraSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    clave_oficial: { type: String, required: true },
    grado: { type: String, default: "Licenciatura" },
    modalidad: { type: String, default: "Escolarizada" },
    plan_anio: Number,
    area_conocimiento: String,

    reticula_pdf_url: String,
    perfil_pdf_url: String,

    tec: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tec",
      required: true,
    },

    semestres: [SemestreSchema],
    especialidades: [EspecialidadSchema],

    activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Carrera", CarreraSchema);
