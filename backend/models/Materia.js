const mongoose = require("mongoose");

const MateriaSchema = new mongoose.Schema(
  {
    clave: { type: String, required: true },
    nombre: { type: String, required: true },

    creditos: Number,
    horas_teoria: Number,
    horas_practica: Number,
    cadena_creditos: String,
    semestre_recomendado: Number,

    es_modulo_especialidad: { type: Boolean, default: false },
    nombre_especialidad: String,

    tipo_unidad: {
      type: String,
      enum: [
        "Curso",
        "Taller",
        "Laboratorio",
        "Residencia",
        "Servicio Social",
        "Actividad complementaria",
        "Otro",
      ],
      default: "Curso",
    },

    area_materia: {
      type: String,
      enum: ["Basica", "Disciplinar", "Terminal", "Especialidad", "Otro"],
      default: "Basica",
    },

    carrera: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carrera",
      required: true,
    },

    tec: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tec",
      required: true,
    },

    // LISTA de materias que son PRERREQUISITOS
    prerrequisitos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Materia",
      },
    ],

    tags: [String],
    competencias: [String],

    plan_anio: Number,
    creditos_optativos: { type: Boolean, default: false },
    observaciones: String,

    fuente: String,
    activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Materia", MateriaSchema);
