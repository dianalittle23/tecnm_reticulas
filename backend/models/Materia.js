const mongoose = require("mongoose");

// Define el esquema (estructura) de una Materia
const MateriaSchema = new mongoose.Schema({
    // Nombre de la materia (ej: Programación Orientada a Objetos)
    nombre: {
        type: String,
        required: [true, "El nombre de la materia es obligatorio"],
        trim: true,
    },
    // Clave de la materia (ej: ISC-1027)
    clave: {
        type: String,
        required: [true, "La clave de la materia es obligatoria"],
        unique: true, // Cada clave debe ser única en todo el sistema
        trim: true
    },
    // Créditos totales de la materia
    creditos: {
        type: Number,
        required: [true, "El número de créditos es obligatorio"],
        min: 1 // Asegura que los créditos sean al menos 1
    },
    // Semestre al que pertenece (ej: 1, 2, 3...)
    semestre: {
        type: Number,
        required: [true, "El semestre es obligatorio"],
        min: 1
    },
    // RELACIÓN CLAVE: ID de la Carrera a la que pertenece esta materia
    idCarrera: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carrera', // Referencia al modelo 'Carrera' que ya creaste
        required: [true, "La materia debe estar asociada a una Carrera"]
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Crea y exporta el Modelo de Mongoose
module.exports = mongoose.model("Materia", MateriaSchema);
  { timestamps: true }
);

module.exports = mongoose.model("Materia", MateriaSchema);

